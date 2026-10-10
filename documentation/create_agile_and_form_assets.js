const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const imgDir = path.join(__dirname, 'images');

// Generate 6 perfectly equal segments for Agile Wheel using trigonometry
const rOuter = 200;
const rInner = 90;
const steps = [
  { name: 'Plan', num: '1', color: '#F59E0B', textColor: '#B45309' },
  { name: 'Design', num: '2', color: '#F97316', textColor: '#C2410C' },
  { name: 'Develop', num: '3', color: '#EF4444', textColor: '#B91C1C' },
  { name: 'Test', num: '4', color: '#6366F1', textColor: '#4338CA' },
  { name: 'Deploy', num: '5', color: '#0EA5E9', textColor: '#0369A1' },
  { name: 'Review', num: '6', color: '#10B981', textColor: '#047857' }
];

let segmentsSvg = '';
steps.forEach((st, i) => {
  // Start from -90 deg (top) + i * 60 deg
  const startDeg = -90 + i * 60 + 1.5;
  const endDeg = -90 + (i + 1) * 60 - 1.5;
  
  const startRad = startDeg * Math.PI / 180;
  const endRad = endDeg * Math.PI / 180;

  const x1Outer = rOuter * Math.cos(startRad);
  const y1Outer = rOuter * Math.sin(startRad);
  const x2Outer = rOuter * Math.cos(endRad);
  const y2Outer = rOuter * Math.sin(endRad);

  const x1Inner = rInner * Math.cos(startRad);
  const y1Inner = rInner * Math.sin(startRad);
  const x2Inner = rInner * Math.cos(endRad);
  const y2Inner = rInner * Math.sin(endRad);

  // Path arc
  segmentsSvg += `
    <path d="M${x1Inner.toFixed(1)},${y1Inner.toFixed(1)} L${x1Outer.toFixed(1)},${y1Outer.toFixed(1)} A${rOuter},${rOuter} 0 0,1 ${x2Outer.toFixed(1)},${y2Outer.toFixed(1)} L${x2Inner.toFixed(1)},${y2Inner.toFixed(1)} A${rInner},${rInner} 0 0,0 ${x1Inner.toFixed(1)},${y1Inner.toFixed(1)} Z" fill="${st.color}"/>
  `;

  // Mid angle for label
  const midDeg = -90 + (i + 0.5) * 60;
  const midRad = midDeg * Math.PI / 180;
  const rBadge = 145;
  const bx = rBadge * Math.cos(midRad);
  const by = rBadge * Math.sin(midRad);

  segmentsSvg += `
    <g transform="translate(${bx.toFixed(1)}, ${by.toFixed(1)})">
      <circle cx="0" cy="0" r="14" fill="#FFFFFF" filter="url(#shadow)"/>
      <text x="0" y="4.5" font-family="Montserrat, Arial, sans-serif" font-weight="900" font-size="12" fill="${st.textColor}" text-anchor="middle">${st.num}</text>
      <!-- Label outside / adjacent -->
      <text x="${(Math.cos(midRad) * 42).toFixed(1)}" y="${(Math.sin(midRad) * 42 + 4).toFixed(1)}" font-family="Montserrat, Arial Black, sans-serif" font-weight="900" font-size="13" fill="#1F2937" text-anchor="${Math.cos(midRad) > 0.3 ? 'start' : (Math.cos(midRad) < -0.3 ? 'end' : 'middle')}">${st.name}</text>
    </g>
  `;
});

const agileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 540" width="540" height="540">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.15"/>
    </filter>
  </defs>

  <g transform="translate(270, 270)">
    ${segmentsSvg}

    <!-- Center circle -->
    <circle cx="0" cy="0" r="${rInner - 8}" fill="#FFFFFF" filter="url(#shadow)"/>
    <text x="0" y="-8" font-family="Montserrat, Arial Black, sans-serif" font-weight="900" font-size="21" fill="#1E293B" text-anchor="middle">Agile</text>
    <text x="0" y="16" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="14.5" fill="#64748B" text-anchor="middle">methodology</text>
    <circle cx="0" cy="36" r="4.5" fill="#853D60"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(imgDir, 'agile_wheel.svg'), agileSvg);

// Render HTML
const renderHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 0; background: transparent; }
</style>
</head>
<body>
  <div style="width: 540px; height: 540px; display: inline-block;">
    <img src="agile_wheel.svg" style="width: 540px; height: 540px;">
  </div>
</body>
</html>`;
fs.writeFileSync(path.join(imgDir, 'render_wheel.html'), renderHtml);

execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(imgDir, 'agile_wheel.png')}" --window-size=540,540 "file:///${path.join(imgDir, 'render_wheel.html').replace(/\\\\/g, '/')}"`);
console.log('Successfully re-rendered agile_wheel.png with smooth segments!');
