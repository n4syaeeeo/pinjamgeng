const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.join(__dirname, 'images');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

const chromeExe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Rendering publication-quality B&W diagrams and charts to PNG...');

// 1. Admin Flowchart HTML
const adminFlowHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { margin: 0; padding: 20px; background: #ffffff; font-family: Arial, sans-serif; display: flex; justify-content: center; }
  .frame { width: 740px; height: 980px; border: 1.5px solid #000; padding: 25px 20px; box-sizing: border-box; background: #fff; position: relative; }
  .header-text { font-size: 13px; font-weight: bold; margin-bottom: 15px; }
  svg { width: 100%; height: 900px; }
</style>
</head>
<body>
  <div class="frame">
    <div class="header-text">Admin flowchart:</div>
    <svg viewBox="0 0 700 900">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
        </marker>
      </defs>
      <style>
        text { font-family: Arial, sans-serif; font-size: 10.5px; fill: #000; text-anchor: middle; }
        .label { font-size: 10px; font-weight: bold; }
        rect, polygon, ellipse, circle { stroke: #000; stroke-width: 1.5; fill: #fff; }
        line, path { stroke: #000; stroke-width: 1.4; fill: none; }
      </style>

      <!-- START -->
      <ellipse cx="350" cy="30" rx="45" ry="18" />
      <text x="350" y="34" class="label">START</text>
      <line x1="350" y1="48" x2="350" y2="75" marker-end="url(#arrow)" />

      <!-- Login -->
      <rect x="290" y="75" width="120" height="35" rx="3" />
      <text x="350" y="96">Login</text>
      <line x1="350" y1="110" x2="350" y2="135" marker-end="url(#arrow)" />

      <!-- Verify user? -->
      <polygon points="350,135 420,165 350,195 280,165" />
      <text x="350" y="169">Verify user?</text>

      <!-- No -> Register / Error -->
      <line x1="420" y1="165" x2="500" y2="165" marker-end="url(#arrow)" />
      <text x="445" y="158">No</text>
      <polygon points="515,145 635,145 615,185 495,185" />
      <text x="565" y="169">Invalid Account / Error</text>
      <line x1="565" y1="145" x2="565" y2="92" />
      <line x1="565" y1="92" x2="410" y2="92" marker-end="url(#arrow)" />

      <!-- Yes -> Successfully log in -->
      <line x1="350" y1="195" x2="350" y2="230" marker-end="url(#arrow)" />
      <text x="365" y="212">Yes</text>
      <polygon points="295,230 425,230 405,265 275,265" />
      <text x="350" y="252">Successfully log in</text>
      <line x1="350" y1="265" x2="350" y2="300" marker-end="url(#arrow)" />

      <!-- Choose activity -->
      <polygon points="350,300 430,335 350,370 270,335" />
      <text x="350" y="339">Choose activity</text>

      <!-- Activity bus lines -->
      <line x1="350" y1="370" x2="350" y2="395" />
      <line x1="90" y1="395" x2="610" y2="395" />

      <!-- Branch 1: Manage Bookings -->
      <line x1="90" y1="395" x2="90" y2="420" marker-end="url(#arrow)" />
      <polygon points="40,420 150,420 135,455 25,455" />
      <text x="88" y="442">Manage Bookings</text>
      <line x1="90" y1="455" x2="90" y2="480" marker-end="url(#arrow)" />
      <rect x="25" y="480" width="130" height="32" rx="3" />
      <text x="90" y="500">Review Booking Details</text>
      <line x1="90" y1="512" x2="90" y2="538" marker-end="url(#arrow)" />
      <polygon points="90,538 145,562 90,586 35,562" />
      <text x="90" y="566">Approve?</text>
      <line x1="90" y1="586" x2="90" y2="615" marker-end="url(#arrow)" />
      <text x="105" y="602">Yes</text>
      <rect x="25" y="615" width="130" height="32" rx="3" />
      <text x="90" y="635">Allocate Stock &amp; Slip</text>
      <!-- No branch -->
      <line x1="35" y1="562" x2="10" y2="562" />
      <line x1="10" y1="562" x2="10" y2="665" />
      <line x1="10" y1="665" x2="90" y2="665" />
      <text x="22" y="555">No</text>
      <line x1="90" y1="647" x2="90" y2="725" />

      <!-- Branch 2: Equipment & Packages -->
      <line x1="260" y1="395" x2="260" y2="420" marker-end="url(#arrow)" />
      <polygon points="205,420 325,420 310,455 190,455" />
      <text x="258" y="442">Inventory &amp; Packages</text>
      <line x1="260" y1="455" x2="260" y2="480" marker-end="url(#arrow)" />
      <rect x="195" y="480" width="130" height="32" rx="3" />
      <text x="260" y="500">Add / Edit Equipment</text>
      <line x1="260" y1="512" x2="260" y2="542" marker-end="url(#arrow)" />
      <rect x="195" y="542" width="130" height="32" rx="3" />
      <text x="260" y="562">Manage Package Bundles</text>
      <line x1="260" y1="574" x2="260" y2="604" marker-end="url(#arrow)" />
      <rect x="195" y="604" width="130" height="32" rx="3" />
      <text x="260" y="624">CRUD Categories &amp; Items</text>
      <line x1="260" y1="636" x2="260" y2="725" />

      <!-- Branch 3: Return Desk & Inspection -->
      <line x1="435" y1="395" x2="435" y2="420" marker-end="url(#arrow)" />
      <polygon points="380,420 500,420 485,455 365,455" />
      <text x="433" y="442">Return Inspection</text>
      <line x1="435" y1="455" x2="435" y2="480" marker-end="url(#arrow)" />
      <rect x="370" y="480" width="130" height="32" rx="3" />
      <text x="435" y="500">Inspect Item Condition</text>
      <line x1="435" y1="512" x2="435" y2="538" marker-end="url(#arrow)" />
      <polygon points="435,538 490,562 435,586 380,562" />
      <text x="435" y="566">Damaged?</text>
      <line x1="435" y1="586" x2="435" y2="615" marker-end="url(#arrow)" />
      <text x="450" y="602">Yes</text>
      <rect x="370" y="615" width="130" height="32" rx="3" />
      <text x="435" y="635">Log Maintenance Ticket</text>
      <!-- No branch -->
      <line x1="490" y1="562" x2="515" y2="562" />
      <line x1="515" y1="562" x2="515" y2="665" />
      <line x1="515" y1="665" x2="435" y2="665" />
      <text x="502" y="555">No</text>
      <line x1="435" y1="647" x2="435" y2="675" marker-end="url(#arrow)" />
      <rect x="370" y="675" width="130" height="32" rx="3" />
      <text x="435" y="695">Restock &amp; Mark Returned</text>
      <line x1="435" y1="707" x2="435" y2="725" />

      <!-- Branch 4: View Reports -->
      <line x1="610" y1="395" x2="610" y2="420" marker-end="url(#arrow)" />
      <polygon points="560,420 670,420 655,455 545,455" />
      <text x="608" y="442">View Reports</text>
      <line x1="610" y1="455" x2="610" y2="480" marker-end="url(#arrow)" />
      <rect x="545" y="480" width="130" height="32" rx="3" />
      <text x="610" y="500">Utilization &amp; Stock Report</text>
      <line x1="610" y1="512" x2="610" y2="538" marker-end="url(#arrow)" />
      <polygon points="610,538 660,562 610,586 560,562" />
      <text x="610" y="566">Print?</text>
      <line x1="610" y1="586" x2="610" y2="615" marker-end="url(#arrow)" />
      <text x="625" y="602">Yes</text>
      <rect x="545" y="615" width="130" height="32" rx="3" />
      <text x="610" y="635">Print or Export CSV</text>
      <line x1="560" y1="562" x2="535" y2="562" />
      <line x1="535" y1="562" x2="535" y2="665" />
      <line x1="535" y1="665" x2="610" y2="665" />
      <text x="546" y="555">No</text>
      <line x1="610" y1="647" x2="610" y2="725" />

      <!-- Convergence -->
      <line x1="90" y1="725" x2="610" y2="725" />
      <line x1="350" y1="725" x2="350" y2="755" marker-end="url(#arrow)" />
      <circle cx="350" cy="762" r="7" />
      <line x1="350" y1="769" x2="350" y2="795" marker-end="url(#arrow)" />

      <!-- Logout? -->
      <polygon points="350,795 415,822 350,849 285,822" />
      <text x="350" y="826">Logout?</text>

      <!-- Logout No -->
      <line x1="285" y1="822" x2="15" y2="822" />
      <line x1="15" y1="822" x2="15" y2="335" />
      <line x1="15" y1="335" x2="270" y2="335" marker-end="url(#arrow)" />
      <text x="145" y="815">No</text>

      <!-- Logout Yes -->
      <line x1="350" y1="849" x2="350" y2="875" marker-end="url(#arrow)" />
      <text x="365" y="863">Yes</text>
      <ellipse cx="350" cy="888" rx="40" ry="16" />
      <text x="350" y="892" class="label">END</text>
    </svg>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(imgDir, 'admin_flow.html'), adminFlowHtml, 'utf8');

// 2. Student Flowchart HTML
const studentFlowHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { margin: 0; padding: 20px; background: #ffffff; font-family: Arial, sans-serif; display: flex; justify-content: center; }
  .frame { width: 740px; height: 980px; border: 1.5px solid #000; padding: 25px 20px; box-sizing: border-box; background: #fff; position: relative; }
  .header-text { font-size: 13px; font-weight: bold; margin-bottom: 15px; }
  svg { width: 100%; height: 900px; }
</style>
</head>
<body>
  <div class="frame">
    <div class="header-text">Student Borrower flowchart:</div>
    <svg viewBox="0 0 700 900">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
        </marker>
      </defs>
      <style>
        text { font-family: Arial, sans-serif; font-size: 10.5px; fill: #000; text-anchor: middle; }
        .label { font-size: 10px; font-weight: bold; }
        rect, polygon, ellipse, circle { stroke: #000; stroke-width: 1.5; fill: #fff; }
        line, path { stroke: #000; stroke-width: 1.4; fill: none; }
      </style>

      <!-- START -->
      <ellipse cx="350" cy="30" rx="45" ry="18" />
      <text x="350" y="34" class="label">START</text>
      <line x1="350" y1="48" x2="350" y2="75" marker-end="url(#arrow)" />

      <!-- Login -->
      <rect x="290" y="75" width="120" height="35" rx="3" />
      <text x="350" y="96">Login</text>
      <line x1="350" y1="110" x2="350" y2="135" marker-end="url(#arrow)" />

      <!-- Verify user? -->
      <polygon points="350,135 420,165 350,195 280,165" />
      <text x="350" y="169">Verify user?</text>

      <!-- No -> Register new account -->
      <line x1="420" y1="165" x2="500" y2="165" marker-end="url(#arrow)" />
      <text x="445" y="158">No</text>
      <polygon points="515,145 645,145 625,185 495,185" />
      <text x="570" y="169">Register a new account</text>
      <line x1="570" y1="145" x2="570" y2="92" />
      <line x1="570" y1="92" x2="410" y2="92" marker-end="url(#arrow)" />

      <!-- Yes -> Successfully log in -->
      <line x1="350" y1="195" x2="350" y2="230" marker-end="url(#arrow)" />
      <text x="365" y="212">Yes</text>
      <polygon points="295,230 425,230 405,265 275,265" />
      <text x="350" y="252">Successfully log in</text>
      <line x1="350" y1="265" x2="350" y2="300" marker-end="url(#arrow)" />

      <!-- Choose activity -->
      <polygon points="350,300 430,335 350,370 270,335" />
      <text x="350" y="339">Choose activity</text>

      <!-- Activity bus lines -->
      <line x1="350" y1="370" x2="350" y2="395" />
      <line x1="90" y1="395" x2="610" y2="395" />

      <!-- Branch 1: View Equipment -->
      <line x1="90" y1="395" x2="90" y2="420" marker-end="url(#arrow)" />
      <polygon points="40,420 150,420 135,455 25,455" />
      <text x="88" y="442">View Equipment</text>
      <line x1="90" y1="455" x2="90" y2="485" marker-end="url(#arrow)" />
      <rect x="25" y="485" width="130" height="35" rx="3" />
      <text x="90" y="503">Browse Catalog</text>
      <text x="90" y="515" style="font-size:9px;">&amp; Real-time Stock</text>
      <line x1="90" y1="520" x2="90" y2="725" />

      <!-- Branch 2: Event Packages -->
      <line x1="260" y1="395" x2="260" y2="420" marker-end="url(#arrow)" />
      <polygon points="205,420 325,420 310,455 190,455" />
      <text x="258" y="442">Event Packages</text>
      <line x1="260" y1="455" x2="260" y2="485" marker-end="url(#arrow)" />
      <rect x="195" y="485" width="130" height="35" rx="3" />
      <text x="260" y="503">Select Curated Bundle</text>
      <text x="260" y="515" style="font-size:9px;">(AGM, Sports, Expo)</text>
      <line x1="260" y1="520" x2="260" y2="725" />

      <!-- Branch 3: Book Equipment -->
      <line x1="435" y1="395" x2="435" y2="420" marker-end="url(#arrow)" />
      <polygon points="380,420 500,420 485,455 365,455" />
      <text x="433" y="442">Book Equipment</text>
      <line x1="435" y1="455" x2="435" y2="480" marker-end="url(#arrow)" />
      <rect x="370" y="480" width="130" height="35" rx="3" />
      <text x="435" y="498">2-Step Booking Form</text>
      <text x="435" y="510" style="font-size:9px;">(Dates &amp; Regulations)</text>
      <line x1="435" y1="515" x2="435" y2="540" marker-end="url(#arrow)" />
      <polygon points="435,540 490,565 435,590 380,565" />
      <text x="435" y="569">Available?</text>
      <line x1="435" y1="590" x2="435" y2="618" marker-end="url(#arrow)" />
      <text x="450" y="605">Yes</text>
      <rect x="370" y="618" width="130" height="32" rx="3" />
      <text x="435" y="638">Submit Application</text>
      <line x1="380" y1="565" x2="350" y2="565" />
      <line x1="350" y1="565" x2="350" y2="498" />
      <line x1="350" y1="498" x2="370" y2="498" marker-end="url(#arrow)" />
      <text x="360" y="558">No</text>
      <line x1="435" y1="650" x2="435" y2="725" />

      <!-- Branch 4: My Bookings & Slips -->
      <line x1="610" y1="395" x2="610" y2="420" marker-end="url(#arrow)" />
      <polygon points="560,420 670,420 655,455 545,455" />
      <text x="608" y="442">My Bookings</text>
      <line x1="610" y1="455" x2="610" y2="480" marker-end="url(#arrow)" />
      <rect x="545" y="480" width="130" height="32" rx="3" />
      <text x="610" y="500">Track Loan Status</text>
      <line x1="610" y1="512" x2="610" y2="538" marker-end="url(#arrow)" />
      <polygon points="610,538 660,562 610,586 560,562" />
      <text x="610" y="566">Print Slip?</text>
      <line x1="610" y1="586" x2="610" y2="615" marker-end="url(#arrow)" />
      <text x="625" y="602">Yes</text>
      <rect x="545" y="615" width="130" height="32" rx="3" />
      <text x="610" y="635">Print Loan Slip (A4)</text>
      <line x1="560" y1="562" x2="535" y2="562" />
      <line x1="535" y1="562" x2="535" y2="665" />
      <line x1="535" y1="665" x2="610" y2="665" />
      <text x="546" y="555">No</text>
      <line x1="610" y1="647" x2="610" y2="725" />

      <!-- Convergence -->
      <line x1="90" y1="725" x2="610" y2="725" />
      <line x1="350" y1="725" x2="350" y2="755" marker-end="url(#arrow)" />
      <circle cx="350" cy="762" r="7" />
      <line x1="350" y1="769" x2="350" y2="795" marker-end="url(#arrow)" />

      <!-- Logout? -->
      <polygon points="350,795 415,822 350,849 285,822" />
      <text x="350" y="826">Logout?</text>

      <!-- Logout No -->
      <line x1="285" y1="822" x2="15" y2="822" />
      <line x1="15" y1="822" x2="15" y2="335" />
      <line x1="15" y1="335" x2="270" y2="335" marker-end="url(#arrow)" />
      <text x="145" y="815">No</text>

      <!-- Logout Yes -->
      <line x1="350" y1="849" x2="350" y2="875" marker-end="url(#arrow)" />
      <text x="365" y="863">Yes</text>
      <ellipse cx="350" cy="888" rx="40" ry="16" />
      <text x="350" y="892" class="label">END</text>
    </svg>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(imgDir, 'student_flow.html'), studentFlowHtml, 'utf8');

// 3. Use Case HTML
const useCaseHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { margin: 0; padding: 20px; background: #ffffff; font-family: Arial, sans-serif; display: flex; justify-content: center; }
  .frame { width: 740px; height: 980px; border: 1.5px solid #000; padding: 25px 20px; box-sizing: border-box; background: #fff; position: relative; }
  svg { width: 100%; height: 930px; }
</style>
</head>
<body>
  <div class="frame">
    ${fs.readFileSync(path.join(imgDir, 'use_case_diagram_bw.svg'), 'utf8')}
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(imgDir, 'use_case.html'), useCaseHtml, 'utf8');

// 4. ERD HTML
const erdHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { margin: 0; padding: 20px; background: #ffffff; font-family: Arial, sans-serif; display: flex; justify-content: center; }
  .frame { width: 740px; height: 980px; border: 1.5px solid #000; padding: 25px 20px; box-sizing: border-box; background: #fff; position: relative; }
  svg { width: 100%; height: 930px; }
</style>
</head>
<body>
  <div class="frame">
    ${fs.readFileSync(path.join(imgDir, 'erd_diagram_bw.svg'), 'utf8')}
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(imgDir, 'erd.html'), erdHtml, 'utf8');

console.log('HTML templates created. Taking Chrome screenshots to generate high-resolution PNGs...');

const targets = [
  { html: 'admin_flow.html', png: 'fig_3_110_admin_flowchart.png' },
  { html: 'student_flow.html', png: 'fig_3_111_student_flowchart.png' },
  { html: 'use_case.html', png: 'fig_3_112_use_case_diagram.png' },
  { html: 'erd.html', png: 'fig_3_113_erd_diagram.png' },
];

for (const t of targets) {
  const htmlP = path.join(imgDir, t.html);
  const pngP = path.join(imgDir, t.png);
  const cmd = `"${chromeExe}" --headless --disable-gpu --window-size=780,1020 --screenshot="${pngP}" "${htmlP}"`;
  try {
    execSync(cmd);
    console.log('Generated:', t.png);
  } catch (e) {
    console.error('Error generating', t.png, e.message);
  }
}

console.log('Diagram PNG generation complete.');
