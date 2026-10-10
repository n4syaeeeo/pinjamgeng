const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');

const imgDir = path.join(__dirname, 'images');

// HTML that detects card borders on the canvas and logs them
const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
<div id="output"></div>
<script>
  async function analyze(file) {
    const img = new Image();
    img.src = '/image/' + file;
    await new Promise(r => img.onload = r);
    
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imgData.data;

    // Scan vertical column at x = 120 (inside the card)
    // In Google Forms, the card border is grey (r, g, b around 210-230), outside margin is white (#ffffff), card inside is white
    // Border top/bottom lines have distinct grey pixels across x from 150 to 750
    const lines = [];
    for (let y = 10; y < img.height - 10; y++) {
      let greyCount = 0;
      for (let x = 150; x <= 750; x += 10) {
        const idx = (y * img.width + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        if (r > 190 && r < 240 && g > 190 && g < 240 && b > 190 && b < 240) {
          greyCount++;
        }
      }
      if (greyCount > 40) {
        lines.push(y);
      }
    }
    return { file, lines };
  }

  async function run() {
    const files = ['real_form2_page_1.png', 'real_form2_page_2.png', 'real_form2_page_3.png', 'real_form2_page_4.png', 'real_form2_page_5.png', 'real_form2_page_6.png', 'real_uat_page_1.png', 'real_uat_page_2.png'];
    const results = [];
    for (const f of files) {
      results.push(await analyze(f));
    }
    fetch('/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    });
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
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(fs.readFileSync(path.join(imgDir, filename)));
  } else if (req.url === '/results' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      console.log('Results:\n', JSON.stringify(JSON.parse(body), null, 2));
      res.writeHead(200); res.end('OK');
      setTimeout(() => { server.close(); process.exit(0); }, 500);
    });
  }
});

server.listen(8769, () => {
  const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chrome}" --headless --disable-gpu http://localhost:8769`);
});
