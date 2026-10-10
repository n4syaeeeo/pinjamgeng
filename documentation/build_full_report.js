const fs = require('fs');
const path = require('path');

const prelims = require('./builder/part1_prelims.js');
const ch1 = require('./builder/part2_ch1.js');
const ch2 = require('./builder/part3_ch2.js');
const ch3 = require('./builder/part4_ch3.js');
const ch4 = require('./builder/part5_ch4.js');
const ch5 = require('./builder/part6_ch5.js');

const imagesDir = path.join(__dirname, 'images');
const htmlFile = path.join(__dirname, 'FYP_Report_PinjamGeng.html');
const mdFile = path.join(__dirname, 'FYP_Report_PinjamGeng.md');

const htmlStart = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Final Year Project Report - PinjamGeng (UPTM) - Nursyafiqah Zulaikha</title>
  <style>
    /* ACADEMIC REPORT STYLING (UPTM / FCOM GUIDELINES) */
    @page {
      size: A4;
      margin: 1.0in 1.0in 1.0in 1.25in; /* Top: 1.0", Right: 1.0", Bottom: 1.0", Left: 1.25" */
      @top-left {
        content: "CC101";
        font-family: Arial, sans-serif;
        font-size: 9pt;
        font-weight: bold;
        color: #4b5563;
      }
      @top-right {
        content: "DIPLOMA IN COMPUTER SCIENCE";
        font-family: Arial, sans-serif;
        font-size: 9pt;
        font-weight: bold;
        color: #4b5563;
      }
      @bottom-right {
        content: "CC101 — Page " counter(page) " of 95";
        font-family: Arial, sans-serif;
        font-size: 9pt;
        color: #4b5563;
      }
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 11pt;
      color: #000000;
      line-height: 1.15;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }

    .page {
      box-sizing: border-box;
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto 30px auto;
      padding: 1.0in 1.0in 1.0in 1.25in;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      position: relative;
    }

    @media print {
      body {
        background-color: #ffffff;
      }
      .page {
        margin: 0;
        padding: 0;
        box-shadow: none;
        page-break-after: always;
        height: auto;
        min-height: 100vh;
      }
      .no-print {
        display: none !important;
      }
    }

    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .cover-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 240mm;
    }

    .project-title {
      font-size: 18pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1.5;
      margin-top: 40px;
    }

    .category-badge {
      font-size: 14pt;
      font-weight: bold;
      margin-top: 20px;
    }

    .student-info {
      margin: 60px 0;
    }

    .student-name {
      font-size: 14pt;
      font-weight: bold;
      margin: 5px 0;
    }

    .student-id {
      font-size: 13pt;
      font-weight: bold;
      margin: 5px 0;
    }

    .fulfillment-block {
      margin: 40px 0;
      font-size: 11pt;
      line-height: 1.5;
      font-weight: bold;
    }

    .degree-title {
      font-size: 13pt;
      font-weight: bold;
      margin-top: 10px;
    }

    .university-info {
      margin-bottom: 30px;
    }

    .faculty-name, .uni-name, .submission-date {
      font-size: 13pt;
      font-weight: bold;
      margin: 5px 0;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      font-weight: bold;
      color: #4b5563;
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 4px;
      font-family: Arial, sans-serif;
    }

    .page-footer {
      display: flex;
      justify-content: flex-end;
      font-size: 9pt;
      color: #4b5563;
      position: absolute;
      bottom: 0.8in;
      left: 1.25in;
      right: 1.0in;
      border-top: 1px solid #ddd;
      padding-top: 4px;
      font-family: Arial, sans-serif;
    }

    h1.chapter-num {
      font-size: 16pt;
      font-weight: bold;
      text-align: center;
      margin: 20px 0 5px 0;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
    }

    h1.chapter-title {
      font-size: 16pt;
      font-weight: bold;
      text-align: center;
      margin: 0 0 25px 0;
      text-transform: uppercase;
      font-family: Arial, sans-serif;
    }

    h2.section-title {
      font-size: 13pt;
      font-weight: bold;
      margin: 20px 0 6px 0;
      text-align: left;
      font-family: Arial, sans-serif;
    }

    h3.subsection-title {
      font-size: 11pt;
      font-weight: bold;
      margin: 15px 0 4px 0;
      text-align: left;
      font-family: Arial, sans-serif;
    }

    h4.sub-subsection-title {
      font-size: 11pt;
      font-weight: bold;
      margin: 12px 0 4px 0;
      text-align: left;
      font-family: Arial, sans-serif;
    }

    p, p.justified-text {
      font-size: 11pt;
      line-height: 1.15;
      text-align: justify;
      text-justify: inter-word;
      margin: 0 0 6pt 0;
      text-indent: 0;
      font-family: Arial, sans-serif;
    }

    ul.justified-list, ol.justified-list {
      text-align: justify;
      text-justify: inter-word;
      margin: 6pt 0 6pt 20px;
      padding-left: 10px;
      font-size: 11pt;
      line-height: 1.15;
      font-family: Arial, sans-serif;
    }

    ul.justified-list li, ol.justified-list li {
      margin-bottom: 4px;
    }

    .toc-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5pt;
      line-height: 1.6;
    }

    .toc-table td {
      padding: 2.5px 0;
    }

    .toc-chapter td {
      font-weight: bold;
      padding-top: 10px;
    }

    .toc-title td {
      font-weight: bold;
      padding-bottom: 6px;
    }

    .toc-indent-1 {
      padding-left: 20px !important;
      font-weight: bold;
    }

    .toc-indent-2 {
      padding-left: 40px !important;
    }

    .toc-page {
      text-align: right;
      width: 40px;
      font-weight: normal;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5pt;
      margin: 15px 0 25px 0;
      page-break-inside: avoid;
    }

    .data-table th, .data-table td {
      border: 1px solid #000000;
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }

    .data-table th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: center;
    }

    .table-caption {
      font-size: 10.5pt;
      font-weight: bold;
      margin: 14pt 0 6pt 0;
      text-align: center;
      font-family: Arial, sans-serif;
    }

    .figure-caption {
      font-size: 10.5pt;
      font-weight: bold;
      margin: 6pt 0 14pt 0;
      text-align: center;
      font-family: Arial, sans-serif;
    }

    .reference-item, ol.references-list li {
      padding-left: 0.5in;
      text-indent: -0.5in;
      margin-bottom: 8pt;
      line-height: 1.15;
      font-size: 11pt;
      text-align: justify;
      font-family: Arial, sans-serif;
    }

    .screenshot-guide-box {
      background-color: #faf8f5;
      border: 1.5px dashed #8b5a2b;
      padding: 12px 16px;
      margin: 15px 0 20px 0;
      font-size: 10pt;
      line-height: 1.5;
      color: #2e1e12;
      border-radius: 4px;
    }

    .screenshot-guide-box h4 {
      margin: 0 0 6px 0;
      font-size: 10.5pt;
      color: #8b5a2b;
    }

    .interface-doc-block {
      margin: 25px 0;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
    }

    .interface-doc-block h4 {
      font-size: 11pt;
      font-weight: bold;
      margin: 0 0 8px 0;
    }

    /* Print toolbar at top of web view */
    .print-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #231308;
      color: #ffffff;
      padding: 12px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .print-btn {
      background: #d97736;
      color: #fff;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      font-size: 13px;
      transition: background 0.2s;
    }

    .print-btn:hover {
      background: #e5a953;
      color: #231308;
    }
  </style>
