// Script Node.js pour valider le JSON du fichier backend/activity
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'activity');

try {
  const data = fs.readFileSync(filePath, 'utf8');
  JSON.parse(data);
  console.log('✅ Le fichier activity est un JSON valide.');
} catch (e) {
  console.error('❌ Le fichier activity est invalide :', e.message);
  process.exit(1);
}
