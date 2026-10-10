const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { execSync } = require('child_process');

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeightRule,
  BorderStyle,
  Header,
  ImageRun,
  PageBreak,
} = docx;

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const docxPath = path.join(__dirname, 'PinjamGeng_Log_Book.docx');
const htmlPath = path.join(__dirname, 'PinjamGeng_Log_Book.html');
const pdfPath = path.join(__dirname, 'PinjamGeng_Log_Book.pdf');
const logoPngPath = path.join(__dirname, 'images', 'uptm_fcom_logo.png');

// 1. DATA DEFINITIONS
const logEntries = [
  {
    week: '1',
    agenda: 'Brainstorming, Introduction to the course and Title selection',
    nextAgenda: 'Problem definition, objectives formulation, and project scope definition.'
  },
  {
    week: '2',
    agenda: 'Discussed campus equipment borrowing bottlenecks, defined project objectives, and planned user requirements.',
    nextAgenda: 'Literature review on existing booking systems and drafting project proposal report.'
  },
  {
    week: '3',
    agenda: 'Reviewed comparative analysis, identified research gaps, and established Agile methodology lifecycle.',
    nextAgenda: 'System architecture planning, user flowcharts, and user interface wireframing.'
  },
  {
    week: '4',
    agenda: 'Presented UI wireframes, student/admin operational flowcharts, and relational database schema.',
    nextAgenda: 'Relational database modeling, MySQL schema design, and data dictionaries.'
  },
  {
    week: '5',
    agenda: 'Finalized database schema, data dictionary, and submitted project proposal report to supervisor.',
    nextAgenda: 'Preparation and development environment setup.'
  },
  {
    isBreak: true
  },
  {
    week: '6',
    agenda: 'Project environment setup using XAMPP, PHP 8.2, MySQL, and Tailwind CSS.',
    nextAgenda: 'Developing role-based authentication and live equipment catalog module.'
  },
  {
    week: '7',
    agenda: 'Implemented user authentication (BCrypt hashing), equipment catalog, and stock availability progress indicators.',
    nextAgenda: 'Developing pre-configured "Smart Event Packages" explorer and package selection.'
  },
  {
    week: '8',
    agenda: 'Implemented pre-configured Smart Event Packages explorer and 2-step equipment booking wizard.',
    nextAgenda: 'Building automated schedule conflict checking and downloadable A4 loan agreement slip.'
  },
  {
    week: '9',
    agenda: 'Implemented real-time date conflict validation and standardized downloadable A4 loan agreement slip.',
    nextAgenda: 'Developing administrator booking approval console and equipment return inspection desk.'
  },
  {
    week: '10',
    agenda: 'Constructed admin booking approval workflow, return condition inspection desk, and auto-generated maintenance ticketing.',
    nextAgenda: 'Conducting unit testing, integration testing, and preparing UAT questionnaire.'
  },
  {
    week: '11',
    agenda: 'Conducted automated unit and integration testing across booking and inventory modules.',
    nextAgenda: 'Conducting User Acceptance Testing (UAT) with student leaders and lab administrators.'
  },
  {
    week: '12',
    agenda: 'Completed live system demonstration to supervisor and reviewed final project report draft.',
    nextAgenda: 'Final report submission and project presentation preparation.'
  }
];

// ==========================================================
// 2. GENERATE WORD DOCX (.docx)
// ==========================================================
console.log('Generating PinjamGeng_Log_Book.docx...');

const thinBorder = {
  style: BorderStyle.SINGLE,
  size: 8,
  color: '000000',
};

const tableBorders = {
  top: thinBorder,
  bottom: thinBorder,
  left: thinBorder,
  right: thinBorder,
  insideHorizontal: thinBorder,
  insideVertical: thinBorder,
};

// Logo buffer
let logoBuffer = null;
if (fs.existsSync(logoPngPath)) {
  logoBuffer = fs.readFileSync(logoPngPath);
}

