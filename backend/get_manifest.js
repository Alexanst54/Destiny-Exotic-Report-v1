// Script Node.js pour télécharger et parser le manifest DestinyActivityDefinition
// Usage : node backend/get_manifest.js

const axios = require('axios');
const fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const API_KEY = process.env.BUNGIE_API_KEY || '<TA_CLE_API>'; // Remplace par ta clé si besoin
const LANG = 'fr'; // ou 'en', 'de', etc.

async function main() {
  // 1. Récupérer l'URL du manifest
  const manifestRes = await axios.get('https://www.bungie.net/Platform/Destiny2/Manifest/', {
    headers: { 'X-API-Key': API_KEY }
  });
  const manifest = manifestRes.data.Response;
  const activityPath = manifest.jsonWorldComponentContentPaths[LANG].DestinyActivityDefinition;
  const url = 'https://www.bungie.net' + activityPath;
  console.log('Téléchargement de', url);

  // 2. Télécharger le fichier DestinyActivityDefinition
  const defRes = await axios.get(url);
  const data = defRes.data;
  fs.writeFileSync('backend/DestinyActivityDefinition.json', JSON.stringify(data, null, 2));
  console.log('Fichier DestinyActivityDefinition.json sauvegardé.');

  // 3. Exemple : extraire tous les noms d'activités exotiques (à filtrer selon ton besoin)
  const exotics = Object.entries(data)
    .filter(([hash, def]) => def.displayProperties && def.displayProperties.name && def.displayProperties.name.toLowerCase().includes('exotique'))
    .map(([hash, def]) => ({ hash, name: def.displayProperties.name }));
  fs.writeFileSync('backend/exotic_activities.json', JSON.stringify(exotics, null, 2));
  console.log('Extraits exotiques dans exotic_activities.json');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
