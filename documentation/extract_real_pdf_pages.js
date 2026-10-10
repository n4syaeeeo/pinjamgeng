const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const imgDir = path.join(__dirname, 'images');
const htmlContent = fs.readFileSync(path.join(__dirname, 'view_real_uat_pages.html'), 'utf8');

// Modify html to automatically POST each canvas dataURL to server once rendered
const injectedScript = `
<script>
  window.addEventListener('DOMContentLoaded', () => {
    const checkInterval = setInterval(() => {
      if (document.title === 'READY_DONE') {
        clearInterval(checkInterval);
        console.log('Sending pages to server...');
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach((c, idx) => {
          const dataUrl = c.toDataURL('image/png');
          fetch('/save-page', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: idx + 1, data: dataUrl })
          });
        });
        setTimeout(() => {
          fetch('/done');
        }, 3000);
      }
    }, 500);
  });
</script>
</body>`;

const modifiedHtml = htmlContent.replace('</body>', injectedScript);

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(modifiedHtml);
  } else if (req.url === '/save-page' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { page, data } = JSON.parse(body);
        const base64Image = data.replace(/^data:image\/png;base64,/, '');
        const filename = path.join(imgDir, 'real_uat_page_' + page + '.png');
        fs.writeFileSync(filename, base64Image, 'base64');
        console.log('Saved:', filename);
        res.writeHead(200);
        res.end('OK');
      } catch (e) {
        res.writeHead(500);
        res.end(e.message);
      }
    });
  } else if (req.url === '/done') {
    res.writeHead(200);
    res.end('ALL_DONE');
    console.log('Extraction complete! Closing server.');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1000);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8765, () => {
  console.log('Server running on http://localhost:8765');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chromePath}" --headless --disable-gpu http://localhost:8765`);
});
