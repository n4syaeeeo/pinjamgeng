const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const imgDir = path.join(__dirname, 'images', 'survey_and_uat');
const cardOutDir = path.join(__dirname, 'images', 'survey_and_uat', 'cards');
if (!fs.existsSync(cardOutDir)) {
  fs.mkdirSync(cardOutDir, { recursive: true });
}

// HTML to detect cards and crop them
const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <div id="status">Loading...</div>
  <script>
    async function loadImg(src) {
      const img = new Image();
      img.src = '/image/' + src;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      return img;
    }

    // Function to find horizontal card boxes by scanning background color differences
    function findCards(ctx, width, height) {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // In Google Forms, the page has outer grey margins or white background, but the cards have a distinct border.
      // Card left border is around x = 115..135, right border around x = 1050..1080
      // Let's find horizontal border lines where grey border pixels exist across x = 200..1000
      const borderRows = [];
      for (let y = 30; y < height - 30; y++) {
        let borderCount = 0;
        for (let x = 300; x <= 900; x += 20) {
          const idx = (y * width + x) * 4;
          const r = data[idx], g = data[idx+1], b = data[idx+2];
          // Border in Google Forms is typically light grey (#dadce0 or similar rgb 210-225)
          if (r >= 200 && r <= 235 && g >= 200 && g <= 235 && b >= 200 && b <= 235) {
            borderCount++;
          }
        }
        if (borderCount >= 25) { // At least 25 out of 31 samples match grey border
          borderRows.push(y);
        }
      }

      // Group consecutive rows
      const groupedLines = [];
      let currentGroup = [];
      for (let i = 0; i < borderRows.length; i++) {
        if (currentGroup.length === 0 || borderRows[i] === currentGroup[currentGroup.length - 1] + 1) {
          currentGroup.push(borderRows[i]);
        } else {
          groupedLines.push(Math.round(currentGroup.reduce((a,b)=>a+b,0) / currentGroup.length));
          currentGroup = [borderRows[i]];
        }
      }
      if (currentGroup.length > 0) {
        groupedLines.push(Math.round(currentGroup.reduce((a,b)=>a+b,0) / currentGroup.length));
      }

      // Pair top and bottom borders (distance between top and bottom must be at least 100px)
      const cards = [];
      for (let i = 0; i < groupedLines.length - 1; i++) {
        const top = groupedLines[i];
        const bottom = groupedLines[i+1];
        if (bottom - top >= 120) {
          // Verify it's a card by checking interior is white/near white
          cards.push({ y: top - 2, h: bottom - top + 4 });
          i++; // skip bottom border as next top
        }
      }
      return cards;
    }

    async function cropPage(srcFile, prefix) {
      const img = await loadImg(srcFile);
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Card horizontal bounds in standard 2x Google Form A4:
      // Left border is at ~115px, Width is ~960px
      // Let's refine card left & right
      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;

      // Find card X bounds
      let cardX = 114;
      let cardW = 960;

      // Detect cards on page
      let cards = findCards(ctx, img.width, img.height);
      console.log(srcFile, 'detected cards:', cards.length, cards);

      // If detection found nothing or only 1 when there should be more, use fallback slices
      if (cards.length === 0) {
        // Fallback for full page content
        cards = [{ y: 50, h: img.height - 100 }];
      }

      for (let idx = 0; idx < cards.length; idx++) {
        const c = cards[idx];
        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cardW;
        cropCanvas.height = c.h;
        const cropCtx = cropCanvas.getContext('2d');
        cropCtx.drawImage(img, cardX, c.y, cardW, c.h, 0, 0, cardW, c.h);

        const dataUrl = cropCanvas.toDataURL('image/png');
        await fetch('/save-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: prefix + '_card_' + (idx + 1) + '.png', data: dataUrl, bounds: { x: cardX, y: c.y, w: cardW, h: c.h } })
        });
      }
    }

    async function run() {
      // 1. Prelim Survey (6 pages)
      for (let p = 1; p <= 5; p++) {
        await cropPage('prelim_survey_page_' + p + '.png', 'prelim_p' + p);
      }
      // 2. UAT Survey (7 pages)
      for (let p = 1; p <= 5; p++) {
        await cropPage('uat_page_' + p + '.png', 'uat_p' + p);
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
    const filePath = path.join(imgDir, filename);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } else if (req.url === '/save-card' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, data, bounds } = JSON.parse(body);
        const base64Data = data.replace(/^data:image\/png;base64,/, '');
        const targetPath = path.join(cardOutDir, name);
        fs.writeFileSync(targetPath, base64Data, 'base64');
        console.log('Saved card:', name, bounds);
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
    console.log('All cards cropped successfully!');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1500);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9877, () => {
  console.log('Server running on http://localhost:9877');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chromePath}" --headless --disable-gpu http://localhost:9877`);
});
