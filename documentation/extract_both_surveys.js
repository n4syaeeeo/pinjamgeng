const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outDir = path.join(__dirname, 'images', 'survey_and_uat');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const p1 = 'C:/Users/User/.gemini/antigravity/brain/0ccc8140-6254-45ed-b426-936bb1d465ef/.user_uploaded/media_1791658999965_e784552b.pdf';
const p2 = 'C:/Users/User/.gemini/antigravity/brain/0ccc8140-6254-45ed-b426-936bb1d465ef/.user_uploaded/media_1791659000228_ba22c9ba.pdf';

const b1 = fs.readFileSync(p1).toString('base64');
const b2 = fs.readFileSync(p2).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    body { margin: 0; padding: 20px; background: #e5e7eb; font-family: sans-serif; }
    canvas { display: block; margin-bottom: 20px; background: #fff; }
  </style>
</head>
<body>
  <h2 id="status">Starting extraction...</h2>
  <div id="container"></div>

  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    async function renderAndUploadPdf(b64, prefix) {
      const raw = atob(b64);
      const uint8 = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);
      const pdf = await pdfjsLib.getDocument({ data: uint8 }).promise;

      // Determine title from page 1 text
      const page1 = await pdf.getPage(1);
      const textObj = await page1.getTextContent();
      const str1 = textObj.items.map(s => s.str).join(' ');
      const isUAT = str1.includes('User Acceptance Testing') || str1.includes('UAT');
      const docType = isUAT ? 'uat' : 'prelim_survey';
      console.log('Doc prefix:', prefix, 'identified as:', docType, 'pages:', pdf.numPages);

      for (let i = 1; i <= pdf.numPages; i++) {
        document.getElementById('status').innerText = 'Rendering ' + docType + ' page ' + i + '...';
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High resolution 2x
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;

        const dataUrl = canvas.toDataURL('image/png');
        await fetch('/save-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: docType + '_page_' + i + '.png', data: dataUrl })
        });
      }
    }

    async function runAll() {
      try {
        await renderAndUploadPdf("${b1}", "doc1");
        await renderAndUploadPdf("${b2}", "doc2");
        document.getElementById('status').innerText = 'ALL DONE!';
        document.title = 'READY_DONE';
        await fetch('/done');
      } catch (e) {
        document.getElementById('status').innerText = 'ERROR: ' + e.message;
        console.error(e);
      }
    }

    runAll();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.url === '/save-page' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { filename, data } = JSON.parse(body);
        const base64Image = data.replace(/^data:image\/png;base64,/, '');
        const targetPath = path.join(outDir, filename);
        fs.writeFileSync(targetPath, base64Image, 'base64');
        console.log('Successfully saved:', targetPath);
        res.writeHead(200);
        res.end('OK');
      } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end(e.message);
      }
    });
  } else if (req.url === '/done') {
    res.writeHead(200);
    res.end('DONE');
    console.log('All PDF pages extracted successfully!');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1500);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9876, () => {
  console.log('Extract server listening at http://localhost:9876');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chromePath}" --headless --disable-gpu http://localhost:9876`);
});
