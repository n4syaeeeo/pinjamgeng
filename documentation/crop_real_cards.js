const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');

const imgDir = path.join(__dirname, 'images');

// List of crops: { id, sourceFile, x, y, w, h }
const crops = [
  // Form 2 Page 1
  { id: 'real_card_uat_header', src: 'real_form2_page_1.png', x: 90, y: 45, w: 735, h: 355 },
  { id: 'real_card_role', src: 'real_form2_page_1.png', x: 90, y: 440, w: 735, h: 290 },
  
  // Form 1 Page 1 & 2
  { id: 'real_card_experience', src: 'real_uat_page_1.png', x: 90, y: 580, w: 735, h: 290 },
  { id: 'real_card_frequency', src: 'real_uat_page_2.png', x: 90, y: 40, w: 735, h: 320 },

  // Form 2 Page 2
  { id: 'real_card_navigation', src: 'real_form2_page_2.png', x: 90, y: 40, w: 735, h: 310 },
  { id: 'real_card_speed', src: 'real_form2_page_2.png', x: 90, y: 320, w: 735, h: 290 },
  { id: 'real_card_packages', src: 'real_form2_page_2.png', x: 90, y: 610, w: 735, h: 310 },

  // Form 2 Page 3
  { id: 'real_card_stock', src: 'real_form2_page_3.png', x: 90, y: 40, w: 735, h: 330 },
  { id: 'real_card_wizard', src: 'real_form2_page_3.png', x: 90, y: 370, w: 735, h: 290 },

  // Form 2 Page 4
  { id: 'real_card_slip', src: 'real_form2_page_4.png', x: 90, y: 40, w: 735, h: 345 },
  { id: 'real_card_return', src: 'real_form2_page_4.png', x: 90, y: 350, w: 735, h: 345 },
  { id: 'real_card_conflict', src: 'real_form2_page_4.png', x: 90, y: 660, w: 735, h: 295 },

  // Form 2 Page 5
  { id: 'real_card_features', src: 'real_form2_page_5.png', x: 90, y: 75, w: 735, h: 305 },
  { id: 'real_card_satisfaction', src: 'real_form2_page_5.png', x: 90, y: 380, w: 735, h: 330 },

  // Form 2 Page 6
  { id: 'real_card_feedback', src: 'real_form2_page_6.png', x: 90, y: 40, w: 735, h: 630 }
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
      console.log('Saved real crop:', id + '.png');
      res.writeHead(200); res.end('OK');
    });
  } else if (req.url === '/done') {
    res.writeHead(200); res.end('ALL_CROPPED');
    console.log('All crops saved! Closing server.');
    setTimeout(() => { server.close(); process.exit(0); }, 500);
  } else {
    res.writeHead(404); res.end();
  }
});

server.listen(8768, () => {
  const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chrome}" --headless --disable-gpu http://localhost:8768`);
});
