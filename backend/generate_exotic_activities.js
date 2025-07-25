const fs = require('fs');
const path = require('path');
const axios = require('axios');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const API_KEY = process.env.BUNGIE_API_KEY;
if (!API_KEY) {
  console.error('❌ BUNGIE_API_KEY manquant dans .env');
  process.exit(1);
}

const activityPath = path.join(__dirname, 'activity');
const outputPath = path.join(__dirname, 'exotic_activities.json');

async function main() {
  const { activities } = JSON.parse(fs.readFileSync(activityPath, 'utf8'));
  const results = [];

  for (const act of activities) {
    try {
      const url = `https://www.bungie.net/Platform/Destiny2/Manifest/DestinyActivityDefinition/${act.referenceId}/`;
      const res = await axios.get(url, { headers: { 'X-API-Key': API_KEY } });
      const def = res.data.Response;
      results.push({
        mission: def.displayProperties?.name || act.name,
        hash: String(act.referenceId),
        name: def.displayProperties?.name || act.name,
        description: def.displayProperties?.description || "",
        pgcrImage: def.pgcrImage ? `https://www.bungie.net${def.pgcrImage}` : null
      });
      console.log(`✔ ${act.referenceId} - ${def.displayProperties?.name}`);
    } catch (e) {
      const errorMsg = e.response?.data?.Message || e.message || String(e);
      results.push({
        mission: act.name,
        hash: String(act.referenceId),
        name: act.name,
        description: "",
        pgcrImage: null,
        log: `Erreur ou non trouvé dans le manifest Bungie API: ${errorMsg}`
      });
      console.warn(`⚠️  ${act.referenceId} - Erreur ou non trouvé: ${errorMsg}`);
      if (e.stack) console.error(e.stack);
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`✅ Fichier généré : ${outputPath}`);
}

main();
