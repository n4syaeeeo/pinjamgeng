const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');

const imgDir = path.join(__dirname, 'images');

const crops = [
  { id: 'real_card_header', src: 'real_form2_page_1.png', x: 95, y: 240, w: 725, h: 235 },
  { id: 'real_card_role', src: 'real_form2_page_1.png', x: 95, y: 474, w: 725, h: 398 },
  { id: 'real_card_experience', src: 'real_uat_page_1.png', x: 95, y: 695, w: 725, h: 345 },
  { id: 'real_card_frequency', src: 'real_uat_page_2.png', x: 95, y: 43, w: 725, h: 335 },
  { id: 'real_card_navigation', src: 'real_form2_page_2.png', x: 95, y: 43, w: 725, h: 343 },
  { id: 'real_card_speed', src: 'real_form2_page_2.png', x: 95, y: 386, w: 725, h: 345 },
  { id: 'real_card_packages', src: 'real_form2_page_2.png', x: 95, y: 731, w: 725, h: 344 },
  { id: 'real_card_stock', src: 'real_form2_page_3.png', x: 95, y: 43, w: 725, h: 342 },
  { id: 'real_card_wizard', src: 'real_form2_page_3.png', x: 95, y: 405, w: 725, h: 379 },
  { id: 'real_card_slip', src: 'real_form2_page_4.png', x: 95, y: 43, w: 725, h: 372 },
  { id: 'real_card_return', src: 'real_form2_page_4.png', x: 95, y: 415, w: 725, h: 371 },
  { id: 'real_card_conflict', src: 'real_form2_page_4.png', x: 95, y: 786, w: 725, h: 344 },
  { id: 'real_card_features', src: 'real_form2_page_5.png', x: 95, y: 80, w: 725, h: 379 },
  { id: 'real_card_satisfaction', src: 'real_form2_page_5.png', x: 95, y: 459, w: 725, h: 396 },
  { id: 'real_card_feedback', src: 'real_form2_page_6.png', x: 95, y: 43, w: 725, h: 709 }
];

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script>
  const crops = ${JSON.stringify(crops)};
  async function run() {
    for (const c of crops) {
      const img = new Image();
      img.src = '/image/' + c.src;
      await new Promise(r => img.onload = r);

      const canvas = document.createElement('canvas');
      canvas.width = c.w;
      canvas.height = c.h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);

      const dataUrl = canvas.toDataURL('image/png');
      await fetch('/save-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: c.id, data: dataUrl })
      });
    }
    await fetch('/done');
  }
  run();
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url.startsWith('/image/')) {
    const filename = req.url.replace('/image/', '');
    const filepath = path.join(imgDir, filename);
    if (fs.existsSync(filepath)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(fs.readFileSync(filepath));
    } else {
      res.writeHead(404); res.end();
    }
  } else if (req.url === '/save-crop' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { id, data } = JSON.parse(body);
      const base64Data = data.replace(/^data:image\/png;base64,/, '');
      const outPath = path.join(imgDir, id + '.png');
      fs.writeFileSync(outPath, base64Data, 'base64');
      console.log('Saved pixel-perfect crop:', id + '.png');
      res.writeHead(200); res.end('OK');
    });
  } else if (req.url === '/done') {
    res.writeHead(200); res.end('ALL_CROPPED');
    console.log('All crops finished! Closing server.');
    setTimeout(() => { server.close(); process.exit(0); }, 500);
  } else {
    res.writeHead(404); res.end();
  }
});

server.listen(8770, () => {
  const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chrome}" --headless --disable-gpu http://localhost:8770`);
});