const docxChildren = [
  // Page 1: Outer Border / Header
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 600 },
    children: [
      new TextRun({
        text: 'CC101 DIPLOMA BACHELOR IN COMPUTER SCIENCE',
        font: 'Arial',
        size: 20, // 10 pt
        color: '000000',
      }),
    ],
  }),

  // Logo
  ...(logoBuffer ? [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 400 },
      children: [
        new ImageRun({
          data: logoBuffer,
          transformation: { width: 220, height: 60 },
        }),
      ],
    })
  ] : []),

  // Faculty
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [
      new TextRun({
        text: 'FACULTY OF COMPUTING & MULTIMEDIA (FCOM)',
        font: 'Arial',
        bold: true,
        size: 26, // 13 pt
        color: '000000',
      }),
    ],
  }),

  // Course
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: 'COMPUTER PROJECT 1',
        font: 'Arial',
        size: 24, // 12 pt
        color: '000000',
      }),
    ],
  }),

  // Code (Red)
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 1200 },
    children: [
      new TextRun({
        text: 'FYP3024',
        font: 'Arial',
        bold: true,
        size: 24, // 12 pt
        color: 'E53935', // Red
      }),
    ],
  }),

  // Title: LOG BOOK
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 2000 },
    children: [
      new TextRun({
        text: 'LOG BOOK',
        font: 'Arial',
        bold: true,
        size: 48, // 24 pt
        color: '000000',
      }),
    ],
  }),

  // Info Box Table
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorders,
            margins: { top: 120, bottom: 80, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: "STUDENT'S NAME : ",
                    font: 'Arial',
                    bold: true,
                    size: 21,
                  }),
                  new TextRun({
                    text: 'NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL',
                    font: 'Arial',
                    size: 21,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorders,
            margins: { top: 80, bottom: 80, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: 'ID NO. : ',
                    font: 'Arial',
                    bold: true,
                    size: 21,
                  }),
                  new TextRun({
                    text: 'AM2412018113          ',
                    font: 'Arial',
                    size: 21,
                  }),
                  new TextRun({
                    text: 'SUPERVISOR : ',
                    font: 'Arial',
                    bold: true,
                    size: 21,
                  }),
                  new TextRun({
                    text: 'MADAM JIHADAH BINTI AHMAD',
                    font: 'Arial',
                    size: 21,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: tableBorders,
            margins: { top: 80, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'PROJECT TITLE : ',
                    font: 'Arial',
                    bold: true,
                    size: 21,
                  }),
                  new TextRun({
                    text: 'SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM (PINJAMGENG)',
                    font: 'Arial',
                    size: 21,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  }),

  // Page Break for Page 2
  new Paragraph({ children: [new PageBreak()] }),

  // PAGE 2: LOG BOOK TABLE
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: 'CC101 DIPLOMA BACHELOR IN COMPUTER SCIENCE',
        font: 'Arial',
        size: 20,
        color: '000000',
      }),
    ],
  }),

  // Horizontal divider
  new Paragraph({
    spacing: { after: 300 },
    border: {
      bottom: {
        color: '000000',
        size: 16,
        style: BorderStyle.SINGLE,
      },
    },
    children: [],
  }),
];

// Build Log Book Table Rows
const tableHeaderCells = [
  new TableCell({
    width: { size: 1200, type: WidthType.DXA },
    shading: { fill: 'B0B0B0' },
    borders: tableBorders,
    margins: { top: 120, bottom: 120, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: 'Week', bold: true, font: 'Arial', size: 21 })],
      }),
    ],
  }),
  new TableCell({
    width: { size: 3600, type: WidthType.DXA },
    shading: { fill: 'B0B0B0' },
    borders: tableBorders,
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: 'Agenda', bold: true, font: 'Arial', size: 21 })],
      }),
    ],
  }),
  new TableCell({
    width: { size: 3600, type: WidthType.DXA },
    shading: { fill: 'B0B0B0' },
    borders: tableBorders,
    margins: { top: 120, bottom: 120, left: 120, right: 120 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: 'Next Agenda', bold: true, font: 'Arial', size: 21 })],
      }),
    ],
  }),
  new TableCell({
    width: { size: 2400, type: WidthType.DXA },
    shading: { fill: 'B0B0B0' },
    borders: tableBorders,
    margins: { top: 120, bottom: 120, left: 100, right: 100 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Signature\n(Supervisor / Coordinator)', bold: true, font: 'Arial', size: 19 }),
        ],
      }),
    ],
  }),
];

const docxTableRows = [
  new TableRow({
    tableHeader: true,
    children: tableHeaderCells,
  }),
];

