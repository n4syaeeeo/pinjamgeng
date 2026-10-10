const fs = require('fs');
const content = fs.readFileSync('PinjamGeng_UPTM_FCOM_Deck.html', 'utf8');

// Find all occurrences of class="slide
const slides = content.split(/<div class="slide/g).slice(1);
console.log('Total slide divs:', slides.length);

slides.forEach((s, idx) => {
  const idMatch = s.match(/id="([^"]+)"/);
  const titleMatch = s.match(/<h2 class="slide-title">([\s\S]*?)<\/h2>/) || s.match(/<h1 class="main-title">([\s\S]*?)<\/h1>/) || s.match(/<h1>([\s\S]*?)<\/h1>/);
  const pillMatch = s.match(/<div class="slide-number-pill">(\d+)<\/div>/);
  
  const id = idMatch ? idMatch[1] : 'NONE';
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'NO TITLE';
  const pill = pillMatch ? pillMatch[1] : 'NO PILL';
  console.log(`Slide #${idx + 1}: ID=${id.padEnd(10)} | Pill=${pill.padEnd(5)} | Title=${title}`);
});
