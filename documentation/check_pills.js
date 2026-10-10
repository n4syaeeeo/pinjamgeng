const fs = require('fs');

function inspectPills(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log('=== Inspecting', filePath, '===');
  for (let i = 1; i <= 20; i++) {
    const slideStart = content.indexOf(`id="slide-${i}"`);
    if (slideStart === -1) {
      console.log(`Slide ${i}: NOT FOUND`);
      continue;
    }
    const nextSlideStart = i < 20 ? content.indexOf(`id="slide-${i + 1}"`) : content.length;
    const chunk = content.substring(slideStart, nextSlideStart);
    
    const titleMatch = chunk.match(/<h2 class="slide-title">([\s\S]*?)<\/h2>/) || chunk.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Title Slide / Closing';
    
    const pillMatch = chunk.match(/<div class="slide-number-pill">(\d+)<\/div>/);
    const pill = pillMatch ? pillMatch[1] : 'None';
    
    console.log(`Slide ${String(i).padStart(2)}: Pill = ${pill.padStart(4)} | Title: ${title}`);
  }
}

inspectPills('PinjamGeng_UPTM_FCOM_Deck.html');
