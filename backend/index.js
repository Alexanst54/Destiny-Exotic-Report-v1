
// Use CommonJS syntax; ensure your file extension is .js and not .mjs, and your package.json ne spécifie pas "type": "module"
const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

// Route pour exposer la liste des missions exotiques (hash + nom) depuis le fichier activity
app.get('/api/exotic-activities', (req, res) => {
  const filePath = path.join(__dirname, 'activity');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Impossible de lire le fichier activity', details: err.message });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: 'Fichier activity invalide', details: e.message });
    }
  });
});

dotenv.config();

app.use(cors());
app.use(express.json());

// Route pour récupérer tout l'historique d'activités d'un joueur (hash + nom)
app.get('/api/all-activities', async (req, res) => {
  // Utilise les IDs d'Alex par défaut si non fournis
  let { membershipType, destinyMembershipId, characterId } = req.query;
  if (!membershipType) membershipType = '3';
  if (!destinyMembershipId) destinyMembershipId = '4611686018523435689';
  if (!characterId) characterId = '2305843010354814338';

  try {
    // Pagination pour récupérer toutes les activités disponibles (par pages de 250)
    let allActivities = [];
    let page = 0;
    const pageSize = 250;
    let keepGoing = true;
    while (keepGoing) {
      let activitiesRes;
      try {
        activitiesRes = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/?count=${pageSize}&page=${page}`,
          {
            headers: {
              'X-API-Key': process.env.BUNGIE_API_KEY
            }
          });
      } catch (e) {
        break;
      }
      const activities = activitiesRes.data.Response.activities || [];
      allActivities = allActivities.concat(activities);
      if (activities.length < pageSize) {
        keepGoing = false;
      } else {
        page++;
      }
      if (page > 20) keepGoing = false;
    }

    // Pour chaque activité, récupérer le nom via DestinyActivityDefinition
    const result = await Promise.all(allActivities.map(async (act) => {
      let activityName = null;
      try {
        const defRes = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyActivityDefinition/${act.activityDetails.referenceId}/`, {
          headers: { 'X-API-Key': process.env.BUNGIE_API_KEY }
        });
        activityName = defRes.data.Response?.displayProperties?.name || null;
      } catch (e) {
        activityName = null;
      }
      return {
        referenceId: act.activityDetails.referenceId,
        name: activityName
      };
    }));

    res.json({ activities: result });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des activités Bungie', details: err.message });
  }
});

// Redirige l'utilisateur vers Bungie pour l'auth
app.get('/auth/login', (req, res) => {
  const url = `https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.BUNGIE_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI || "http://localhost:3000/auth/callback")}`;
  console.log("[OAUTH LOGIN] Redirection vers:", url); // <-- Ajoute cette ligne
  res.redirect(url);
});

// Callback OAuth pour récupérer le code
app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('client_id', process.env.BUNGIE_CLIENT_ID);
    params.append('client_secret', process.env.BUNGIE_CLIENT_SECRET);
    const response = await axios.post('https://www.bungie.net/Platform/App/OAuth/token/', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    res.json(response.data);
  } catch (err) {
    if (err.response) {
      console.error('[OAUTH ERROR]', err.response.status, err.response.data);
      res.status(500).json({ error: 'OAuth error', details: err.message, bungie: err.response.data });
    } else {
      console.error('[OAUTH ERROR]', err.message);
      res.status(500).json({ error: 'OAuth error', details: err.message });
    }
  }
});

