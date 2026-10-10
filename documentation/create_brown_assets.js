const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.join(__dirname, 'images');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

// 1. Cover / Closing Slide Warm Aesthetic Brown Background with Doodle Art (1920x1080)
const brownCoverBgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="brownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6F482F"/>
      <stop offset="45%" stop-color="#55351E"/>
      <stop offset="100%" stop-color="#3A2111"/>
    </linearGradient>
  </defs>
  
  <!-- Base Warm Mocha / Coffee Background -->
  <rect width="1920" height="1080" fill="url(#brownGrad)"/>

  <!-- Playful abstract wavy lines & doodles in warm soft cream opacity -->
  <g stroke="#FAF0E6" fill="none" stroke-linecap="round" opacity="0.16">
    <!-- Top-left wavy squiggles -->
    <path d="M-50,200 C150,150 200,350 400,280 C600,210 650,450 850,380" stroke-width="6"/>
    <path d="M-80,260 C120,210 170,410 370,340 C570,270 620,510 820,440" stroke-width="4" stroke-dasharray="16,14"/>
    
    <!-- Top-right wavy loops -->
    <path d="M1200,-50 C1350,150 1500,80 1650,250 C1800,420 1950,300 2050,450" stroke-width="7"/>
    <path d="M1150,40 C1300,240 1450,170 1600,340 C1750,510 1900,390 2000,540" stroke-width="4"/>
    <path d="M1720,50 L1720,220 M1740,70 L1740,240 M1760,90 L1760,260" stroke-width="4" stroke-dasharray="12,12"/>

    <!-- Bottom-left wavy fingerprints -->
    <path d="M100,750 C250,600 450,700 350,900 C250,1100 500,1150 650,1000" stroke-width="6"/>
    <path d="M180,780 C310,650 480,740 400,900 C320,1060 520,1100 640,990" stroke-width="4"/>
    <path d="M-40,880 C80,820 160,950 280,900 C400,850 480,980 600,930" stroke-width="5"/>

    <!-- Bottom-right abstract loops -->
    <path d="M1300,800 C1450,650 1650,750 1550,950 C1450,1150 1700,1200 1850,1050" stroke-width="7"/>
    <path d="M1380,830 C1510,700 1680,790 1600,950 C1520,1110 1720,1150 1840,1040" stroke-width="4" stroke-dasharray="20,16"/>
    <path d="M1100,1000 C1300,900 1500,1050 1700,950" stroke-width="5"/>

    <!-- Center ambient waves -->
    <path d="M400,450 C600,350 800,600 1000,500 C1200,400 1400,650 1600,550" stroke-width="5" opacity="0.12"/>
    <path d="M500,580 C700,480 900,730 1100,630 C1300,530 1500,780 1700,680" stroke-width="4" opacity="0.10"/>
  </g>

  <!-- Sparkles & 4-point stars in warm ivory -->
  <g fill="#FFFDF8" opacity="0.32">
    <!-- Star 1 -->
    <path d="M250,140 Q250,160 270,160 Q250,160 250,180 Q250,160 230,160 Q250,160 250,140 Z"/>
    <!-- Star 2 -->
    <path d="M1650,160 Q1650,185 1675,185 Q1650,185 1650,210 Q1650,185 1625,185 Q1650,185 1650,160 Z"/>
    <!-- Star 3 -->
    <path d="M320,950 Q320,970 340,970 Q320,970 320,990 Q320,970 300,970 Q320,970 320,950 Z"/>
    <!-- Star 4 -->
    <path d="M1520,880 Q1520,900 1540,900 Q1520,900 1520,920 Q1520,900 1500,900 Q1520,900 1520,880 Z"/>
    <!-- Little dot accents -->
    <circle cx="210" cy="220" r="3"/>
    <circle cx="1720" cy="220" r="4"/>
    <circle cx="1600" cy="820" r="3.5"/>
    <circle cx="420" cy="880" r="3"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'brown_cover_bg.svg'), brownCoverBgSvg);
console.log('Created brown_cover_bg.svg');

// 2. Content Slide Off-White Linen Background with Faint Warm Brown Doodles (1920x1080)
const brownContentBgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <!-- Clean Warm Linen / Subtle Soft Cream -->
  <rect width="1920" height="1080" fill="#FAF7F2"/>

  <!-- Ultra-subtle faint watermark wavy doodles (opacity 0.05) -->
  <g stroke="#6F482F" fill="none" stroke-linecap="round" opacity="0.05">
    <path d="M-50,200 C150,150 200,350 400,280 C600,210 650,450 850,380" stroke-width="7"/>
    <path d="M1200,-50 C1350,150 1500,80 1650,250 C1800,420 1950,300 2050,450" stroke-width="8"/>
    <path d="M100,750 C250,600 450,700 350,900 C250,1100 500,1150 650,1000" stroke-width="7"/>
    <path d="M1300,800 C1450,650 1650,750 1550,950 C1450,1150 1700,1200 1850,1050" stroke-width="8"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'brown_content_bg.svg'), brownContentBgSvg);
console.log('Created brown_content_bg.svg');

// 3. Render HTML Helpers
const renderCoverHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 0; background: #3A2111; overflow: hidden; width: 1920px; height: 1080px; }
  img { width: 1920px; height: 1080px; display: block; }
</style>
</head>
<body>
  <img src="brown_cover_bg.svg">
</body>
</html>`;
fs.writeFileSync(path.join(imgDir, 'render_brown_cover.html'), renderCoverHtml);

const renderContentHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 0; background: #FAF7F2; overflow: hidden; width: 1920px; height: 1080px; }
  img { width: 1920px; height: 1080px; display: block; }
</style>
</head>
<body>
  <img src="brown_content_bg.svg">
</body>
</html>`;
fs.writeFileSync(path.join(imgDir, 'render_brown_content.html'), renderContentHtml);

// 4. Render to PNG using Chrome Headless
console.log('Rendering brown background PNGs via Chrome headless...');
try {
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(imgDir, 'brown_cover_bg.png')}" --window-size=1920,1080 "file:///${path.join(imgDir, 'render_brown_cover.html').replace(/\\\\/g, '/')}"`);
  console.log('Successfully rendered brown_cover_bg.png');

  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(imgDir, 'brown_content_bg.png')}" --window-size=1920,1080 "file:///${path.join(imgDir, 'render_brown_content.html').replace(/\\\\/g, '/')}"`);
  console.log('Successfully rendered brown_content_bg.png');
} catch (err) {
  console.error('Error rendering PNGs:', err.message);
}