</head>
<body>

  <!-- Web View Toolbar -->
  <div class="print-toolbar no-print">
    <div>
      <strong>PinjamGeng Academic FYP Final Report</strong> | Student: <strong>Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)</strong>
    </div>
    <div>
      <button class="print-btn" onclick="window.print()">
        &#128438; Print / Save as PDF (Ctrl + P)
      </button>
    </div>
  </div>
`;

  let bodyContent = `
  ${prelims.getCoverAndPrelims()}
  ${ch1.getChapter1()}
  ${ch2.getChapter2()}
  ${ch3.getChapter3(imagesDir)}
  ${ch4.getChapter4()}
  ${ch5.getChapter5AndBackMatter()}
  `;

  // Standardize headers: Top Left: CC101, Top Right: DIPLOMA IN COMPUTER SCIENCE
  bodyContent = bodyContent.replace(
    /<div class="page-header">[\s\S]*?<\/div>/g,
    '<div class="page-header"><span class="header-left">CC101</span><span class="header-right">DIPLOMA IN COMPUTER SCIENCE</span></div>'
  );

  // Standardize footers: Bottom Right: CC101 — Page X of 95
  bodyContent = bodyContent.replace(
    /<div class="page-footer">[\s\S]*?(?:Page\s+([ivxlcdm\d]+)\s+of\s+\d+)[\s\S]*?<\/div>/gi,
    '<div class="page-footer"><span class="footer-right">CC101 &mdash; Page $1 of 95</span></div>'
  );

  const fullHtml = htmlStart + bodyContent + `