// Route pour récupérer le profil Bungie du joueur connecté
app.get('/api/profile', async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  const accessToken = auth.replace('Bearer ', '');

  try {
    // Récupérer l'identité du joueur
    const userRes = await axios.get('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {
      headers: {
        'X-API-Key': process.env.BUNGIE_API_KEY,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const memberships = userRes.data.Response.destinyMemberships;
    if (!memberships || memberships.length === 0) {
      return res.status(404).json({ error: 'Aucun profil Destiny trouvé' });
    }
    const main = memberships[0];

    // Récupérer le profil Destiny (nom, icône, plateforme)
    const displayName = main.displayName || main.bungieGlobalDisplayName || 'Guardian';
    const iconPath = main.iconPath || null;
    const platform = main.membershipType === 3 ? 'STEAM' : main.membershipType === 2 ? 'PSN' : main.membershipType === 1 ? 'XBOX' : 'Autre';

    // Récupérer le clan et le niveau de saison
    let clanName = null;
    let seasonLevel = null;
    try {
      // Clan
      const clanRes = await axios.get(`https://www.bungie.net/Platform/GroupV2/User/${main.membershipType}/${main.membershipId}/0/1/`, {
        headers: {
          'X-API-Key': process.env.BUNGIE_API_KEY,
        }
      });
      const groups = clanRes.data.Response.results;
      if (groups && groups.length > 0) {
        clanName = groups[0].group.name;
      }
    } catch (e) { /* ignore */ }
    try {
      // Niveau de saison
      const profileRes = await axios.get(`https://www.bungie.net/Platform/Destiny2/${main.membershipType}/Profile/${main.membershipId}/?components=100,202`, {
        headers: {
          'X-API-Key': process.env.BUNGIE_API_KEY,
        }
      });
      const seasonData = profileRes.data.Response.profileProgression.data.seasonalArtifact;
      if (seasonData && seasonData.powerBonus) {
        seasonLevel = seasonData.powerBonus;
      }
    } catch (e) { /* ignore */ }

    res.json({ displayName, iconPath, platform, clanName, seasonLevel });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du profil Bungie' });
  }
});

// Route pour récupérer les activités Bungie du joueur connecté
app.get('/api/activities', async (req, res) => {
  console.log('[API] /api/activities appelée');
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  const accessToken = auth.replace('Bearer ', '');

  try {
    // Récupérer l'identité du joueur
    const userRes = await axios.get('https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/', {
      headers: {
        'X-API-Key': process.env.BUNGIE_API_KEY,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const memberships = userRes.data.Response.destinyMemberships;
    if (!memberships || memberships.length === 0) {
      return res.status(404).json({ error: 'Aucun profil Destiny trouvé' });
    }
    const main = memberships[0];

    // Récupérer la liste des personnages
    let profileRes;
    try {
      profileRes = await axios.get(`https://www.bungie.net/Platform/Destiny2/${main.membershipType}/Profile/${main.membershipId}/?components=100,200`, {
        headers: {
          'X-API-Key': process.env.BUNGIE_API_KEY,
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (e) {
      console.error('[BUNGIE PROFILE ERROR]', e.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération du profil Bungie', details: e.message });
    }
    // Log la structure brute pour debug
    console.log('[BUNGIE PROFILE RAW]', JSON.stringify(profileRes.data, null, 2));
    const characters = profileRes.data?.Response?.characters?.data;
    if (!characters || typeof characters !== 'object') {
      return res.status(404).json({ error: 'Aucun personnage Destiny trouvé (structure Bungie invalide)' });
    }
    const characterIds = Object.keys(characters);
    if (!characterIds.length) {
      return res.status(404).json({ error: 'Aucun personnage Destiny trouvé' });
    }
    const characterId = characterIds[0]; // Prend le premier personnage

    // Liste des referenceIds des missions exotiques (hashes extraits du manifest anglais)
    const exoticReferenceIds = [
      648675065,   // dualdestiny
      655052177,   // encore
      613120446,   // voxobscura
      1848771417,  // zerohour
      2124066889,  // presage
      202306511,   // seraphshield
      133833536,   // kellsfall
      196691221,   // starcrossed
      74501540,    // whisper
      1738383283,  // harbinger
      509188661    // avalon
    ];

    // Pagination pour récupérer toutes les activités disponibles (par pages de 250)
    let allActivities = [];
    let page = 0;
    const pageSize = 250;
    let keepGoing = true;
    while (keepGoing) {
      let activitiesRes;
      try {
        activitiesRes = await axios.get(`https://www.bungie.net/Platform/Destiny2/${main.membershipType}/Account/${main.membershipId}/Character/${characterId}/Stats/Activities/?count=${pageSize}&page=${page}`,
          {
            headers: {
              'X-API-Key': process.env.BUNGIE_API_KEY,
              'Authorization': `Bearer ${accessToken}`
            }
          });
      } catch (e) {
        console.error(`[PAGINATION] Erreur page ${page} :`, e.message);
        break;
      }
      const activities = activitiesRes.data.Response.activities || [];
      console.log(`[PAGINATION] Page ${page} : ${activities.length} activités récupérées`);
      allActivities = allActivities.concat(activities);
      if (activities.length < pageSize) {
        keepGoing = false;
      } else {
        page++;
      }
      // Sécurité : ne pas dépasser 20 pages (5000 activités max)
      if (page > 20) keepGoing = false;
    }
    console.log(`[PAGINATION] Total activités récupérées : ${allActivities.length}`);


    // Debug : log les premiers referenceId récupérés
    console.log('[DEBUG] referenceIds des activités récupérées (premiers 20) :', allActivities.slice(0, 20).map(a => a.activityDetails.referenceId));
    // Log tous les referenceId uniques récupérés pour debug
    const allRefIds = [...new Set(allActivities.map(a => a.activityDetails.referenceId))];
    console.log('[DEBUG] TOUS les referenceIds uniques récupérés :', allRefIds);

    // Pour debug : affiche le nom de l'activité pour les 10 premiers referenceId uniques
    const first10RefIds = allRefIds.slice(0, 10);
    await Promise.all(first10RefIds.map(async (refId) => {
      try {
        const defRes = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyActivityDefinition/${refId}/`, {
          headers: { 'X-API-Key': process.env.BUNGIE_API_KEY }
        });
        const name = defRes.data.Response?.displayProperties?.name || null;
        console.log(`[DEBUG] Nom activité pour referenceId ${refId} :`, name);
      } catch (e) {
        console.log(`[DEBUG] Erreur récupération nom activité pour referenceId ${refId} :`, e.message);
      }
    }));

    // Correction : comparer en string pour éviter les problèmes de signe/type
    const exoticRefStr = exoticReferenceIds.map(String);
    const exoticActivities = allActivities.filter(act => exoticRefStr.includes(String(act.activityDetails.referenceId)));
    console.log(`[EXOTIC] Activités exotiques trouvées : ${exoticActivities.length}`);

    // Pour chaque activité, récupérer le nom via DestinyActivityDefinition
    const mappedActivities = await Promise.all(exoticActivities.slice(0, 10).map(async (act) => {
      let activityName = null;
      try {
        const defRes = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyActivityDefinition/${act.activityDetails.referenceId}/`, {
          headers: { 'X-API-Key': process.env.BUNGIE_API_KEY }
        });
        activityName = defRes.data.Response?.displayProperties?.name || null;
      } catch (e) {
        console.error(`[ACTIVITY DEF ERROR] ${act.activityDetails.referenceId}:`, e.message);
        activityName = null;
      }
      return { ...act, activityName };
    }));

    // Log détaillé pour debug : ce qui est envoyé au frontend
    console.log('[RETOUR FRONTEND] mappedActivities (taille):', mappedActivities.length);
    if (mappedActivities.length > 0) {
      console.log('[RETOUR FRONTEND] Premier élément:', JSON.stringify(mappedActivities[0], null, 2));
    } else {
      console.log('[RETOUR FRONTEND] Aucun élément à renvoyer');
    }
    res.json({ activities: mappedActivities });
  } catch (err) {
    console.error('[ACTIVITIES ERROR]', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des activités Bungie', details: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend Express running on http://localhost:${PORT}`);
});