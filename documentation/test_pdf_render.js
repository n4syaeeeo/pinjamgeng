const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const uatPdf = fs.readFileSync('C:\\Users\\User\\.gemini\\antigravity\\brain\\0ccc8140-6254-45ed-b426-936bb1d465ef\\.user_uploaded\\media_1791137267220.pdf');
const base64Data = uatPdf.toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    body { margin: 0; padding: 20px; background: #e5e7eb; font-family: sans-serif; }
    .page-card { margin-bottom: 30px; background: #fff; padding: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; }
    canvas { display: block; max-width: 100%; height: auto; }
  </style>
</head>
<body>
  <h2 id="status">Loading PDF pages...</h2>
  <div id="container"></div>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    async function loadPdf() {
      try {
        const raw = atob("${base64Data}");
        const uint8 = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) uint8[i] = raw.charCodeAt(i);

        const pdf = await pdfjsLib.getDocument({ data: uint8 }).promise;
        console.log('PDF loaded, numPages:', pdf.numPages);
        
        const container = document.getElementById('container');
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          
          const card = document.createElement('div');
          card.className = 'page-card';
          card.innerHTML = '<h3>Page ' + i + '</h3>';
          
          const canvas = document.createElement('canvas');
          canvas.id = 'page-' + i;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          card.appendChild(canvas);
          container.appendChild(card);
          
          const ctx = canvas.getContext('2d');
          await page.render({ canvasContext: ctx, viewport }).promise;
        }
        document.getElementById('status').innerText = 'LOADED ALL ' + pdf.numPages + ' PAGES';
        document.title = 'READY_DONE';
      } catch (e) {
        document.getElementById('status').innerText = 'ERROR: ' + e.message;
      }
    }
    loadPdf();
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'view_real_uat_pages.html'), html);
console.log('Created view_real_uat_pages.html with base64 PDF embedded!');
