const fs = require('fs');
const path = require('path');
const http = require('http');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pdfPath = 'C:/Users/User/.gemini/antigravity/brain/0ccc8140-6254-45ed-b426-936bb1d465ef/.user_uploaded/media_1791667348088_e2324985.pdf';
const pdfBase64 = fs.readFileSync(pdfPath).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    body { margin: 0; padding: 0; background: #fff; }
    canvas { display: block; }
  </style>
</head>
<body>
  <div id="container"></div>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    async function run() {
      const raw = atob("${pdfBase64}");
      const uint8 = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);

      const pdf = await pdfjsLib.getDocument({ data: uint8 }).promise;
      console.log('PDF pages:', pdf.numPages);

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.5 }); // High resolution
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/png');
        await fetch('http://localhost:3888/save?p=' + i, {
          method: 'POST',
          body: dataUrl
        });
      }

      await fetch('http://localhost:3888/done');
    }
    run();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/save')) {
    const pageNum = req.url.split('p=')[1];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const base64Data = body.replace(/^data:image\/png;base64,/, '');
      const outPath = path.join(__dirname, 'images', `logbook_ref_page${pageNum}.png`);
      fs.writeFileSync(outPath, base64Data, 'base64');
      console.log(`Saved page ${pageNum} to ${outPath}`);
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

server.listen(3888, () => {
  console.log('Server listening on 3888, launching chrome...');
  const cmd = `"${chromePath}" --headless --disable-gpu "http://localhost:3888"`;
  try {
    execSync(cmd, { timeout: 15000 });
  } catch (e) {
    console.log('Chrome executed');
  }
});
