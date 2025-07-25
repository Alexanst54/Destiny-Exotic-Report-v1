require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

    // Liste des referenceIds des missions exotiques (hashes extraits de src/pages/Missions.jsx)
    const exoticReferenceIds = [
      -2132841886, 655052177, -1932104431, -1932104430, -1553027841, 1550266704, -1174422607, -752855492, -752855491, -752855489,
      -1626230148, 613120446, 666172264, 901429423, -1563758630, -933221025, 1848771417, -411671539, -93120625, -1375158087,
      202306511, 995051012, 1221538367, -416696360, -998179575, -847719003, 367562924, 264074906, 715393254, 1044034163,
      1583447699, 1948474391, 1013336498, 196691221, 896748846, 1768099736, 74501540, -423446509, 576782083, 1099555105, 1738383283
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

    // Filtrer pour ne garder que les activités exotiques
    const exoticActivities = allActivities.filter(act => exoticReferenceIds.includes(act.activityDetails.referenceId));
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