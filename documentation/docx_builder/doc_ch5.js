const docx = require('docx');
const { Paragraph, PageBreak, AlignmentType } = docx;
const {
  createPara,
  createHeading1,
  createHeading2,
  createHeading3,
  createImagePara,
  createDocxTable,
  createCalloutBox,
  createReferencePara,
} = require('./doc_helpers.js');

module.exports = {
  getChapter5AndBackMatter: function() {
    return [
      createHeading1('CHAPTER 5: CONCLUSION'),

      // 5.1 Introduction
      createHeading2('5.1 Introduction'),
      createPara(
        'Chapter 5 concludes the research, development, and evaluation of the Smart Event Equipment Booking and Inventory Management System (PinjamGeng) for Universiti Poly-Tech Malaysia. This chapter critically evaluates the project\'s actual achievements against the three foundational objectives established in Chapter 1. Furthermore, it discusses the technical constraints and developmental limitations encountered during the 14-week project lifecycle, provides forward-looking recommendations for future iterations, and delivers a final reflective synthesis of the project\'s contribution to UPTM\'s campus event ecosystem.'
      ),

      // 5.2 Project Achievement
      createHeading2('5.2 Project Achievement'),
      createPara(
        'The overarching aim of this Final Year Project was to engineer an intuitive, robust, and secure digital platform that resolves the persistent logistical failures associated with manual paper loan forms, schedule double-bookings, and unmonitored equipment degradation. PinjamGeng has successfully achieved all three core objectives with empirical evidence of system attainment:'
      ),

      createHeading3('5.2.1 First Objective: Centralized Web-Based Equipment Booking System'),
      createPara(
        'Status: Fully Achieved. The reliance on physical paper requisition forms, loose-leaf carbon slips, and physical counter logbooks has been completely replaced by a centralized web platform accessible to all registered UPTM students and staff. Organizers can now submit structured digital applications in under two minutes, track approval progression in real time, and download an official, standardized A4 Loan Agreement Slip featuring unique reference numbering (#UPTM-BK-...) and clear Section A/B/C verification blocks.'
      ),
      ...createImagePara('05_2Step_Booking_Wizard.png', 420, 560, 'Figure 5.1: Attainment of Objective 1 - 2-Step Equipment Booking Wizard'),
      new Paragraph({ children: [new PageBreak()] }),
      ...createImagePara('06_Digital_Loan_Slip.png', 420, 560, 'Figure 5.2: Attainment of Objective 1 - Official Downloadable A4 Loan Agreement Slip'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading3('5.2.2 Second Objective: Real-Time Availability & Smart Event Package Selection', { spacingBefore: 250 }),
      createPara(
        'Status: Fully Achieved. The platform eliminates scheduling overlaps and accidental double-bookings through computational date-conflict validation and dynamic stock locking upon administrative approval. Furthermore, the star "Smart Event Packages" feature successfully addresses common logistical oversights by allowing student committees to reserve pre-configured, comprehensive bundles (such as AGM Package, Outdoor Sports Carnival Bundle, and Seminar Exhibition Setup) with single-click autofill into the booking wizard.'
      ),
      ...createImagePara('03_Live_Stock_Catalog.png', 420, 560, 'Figure 5.3: Attainment of Objective 2 - Live Equipment Catalog with Real-Time Stock Indicators'),
      new Paragraph({ children: [new PageBreak()] }),
      ...createImagePara('04_Smart_Event_Packages.png', 420, 560, 'Figure 5.4: Attainment of Objective 2 - Pre-Configured "Smart Event Packages" Explorer'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading3('5.2.3 Third Objective: Automated Return Inspection, Maintenance Ticketing & Reporting', { spacingBefore: 250 }),
      createPara(
        'Status: Fully Achieved. A dedicated Return Desk inspection interface now empowers laboratory technicians to systematically audit returned equipment, recording condition ratings across a 4-tier spectrum (Excellent, Good, Fair, Damaged). When items are flagged as damaged, the system automatically spawns an active maintenance service ticket with defect severity ranking, quarantines the asset from active stock, and logs servicing costs. Administrative managers can filter comprehensive utilization reports across custom date ranges and export audit-ready summaries in CSV and printable PDF formats.'
      ),
      ...createImagePara('09_Return_Penalty_Desk.png', 420, 560, 'Figure 5.5: Attainment of Objective 3 - Return Desk & Physical Condition Inspection Audit'),
      new Paragraph({ children: [new PageBreak()] }),
      ...createImagePara('08_Booking_Approval.png', 420, 560, 'Figure 5.6: Attainment of Objective 3 - Centralized Booking Management & Status Workflows'),
      new Paragraph({ children: [new PageBreak()] }),
      ...createImagePara('07_Admin_Dashboard.png', 420, 560, 'Figure 5.7: Attainment of Objective 3 - Admin Executive Dashboard & Real-Time Stock Analytics'),
      new Paragraph({ children: [new PageBreak()] }),

      // 5.3 Project Constraint and Limitation
      createHeading2('5.3 Project Constraint and Limitation', { spacingBefore: 300 }),
      createPara(
        'Notwithstanding the successful delivery of all intended functional specifications, several project constraints and developmental boundaries were encountered:'
      ),
      createPara(
        '1. Strict 14-Week Academic Timeline: Developing the complete system within a single semester required prioritizing core booking, inventory, and inspection features, precluding the development of secondary external integrations.'
      ),
      createPara(
        '2. Lack of Dedicated SMS / Email Gateway Server: Due to hosting constraints on a local development environment (XAMPP), automated SMS alerts and SMTP email delivery could not be operationalized without dedicated telecommunication gateway subscriptions. Notifications are currently rendered as real-time in-app dashboard flash alerts.'
      ),
      createPara(
        '3. Absence of Barcode / RFID Hardware Scanners: Equipment check-in and checkout rely on software selection and manual item code verification at the counter rather than automated handheld optical barcode or RFID scanning hardware.'
      ),
      createPara(
        '4. Web-Only Architecture: While fully responsive across desktop and tablet viewports, the platform does not include a dedicated native Android (Kotlin) or iOS (Swift) mobile application.'
      ),

      // 5.4 Recommendation and Future Work
      createHeading2('5.4 Recommendation and Future Work', { spacingBefore: 250 }),
      createPara(
        'To build upon the stable foundation established by PinjamGeng, several high-impact enhancements are recommended for future academic iterations and university deployment:'
      ),
      createPara(
        '1. Native Mobile Application with Push Notifications: Developing a lightweight companion mobile application using Flutter or React Native to deliver push notifications alerting borrowers 24 hours prior to required return deadlines.'
      ),
      createPara(
        '2. QR Code & Optical Barcode Asset Scanning: Affixing standardized QR code labels to all campus equipment and integrating camera-based optical scanning into the Return Desk interface for rapid, one-tap checkouts and check-ins.'
      ),
      createPara(
        '3. Campus LDAP / Single Sign-On (SSO) Integration: Connecting PinjamGeng directly to UPTM\'s central identity directory, allowing students and staff to log in using their universal institutional credentials without separate registration.'
      ),
      createPara(
        '4. Automated Late Return Penalty Management: Implementing automated calculation of penalty points or temporary loan suspensions for student clubs that fail to return equipment within the approved loan window.'
      ),

      // 5.5 Conclusion
      createHeading2('5.5 Conclusion', { spacingBefore: 250 }),
      createPara(
        'The development of the Smart Event Equipment Booking and Inventory Management System (PinjamGeng) marks a decisive transformation in how Universiti Poly-Tech Malaysia manages its valuable event and multimedia resources. By substituting inefficient, fragile paper slips with a responsive, package-driven digital platform, the system eradicates double-booking conflicts, safeguards institutional assets through rigorous return inspections, and fosters transparency between student organizers and faculty technicians.'
      ),
      createPara(
        'As the author of this project, I extend my profound gratitude to my supervisor, Madam Jihadah Binti Ahmad, for her unwavering mentorship and patience throughout this journey. I am also deeply indebted to my family for their continuous prayers and encouragement, and to my fellow students at UPTM whose enthusiasm and feedback shaped this system into a genuinely impactful reality. The successful execution of PinjamGeng stands as testament to our commitment to applying computing knowledge to solve genuine, everyday campus challenges.'
      ),
      new Paragraph({ children: [new PageBreak()] }),

      // ==========================================
      // APPENDICES & BACK MATTER
      // ==========================================

      // Appendix A: Questionnaire
      createHeading1('Appendix A – Questionnaire'),
      createPara(
        'Survey on Event Equipment Booking and Inventory Management at Universiti Poly-Tech Malaysia (UPTM)\nConducted by: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113) – Final Year Project (FYP3024)',
        { italic: true }
      ),
      createCalloutBox('[SCREENSHOT GUIDE: APPENDIX A QUESTIONNAIRE FORMS]', [
        'Student Guide for Nursyafiqah: Take screenshots of your original Google Forms survey (matching pages 134 to 140 of the sample report) displaying:',
        '1. Section A: Demographic Particulars (Role: Student Committee / Lecturer / Technician; Faculty / Club Affiliation; Frequency of Event Organization).',
        '2. Section B: Current Equipment Loaning Challenges (Difficulties with paper forms; Incidence of double-booking; Time spent obtaining signatures; Experience with damaged gear).',
        '3. Section C: Proposed Digital System Evaluation (Usefulness of Smart Event Packages; Real-time stock visibility; Printable loan slips; Digital return inspection; Overall support rating).',
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // Appendix B: User Manual
      createHeading1('Appendix B – User Manual'),
      createPara(
        'System Video Demonstration:\nLink YouTube: https://youtu.be/nZ_ZVHPZct0?si=vlr4Lteu76a0M21S [Note: Replace with your actual project video link upon recording demonstration]',
        { bold: true }
      ),
      createPara(
        'Source Code Repository:\nLink GitHub: https://github.com/nursyafiqah-z/PinjamGeng-UPTM-Equipment-System [Note: Replace with your actual GitHub repository URL]',
        { bold: true }
      ),
      createHeading3('Quick Operating Guide for Users & Administrators', { spacingBefore: 200 }),
      createPara(
        '1. Accessing the System: Launch local server (XAMPP Apache & MySQL) and open http://localhost/smart_event_equipment/ in web browser.'
      ),
      createPara(
        '2. Student Borrower Flow:\n• Register account or login with student matric ID (e.g., syafiqah@student.uptm.edu.my / password123).\n• Navigate to "Event Packages" to select a curated bundle (AGM Package, Sports Carnival, Exhibition Setup) or explore "Equipment Catalog" for individual items.\n• Click "Book Equipment", fill out event venue, purpose, pickup date and return date, review the summary, agree to borrower regulations, and click "Submit Application".\n• Track status in "My Bookings"; once approved by admin, click "Print Official Slip" to generate A4 loan document for physical collection at the counter.'
      ),
      createPara(
        '3. Administrator / Technician Flow:\n• Login as administrator (admin@uptm.edu.my / password123).\n• Review pending booking requests from Dashboard; click "Review", verify available inventory, and click "Approve Booking".\n• When the borrower arrives at the counter, click "Confirm Handover & Checkout" to mark items as On Loan.\n• Upon event completion, navigate to "Return Desk", select returned booking, inspect physical item condition (Excellent, Good, Fair, Damaged), and click "Confirm Return". If damaged, an automatic maintenance ticket is generated.\n• View monthly inventory analytics and export CSV reports in "Reports & Analytics".'
      ),
      new Paragraph({ children: [new PageBreak()] }),

      // References (APA 7th Edition with hanging indent)
      createHeading1('References'),
      createReferencePara('Albert. (2024, May 28). Why data latency is a real problem in decision-centric planning. ToolsGroup. https://www.toolsgroup.com/blog/why-data-latency-is-a-real-problem-in-decision-centric-planning/'),
      createReferencePara('Al-Saqqa, S., Sawalha, S., & Abdel-Nabi, H. (2020). Agile software development: Methodologies and trends. International Journal of Interactive Mobile Technologies (IJIM), 14(11), 246–270. https://doi.org/10.3991/ijim.v14i11.13269'),
      createReferencePara('Booqable. (2025). Modern equipment rental and reservation software architecture. Booqable BV. https://booqable.com/features/inventory-management/'),
      createReferencePara('Cheqroom. (2025). Equipment management and kit booking solutions for higher education. Cheqroom NV. https://cheqroom.com/solutions/higher-education/'),
      createReferencePara('Drus, S. M., & Alsalami, K. (2020). Agile software development process in higher education institutions: A case study. Journal of Information and Communication Technology, 19(4), 517–539.'),
      createReferencePara('EZOfficeInventory. (2025). Complete asset tracking, checkout, and maintenance management. Anvl Inc. https://www.ezofficeinventory.com/features/asset-tracking'),
      createReferencePara('Inventory Solutions Group. (2020). The hidden costs of manual inventory management: Discrepancy and human error analysis. Supply Chain Whitepaper Series, 8(2), 112–129.'),
      createReferencePara('Katana MRP. (2024, September 4). Digital inventory management benefits and automated data capture. Katana MRP. https://katanamrp.com/blog/digital-inventory-management/'),
      createReferencePara('Kang, Y., & Gershwin, S. B. (2005). Information inaccuracy in inventory systems: Stock loss and stockout. IIE Transactions, 37(9), 843–859. https://doi.org/10.1080/07408170590969861'),
      createReferencePara('Kenton, W. (2021, August 13). Real-time systems and immediate data processing. Investopedia. https://www.investopedia.com/terms/r/real_time.asp'),
      createReferencePara('Khan, A., Jhanjhi, N. Z., Hamid, D. H., & Omar, H. A. (2024). Impact of real-time information systems on modern inventory control: A comprehensive review. IGI Global Research, 114–132. https://doi.org/10.4018/978-1-6684-9123-5.ch007'),
      createReferencePara('Kumar, A. (2025, March 21). Agile vs. waterfall project management: A comparative analysis. Saviom Software Resources. https://www.saviom.com/blog/agile-versus-waterfall-quick-comparison/'),
      createReferencePara('Lucidchart. (2019). What is a flowchart: Unified modeling notation and decision logic. Lucid Software Inc. https://www.lucidchart.com/pages/what-is-a-flowchart-tutorial'),
      createReferencePara('Lucidchart. (2024). What is an entity relationship diagram (ERD): Database normalization rules. Lucid Software Inc. https://www.lucidchart.com/pages/er-diagrams'),
      createReferencePara('Palopak, Y., & Huang, S.-J. (2024). Perceived impact of agile principles: Insights from a survey-based study on agile software development project success. Information and Software Technology, 168, 107552. https://doi.org/10.1016/j.infsof.2024.107552'),
      createReferencePara('Reddy, Y. (2025). Smart inventory and equipment reservation management systems in academic campuses. PhilArchive. https://philarchive.org/rec/BNASIM'),
      createReferencePara('Roosevelt, S. C., Veemaraj, E., & Kirubakaran, S. (2024). Real-time stock inventory management and tracking systems. 2024 8th International Conference on Inventive Systems and Control (ICISC), 156–162. https://doi.org/10.1109/icisc62624.2024.00034'),
      createReferencePara('Seidor. (2022). Five critical risks arising from poor inventory control in growing organizations. Seidor Enterprise Consulting. https://www.seidor.com/blog/poor-inventory-control-risks'),
      createReferencePara('Sortly. (2022, February 18). Manual vs. automated inventory management: Improving labor efficiency. Sortly Technology. https://www.sortly.com/blog/manual-vs-automated-inventory-management/'),
      createReferencePara('Taufiq, M. B., Setiawan, R. R., & Irawan, Y. (2025). Implementation of web-based inventory and asset tracking systems. SISTEMASI: Jurnal Sistem Informasi, 14(6), 2724–2735. https://doi.org/10.32520/stmsi.v14i6.5541'),
      createReferencePara('Visual Paradigm. (2019). What is a use case diagram: UML behavioral specifications guide. Visual Paradigm Institute. https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-use-case-diagram/'),
      createReferencePara('Wynn, S. (2021). The operational and financial impact of manual inventory record errors (Doctoral dissertation). Liberty University Digital Commons. https://digitalcommons.liberty.edu/doctoral/3208/'),
      new Paragraph({ children: [new PageBreak()] }),

      // Originality Result
      createHeading1('Originality Result'),
      createCalloutBox('[TURNITIN SIMILARITY REPORT PLACEHOLDER (PAGE 145 - 149)]', [
        '• Student Guide for Nursyafiqah: Insert your official Turnitin Originality Report summary page here matching pages 145 to 149 of the sample report.',
        '• Target overall similarity index: <= 20% (Sample achieved 2% similarity / 23% AI indicator).',
        '• Ensure the submission ID, student name (Nursyafiqah Zulaikha Binti Zilkamal), and matric number (AM2412018113) are clearly visible on the top banner.',
      ]),
      new Paragraph({ children: [new PageBreak()] }),

      // Log Book
      ...createImagePara('uptm_logo.jpg', 100, 100),
      createHeading2('FACULTY OF COMPUTING & MULTIMEDIA (FCOM)', { alignment: AlignmentType.CENTER, spacingBefore: 200 }),
      createHeading1('COMPUTING PROJECT (FYP3024) – LOG BOOK', { alignment: AlignmentType.CENTER, spacingBefore: 150 }),
      createDocxTable(
        ['Student Particulars', 'Details'],
        [
          ['STUDENT\'S NAME', 'NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL'],
          ['ID NO.', 'AM2412018113'],
          ['SUPERVISOR', 'MADAM JIHADAH BINTI AHMAD'],
          ['PROJECT TITLE', 'SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM (PINJAMGENG)'],
        ]
      ),
      new Paragraph({ text: '', spacing: { before: 200 } }),
      createCalloutBox('[LOGBOOK CONSULTATION ENTRIES (WEEKS 1 TO 14 - PAGES 151 TO 152)]', [
        '• Week 1 - 2: Topic finalization and title approval with supervisor Madam Jihadah Binti Ahmad.',
        '• Week 3 - 4: Proposal writing and submission.',
        '• Week 5 - 6: User requirement discussion, Google Forms survey distribution, and problem statement analysis.',
        '• Week 7 - 8: Chapters 1 & 2 review, database schema design, and initial UI prototype.',
        '• Week 9 - 10: Core system implementation (Booking wizard, Smart Event Packages, and Return Desk inspection).',
        '• Week 11 - 12: System testing (Unit, Integration, and UAT) and draft report review.',
        '• Week 13 - 14: FYP presentation slide preparation, poster design, and final report submission.',
      ]),
    ];
  },
};
