const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.join(__dirname, 'images');
const chromeExe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const agileHtml = `<!DOCTYPE html><html><body style="margin:0; padding:15px; background:#fff; display:flex; justify-content:center;">
  <div style="width:540px; border:1.5px solid #000; padding:20px; text-align:center; background:#fff;">
    <svg viewBox="0 0 440 140" width="440" height="140">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
        </marker>
      </defs>
      <style>
        .agile-box { stroke:#000; stroke-width:1.5; fill:#fff; }
        .agile-text { font-family:Arial,sans-serif; font-size:11px; font-weight:bold; text-anchor:middle; fill:#000; }
        .agile-arrow { stroke:#000; stroke-width:1.3; fill:none; marker-end:url(#arrow); }
      </style>
      <rect x="10" y="25" width="60" height="38" rx="4" class="agile-box"/>
      <text x="40" y="49" class="agile-text">1. Plan</text>
      <line x1="70" y1="44" x2="82" y2="44" class="agile-arrow"/>

      <rect x="82" y="25" width="60" height="38" rx="4" class="agile-box"/>
      <text x="112" y="49" class="agile-text">2. Design</text>
      <line x1="142" y1="44" x2="154" y2="44" class="agile-arrow"/>

      <rect x="154" y="25" width="60" height="38" rx="4" class="agile-box"/>
      <text x="184" y="49" class="agile-text">3. Develop</text>
      <line x1="214" y1="44" x2="226" y2="44" class="agile-arrow"/>

      <rect x="226" y="25" width="60" height="38" rx="4" class="agile-box"/>
      <text x="256" y="49" class="agile-text">4. Test</text>
      <line x1="286" y1="44" x2="298" y2="44" class="agile-arrow"/>

      <rect x="298" y="25" width="60" height="38" rx="4" class="agile-box"/>
      <text x="328" y="49" class="agile-text">5. Deploy</text>
      <line x1="358" y1="44" x2="370" y2="44" class="agile-arrow"/>

      <rect x="370" y="25" width="60" height="38" rx="4" class="agile-box"/>
      <text x="400" y="49" class="agile-text">6. Review</text>

      <path d="M 400 63 L 400 100 L 40 100 L 40 63" class="agile-arrow"/>
      <text x="220" y="118" style="font-family:Arial,sans-serif; font-size:10px; font-style:italic; text-anchor:middle;">Continuous Iterative Sprint Feedback Loop</text>
    </svg>
  </div>
</body></html>`;

const tmp = path.join(imgDir, 'tmp_agile.html');
fs.writeFileSync(tmp, agileHtml, 'utf8');
const out = path.join(imgDir, 'fig_3_1_agile_methodology.png');
execSync(`"${chromeExe}" --headless --disable-gpu --window-size=620,240 --screenshot="${out}" "${tmp}"`);
if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
console.log('Generated fig_3_1_agile_methodology.png');
