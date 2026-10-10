const fs = require('fs');
const content = fs.readFileSync('PinjamGeng_UPTM_FCOM_Deck.html', 'utf8');
const ids = content.match(/id="slide-\d+"/g);
console.log('Total slides:', ids ? ids.length : 0);
console.log('Slide IDs:', ids);
