const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const p1 = 'C:/Users/User/.gemini/antigravity/brain/0ccc8140-6254-45ed-b426-936bb1d465ef/.user_uploaded/media_1791658999965_e784552b.pdf';
const p2 = 'C:/Users/User/.gemini/antigravity/brain/0ccc8140-6254-45ed-b426-936bb1d465ef/.user_uploaded/media_1791659000228_ba22c9ba.pdf';

const b1 = fs.readFileSync(p1).toString('base64');
const b2 = fs.readFileSync(p2).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
</head>
<body>
  <div id="out"></div>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    async function check(b64, name) {
      const raw = atob(b64);
      const uint8 = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);
      const pdf = await pdfjsLib.getDocument({ data: uint8 }).promise;
      const page = await pdf.getPage(1);
      const text = await page.getTextContent();
      const str = text.items.map(s => s.str).join(' ');
      return { name, numPages: pdf.numPages, str };
    }

    async function run() {
      const r1 = await check("${b1}", "p1");
      const r2 = await check("${b2}", "p2");
      document.getElementById('out').innerText = JSON.stringify({ r1, r2 });
      document.title = "CHECK_DONE";
    }
    run();
  </script>
</body>
</html>`;

fs.writeFileSync('check_pdfs.html', html, 'utf8');
console.log('Written check_pdfs.html');
