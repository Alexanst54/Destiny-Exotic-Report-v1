// Associe les missions de src/pages/Missions.jsx aux hash du manifest exotiques
// Usage : node backend/match_missions_to_hash.js

const fs = require('fs');


// Table de correspondance mission => mot-clé anglais (pour manifest anglais)
const missionKeywords = [
  { key: "dualdestiny", keywords: ["dual destiny", "derealization"] },
  { key: "encore", keywords: ["the encore", "encore"] },
  { key: "voxobscura", keywords: ["vox obscura"] },
  { key: "zerohour", keywords: ["zero hour"] },
  { key: "presage", keywords: ["presage"] },
  { key: "seraphshield", keywords: ["seraph's shield", "seraph shield"] },
  { key: "kellsfall", keywords: ["kell's fall", "kellsfall"] },
  { key: "starcrossed", keywords: ["starcrossed"] },
  { key: "whisper", keywords: ["the whisper", "whisper"] },
  { key: "harbinger", keywords: ["harbinger"] },
];

// Charge les exotiques extraits
const exotics = JSON.parse(fs.readFileSync('exotic_activities.json', 'utf-8'));

// Fonction de normalisation (enlève accents, met en minuscule, retire ponctuation)
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]/g, '');
}

missionKeywords.forEach(({ key, keywords }) => {
  const found = exotics.find(e =>
    keywords.some(kw => normalize(e.name).includes(normalize(kw)))
  );
  if (found) {
    console.log(`${key} => ${found.hash} (${found.name})`);
  } else {
    console.log(`${key} => NOT FOUND`);
  }
});
