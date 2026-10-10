const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlFile = path.resolve(__dirname, 'FYP_Report_PinjamGeng.html');
const pdfFile = path.resolve(__dirname, 'FYP_Report_PinjamGeng_Complete.pdf');

console.log('HTML File:', htmlFile);
console.log('Output PDF:', pdfFile);

try {
  // Use file:// URL format for Chrome
  const fileUrl = 'file:///' + htmlFile.replace(/\\/g, '/');
  const cmd = `"${chromePath}" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="${pdfFile}" "${fileUrl}"`;
  console.log('Running cmd:', cmd);
  const out = execSync(cmd, { encoding: 'utf8' });
  console.log('Output:', out);

  if (fs.existsSync(pdfFile)) {
    console.log('SUCCESS! PDF generated with size:', fs.statSync(pdfFile).size, 'bytes');
    fs.copyFileSync(pdfFile, path.resolve(__dirname, 'FYP_Report_PinjamGeng.pdf'));
    console.log('Copied to FYP_Report_PinjamGeng.pdf');
  } else {
    console.error('File does not exist after command!');
  }
} catch (e) {
  console.error('Error occurred:', e.message);
  if (e.stdout) console.error('Stdout:', e.stdout);
  if (e.stderr) console.error('Stderr:', e.stderr);
}
