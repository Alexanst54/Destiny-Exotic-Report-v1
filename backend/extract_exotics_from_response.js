// Extraction des missions exotiques à partir d'un manifest DestinyActivityDefinition local (ex: response.json)
// Usage : node backend/extract_exotics_from_response.js

const fs = require('fs');

const manifestPath = 'response.json';
const outputPath = 'exotic_activities.json';

const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));


// Table de mots-clés anglais pour chaque mission (doit matcher le manifest anglais)
const missionKeywords = [
  ["dualdestiny", ["dual destiny", "derealization", "derealize"]],
  ["encore", ["the encore", "encore"]],
  ["voxobscura", ["vox obscura"]],
  ["zerohour", ["zero hour"]],
  ["presage", ["presage"]],
  ["seraphshield", ["seraph's shield", "seraph shield"]],
  ["kellsfall", ["kell's fall", "kellsfall"]],
  ["starcrossed", ["starcrossed"]],
  ["whisper", ["the whisper", "whisper"]],
  ["harbinger", ["harbinger"]],
];

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]/g, '');
}

const exotics = [];
for (const [mission, keywords] of missionKeywords) {
  const found = Object.entries(data).find(([hash, def]) => {
    const name = def.displayProperties && def.displayProperties.name ? def.displayProperties.name : '';
    return keywords.some(kw => normalize(name).includes(normalize(kw)));
  });
  if (found) {
    const [hash, def] = found;
    exotics.push({
      mission,
      hash,
      name: def.displayProperties?.name || '',
      description: def.displayProperties?.description || '',
      pgcrImage: def.pgcrImage || null
    });
  }
}

fs.writeFileSync(outputPath, JSON.stringify(exotics, null, 2));
console.log(`Extraits exotiques dans ${outputPath} (${exotics.length} résultats)`);
