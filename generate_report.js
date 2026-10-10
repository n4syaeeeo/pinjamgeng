const fs = require('fs');
const path = require('path');

const docDir = path.join(__dirname, 'documentation');
const htmlFile = path.join(docDir, 'FYP_Report_PinjamGeng.html');

// Read B&W SVGs to embed directly
const adminFlowchartSvg = fs.readFileSync(path.join(docDir, 'images', 'admin_flowchart_bw.svg'), 'utf8');
const userFlowchartSvg = fs.readFileSync(path.join(docDir, 'images', 'user_flowchart_bw.svg'), 'utf8');
const useCaseSvg = fs.readFileSync(path.join(docDir, 'images', 'use_case_diagram_bw.svg'), 'utf8');
const erdSvg = fs.readFileSync(path.join(docDir, 'images', 'erd_diagram_bw.svg'), 'utf8');

console.log('SVGs loaded successfully.');
