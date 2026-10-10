const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const imgDir = path.join(__dirname, 'images', 'survey_and_uat');
const cardOutDir = path.join(__dirname, 'images', 'survey_and_uat', 'cards');
if (!fs.existsSync(cardOutDir)) {
  fs.mkdirSync(cardOutDir, { recursive: true });
}

// Full list of precise card coordinates (width 960, left x 114)
const cardSpecs = [
  // === PRELIMINARY REQUIREMENTS SURVEY (42 RESPONSES) ===
  { id: 'prelim_header', page: 'prelim_survey_page_1.png', y: 70, h: 320 },
  { id: 'prelim_q1_role', page: 'prelim_survey_page_1.png', y: 430, h: 495 },
  { id: 'prelim_q2_experience', page: 'prelim_survey_page_1.png', y: 940, h: 485 },

  { id: 'prelim_q3_frequency', page: 'prelim_survey_page_2.png', y: 55, h: 460 },
  { id: 'prelim_q4_difficulties', page: 'prelim_survey_page_2.png', y: 580, h: 510 },
  { id: 'prelim_q5_clashes', page: 'prelim_survey_page_2.png', y: 1105, h: 465 },

  { id: 'prelim_q6_defects', page: 'prelim_survey_page_3.png', y: 55, h: 460 },
  { id: 'prelim_q7_turnaround', page: 'prelim_survey_page_3.png', y: 530, h: 460 },
  { id: 'prelim_q8_packages', page: 'prelim_survey_page_3.png', y: 1045, h: 495 },

  { id: 'prelim_q9_realtime_stock', page: 'prelim_survey_page_4.png', y: 55, h: 460 },
  { id: 'prelim_q10_return_desk', page: 'prelim_survey_page_4.png', y: 530, h: 460 },
  { id: 'prelim_q11_system_support', page: 'prelim_survey_page_4.png', y: 1010, h: 460 },

  { id: 'prelim_q12_open_feedback', page: 'prelim_survey_page_5.png', y: 55, h: 1350 },

  // === USER ACCEPTANCE TESTING (UAT) SURVEY (32 RESPONSES) ===
  { id: 'uat_header', page: 'uat_page_1.png', y: 70, h: 250 },
  { id: 'uat_q1_participant_role', page: 'uat_page_1.png', y: 630, h: 530 },

  { id: 'uat_q2_ease_navigation', page: 'uat_page_2.png', y: 55, h: 450 },
  { id: 'uat_q3_faster_reservation', page: 'uat_page_2.png', y: 515, h: 460 },
  { id: 'uat_q4_smart_packages', page: 'uat_page_2.png', y: 985, h: 470 },

  { id: 'uat_q5_stock_visibility', page: 'uat_page_3.png', y: 55, h: 460 },
  { id: 'uat_q6_booking_wizard', page: 'uat_page_3.png', y: 575, h: 460 },
  { id: 'uat_q7_loan_slip', page: 'uat_page_3.png', y: 1045, h: 500 },

  { id: 'uat_q8_return_inspection', page: 'uat_page_4.png', y: 55, h: 500 },
  { id: 'uat_q9_conflict_check', page: 'uat_page_4.png', y: 565, h: 460 },
  { id: 'uat_q10_valuable_features', page: 'uat_page_4.png', y: 1035, h: 540 },

  { id: 'uat_q11_overall_rating', page: 'uat_page_5.png', y: 55, h: 520 },
  { id: 'uat_q12_open_feedback', page: 'uat_page_5.png', y: 585, h: 960 },
];

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <div id="status">Loading...</div>
  <script>
    const specs = ${JSON.stringify(cardSpecs)};

    async function run() {
      // Cache loaded images
      const imgCache = {};
      const uniquePages = [...new Set(specs.map(s => s.page))];
      for (const p of uniquePages) {
        const img = new Image();
        img.src = '/image/' + p;
        await new Promise(r => img.onload = r);
        imgCache[p] = img;
      }

      const cardX = 114;
      const cardW = 960;

      for (const s of specs) {
        const img = imgCache[s.page];
        const canvas = document.createElement('canvas');
        canvas.width = cardW;
        canvas.height = s.h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, cardX, s.y, cardW, s.h, 0, 0, cardW, s.h);

        const dataUrl = canvas.toDataURL('image/png');
        await fetch('/save-named-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: s.id, data: dataUrl })
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
    const filePath = path.join(imgDir, filename);
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  } else if (req.url === '/save-named-card' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { id, data } = JSON.parse(body);
        const base64Data = data.replace(/^data:image\/png;base64,/, '');
        const targetPath = path.join(cardOutDir, id + '.png');
        fs.writeFileSync(targetPath, base64Data, 'base64');
        console.log('Saved named card:', id + '.png');
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
    console.log('All named cards cropped successfully!');
    setTimeout(() => {
      server.close();
      process.exit(0);
    }, 1500);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(9878, () => {
  console.log('Server running on http://localhost:9878');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  exec(`"${chromePath}" --headless --disable-gpu http://localhost:9878`);
});
