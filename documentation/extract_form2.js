const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');

const pdf2 = fs.readFileSync('C:\\Users\\User\\.gemini\\antigravity\\brain\\0ccc8140-6254-45ed-b426-936bb1d465ef\\.user_uploaded\\media_1791137258169.pdf');
const b64 = pdf2.toString('base64');
const imgDir = path.join(__dirname, 'images');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
</head>
<body>
  <div id="container"></div>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    async function run() {
      const raw = atob("${b64}");
      const u8 = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) u8[i] = raw.charCodeAt(i);
      const pdf = await pdfjsLib.getDocument({ data: u8 }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const vp = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        const dataUrl = canvas.toDataURL('image/png');
        await fetch('/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: i, data: dataUrl })
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
  } else if (req.url === '/save' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      const { page, data } = JSON.parse(body);
      fs.writeFileSync(path.join(imgDir, 'real_form2_page_' + page + '.png'), data.replace(/^data:image\/png;base64,/, ''), 'base64');
      console.log('Saved real_form2_page_' + page + '.png');
      res.writeHead(200); res.end('OK');
    });
  } else if (req.url === '/done') {
    res.writeHead(200); res.end('DONE');
    console.log('Done Form 2 extraction!');
    setTimeout(() => { server.close(); process.exit(0); }, 500);
  }
});

server.listen(8767, () => {
  const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chrome}" --headless --disable-gpu http://localhost:8767`);
});
