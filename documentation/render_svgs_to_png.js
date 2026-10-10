const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const imgDir = path.join(__dirname, 'images');

// 1. Create a helper HTML to render the logo in exact crisp resolution (1080x280)
const logoHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 0; background: transparent; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  img { width: 540px; height: 140px; display: block; }
</style>
</head>
<body>
  <img src="uptm_fcom_logo.svg">
</body>
</html>`;
fs.writeFileSync(path.join(imgDir, 'render_logo.html'), logoHtml);

// 2. Create helper HTML for cover bg (1920x1080)
const coverHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 0; background: #000; overflow: hidden; width: 1920px; height: 1080px; }
  img { width: 1920px; height: 1080px; display: block; }
</style>
</head>
<body>
  <img src="mauve_cover_bg.svg">
</body>
</html>`;
fs.writeFileSync(path.join(imgDir, 'render_cover.html'), coverHtml);

// 3. Create helper HTML for content bg (1920x1080)
const contentHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 0; background: #FAF7F8; overflow: hidden; width: 1920px; height: 1080px; }
  img { width: 1920px; height: 1080px; display: block; }
</style>
</head>
<body>
  <img src="mauve_content_bg.svg">
</body>
</html>`;
fs.writeFileSync(path.join(imgDir, 'render_content.html'), contentHtml);

console.log('Rendering SVGs to PNG via Chrome headless...');

try {
  // Render Logo PNG
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(imgDir, 'uptm_fcom_logo.png')}" --window-size=540,140 "file:///${path.join(imgDir, 'render_logo.html').replace(/\\\\/g, '/')}"`);
  console.log('Successfully rendered uptm_fcom_logo.png');

  // Render Cover BG PNG
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(imgDir, 'mauve_cover_bg.png')}" --window-size=1920,1080 "file:///${path.join(imgDir, 'render_cover.html').replace(/\\\\/g, '/')}"`);
  console.log('Successfully rendered mauve_cover_bg.png');

  // Render Content BG PNG
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(imgDir, 'mauve_content_bg.png')}" --window-size=1920,1080 "file:///${path.join(imgDir, 'render_content.html').replace(/\\\\/g, '/')}"`);
  console.log('Successfully rendered mauve_content_bg.png');

} catch (err) {
  console.error('Error during render:', err.message);
}
