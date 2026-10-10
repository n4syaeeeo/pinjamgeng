const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const imgPath = path.join(__dirname, 'images', 'logbook_ref_page1.png');
const imgBase64 = fs.readFileSync(imgPath).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <canvas id="c"></canvas>
  <script>
    const img = new Image();
    img.src = "data:image/png;base64,${imgBase64}";
    img.onload = () => {
      // Find logo bounds in range y: 150..450, x: 450..1050
      // Let's create a temporary canvas to scan
      const scanC = document.createElement('canvas');
      scanC.width = img.width;
      scanC.height = img.height;
      const scanCtx = scanC.getContext('2d');
      scanCtx.drawImage(img, 0, 0);

      // Crop the logo region (approx x: 500..1000, y: 180..400)
      const cropX = 540;
      const cropY = 190;
      const cropW = 410;
      const cropH = 180;

      const c = document.getElementById('c');
      c.width = cropW;
      c.height = cropH;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

      const dataUrl = c.toDataURL('image/png');
      fetch('http://localhost:3890/save-logo', {
        method: 'POST',
        body: dataUrl
      }).then(() => fetch('http://localhost:3890/done'));
    };
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/save-logo') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const b64 = body.replace(/^data:image\/png;base64,/, '');
      const outPath = path.join(__dirname, 'images', 'uptm_logbook_logo.png');
      fs.writeFileSync(outPath, b64, 'base64');
      console.log('Saved logo to', outPath);
      res.writeHead(200);
      res.end('ok');
    });
  } else if (req.url === '/done') {
    res.writeHead(200);
    res.end('done');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 500);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
});

server.listen(3890, () => {
  console.log('Server on 3890, running chrome...');
  execSync(`"${chromePath}" --headless --disable-gpu "http://localhost:3890"`);
});