</body>
</html>
`;

  fs.writeFileSync(htmlFile, fullHtml, 'utf8');
  console.log('Successfully built FYP_Report_PinjamGeng.html at:', htmlFile);

// Also generate markdown companion
const mdContent = `# SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM FOR UNIVERSITI POLY-TECH MALAYSIA (PINJAMGENG)
**CATEGORY A – FINAL YEAR PROJECT REPORT (FYP3024)**

**Author:** NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL (AM2412018113)  
**Program:** DIPLOMA IN COMPUTER SCIENCE (CC101)  
**Faculty:** FACULTY OF COMPUTING & MULTIMEDIA (FCOM), UNIVERSITI POLY-TECH MALAYSIA  
**Supervisor:** MADAM JIHADAH BINTI AHMAD  
**Session:** APRIL 2026  

---

## Abstract
Smart Event Equipment Booking and Inventory Management System (PinjamGeng) is developed to streamline and modernize the equipment borrowing and resource allocation procedures at Universiti Poly-Tech Malaysia (UPTM). Currently, student clubs, event committees, faculty lecturers, and campus administrative bodies manage audio-visual, computing, and staging equipment loans using paper-based requisition forms and manual physical logbooks. This traditional process suffers from significant operational friction, including lost application slips, scheduling conflicts, lack of real-time inventory visibility, unverified return conditions, and delayed administrative reporting. Consequently, student organizers frequently experience double-booking of high-demand items such as wireless microphones, HD projectors, and PA systems during peak event periods.

To address these critical challenges, PinjamGeng provides a centralized, web-based digital ecosystem designed with tailored role-based access for student borrowers and equipment administrators. The system introduces an innovative "Smart Event Packages" feature that allows organizers to reserve pre-configured equipment bundles (such as AGM Package, Outdoor Sports Carnival Bundle, and Seminar Exhibition Setup) in a single click, eliminating manual equipment omissions and accelerating the booking workflow. A 2-step booking wizard guides users through event scheduling, purpose verification, and digital regulatory agreement, generating an official downloadable and printable A4 loan agreement slip complete with borrower particulars and signature sections.

For administrative staff and technicians at the Faculty of Computing & Multimedia (FCOM), PinjamGeng provides real-time stock allocation, request review workflows, a dedicated return inspection desk to record physical item condition (Excellent, Good, Fair, Damaged), and an automated maintenance ticketing mechanism that flags damaged gear directly for technical servicing. Built using PHP, MySQL (MariaDB), Apache (XAMPP), and styled with modern Tailwind CSS and FontAwesome under an aesthetic warm campus palette, the platform has undergone comprehensive unit, integration, system, and user acceptance testing (UAT). The evaluation results confirm that PinjamGeng eliminates schedule clashes, reduces equipment requisition time by over 80%, and establishes end-to-end accountability across the university's event operations.

---

*(Full HTML report with complete formatted tables, Black & White vector Flowcharts, Use Case Diagram, ERD, and detailed Screenshot Action Guides is available at: [FYP_Report_PinjamGeng.html](file:///C:/xampp/htdocs/smart_event_equipment/documentation/FYP_Report_PinjamGeng.html))*`;

fs.writeFileSync(mdFile, mdContent, 'utf8');
console.log('Successfully built FYP_Report_PinjamGeng.md at:', mdFile);

