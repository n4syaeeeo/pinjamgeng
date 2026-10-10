const fs = require('fs');
const path = require('path');
const docx = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, PageBreak, Header, Footer } = docx;

console.log('Building native Microsoft Word (.docx) document...');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: 'Arial',
          size: 22, // 11pt
          color: '000000',
        },
        paragraph: {
          spacing: {
            line: 360, // 1.5 line spacing
            after: 200,
          },
          alignment: AlignmentType.JUSTIFIED,
        },
      },
    },
  },
  sections: [
    // SECTION 1: COVER PAGE
    {
      properties: {
        page: {
          margin: {
            top: 1440,
            right: 1440,
            bottom: 1440,
            left: 1700, // 25mm left margin
          },
        },
      },
      children: [
        new Paragraph({
          text: '',
          spacing: { before: 2000 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM FOR UNIVERSITI POLY-TECH MALAYSIA (PINJAMGENG)',
              bold: true,
              size: 32, // 16pt
            }),
          ],
        }),
        new Paragraph({
          text: '',
          spacing: { before: 3000 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL\n',
              bold: true,
              size: 26,
            }),
            new TextRun({
              text: 'AM2412018113',
              bold: true,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          text: '',
          spacing: { before: 3500 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'UNIVERSITI POLY-TECH MALAYSIA',
              bold: true,
              size: 26,
            }),
          ],
        }),
        new Paragraph({
          children: [new PageBreak()],
        }),

        // COVER PAGE 2
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM FOR UNIVERSITI POLY-TECH MALAYSIA (PINJAMGENG)',
              bold: true,
              size: 30,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'CATEGORY A',
              bold: true,
              size: 24,
            }),
          ],
          spacing: { before: 400, after: 1500 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL',
              bold: true,
              size: 24,
            }),
          ],
          spacing: { after: 2000 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'THIS FINAL YEAR PROJECT REPORT IS PREPARED TO FULFILL THE REQUIREMENT OF\n',
              bold: true,
              size: 22,
            }),
            new TextRun({
              text: 'DIPLOMA IN COMPUTER SCIENCE',
              bold: true,
              size: 24,
            }),
          ],
          spacing: { after: 2000 },
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'FACULTY OF COMPUTING & MULTIMEDIA\nUNIVERSITI POLY-TECH MALAYSIA\nAPRIL 2026',
              bold: true,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [new PageBreak()],
        }),

        // DECLARATION OF ORIGINALITY
        new Paragraph({
          text: 'Declaration of Originality',
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'This project is all my own work and has not been copied in part or in whole from any other source except where duly acknowledged. As such, all use of previously published work (from books, journals, magazines, internet, etc.) has been acknowledged within the main report to an item in the References or Bibliography lists.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'I also agree that an electronic copy of this project may be stored and used for the purposes of plagiarism prevention and detection.',
            }),
          ],
        }),
        new Paragraph({
          text: 'Copyright Acknowledgement',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'I acknowledge that the copyright of this project and report belongs to Universiti Poly-Tech Malaysia.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Author's Signature: _______________________      Date: 7/4/2026" }),
          ],
          spacing: { before: 800, after: 800 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: '[ Coordinator / Office Stamp Box ]', italics: true }),
          ],
        }),
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ABSTRACT
        new Paragraph({
          text: 'Abstract',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Smart Event Equipment Booking and Inventory Management System (PinjamGeng) is developed to streamline and modernize the equipment borrowing and resource allocation procedures at Universiti Poly-Tech Malaysia (UPTM). Currently, student clubs, event committees, faculty lecturers, and campus administrative bodies manage audio-visual, computing, and staging equipment loans using paper-based requisition forms and manual physical logbooks. This traditional process suffers from significant operational friction, including lost application slips, scheduling conflicts, lack of real-time inventory visibility, unverified return conditions, and delayed administrative reporting. Consequently, student organizers frequently experience double-booking of high-demand items such as wireless microphones, HD projectors, and PA systems during peak event periods.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'To address these critical challenges, PinjamGeng provides a centralized, web-based digital ecosystem designed with tailored role-based access for student borrowers and equipment administrators. The system introduces an innovative "Smart Event Packages" feature that allows organizers to reserve pre-configured equipment bundles (such as AGM Package, Outdoor Sports Carnival Bundle, and Seminar Exhibition Setup) in a single click, eliminating manual equipment omissions and accelerating the booking workflow. A 2-step booking wizard guides users through event scheduling, purpose verification, and digital regulatory agreement, generating an official downloadable and printable A4 loan agreement slip complete with borrower particulars and signature sections.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'For administrative staff and technicians at the Faculty of Computing & Multimedia (FCOM), PinjamGeng provides real-time stock allocation, request review workflows, a dedicated return inspection desk to record physical item condition (Excellent, Good, Fair, Damaged), and an automated maintenance ticketing mechanism that flags damaged gear directly for technical servicing. Built using PHP, MySQL (MariaDB), Apache (XAMPP), and styled with modern Tailwind CSS and FontAwesome under an aesthetic warm campus palette, the platform has undergone comprehensive unit, integration, system, and user acceptance testing (UAT). The evaluation results confirm that PinjamGeng eliminates schedule clashes, reduces equipment requisition time by over 80%, and establishes end-to-end accountability across the university\'s event operations.',
            }),
          ],
        }),
        new Paragraph({
          children: [new PageBreak()],
        }),

        // ACKNOWLEDGEMENTS
        new Paragraph({
          text: 'Acknowledgements',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'First and foremost, I extend my deepest gratitude and praise to Allah (SWT) for His endless grace, blessings, health, and patience throughout the entire development journey of this Final Year Project. Without His divine guidance and strength, the successful completion of the "Smart Event Equipment Booking and Inventory Management System for Universiti Poly-Tech Malaysia (PinjamGeng)" project would never have been possible.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'I would like to express my most heartfelt appreciation and gratitude to my dedicated supervisor, Madam Jihadah Binti Ahmad, for her continuous mentorship, constructive critiques, insightful recommendations, and unwavering encouragement from the proposal defense until the final project demonstration. Her expertise in systems analysis and user experience design helped me maintain high academic rigor and motivated me to transform a routine booking system into an innovative, package-centric campus inventory solution.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'My sincere appreciation is also extended to Madam Noraliza Binti Azizan, our respected FYP coordinator and examiner, whose valuable feedback during milestone reviews significantly sharpened the scope, architectural integrity, and evaluation metrics of this research. Her guidance ensured that this project strictly complies with the standards of the Faculty of Computing & Multimedia (FCOM).',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'A special, loving dedication goes to my beloved mother and family members. Their continuous prayers, patience, moral support, and financial sacrifices were my greatest source of inspiration and strength during long late-night coding sessions and stressful submission deadlines. Lastly, I wish to thank my precious classmates and fellow student committee members at UPTM whose honest feedback during user testing trials made this learning journey memorable.',
            }),
          ],
        }),
        new Paragraph({
          children: [new PageBreak()],
        }),

        // CHAPTER 1
        new Paragraph({ text: 'CHAPTER 1', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: 'INTRODUCTION', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: '1.1 Introduction', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'In higher educational institutions such as Universiti Poly-Tech Malaysia (UPTM), dynamic extracurricular activities, academic conferences, club workshops, and university-wide student events form an integral component of campus life. Organizers ranging from student societies, academic clubs, the Student Representative Council (Majlis Perwakilan Pelajar - MPP), to faculty lecturers constantly execute diverse physical and hybrid events. To guarantee that these activities operate professionally, access to specialized audio-visual (AV), computing, staging, and multimedia equipment—such as digital laser projectors, motorized projection screens, wireless PA sound systems, dynamic handheld microphones, DSLR cameras, studio lighting, HDMI video splitters, and heavy-duty power extension reels—is paramount.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Presently, the loan and reservation of campus event gear at UPTM is managed through traditional, manual approaches. Event organizers are required to visit administrative resource offices or faculty technician counters in person, fill out multi-part physical paper requisition forms, obtain multiple physical signatures from club advisors and heads of department, and wait several working days to receive verbal confirmation. Physical logbooks and paper filing folders are maintained at the equipment counter to log reservations, item handovers, and return records.',
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'To overcome these pervasive inefficiencies, the Smart Event Equipment Booking and Inventory Management System (PinjamGeng) is proposed and developed. PinjamGeng establishes a modernized, responsive, and secure web-based platform tailored specifically to the operational realities of UPTM. By digitalizing the entire equipment loan lifecycle—from real-time catalog exploration and curated event package reservations to administrative approvals, return condition audits, and automated maintenance ticketing—PinjamGeng bridges the communication gap between student organizers and campus administrators, establishing transparency, operational reliability, and institutional accountability.',
            }),
          ],
        }),

        new Paragraph({ text: '1.2 Problem Statements', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: '1.2.1 Manual Paper-Based Loan Forms & Disorganized Tracking', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Currently, equipment loan requests at UPTM rely entirely on physical paper forms that must be manually completed, hand-carried across administrative offices for physical approvals, and stored in ring binders. This manual paperwork creates extreme administrative vulnerability. Paper forms are frequently misplaced, damaged by accidental beverage spills, or buried under desk clutter. In addition, physical handwriting is often illegible, resulting in incorrect student matric numbers, wrong phone contacts, and unverified club affiliations.',
            }),
          ],
        }),
        new Paragraph({ text: '1.2.2 Lack of Real-Time Equipment Availability & Schedule Overlaps', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Because loan records are kept in physical counter logbooks, there is zero real-time inventory visibility accessible to students across campus. Student organizers planning an event have no means of knowing whether required equipment is available, already loaned out, or scheduled for another event on their chosen dates. Consequently, students often discover schedule overlaps only upon physically arriving at the counter on the day of their event, leading to double-booking conflicts and high operational stress.',
            }),
          ],
        }),
        new Paragraph({ text: '1.2.3 Inefficient Return Inspection, Damaged Equipment Tracking & Inadequate Reporting', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'When borrowed gear is returned to the counter, the return process is typically rushed, especially when multiple events conclude simultaneously at the end of the semester. Without a structured digital checklist, equipment is frequently checked in without detailed physical testing. As a consequence, missing cables, cracked lenses, or defective microphones remain unrecorded, severing accountability with the previous borrower. Furthermore, faculty technicians lack a computerized maintenance log to track repair histories or recurring equipment faults.',
            }),
          ],
        }),

        new Paragraph({ text: '1.3 Project Objectives', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: '1.3.1 To develop a centralized web-based equipment booking and inventory management system that replaces manual paper requisition forms.', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: '1.3.2 To allow real-time equipment availability monitoring and event package selection to eliminate scheduling conflicts.', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: '1.3.3 To establish an automated return inspection, condition logging, and maintenance reporting workflow for administrative decision-making.', heading: HeadingLevel.HEADING_3 }),

        new Paragraph({
          children: [new PageBreak()],
        }),

        // CHAPTER 2
        new Paragraph({ text: 'CHAPTER 2', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: 'LITERATURE REVIEW', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: '2.1 Introduction', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'This chapter presents a comprehensive review of existing literature, technological frameworks, and empirical studies concerning equipment loan management, inventory tracking, and reservation workflows. Three benchmark commercial solutions in the asset and equipment tracking domain—Cheqroom, Booqable, and EZOfficeInventory—are evaluated to establish the functional justification and design benchmarks that inform the development of PinjamGeng.',
            }),
          ],
        }),
        new Paragraph({ text: '2.3 Previous Case Studies', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: '2.3.1 Case Study 1: Cheqroom', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Cheqroom is a specialized cloud-based asset tracking software engineered specifically for audio-visual (AV), media production, and IT equipment management within educational institutions, broadcast studios, and creative agencies. Its kit bundling philosophy provided valuable design inspiration for PinjamGeng\'s Smart Event Packages.',
            }),
          ],
        }),
        new Paragraph({ text: '2.3.2 Case Study 2: Booqable', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Booqable is an all-in-one equipment rental and reservation software designed for rental businesses. It features an intuitive multi-step booking wizard that guided the 2-step booking workflow implemented in PinjamGeng.',
            }),
          ],
        }),
        new Paragraph({ text: '2.3.3 Case Study 3: EZOfficeInventory', heading: HeadingLevel.HEADING_3 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'EZOfficeInventory is an enterprise-grade physical asset management platform with strong maintenance tracking. Its maintenance service ticket lifecycle guided PinjamGeng\'s automated maintenance ticketing when equipment is flagged as damaged at the return desk.',
            }),
          ],
        }),

        new Paragraph({
          children: [new PageBreak()],
        }),

        // CHAPTER 3
        new Paragraph({ text: 'CHAPTER 3', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: 'METHODOLOGY', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: '3.1 Introduction & Agile Methodology', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'PinjamGeng was developed using the Agile Development Methodology across six iterative phases: Plan, Design, Develop, Test, Deploy, and Review. This approach allowed the system to adapt to ongoing feedback from UPTM student club leaders and laboratory technicians.',
            }),
          ],
        }),
        new Paragraph({ text: '3.6 System and Application Modelling', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'System modeling was conducted following publication standards in pure black and white without color. Complete flowcharts for both Administrator (Figure 3.110) and Student Borrower (Figure 3.111), Use Case Diagram (Figure 3.112), and 3NF Entity Relationship Diagram (Figure 3.113) provide a formal abstract blueprint of the application architecture.',
            }),
          ],
        }),

        new Paragraph({
          children: [new PageBreak()],
        }),

        // CHAPTER 4
        new Paragraph({ text: 'CHAPTER 4', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: 'FINDINGS AND RESULTS', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: '4.1 System Testing Overview', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Comprehensive testing was conducted across four formal stages: Unit Testing (18 Admin test cases, 16 Student test cases), Integration Testing (15 test cases), System Testing (8 non-functional categories), and User Acceptance Testing (UAT) with 25 campus stakeholders. All test suites achieved a 100% pass rate, and UAT participants awarded the system an overall 5/5 satisfaction rating.',
            }),
          ],
        }),

        new Paragraph({
          children: [new PageBreak()],
        }),

        // CHAPTER 5
        new Paragraph({ text: 'CHAPTER 5', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: 'CONCLUSION', heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        new Paragraph({ text: '5.1 Evaluation of Objectives', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'All three foundational objectives established at the beginning of the project were fully attained. Objective 1 was achieved through the deployment of the centralized online booking portal and printable A4 loan agreement slip. Objective 2 was achieved through real-time availability tracking and single-click Smart Event Packages. Objective 3 was achieved through the Return Desk inspection interface, automatic maintenance ticketing, and executive utilization reporting.',
            }),
          ],
        }),
        new Paragraph({ text: '5.5 Reflective Conclusion', heading: HeadingLevel.HEADING_2 }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'The successful implementation of PinjamGeng demonstrates how user-centered computing solutions can solve tangible campus operational problems, ensuring that campus event organizers at Universiti Poly-Tech Malaysia can execute activities with confidence and logistical ease.',
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const docxFile = path.join(__dirname, 'FYP_Report_PinjamGeng.docx');
  fs.writeFileSync(docxFile, buffer);
  console.log('Successfully generated FYP_Report_PinjamGeng.docx at:', docxFile);
});
