const fs = require('fs');

function setPillsAccurately(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  for (let i = 2; i <= 19; i++) {
    const slideId = `id="slide-${i}"`;
    const nextSlideId = i < 20 ? `id="slide-${i + 1}"` : '<!-- END -->';
    
    const startIdx = content.indexOf(slideId);
    if (startIdx === -1) continue;
    
    let endIdx = nextSlideId !== '<!-- END -->' ? content.indexOf(nextSlideId) : content.length;
    if (endIdx === -1) endIdx = content.length;

    let slideSub = content.substring(startIdx, endIdx);
    const expectedPill = i - 1;

    // Replace the pill inside slideSub
    slideSub = slideSub.replace(/<div class="slide-number-pill">\d+<\/div>/, `<div class="slide-number-pill">${expectedPill}</div>`);

    content = content.substring(0, startIdx) + slideSub + content.substring(endIdx);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Pills accurately normalized for ${filePath}`);
}

setPillsAccurately('PinjamGeng_UPTM_FCOM_Deck.html');
setPillsAccurately('PinjamGeng_UPTM_FCOM_Deck_EN.html');