logEntries.forEach(item => {
  if (item.isBreak) {
    // Empty row spanning the table
    docxTableRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 10800, type: WidthType.DXA },
            columnSpan: 4,
            borders: tableBorders,
            margins: { top: 140, bottom: 140, left: 100, right: 100 },
            children: [new Paragraph({ text: '' })],
          }),
        ],
      })
    );
  } else {
    docxTableRows.push(
      new TableRow({
        children: [
          new TableCell({
            width: { size: 1200, type: WidthType.DXA },
            borders: tableBorders,
            margins: { top: 100, bottom: 100, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: item.week, font: 'Arial', size: 20 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 3600, type: WidthType.DXA },
            borders: tableBorders,
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: item.agenda, font: 'Arial', size: 19 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 3600, type: WidthType.DXA },
            borders: tableBorders,
            margins: { top: 100, bottom: 100, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: item.nextAgenda, font: 'Arial', size: 19 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 2400, type: WidthType.DXA },
            borders: tableBorders,
            margins: { top: 100, bottom: 100, left: 80, right: 80 },
            children: [new Paragraph({ text: '' })], // Blank for signature
          }),
        ],
      })
    );
  }
});

docxChildren.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBorders,
    rows: docxTableRows,
  })
);

const logDoc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Arial', size: 20, color: '000000' },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1000, bottom: 1000, left: 1200, right: 1000 },
        },
      },
      children: docxChildren,
    },
  ],
});

Packer.toBuffer(logDoc).then(buf => {
  fs.writeFileSync(docxPath, buf);
  console.log('Saved Word Log Book (.docx) to:', docxPath);
});

// ==========================================================
// 3. GENERATE PIXEL-PERFECT HTML & PDF
// ==========================================================
console.log('Generating PinjamGeng_Log_Book.html and PDF...');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PinjamGeng - FYP Log Book</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    body {
      background: #e5e7eb;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
    }
    .page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      padding: 16mm 18mm 16mm 18mm;
      margin-bottom: 20px;
      position: relative;
      border: 1px solid #d1d5db;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      page-break-after: always;
    }
    .page-frame {
      width: 100%;
      height: 100%;
      border: 1.5px solid #000000;
      padding: 12mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .header-code {
      font-size: 11pt;
      color: #000000;
      letter-spacing: 0.2px;
      margin-bottom: 25px;
    }
    .center-block {
      text-align: center;
    }
    .logo-img {
      max-width: 260px;
      height: auto;
      margin-bottom: 25px;
    }
    .faculty-title {
      font-size: 14pt;
      font-weight: bold;
      color: #000000;
      margin-bottom: 25px;
    }
    .course-title {
      font-size: 12.5pt;
      color: #000000;
      margin-bottom: 8px;
    }
    .course-code {
      font-size: 13pt;
      font-weight: bold;
      color: #e53935;
      margin-bottom: 40px;
    }
    .logbook-title {
      font-size: 26pt;
      font-weight: bold;
      letter-spacing: 0.5px;
      color: #000000;
      margin-bottom: 50px;
    }
    .info-box {
      border: 1.5px solid #000000;
      padding: 12px 14px;
      font-size: 10.5pt;
      line-height: 1.7;
      color: #000000;
      margin-bottom: 30px;
    }
    .info-line {
      display: flex;
      margin-bottom: 2px;
    }
    .info-label {
      font-weight: bold;
    }

    /* Page 2 styling */
    .page-2-frame {
      width: 100%;
      height: 100%;
      border: 1.5px solid #000000;
      padding: 12mm 14mm;
      display: flex;
      flex-direction: column;
    }
    .divider-bar {
      border-bottom: 3.5px solid #000000;
      margin-top: 6px;
      margin-bottom: 14px;
    }
    .log-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      line-height: 1.25;
    }
    .log-table th, .log-table td {
      border: 1px solid #000000;
      padding: 6px 8px;
      vertical-align: middle;
    }
    .log-table th {
      background-color: #a6a6a6;
      font-weight: bold;
      font-size: 9.5pt;
      text-align: center;
    }
    .col-week {
      width: 7%;
      text-align: center;
      font-size: 9pt;
      font-weight: bold;
    }
    .col-agenda {
      width: 38%;
      text-align: left;
    }
    .col-next {
      width: 38%;
      text-align: left;
    }
    .col-sig {
      width: 17%;
      text-align: center;
    }
    .break-row td {
      height: 28px;
      background: #ffffff;
    }

    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .page {
        margin: 0;
        box-shadow: none;
        border: none;
      }
    }
  </style>
