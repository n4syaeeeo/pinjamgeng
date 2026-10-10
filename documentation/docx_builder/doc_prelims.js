const docx = require('docx');
const { Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } = docx;
const { createPara, createHeading1, createImagePara } = require('./doc_helpers.js');

module.exports = {
  getPrelims: function() {
    return [
      // ==========================================
      // COVER PAGE 1 (OUTER COVER)
      // ==========================================
      new Paragraph({ text: '', spacing: { before: 1200 } }),
      ...createImagePara('uptm_logo.jpg', 130, 130),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 900, after: 2000, line: 380 },
        children: [
          new TextRun({
            text: 'SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM FOR UNIVERSITI POLY-TECH MALAYSIA (PINJAMGENG)',
            font: 'Arial',
            bold: true,
            size: 32, // 16pt
            color: '000000',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 2400, line: 360 },
        children: [
          new TextRun({
            text: 'NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL\n',
            font: 'Arial',
            bold: true,
            size: 26, // 13pt
            color: '000000',
          }),
          new TextRun({
            text: 'AM2412018113',
            font: 'Arial',
            bold: true,
            size: 24, // 12pt
            color: '000000',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { line: 360 },
        children: [
          new TextRun({
            text: 'UNIVERSITI POLY-TECH MALAYSIA',
            font: 'Arial',
            bold: true,
            size: 26,
            color: '000000',
          }),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ==========================================
      // COVER PAGE 2 (TITLE PAGE / FULFILLMENT)
      // ==========================================
      new Paragraph({ text: '', spacing: { before: 400 } }),
      ...createImagePara('uptm_logo.jpg', 105, 105),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 600, after: 1200, line: 380 },
        children: [
          new TextRun({
            text: 'SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM FOR UNIVERSITI POLY-TECH MALAYSIA (PINJAMGENG)\n',
            font: 'Arial',
            bold: true,
            size: 28, // 14pt
            color: '000000',
          }),
          new TextRun({
            text: 'CATEGORY A',
            font: 'Arial',
            bold: true,
            size: 22,
            color: '000000',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 1400, line: 360 },
        children: [
          new TextRun({
            text: 'NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL',
            font: 'Arial',
            bold: true,
            size: 24,
            color: '000000',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 1400, line: 340 },
        children: [
          new TextRun({
            text: 'THIS FINAL YEAR PROJECT REPORT IS PREPARED TO FULFILL THE REQUIREMENT OF\n',
            font: 'Arial',
            bold: true,
            size: 20,
            color: '000000',
          }),
          new TextRun({
            text: 'DIPLOMA IN COMPUTER SCIENCE',
            font: 'Arial',
            bold: true,
            size: 24,
            color: '000000',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { line: 340 },
        children: [
          new TextRun({
            text: 'FACULTY OF COMPUTING & MULTIMEDIA\nUNIVERSITI POLY-TECH MALAYSIA\nAPRIL 2026',
            font: 'Arial',
            bold: true,
            size: 22,
            color: '000000',
          }),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ==========================================
      // DECLARATION OF ORIGINALITY
      // ==========================================
      createHeading1('Declaration of Originality', { alignment: AlignmentType.CENTER, spacingBefore: 400 }),
      createPara(
        'This project is all my own work and has not been copied in part or in whole from any other source except where duly acknowledged. As such, all use of previously published work (from books, journals, magazines, internet, etc.) has been acknowledged within the main report to an item in the References or Bibliography lists.'
      ),
      createPara(
        'I also agree that an electronic copy of this project may be stored and used for the purposes of plagiarism prevention and detection.'
      ),
      createHeading1('Copyright Acknowledgement', { alignment: AlignmentType.CENTER, spacingBefore: 400 }),
      createPara(
        'I acknowledge that the copyright of this project and report belongs to Universiti Poly-Tech Malaysia.'
      ),
      new Paragraph({
        spacing: { before: 800, line: 360 },
        children: [
          new TextRun({
            text: "Author's Signature:  _____________________________________\n",
            font: 'Arial',
            size: 22,
            bold: true,
          }),
          new TextRun({
            text: 'Name:                      NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL\n',
            font: 'Arial',
            size: 22,
          }),
          new TextRun({
            text: 'ID No.:                     AM2412018113\n',
            font: 'Arial',
            size: 22,
          }),
          new TextRun({
            text: 'Date:                        7 April 2026\n\n',
            font: 'Arial',
            size: 22,
          }),
          new TextRun({
            text: '[ Coordinator / Office Stamp Box ]',
            font: 'Arial',
            size: 20,
            italics: true,
            color: '666666',
          }),
        ],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ==========================================
      // ABSTRACT
      // ==========================================
      createHeading1('Abstract', { alignment: AlignmentType.CENTER, spacingBefore: 300 }),
      createPara(
        'Smart Event Equipment Booking and Inventory Management System (PinjamGeng) is developed to streamline and modernize the equipment borrowing and resource allocation procedures at Universiti Poly-Tech Malaysia (UPTM). Currently, student clubs, event committees, faculty lecturers, and campus administrative bodies manage audio-visual, computing, and staging equipment loans using paper-based requisition forms and manual physical logbooks. This traditional process suffers from significant operational friction, including lost application slips, scheduling conflicts, lack of real-time inventory visibility, unverified return conditions, and delayed administrative reporting. Consequently, student organizers frequently experience double-booking of high-demand items such as wireless microphones, HD projectors, and PA systems during peak event periods.'
      ),
      createPara(
        'To address these critical challenges, PinjamGeng provides a centralized, web-based digital ecosystem designed with tailored role-based access for student borrowers and equipment administrators. The system introduces an innovative "Smart Event Packages" feature that allows organizers to reserve pre-configured equipment bundles (such as AGM Package, Outdoor Sports Carnival Bundle, and Seminar Exhibition Setup) in a single click, eliminating manual equipment omissions and accelerating the booking workflow. A 2-step booking wizard guides users through event scheduling, purpose verification, and digital regulatory agreement, generating an official downloadable and printable A4 loan agreement slip complete with borrower particulars and signature sections.'
      ),
      createPara(
        'For administrative staff and technicians at the Faculty of Computing & Multimedia (FCOM), PinjamGeng provides real-time stock allocation, request review workflows, a dedicated return inspection desk to record physical item condition (Excellent, Good, Fair, Damaged), and an automated maintenance ticketing mechanism that flags damaged gear directly for technical servicing. Built using PHP, MySQL (MariaDB), Apache (XAMPP), and styled with modern Tailwind CSS and FontAwesome under an aesthetic warm campus palette, the platform has undergone comprehensive unit, integration, system, and user acceptance testing (UAT). The evaluation results confirm that PinjamGeng eliminates schedule clashes, reduces equipment requisition time by over 80%, and establishes end-to-end accountability across the university\'s event operations.'
      ),
      new Paragraph({ children: [new PageBreak()] }),

      // ==========================================
      // ACKNOWLEDGEMENTS
      // ==========================================
      createHeading1('Acknowledgements', { alignment: AlignmentType.CENTER, spacingBefore: 300 }),
      createPara(
        'First and foremost, I extend my deepest gratitude and praise to Allah (SWT) for His endless grace, blessings, health, and patience throughout the entire development journey of this Final Year Project. Without His divine guidance and strength, the successful completion of the "Smart Event Equipment Booking and Inventory Management System for Universiti Poly-Tech Malaysia (PinjamGeng)" project would never have been possible.'
      ),
      createPara(
        'I would like to express my most heartfelt appreciation and gratitude to my dedicated supervisor, Madam Jihadah Binti Ahmad, for her continuous mentorship, constructive critiques, insightful recommendations, and unwavering encouragement from the proposal defense until the final project demonstration. Her expertise in systems analysis and user experience design helped me maintain high academic rigor and motivated me to transform a routine booking system into an innovative, package-centric campus inventory solution.'
      ),
      createPara(
        'My sincere appreciation is also extended to Madam Noraliza Binti Azizan, our respected FYP coordinator and examiner, whose valuable feedback during milestone reviews significantly sharpened the scope, architectural integrity, and evaluation metrics of this research. Special loving dedication goes to my beloved mother and family members whose sacrifices sustained me. Lastly, I wish to thank my precious classmates and fellow student committee members at UPTM whose feedback during user testing made this project a success.'
      ),
      new Paragraph({ children: [new PageBreak()] }),

      // ==========================================
      // TABLE OF CONTENTS PLACEHOLDER
      // ==========================================
      createHeading1('Table of Contents', { alignment: AlignmentType.CENTER }),
      createPara('Declaration of Originality ................................................................................................................................... ii'),
      createPara('Abstract ............................................................................................................................................................. iii'),
      createPara('Acknowledgements ............................................................................................................................................. iv'),
      createPara('Table of Contents ................................................................................................................................................. v'),
      createPara('List of Tables ..................................................................................................................................................... viii'),
      createPara('List of Figures ...................................................................................................................................................... ix'),
      createPara('CHAPTER 1: INTRODUCTION ........................................................................................................................... 14'),
      createPara('  1.1 Introduction ............................................................................................................................................... 14'),
      createPara('  1.2 Problem Statements .................................................................................................................................. 15'),
      createPara('  1.3 Project Objectives ..................................................................................................................................... 16'),
      createPara('  1.4 Scope and Target User ................................................................................................................................ 17'),
      createPara('  1.5 Project Requirement ................................................................................................................................... 19'),
      createPara('  1.6 Conclusion .................................................................................................................................................. 20'),
      createPara('CHAPTER 2: LITERATURE REVIEW ................................................................................................................. 21'),
      createPara('  2.1 Introduction ............................................................................................................................................... 21'),
      createPara('  2.2 Investigation .............................................................................................................................................. 21'),
      createPara('  2.3 Previous Case Studies (Cheqroom, Booqable, EZOfficeInventory) ................................................................. 23'),
      createPara('  2.4 Comparison ............................................................................................................................................... 36'),
      createPara('  2.5 Discussion ................................................................................................................................................. 37'),
      createPara('  2.6 Conclusion .................................................................................................................................................. 38'),
      createPara('CHAPTER 3: METHODOLOGY ........................................................................................................................... 39'),
      createPara('  3.1 Introduction ............................................................................................................................................... 39'),
      createPara('  3.2 Agile Methodology ..................................................................................................................................... 39'),
      createPara('  3.3 Phases in Agile Methodology ..................................................................................................................... 40'),
      createPara('  3.4 Data Gathering and Requirements Survey Analysis ..................................................................................... 43'),
      createPara('  3.5 Interface Design ....................................................................................................................................... 50'),
      createPara('    3.5.1 Wireframe (Low-Fidelity Blueprint Designs) .................................................................................... 50'),
      createPara('    3.5.2 Actual Interface (High-Fidelity Implemented System) .................................................................... 59'),
      createPara('  3.6 System and Application Modelling (Flowcharts, Use Case, ERD, Data Dictionaries) ..................................... 91'),
      createPara('  3.7 Conclusion ................................................................................................................................................. 101'),
      createPara('CHAPTER 4: FINDINGS AND RESULTS ............................................................................................................. 102'),
      createPara('  4.1 Introduction ............................................................................................................................................... 102'),
      createPara('  4.2 System Evaluation (Unit Testing, Integration Testing, System Testing, UAT) ............................................... 102'),
      createPara('  4.3 Discussion & Evaluation of Results ............................................................................................................ 124'),
      createPara('  4.4 Conclusion ................................................................................................................................................. 125'),
      createPara('CHAPTER 5: CONCLUSION ............................................................................................................................... 126'),
      createPara('  5.1 Introduction ............................................................................................................................................... 126'),
      createPara('  5.2 Project Achievement ................................................................................................................................. 126'),
      createPara('  5.3 Project Constraint and Limitation ................................................................................................................ 127'),
      createPara('  5.4 Recommendation and Future Work ............................................................................................................. 128'),
      createPara('  5.5 Conclusion ................................................................................................................................................. 133'),
      createPara('APPENDICES & BACK MATTER ........................................................................................................................ 134'),
      createPara('  Appendix A – Questionnaire ............................................................................................................................. 134'),
      createPara('  Appendix B – User Manual (Demonstration Video & GitHub Links) ................................................................... 141'),
      createPara('  References ....................................................................................................................................................... 142'),
      createPara('  Originality Result (Turnitin Report Placeholder) .................................................................................................. 145'),
      createPara('  Log Book (14-Week Consultation Log) ............................................................................................................. 150'),
      new Paragraph({ children: [new PageBreak()] }),

      // ==========================================
      // LIST OF FIGURES
      // ==========================================
      createHeading1('List of Figures', { alignment: AlignmentType.CENTER }),
      createPara('Figure 2.1: Cheqroom Equipment Tracking Interface ............................................................................................. 25'),
      createPara('Figure 2.2: Booqable Rental & Inventory Dashboard ................................................................................................. 27'),
      createPara('Figure 2.3: EZOfficeInventory Asset Management Portal ......................................................................................... 32'),
      createPara('Figure 3.1: Agile Software Development Lifecycle (Kumar, 2025) ........................................................................... 39'),
      createPara('Figure 3.2: Requirements Survey - Respondent Role Distribution at UPTM ......................................................... 43'),
      createPara('Figure 3.3: Requirements Survey - Event Management Experience Distribution .................................................... 44'),
      createPara('Figure 3.4: Requirements Survey - Equipment Borrowing Frequency per Semester ............................................... 44'),
      createPara('Figure 3.5: Requirements Survey - High-Demand Equipment Categories at UPTM ................................................... 45'),
      createPara('Figure 3.6: Requirements Survey - Requisition Approval Delay Incidences ............................................................ 45'),
      createPara('Figure 3.7: Requirements Survey - Double-Booking & Schedule Clash Frequency ................................................. 46'),
      createPara('Figure 3.8: Requirements Survey - Damaged & Missing Equipment Incidences ....................................................... 46'),
      createPara('Figure 3.9: Requirements Survey - Student Committee Demand for Smart Event Packages ................................. 47'),
      createPara('Figure 3.10: Requirements Survey - Necessity of Real-Time Stock Indicators ........................................................ 47'),
      createPara('Figure 3.11: Requirements Survey - Endorsement of Official Printable Loan Voucher .............................................. 48'),
      createPara('Figure 3.12: Requirements Survey - Stakeholder Support for PinjamGeng Implementation ..................................... 48'),
      createPara('Figure 3.13: Requirements Survey - Qualitative Stakeholder Recommendations ..................................................... 49'),
      createPara('Figure 3.14: Wireframe 3.1 - Student Authentication & Portal Login Interface ............................................................ 50'),
      createPara('Figure 3.15: Wireframe 3.2 - Live Equipment Catalog & Real-Time Stock Availability ............................................... 51'),
      createPara('Figure 3.16: Wireframe 3.3 - Pre-Configured "Smart Event Packages" Selection Interface ...................................... 52'),
      createPara('Figure 3.17: Wireframe 3.4 - 2-Step Booking Wizard with Automated Conflict Check .............................................. 53'),
      createPara('Figure 3.18: Wireframe 3.5 - Standardized Downloadable A4 Loan Agreement Voucher ........................................... 54'),
      createPara('Figure 3.19: Wireframe 3.6 - Admin Console Return Desk & Physical Condition Inspection ..................................... 55'),
      createPara('Figure 3.20: Actual Interface - Student Authentication & Portal Login Page ............................................................. 59'),
      createPara('Figure 3.21: Actual Interface - Student Borrower Dashboard & Activity Cockpit ..................................................... 60'),
      createPara('Figure 3.22: Actual Interface - Live Equipment Catalog & Stock Indicators ............................................................. 61'),
      createPara('Figure 3.23: Actual Interface - Pre-Configured "Smart Event Packages" Explorer ...................................................... 62'),
      createPara('Figure 3.24: Actual Interface - 2-Step Equipment Booking Wizard & Schedule Validation ........................................ 63'),
      createPara('Figure 3.25: Actual Interface - Official Downloadable & Printable A4 Loan Agreement Slip ..................................... 64'),
      createPara('Figure 3.26: Actual Interface - Admin Executive Dashboard & Real-Time Status Cockpit ......................................... 65'),
      createPara('Figure 3.27: Actual Interface - Admin Reservation Requests & Approval Desk ........................................................ 66'),
      createPara('Figure 3.28: Actual Interface - Admin Equipment Return Desk & Condition Inspection ............................................. 67'),
      createPara('Figure 3.29: Actual Interface - Admin Master Inventory Management Suite (CRUD) ............................................... 68'),
      createPara('Figure 3.30: Actual Interface - Admin Popup Dialog: Register New Equipment Modal .......................................... 69'),
      createPara('Figure 3.31: Actual Interface - Admin Popup Dialog: Update Equipment Record Modal .......................................... 70'),
      createPara('Figure 3.32: Actual Interface - Admin Action Confirmation Dialog: Booking Approval & Allocation ................. 71'),
      createPara('Figure 3.33: Actual Interface - Borrower Profile & Account Security Management Page ...................................... 72'),
      createPara('Figure 3.34: Actual Interface - High-Resolution Desktop Viewport Layout (1280px) .................................................. 73'),
      createPara('Figure 3.35: Admin Operational Workflow Flowchart (Black & White Publication Standard) ..................................... 91'),
      createPara('Figure 3.36: Student Borrower Workflow Flowchart (Black & White Publication Standard) ..................................... 92'),
      createPara('Figure 3.37: Use Case Diagram for PinjamGeng (UML Standard, Black & White) ..................................................... 94'),
      createPara('Figure 3.38: Entity Relational Diagram (ERD) in 3NF Normalization .......................................................................... 96'),
      createPara('Figure 4.1: UAT Survey - Distribution of Evaluation Participants by Role .............................................................. 118'),
      createPara('Figure 4.2: UAT Survey - System Navigation & Interface Usability Rating .............................................................. 119'),
      createPara('Figure 4.3: UAT Survey - Booking Speed Improvement Compared to Manual Forms ............................................ 119'),
      createPara('Figure 4.4: UAT Survey - Smart Event Packages Clarity & Usability ...................................................................... 120'),
      createPara('Figure 4.5: UAT Survey - Real-Time Stock Availability Transparency .................................................................... 120'),
      createPara('Figure 4.6: UAT Survey - 2-Step Booking Wizard Workflow Satisfaction ................................................................ 121'),
      createPara('Figure 4.7: UAT Survey - Official Printable A4 Loan Slip Formalization Rating ....................................................... 121'),
      createPara('Figure 4.8: UAT Survey - Equipment Return Inspection Desk & Asset Accountability ............................................ 122'),
      createPara('Figure 4.9: UAT Survey - Conflict Checking & Clash Prevention Effectiveness ..................................................... 122'),
      createPara('Figure 4.10: UAT Survey - System Reliability & Execution Stability ........................................................................ 123'),
      createPara('Figure 4.11: UAT Survey - Overall Satisfaction Rating (4.16 / 5.00 Mean Score) ...................................................... 123'),
      createPara('Figure 4.12: UAT Survey - Qualitative Stakeholder Endorsements & Feedback ....................................................... 124'),
      createPara('Figure 5.1: Attainment of Objective 1 - 2-Step Equipment Booking Wizard ........................................................... 140'),
      createPara('Figure 5.2: Attainment of Objective 1 - Official Downloadable A4 Loan Agreement Slip ........................................ 141'),
      createPara('Figure 5.3: Attainment of Objective 2 - Live Equipment Catalog with Real-Time Stock Indicators ....................... 142'),
      createPara('Figure 5.4: Attainment of Objective 2 - Pre-Configured "Smart Event Packages" Explorer ......................................... 143'),
      createPara('Figure 5.5: Attainment of Objective 3 - Return Desk & Physical Condition Inspection Audit ................................. 144'),
      createPara('Figure 5.6: Attainment of Objective 3 - Centralized Booking Management & Status Workflows ........................... 145'),
      createPara('Figure 5.7: Attainment of Objective 3 - Admin Executive Dashboard & Real-Time Stock Analytics ........................ 146'),
      new Paragraph({ children: [new PageBreak()] }),
    ];
  },
};
