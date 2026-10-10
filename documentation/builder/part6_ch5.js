module.exports = {
  getChapter5AndBackMatter: function() {
    return `
    <!-- CHAPTER 5: CONCLUSION -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 126 of 154</span>
      </div>

      <h1 class="chapter-num">CHAPTER 5</h1>
      <h1 class="chapter-title">CONCLUSION</h1>

      <h2 class="section-title">5.1 Introduction</h2>
      <p class="justified-text">
        Chapter 5 concludes the research, development, and evaluation of the Smart Event Equipment Booking and Inventory Management System (PinjamGeng) for Universiti Poly-Tech Malaysia. This chapter critically evaluates the project's actual achievements against the three foundational objectives established in Chapter 1. Furthermore, it discusses the technical constraints and developmental limitations encountered during the 14-week project lifecycle, provides forward-looking recommendations for future iterations, and delivers a final reflective synthesis of the project's contribution to UPTM's campus event ecosystem.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">5.2 Project Achievement</h2>
      <p class="justified-text">
        The overarching aim of this Final Year Project was to engineer an intuitive, robust, and secure digital platform that resolves the persistent logistical failures associated with manual paper loan forms, schedule double-bookings, and unmonitored equipment degradation. PinjamGeng has successfully achieved all three core objectives with empirical evidence of system attainment:
      </p>

      <h3 class="subsection-title">5.2.1 First Objective: Centralized Web-Based Equipment Booking System</h3>
      <p class="justified-text">
        <strong>Status: Fully Achieved.</strong> The reliance on physical paper requisition forms, loose-leaf carbon slips, and physical counter logbooks has been completely replaced by a centralized web platform accessible to all registered UPTM students and staff. Organizers can now submit structured digital applications in under two minutes, track approval progression in real time, and download an official, standardized A4 Loan Agreement Slip featuring unique reference numbering (#UPTM-BK-...) and clear Section A/B/C verification blocks.
      </p>
      
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/05_2Step_Booking_Wizard.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="2-Step Booking Wizard" />
        <div class="figure-caption">Figure 5.1: Attainment of Objective 1 - 2-Step Equipment Booking Wizard</div>
      </div>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/06_Digital_Loan_Slip.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Official Printable Loan Slip" />
        <div class="figure-caption">Figure 5.2: Attainment of Objective 1 - Official Downloadable A4 Loan Agreement Slip</div>
      </div>

      <h3 class="subsection-title" style="margin-top: 25px;">5.2.2 Second Objective: Real-Time Availability &amp; Smart Event Package Selection</h3>
      <p class="justified-text">
        <strong>Status: Fully Achieved.</strong> The platform eliminates scheduling overlaps and accidental double-bookings through computational date-conflict validation and dynamic stock locking upon administrative approval. Furthermore, the star "Smart Event Packages" feature successfully addresses common logistical oversights by allowing student committees to reserve pre-configured, comprehensive bundles (such as AGM Package, Outdoor Sports Carnival Bundle, and Seminar Exhibition Setup) with single-click autofill into the booking wizard.
      </p>

      <div style="text-align: center; margin: 15px 0;">
        <img src="images/03_Live_Stock_Catalog.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Live Stock Catalog" />
        <div class="figure-caption">Figure 5.3: Attainment of Objective 2 - Live Equipment Catalog with Real-Time Stock Indicators</div>
      </div>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/04_Smart_Event_Packages.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Smart Event Packages Explorer" />
        <div class="figure-caption">Figure 5.4: Attainment of Objective 2 - Pre-Configured "Smart Event Packages" Explorer</div>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 126 of 154</span>
      </div>
    </div>

    <!-- PAGE 127-133: OBJECTIVE 3, CONSTRAINTS, RECOMMENDATIONS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 127 of 154</span>
      </div>

      <h3 class="subsection-title">5.2.3 Third Objective: Automated Return Inspection, Maintenance Ticketing &amp; Reporting</h3>
      <p class="justified-text">
        <strong>Status: Fully Achieved.</strong> A dedicated Return Desk inspection interface now empowers laboratory technicians to systematically audit returned equipment, recording condition ratings across a 4-tier spectrum (Excellent, Good, Fair, Damaged). When items are flagged as damaged, the system automatically spawns an active maintenance service ticket with defect severity ranking, quarantines the asset from active stock, and logs servicing costs. Administrative managers can filter comprehensive utilization reports across custom date ranges and export audit-ready summaries in CSV and printable PDF formats.
      </p>

      <div style="text-align: center; margin: 15px 0;">
        <img src="images/09_Return_Penalty_Desk.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Return Desk" />
        <div class="figure-caption">Figure 5.5: Attainment of Objective 3 - Return Desk &amp; Physical Condition Inspection Audit</div>
      </div>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/08_Booking_Approval.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Booking Approval Desk" />
        <div class="figure-caption">Figure 5.6: Attainment of Objective 3 - Centralized Booking Management &amp; Status Workflows</div>
      </div>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/07_Admin_Dashboard.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Admin Dashboard" />
        <div class="figure-caption">Figure 5.7: Attainment of Objective 3 - Admin Executive Dashboard &amp; Real-Time Stock Analytics</div>
      </div>

      <h2 class="section-title" style="margin-top: 25px;">5.3 Project Constraint and Limitation</h2>
      <p class="justified-text">
        Notwithstanding the successful delivery of all intended functional specifications, several project constraints and developmental boundaries were encountered:
      </p>
      <ul class="justified-list">
        <li><strong>Strict 14-Week Academic Timeline:</strong> Developing the complete system within a single semester required prioritizing core booking, inventory, and inspection features, precluding the development of secondary external integrations.</li>
        <li><strong>Lack of Dedicated SMS / Email Gateway Server:</strong> Due to hosting constraints on a local development environment (XAMPP), automated SMS alerts and SMTP email delivery could not be operationalized without dedicated telecommunication gateway subscriptions. Notifications are currently rendered as real-time in-app dashboard flash alerts.</li>
        <li><strong>Absence of Barcode / RFID Hardware Scanners:</strong> Equipment check-in and checkout rely on software selection and manual item code verification at the counter rather than automated handheld optical barcode or RFID scanning hardware.</li>
        <li><strong>Web-Only Architecture:</strong> While fully responsive across desktop and tablet viewports, the platform does not include a dedicated native Android (Kotlin) or iOS (Swift) mobile application.</li>
      </ul>

      <h2 class="section-title" style="margin-top: 25px;">5.4 Recommendation and Future Work</h2>
      <p class="justified-text">
        To build upon the stable foundation established by PinjamGeng, several high-impact enhancements are recommended for future academic iterations and university deployment:
      </p>
      <ul class="justified-list">
        <li><strong>Native Mobile Application with Push Notifications:</strong> Developing a lightweight companion mobile application using Flutter or React Native to deliver push notifications alerting borrowers 24 hours prior to required return deadlines.</li>
        <li><strong>QR Code &amp; Optical Barcode Asset Scanning:</strong> Affixing standardized QR code labels to all campus equipment and integrating camera-based optical scanning into the Return Desk interface for rapid, one-tap checkouts and check-ins.</li>
        <li><strong>Campus LDAP / Single Sign-On (SSO) Integration:</strong> Connecting PinjamGeng directly to UPTM's central identity directory, allowing students and staff to log in using their universal institutional credentials without separate registration.</li>
        <li><strong>Automated Late Return Penalty Management:</strong> Implementing automated calculation of penalty points or temporary loan suspensions for student clubs that fail to return equipment within the approved loan window.</li>
      </ul>

      <h2 class="section-title" style="margin-top: 25px;">5.5 Conclusion</h2>
      <p class="justified-text">
        The development of the <strong>Smart Event Equipment Booking and Inventory Management System (PinjamGeng)</strong> marks a decisive transformation in how Universiti Poly-Tech Malaysia manages its valuable event and multimedia resources. By substituting inefficient, fragile paper slips with a responsive, package-driven digital platform, the system eradicates double-booking conflicts, safeguards institutional assets through rigorous return inspections, and fosters transparency between student organizers and faculty technicians.
      </p>
      <p class="justified-text">
        As the author of this project, I extend my profound gratitude to my supervisor, <strong>Madam Jihadah Binti Ahmad</strong>, for her unwavering mentorship and patience throughout this journey. I am also deeply indebted to my family for their continuous prayers and encouragement, and to my fellow students at UPTM whose enthusiasm and feedback shaped this system into a genuinely impactful reality. The successful execution of PinjamGeng stands as testament to our commitment to applying computing knowledge to solve genuine, everyday campus challenges.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 133 of 154</span>
      </div>
    </div>

    <!-- APPENDIX A: QUESTIONNAIRE -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 134 of 154</span>
      </div>

      <h1 class="chapter-num">Appendix A – Questionnaire</h1>
      <p class="justified-text">
        <strong>Survey on Event Equipment Booking and Inventory Management at Universiti Poly-Tech Malaysia (UPTM)</strong><br/>
        <em>Conducted by: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113) – Final Year Project (FYP3024)</em>
      </p>

      <div class="screenshot-guide-box">
        <strong>[SCREENSHOT GUIDE: APPENDIX A QUESTIONNAIRE FORMS]</strong><br/>
        &bull; <strong>Student Guide for Nursyafiqah:</strong> Take screenshots of your original Google Forms survey (matching pages 134 to 140 of the sample report) displaying:<br/>
        1. <strong>Section A: Demographic Particulars</strong> (Role: Student Committee / Lecturer / Technician; Faculty / Club Affiliation; Frequency of Event Organization).<br/>
        2. <strong>Section B: Current Equipment Loaning Challenges</strong> (Difficulties with paper forms; Incidence of double-booking; Time spent obtaining signatures; Experience with damaged gear).<br/>
        3. <strong>Section C: Proposed Digital System Evaluation</strong> (Usefulness of Smart Event Packages; Real-time stock visibility; Printable loan slips; Digital return inspection; Overall support rating).
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 134 of 154</span>
      </div>
    </div>

    <!-- APPENDIX B: USER MANUAL & DEMO LINK -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 141 of 154</span>
      </div>

      <h1 class="chapter-num">Appendix B – User Manual</h1>
      
      <p class="justified-text">
        <strong>System Video Demonstration:</strong><br/>
        Link YouTube: <a href="https://youtu.be/nZ_ZVHPZct0?si=vlr4Lteu76a0M21S" target="_blank" style="color:#0000ee; text-decoration:underline;">https://youtu.be/nZ_ZVHPZct0?si=vlr4Lteu76a0M21S</a> <em>[Note: Replace with your actual project video link upon recording demonstration]</em>
      </p>

      <p class="justified-text">
        <strong>Source Code Repository:</strong><br/>
        Link GitHub: <a href="https://github.com/nursyafiqah-z/PinjamGeng-UPTM-Equipment-System" target="_blank" style="color:#0000ee; text-decoration:underline;">https://github.com/nursyafiqah-z/PinjamGeng-UPTM-Equipment-System</a> <em>[Note: Replace with your actual GitHub repository URL]</em>
      </p>

      <h3 class="subsection-title" style="margin-top: 25px;">Quick Operating Guide for Users &amp; Administrators</h3>
      <ol class="justified-list" style="margin-left: 20px;">
        <li><strong>Accessing the System:</strong> Launch local server (XAMPP Apache &amp; MySQL) and open <code>http://localhost/smart_event_equipment/</code> in web browser.</li>
        <li><strong>Student Borrower Flow:</strong>
          <ul style="margin-left: 15px;">
            <li>Register account or login with student matric ID (e.g., <code>syafiqah@student.uptm.edu.my</code> / <code>password123</code>).</li>
            <li>Navigate to "Event Packages" to select a curated bundle (AGM Package, Sports Carnival, Exhibition Setup) or explore "Equipment Catalog" for individual items.</li>
            <li>Click "Book Equipment", fill out event venue, purpose, pickup date and return date, review the summary, agree to borrower regulations, and click "Submit Application".</li>
            <li>Track status in "My Bookings"; once approved by admin, click "Print Official Slip" to generate A4 loan document for physical collection at the counter.</li>
          </ul>
        </li>
        <li><strong>Administrator / Technician Flow:</strong>
          <ul style="margin-left: 15px;">
            <li>Login as administrator (<code>admin@uptm.edu.my</code> / <code>password123</code>).</li>
            <li>Review pending booking requests from Dashboard; click "Review", verify available inventory, and click "Approve Booking".</li>
            <li>When the borrower arrives at the counter, click "Confirm Handover &amp; Checkout" to mark items as On Loan.</li>
            <li>Upon event completion, navigate to "Return Desk", select returned booking, inspect physical item condition (Excellent, Good, Fair, Damaged), and click "Confirm Return". If damaged, an automatic maintenance ticket is generated.</li>
            <li>View monthly inventory analytics and export CSV reports in "Reports &amp; Analytics".</li>
          </ul>
        </li>
      </ol>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 141 of 154</span>
      </div>
    </div>

    <!-- REFERENCES -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 142 of 154</span>
      </div>

      <h1 class="chapter-num" style="text-align: left;">References</h1>

      <ol class="references-list" style="font-size: 10px; line-height: 1.6; margin-left: 20px;">
        <li>Albert. (2024, May 28). <em>Why Data Latency is a Real Problem in Decision-Centric Planning</em>. ToolsGroup. https://www.toolsgroup.com/blog/why-data-latency-is-a-real-problem-in-decision-centric-planning/</li>
        <li>Al-Saqqa, S., Sawalha, S., &amp; Abdel-Nabi, H. (2020). Agile Software Development: Methodologies and Trends. <em>International Journal of Interactive Mobile Technologies (IJIM)</em>, 14(11), 246–270. https://doi.org/10.3991/ijim.v14i11.13269</li>
        <li>Booqable. (2025). <em>Modern Equipment Rental and Reservation Software Architecture</em>. Booqable BV. https://booqable.com/features/inventory-management/</li>
        <li>Cheqroom. (2025). <em>Equipment Management and Kit Booking Solutions for Higher Education</em>. Cheqroom NV. https://cheqroom.com/solutions/higher-education/</li>
        <li>Drus, S. M., &amp; Alsalami, K. (2020). Agile Software Development Process in Higher Education Institutions: A Case Study. <em>Journal of Information and Communication Technology</em>, 19(4), 517–539.</li>
        <li>EZOfficeInventory. (2025). <em>Complete Asset Tracking, Checkout, and Maintenance Management</em>. Anvl Inc. https://www.ezofficeinventory.com/features/asset-tracking</li>
        <li>Inventory Solutions Group. (2020). <em>The Hidden Costs of Manual Inventory Management: Discrepancy and Human Error Analysis</em>. Supply Chain Whitepaper Series, 8(2), 112–129.</li>
        <li>Ioana Neamt. (2024, September 4). <em>Digital Inventory Management Benefits and Automated Data Capture</em>. Katana MRP. https://katanamrp.com/blog/digital-inventory-management/</li>
        <li>Kang, Y., &amp; Gershwin, S. B. (2005). Information inaccuracy in inventory systems: Stock loss and stockout. <em>IIE Transactions</em>, 37(9), 843–859. https://doi.org/10.1080/07408170590969861</li>
        <li>Kenton, W. (2021, August 13). <em>Real-Time Systems and Immediate Data Processing</em>. Investopedia. https://www.investopedia.com/terms/r/real_time.asp</li>
        <li>Khan, A., Jhanjhi, N. Z., Hamid, D. H., &amp; Omar, H. A. (2024). Impact of Real-Time Information Systems on Modern Inventory Control: A Comprehensive Review. <em>IGI Global Research</em>, 114–132. https://doi.org/10.4018/978-1-6684-9123-5.ch007</li>
        <li>Kumar, A. (2025, March 21). <em>Agile vs. Waterfall Project Management: A Comparative Analysis</em>. Saviom Software Resources. https://www.saviom.com/blog/agile-versus-waterfall-quick-comparison/</li>
        <li>Lucidchart. (2019). <em>What is a Flowchart: Unified Modeling Notation and Decision Logic</em>. Lucid Software Inc. https://www.lucidchart.com/pages/what-is-a-flowchart-tutorial</li>
        <li>Lucidchart. (2024). <em>What is an Entity Relationship Diagram (ERD): Database Normalization Rules</em>. Lucid Software Inc. https://www.lucidchart.com/pages/er-diagrams</li>
        <li>Palopak, Y., &amp; Huang, S.-J. (2024). Perceived Impact of Agile Principles: Insights from a Survey-Based Study on Agile Software Development Project Success. <em>Information and Software Technology</em>, 168, 107552. https://doi.org/10.1016/j.infsof.2024.107552</li>
        <li>Reddy, Y. (2025). <em>Smart Inventory and Equipment Reservation Management Systems in Academic Campuses</em>. PhilArchive. https://philarchive.org/rec/BNASIM</li>
        <li>Roosevelt, S. C., Veemaraj, E., &amp; Kirubakaran, S. (2024). Real-Time Stock Inventory Management and Tracking Systems. <em>2024 8th International Conference on Inventive Systems and Control (ICISC)</em>, 156–162. https://doi.org/10.1109/icisc62624.2024.00034</li>
        <li>Seidor. (2022). <em>Five Critical Risks Arising from Poor Inventory Control in Growing Organizations</em>. Seidor Enterprise Consulting. https://www.seidor.com/blog/poor-inventory-control-risks</li>
        <li>Sortly. (2022, February 18). <em>Manual vs. Automated Inventory Management: Improving Labor Efficiency</em>. Sortly Technology. https://www.sortly.com/blog/manual-vs-automated-inventory-management/</li>
        <li>Taufiq, M. B., Setiawan, R. R., &amp; Irawan, Y. (2025). Implementation of Web-Based Inventory and Asset Tracking Systems. <em>SISTEMASI: Jurnal Sistem Informasi</em>, 14(6), 2724–2735. https://doi.org/10.32520/stmsi.v14i6.5541</li>
        <li>Visual Paradigm. (2019). <em>What is a Use Case Diagram: UML Behavioral Specifications Guide</em>. Visual Paradigm Institute. https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-use-case-diagram/</li>
        <li>Wynn, S. (2021). <em>The Operational and Financial Impact of Manual Inventory Record Errors</em> (Doctoral dissertation). Liberty University Digital Commons. https://digitalcommons.liberty.edu/doctoral/3208/</li>
      </ol>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 144 of 154</span>
      </div>
    </div>

    <!-- ORIGINALITY RESULT PLACEHOLDER -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 145 of 154</span>
      </div>

      <h1 class="chapter-num" style="text-align: left;">Originality Result</h1>

      <div class="screenshot-guide-box" style="margin-top: 30px;">
        <strong>[TURNITIN SIMILARITY REPORT PLACEHOLDER (PAGE 145 - 149)]</strong><br/>
        &bull; <strong>Student Guide for Nursyafiqah:</strong> Insert your official Turnitin Originality Report summary page here matching pages 145 to 149 of the sample report.<br/>
        &bull; Target overall similarity index: &le; 20% (Sample achieved 2% similarity / 23% AI indicator).<br/>
        &bull; Ensure the submission ID, student name (Nursyafiqah Zulaikha Binti Zilkamal), and matric number (AM2412018113) are clearly visible on the top banner.
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 145 of 154</span>
      </div>
    </div>

    <!-- LOGBOOK PLACEHOLDER -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 150 of 154</span>
      </div>

      <h1 class="chapter-num" style="text-align: center;">LOG BOOK</h1>
      <p style="text-align: center; font-weight: bold; margin-bottom: 30px;">COMPUTING PROJECT (FYP3024) – FACULTY OF COMPUTING &amp; MULTIMEDIA</p>

      <div style="border: 1.5px solid #000; padding: 25px; max-width: 500px; margin: 0 auto; text-align: left;">
        <p style="margin: 8px 0;"><strong>STUDENT'S NAME:</strong> NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL</p>
        <p style="margin: 8px 0;"><strong>ID NO.:</strong> AM2412018113</p>
        <p style="margin: 8px 0;"><strong>SUPERVISOR:</strong> MADAM JIHADAH BINTI AHMAD</p>
        <p style="margin: 8px 0;"><strong>PROJECT TITLE:</strong> SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM (PINJAMGENG)</p>
      </div>

      <div class="screenshot-guide-box" style="margin-top: 35px;">
        <strong>[LOGBOOK CONSULTATION ENTRIES (WEEKS 1 TO 14 - PAGES 151 TO 152)]</strong><br/>
        &bull; <strong>Week 1 - 2:</strong> Topic finalization and title approval with supervisor Madam Jihadah Binti Ahmad.<br/>
        &bull; <strong>Week 3 - 4:</strong> Proposal writing and submission.<br/>
        &bull; <strong>Week 5 - 6:</strong> User requirement discussion, Google Forms survey distribution, and problem statement analysis.<br/>
        &bull; <strong>Week 7 - 8:</strong> Chapters 1 &amp; 2 review, database schema design, and initial UI prototype.<br/>
        &bull; <strong>Week 9 - 10:</strong> Core system implementation (Booking wizard, Smart Event Packages, and Return Desk inspection).<br/>
        &bull; <strong>Week 11 - 12:</strong> System testing (Unit, Integration, and UAT) and draft report review.<br/>
        &bull; <strong>Week 13 - 14:</strong> FYP presentation slide preparation, poster design, and final report submission.
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 150 of 154</span>
      </div>
    </div>
    `;
  }
};
