const fs = require('fs');

function fixDeck(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Let's find each top-level slide div
  // A slide starts with <div class="slide
  // We can match them in order
  const slideRegex = /(<div class="slide\b[^>]*)(id="slide-\d+")([^>]*>)/g;
  
  // First, replace all id="slide-X" with a placeholder in order
  let index = 1;
  content = content.replace(slideRegex, (match, prefix, idAttr, suffix) => {
    return `${prefix}id="TEMP_SLIDE_${index++}"${suffix}`;
  });

  // Now replace TEMP_SLIDE_X with id="slide-X"
  content = content.replace(/id="TEMP_SLIDE_(\d+)"/g, 'id="slide-$1"');

  // Now verify each slide's number pill:
  // Slide 1 has no pill (cover)
  // Slide 2 has pill 1
  // Slide 3 has pill 2
  // ...
  // Slide 19 has pill 18
  // Slide 20 has no pill (Q&A)

  // Also verify totalSlides
  content = content.replace(/const totalSlides = \d+;/, 'const totalSlides = 20;');
  content = content.replace(/Slide 1 \/ \d+/, 'Slide 1 / 20');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated IDs in ${filePath}`);
}

fixDeck('PinjamGeng_UPTM_FCOM_Deck.html');
fixDeck('PinjamGeng_UPTM_FCOM_Deck_EN.html');