</head>
<body>

  <!-- PAGE 1 -->
  <div class="page">
    <div class="page-frame">
      <div class="header-code">CC101 DIPLOMA BACHELOR IN COMPUTER SCIENCE</div>

      <div class="center-block" style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <img src="images/uptm_fcom_logo.png" class="logo-img" alt="UPTM Logo" />
        <div class="faculty-title">FACULTY OF COMPUTING & MULTIMEDIA (FCOM)</div>
        <div class="course-title">COMPUTER PROJECT 1</div>
        <div class="course-code">FYP3024</div>
        <div class="logbook-title">LOG BOOK</div>
      </div>

      <div class="info-box">
        <div style="margin-bottom: 8px;">
          <strong>STUDENT'S NAME : </strong> NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <div><strong>ID NO. : </strong> AM2412018113</div>
          <div style="padding-right: 20px;"><strong>SUPERVISOR : </strong> MADAM JIHADAH BINTI AHMAD</div>
        </div>
        <div>
          <strong>PROJECT TITLE : </strong> SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM (PINJAMGENG)
        </div>
      </div>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <div class="page-2-frame">
      <div class="header-code">CC101 DIPLOMA BACHELOR IN COMPUTER SCIENCE</div>
      <div class="divider-bar"></div>

      <table class="log-table">
        <thead>
          <tr>
            <th class="col-week">Week</th>
            <th class="col-agenda">Agenda</th>
            <th class="col-next">Next Agenda</th>
            <th class="col-sig">Signature<br><span style="font-size: 8pt; font-weight: normal;">(Supervisor / Coordinator)</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="col-week">1</td>
            <td class="col-agenda">Brainstorming, Introduction to the course and Title selection</td>
            <td class="col-next">Problem definition, objectives formulation, and project scope definition.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">2</td>
            <td class="col-agenda">Discussed campus equipment borrowing bottlenecks, defined project objectives, and planned user requirements.</td>
            <td class="col-next">Literature review on existing booking systems and drafting project proposal report.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">3</td>
            <td class="col-agenda">Reviewed comparative analysis, identified research gaps, and established Agile methodology lifecycle.</td>
            <td class="col-next">System architecture planning, user flowcharts, and user interface wireframing.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">4</td>
            <td class="col-agenda">Presented UI wireframes, student/admin operational flowcharts, and relational database schema.</td>
            <td class="col-next">Relational database modeling, MySQL schema design, and data dictionaries.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">5</td>
            <td class="col-agenda">Finalized database schema, data dictionary, and submitted project proposal report to supervisor.</td>
            <td class="col-next">Preparation and development environment setup.</td>
            <td class="col-sig"></td>
          </tr>

          <!-- Mid semester break -->
          <tr class="break-row">
            <td colspan="4"></td>
          </tr>

          <tr>
            <td class="col-week">6</td>
            <td class="col-agenda">Project environment setup using XAMPP, PHP 8.2, MySQL, and Tailwind CSS.</td>
            <td class="col-next">Developing role-based authentication and live equipment catalog module.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">7</td>
            <td class="col-agenda">Implemented user authentication (BCrypt hashing), equipment catalog, and stock availability progress indicators.</td>
            <td class="col-next">Developing pre-configured "Smart Event Packages" explorer and package selection.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">8</td>
            <td class="col-agenda">Implemented pre-configured Smart Event Packages explorer and 2-step equipment booking wizard.</td>
            <td class="col-next">Building automated schedule conflict checking and downloadable A4 loan agreement slip.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">9</td>
            <td class="col-agenda">Implemented real-time date conflict validation and standardized downloadable A4 loan agreement slip.</td>
            <td class="col-next">Developing administrator booking approval console and equipment return inspection desk.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">10</td>
            <td class="col-agenda">Constructed admin booking approval workflow, return condition inspection desk, and auto-generated maintenance ticketing.</td>
            <td class="col-next">Conducting unit testing, integration testing, and preparing UAT questionnaire.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">11</td>
            <td class="col-agenda">Conducted automated unit and integration testing across booking and inventory modules.</td>
            <td class="col-next">Conducting User Acceptance Testing (UAT) with student leaders and lab administrators.</td>
            <td class="col-sig"></td>
          </tr>
          <tr>
            <td class="col-week">12</td>
            <td class="col-agenda">Completed live system demonstration to supervisor and reviewed final project report draft.</td>
            <td class="col-next">Final report submission and project presentation preparation.</td>
            <td class="col-sig"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</body>
</html>`;

fs.writeFileSync(htmlPath, htmlContent, 'utf8');
console.log('Saved HTML to:', htmlPath);

// Render PDF with Chrome headless
try {
  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const cmd = `"${chromePath}" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer --print-to-pdf="${pdfPath}" "${fileUrl}"`;
  execSync(cmd, { timeout: 15000 });
  console.log('SUCCESS: Rendered PinjamGeng_Log_Book.pdf (Size:', fs.statSync(pdfPath).size, 'bytes)');
} catch (e) {
  console.error('PDF error:', e.message);
}
