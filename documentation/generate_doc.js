const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'FYP_Report_PinjamGeng.html');
const docPath = path.join(__dirname, 'FYP_Report_PinjamGeng.doc');

let html = fs.readFileSync(htmlPath, 'utf8');

const wordHeader = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\n<head>\n<!--[if gte mso 9]>\n<xml>\n<w:WordDocument>\n<w:View>Print</w:View>\n<w:Zoom>100</w:Zoom>\n<w:DoNotOptimizeForBrowser/>\n</w:WordDocument>\n</xml>\n<![endif]-->\n';

html = html.replace('<html lang="en">', wordHeader);

fs.writeFileSync(docPath, html, 'utf8');
console.log('Successfully generated Word .doc document at:', docPath);
