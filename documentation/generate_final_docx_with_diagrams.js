const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, AlignmentType, Header, Footer, Paragraph, TextRun, PageNumber } = docx;

const prelims = require('./docx_builder/doc_prelims.js');
const ch1 = require('./docx_builder/doc_ch1.js');
const ch2 = require('./docx_builder/doc_ch2.js');
const ch3 = require('./docx_builder/doc_ch3.js');
const ch4 = require('./docx_builder/doc_ch4.js');
const ch5 = require('./docx_builder/doc_ch5.js');

const docxFile = path.join(__dirname, 'FYP_Report_PinjamGeng_Complete.docx');
const duplicateDocxFile = path.join(__dirname, 'FYP_Report_PinjamGeng.docx');

console.log('Generating complete, full-length Word document (.docx) matching UPTM FCOM formatting specifications...');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Arial', size: 22, color: '000000' }, // Primary Font: Arial 11pt
        paragraph: {
          spacing: { line: 276, after: 120 }, // 1.15 line spacing, 6pt after paragraph
          alignment: AlignmentType.JUSTIFIED,
        },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          // Standard A4 Size: 210mm x 297mm (11906 x 16838 twips)
          size: { width: 11906, height: 16838 },
          // Margins: Standard A4 (Top: 1.0", Bottom: 1.0", Left: 1.25", Right: 1.0")
          // 1 inch = 1440 twips; 1.25 inch = 1800 twips
          margin: { top: 1440, bottom: 1440, left: 1800, right: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: 'CC101 / DIPLOMA IN COMPUTER SCIENCE',
                  font: 'Arial',
                  size: 18, // 9 pt
                  color: '4B5563',
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { before: 120 },
              children: [
                new TextRun({
                  text: 'CC101 — Page ',
                  font: 'Arial',
                  size: 18, // 9 pt
                  color: '4B5563',
                }),
                PageNumber.CURRENT,
                new TextRun({
                  text: ' of ',
                  font: 'Arial',
                  size: 18,
                  color: '4B5563',
                }),
                PageNumber.TOTAL_PAGES,
              ],
            }),
          ],
        }),
      },
      children: [
        ...prelims.getPrelims(),
        ...ch1.getChapter1(),
        ...ch2.getChapter2(),
        ...ch3.getChapter3(),
        ...ch4.getChapter4(),
        ...ch5.getChapter5AndBackMatter(),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  try {
    fs.writeFileSync(docxFile, buffer);
    console.log('Successfully regenerated full-length FYP_Report_PinjamGeng_Complete.docx at:', docxFile);
  } catch (e) {
    console.warn('Notice: FYP_Report_PinjamGeng_Complete.docx is currently open in Word (' + e.message + ')');
  }
  try {
    fs.writeFileSync(duplicateDocxFile, buffer);
    console.log('Also updated FYP_Report_PinjamGeng.docx at:', duplicateDocxFile);
  } catch (e) {
    console.warn('Notice: FYP_Report_PinjamGeng.docx is currently open in Word (' + e.message + ')');
  }
  const latestFile = path.join(__dirname, 'FYP_Report_PinjamGeng_Latest.docx');
  try {
    fs.writeFileSync(latestFile, buffer);
    console.log('Successfully generated FYP_Report_PinjamGeng_Latest.docx at:', latestFile);
  } catch (e) {
    console.warn('Notice: FYP_Report_PinjamGeng_Latest.docx:', e.message);
  }
  console.log('File size:', (buffer.length / 1024).toFixed(2), 'KB');
}).catch((err) => {
  console.error('Error generating docx:', err);
});
