const fs = require('fs');
const content = fs.readFileSync('PinjamGeng_UPTM_FCOM_Deck.html', 'utf8');

const regex = /<div class="slide[^"]*" id="([^"]+)">[\s\S]*?(?:<h2 class="slide-title">([^<]+)<\/h2>|<h1 class="main-title">([^<]+)<\/h1>)/g;
let match;
let i = 1;
while ((match = regex.exec(content)) !== null) {
  console.log(`DOM #${i++}: ID=${match[1]} | Title=${match[2] || match[3] || 'No title'}`);
}
