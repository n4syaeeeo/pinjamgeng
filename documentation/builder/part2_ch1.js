module.exports = {
  getChapter1: function() {
    return `
    <!-- CHAPTER 1: INTRODUCTION -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 14 of 154</span>
      </div>

      <h1 class="chapter-num">CHAPTER 1</h1>
      <h1 class="chapter-title">INTRODUCTION</h1>

      <h2 class="section-title">1.1 Introduction</h2>
      <p class="justified-text">
        In higher educational institutions such as Universiti Poly-Tech Malaysia (UPTM), dynamic extracurricular activities, academic conferences, club workshops, and university-wide student events form an integral component of campus life. Organizers ranging from student societies, academic clubs, the Student Representative Council (Majlis Perwakilan Pelajar - MPP), to faculty lecturers constantly execute diverse physical and hybrid events. To guarantee that these activities operate professionally, access to specialized audio-visual (AV), computing, staging, and multimedia equipment—such as digital laser projectors, motorized projection screens, wireless PA sound systems, dynamic handheld microphones, DSLR cameras, studio lighting, HDMI video splitters, and heavy-duty power extension reels—is paramount.
      </p>
      <p class="justified-text">
        Presently, the loan and reservation of campus event gear at UPTM is managed through traditional, manual approaches. Event organizers are required to visit administrative resource offices or faculty technician counters in person, fill out multi-part physical paper requisition forms, obtain multiple physical signatures from club advisors and heads of department, and wait several working days to receive verbal confirmation. Physical logbooks and paper filing folders are maintained at the equipment counter to log reservations, item handovers, and return records.
      </p>
      <p class="justified-text">
        This traditional paper-based process creates profound operational bottlenecks for both borrowers and equipment custodians. Manual paperwork is prone to being misplaced, damaged, or delayed in inter-departmental transit. More critically, physical logbooks fail to provide real-time inventory visibility. Organizers frequently spend substantial time planning event logistics, only to discover at the counter that critical equipment items have already been reserved by another club or are currently out of service for repairs. During peak campus activity windows—such as Faculty Activity Weeks, Career Fairs, and Annual General Meetings (AGMs)—schedule overlaps, double-bookings, and last-minute gear shortages frequently jeopardize the smooth execution of student events.
      </p>
      <p class="justified-text">
        Furthermore, when equipment is returned at the end of an event, the lack of a standardized inspection workflow makes tracking physical item condition challenging. Counter staff often receive returned items during hurried post-event cleanups without systematically checking whether accessories, connection adapters, or microphones are intact and fully functional. Damaged equipment is frequently shelved unnoticed, only to be discovered broken when the next organizer opens the equipment casing hours before an important presentation.
      </p>
      <p class="justified-text">
        To overcome these pervasive inefficiencies, the <strong>Smart Event Equipment Booking and Inventory Management System (PinjamGeng)</strong> is proposed and developed. PinjamGeng establishes a modernized, responsive, and secure web-based platform tailored specifically to the operational realities of UPTM. By digitalizing the entire equipment loan lifecycle—from real-time catalog exploration and curated event package reservations to administrative approvals, return condition audits, and automated maintenance ticketing—PinjamGeng bridges the communication gap between student organizers and campus administrators, establishing transparency, operational reliability, and institutional accountability.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 14 of 154</span>
      </div>
    </div>

    <!-- PAGE 15 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 15 of 154</span>
      </div>

      <p class="justified-text">
        A standout innovation within PinjamGeng is the introduction of the <strong>"Smart Event Packages"</strong> concept. Recognising that novice student committees often omit essential peripheral equipment when submitting manual requests—such as borrowing a projector but forgetting an HDMI cable, or requesting microphones without a receiver and extension cord—PinjamGeng provides pre-configured, single-click package bundles. Curated configurations for Annual General Meetings, Outdoor Sports Carnivals, and Exhibition Booths automatically bundle the necessary AV and IT hardware, dramatically reducing booking preparation time while eliminating logistical oversights on event day.
      </p>
      <p class="justified-text">
        By transitioning from physical paper slips to an integrated web architecture utilizing PHP, MySQL, Apache, and Tailwind CSS, PinjamGeng replaces subjective guesswork with real-time computational verification. Digital loan agreement slips are generated with unique verifiable booking reference codes (e.g., #UPTM-BK-2026-001) and organized sections for student verification, administrative checkout, and post-event return sign-offs. This automated approach ensures that every campus asset is accounted for, maintenance records are systematically documented, and administrative decision-makers have continuous access to equipment utilization analytics.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">1.2 Problem Statements</h2>
      <p class="justified-text">
        An investigation into the current equipment borrowing practices at Universiti Poly-Tech Malaysia revealed three fundamental operational deficiencies that compromise campus event success and inventory longevity:
      </p>

      <h3 class="subsection-title">1.2.1 Manual Paper-Based Loan Forms &amp; Disorganized Tracking</h3>
      <p class="justified-text">
        Currently, equipment loan requests at UPTM rely entirely on physical paper forms that must be manually completed, hand-carried across administrative offices for physical approvals, and stored in ring binders. This manual paperwork creates extreme administrative vulnerability. Paper forms are frequently misplaced, damaged by accidental beverage spills, or buried under desk clutter. In addition, physical handwriting is often illegible, resulting in incorrect student matric numbers, wrong phone contacts, and unverified club affiliations. When disputes arise regarding who authorized an equipment loan or when items were issued, administrators must search through hundreds of loose sheets, wasting valuable staff hours and causing data duplication.
      </p>

      <h3 class="subsection-title">1.2.2 Lack of Real-Time Equipment Availability &amp; Schedule Overlaps</h3>
      <p class="justified-text">
        Because loan records are kept in physical counter logbooks, there is zero real-time inventory visibility accessible to students across campus. Student organizers planning an event have no means of knowing whether required equipment—such as wireless microphones, high-lumen projectors, or portable PA sound systems—is available, already loaned out, or scheduled for another event on their chosen dates. Consequently, students often discover schedule overlaps only upon physically arriving at the counter on the day of their event, leading to double-booking conflicts, high operational stress, and last-minute cancellations of vital campus activities.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 15 of 154</span>
      </div>
    </div>

    <!-- PAGE 16 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 16 of 154</span>
      </div>

      <h3 class="subsection-title">1.2.3 Inefficient Return Inspection, Damaged Equipment Tracking &amp; Inadequate Reporting</h3>
      <p class="justified-text">
        When borrowed gear is returned to the counter, the return process is typically rushed, especially when multiple events conclude simultaneously at the end of the semester. Without a structured digital checklist, equipment is frequently checked in without detailed physical testing. As a consequence, missing cables, cracked lenses, or defective microphones remain unrecorded, severing accountability with the previous borrower. Furthermore, faculty technicians lack a computerized maintenance log to track repair histories, servicing costs, or recurring equipment faults. Generating periodic inventory audits or utilization reports for faculty management requires labor-intensive manual data consolidation from fragmented paper records, resulting in delayed and inaccurate managerial reporting.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">1.3 Project Objectives</h2>
      <p class="justified-text">
        To systematically resolve the problem statements outlined above, the development of PinjamGeng is guided by three measurable objectives:
      </p>

      <h3 class="subsection-title">1.3.1 To develop a centralized web-based equipment booking and inventory management system</h3>
      <p class="justified-text">
        This objective focuses on eliminating reliance on physical paper requisition slips and decentralized filing binders. The system establishes a secure, unified web portal where student organizers can submit digital booking applications, track reservation statuses, and download official A4 loan agreement slips with clear regulatory terms, while administrators can review, approve, allocate, and monitor equipment loans through an automated dashboard.
      </p>

      <h3 class="subsection-title">1.3.2 To allow real-time equipment availability monitoring and event package selection</h3>
      <p class="justified-text">
        This objective eliminates scheduling clashes, double-bookings, and logistical omissions by providing an interactive live inventory catalog that displays real-time stock levels (available, booked, in maintenance). Furthermore, it integrates curated "Smart Event Packages" tailored for common campus event categories (AGMs, sports carnivals, exhibitions), enabling organizers to bundle complete sets of compatible gear in a single click with automated date-conflict validation.
      </p>

      <h3 class="subsection-title">1.3.3 To establish an automated return inspection, condition logging, and maintenance reporting workflow</h3>
      <p class="justified-text">
        This objective addresses inventory deterioration and lack of accountability by providing a structured digital Return Desk inspection interface. Staff can record physical item conditions (Excellent, Good, Fair, Damaged), note discrepancies, and automatically spawn maintenance service tickets for broken equipment with severity rankings and technician logs. Additionally, the system provides automated statistical reports and CSV/PDF export capabilities to support institutional procurement and audit decisions.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 16 of 154</span>
      </div>
    </div>

    <!-- PAGE 17-18: SCOPE & TARGET USERS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 17 of 154</span>
      </div>

      <h2 class="section-title">1.4 Scope and Target User</h2>

      <h3 class="subsection-title">1.4.1 Project Scope</h3>
      <p class="justified-text">
        The project scope encompasses the design, software development, database architecture, and empirical evaluation of the web-based Smart Event Equipment Booking and Inventory Management System (PinjamGeng) for Universiti Poly-Tech Malaysia (UPTM). The system focuses on managing audio-visual, computing, staging, and photography assets maintained by the Faculty of Computing &amp; Multimedia (FCOM) and central campus facilities.
      </p>
      <p class="justified-text">
        Development incorporates user requirement gathering, system modeling, relational database design, front-end and back-end programming using Visual Studio Code, local hosting via XAMPP (Apache web server and MariaDB database), and version control through Git. Deliverables include a fully operational web application, complete database schema, user documentation, and this academic final year project report.
      </p>
      <p class="justified-text">
        <strong>Project Boundaries &amp; Delimitations:</strong> The system is strictly designed for internal campus equipment loans within UPTM and does not encompass monetary rental transactions, credit card payment gateways, or third-party courier shipping logistics, as equipment pickup and return occur physically at campus resource counters. Furthermore, equipment tracking is software-driven based on unique serial item codes and physical inspection rather than automated RFID/GPS hardware sensors.
      </p>

      <h3 class="subsection-title">1.4.2 Product Scope</h3>
      <p class="justified-text">
        The product scope defines the functional boundaries and capabilities implemented in the software application, divided into two distinct role-based modules:
      </p>
      <ul class="justified-list">
        <li><strong>Student Borrower Module:</strong> User registration, secure login with email/matric ID and password, interactive equipment catalog with category filters, real-time stock indicators, Smart Event Packages explorer with bundle breakdown, 2-step booking wizard with package autofill, date selection and regulatory agreement, personal booking tracking table with status badges (Pending, Approved, On Loan, Returned, Cancelled), booking cancellation for pending requests, and printable A4 official loan agreement slip.</li>
        <li><strong>Administrator / Technician Module:</strong> Administrative secure authentication with brute-force lockout protection, executive KPI dashboard with live counters (Pending Requests, Active Loans, Total Equipment Units, Low Stock &amp; Critical Alerts), booking request queue with modal review, stock allocation, approval and rejection actions, equipment inventory CRUD management (add, edit, delete, stock count update, category assignment), package bundle management (create packages, assign bundled items, edit packages), return desk counter inspection with condition recording (Excellent, Good, Fair, Damaged), automated maintenance ticket generation for damaged gear, maintenance resolution and servicing tracking, and automated reporting suite with date filters, category breakdowns, and PDF/CSV export.</li>
      </ul>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 17 of 154</span>
      </div>
    </div>

    <!-- PAGE 19-20: REQUIREMENTS & CONCLUSION -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 19 of 154</span>
      </div>

      <h3 class="subsection-title">1.4.3 Target User</h3>
      
      <h4 class="sub-subsection-title">1.4.3.1 UPTM Student Club &amp; Society Event Organizers</h4>
      <p class="justified-text">
        The primary end-users are registered UPTM students representing student clubs, sports societies, faculty associations, and the Student Representative Council (MPP). These users require a frictionless, transparent platform to check equipment availability in advance, select appropriate event packages without technical confusion, reserve equipment online without repeated counter visits, and obtain an official printable loan slip for physical pickup.
      </p>

      <h4 class="sub-subsection-title">1.4.3.2 UPTM Equipment Administrators &amp; FCM Technicians</h4>
      <p class="justified-text">
        Administrative users include laboratory technicians, asset officers, and faculty administrators responsible for safeguarding university equipment. These users require tools to verify booking validity, prevent schedule overlaps, record counter checkout and return conditions, track asset wear-and-tear, coordinate technical servicing, and generate comprehensive inventory reports for faculty management.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">1.5 Project Requirement</h2>

      <h3 class="subsection-title">1.5.1 Hardware Requirement</h3>
      <p class="justified-text">
        The hardware specifications utilized for the design, development, and local execution of PinjamGeng are detailed in Table 1.1 below:
      </p>

      <p class="table-caption">Table 1.1: Hardware Requirements</p>
      <table class="data-table">
        <thead>
          <tr><th>Hardware Component</th><th>Development Specification</th></tr>
        </thead>
        <tbody>
          <tr><td>Laptop Model</td><td>HP Laptop 15-fc (15.6-inch)</td></tr>
          <tr><td>Operating System</td><td>Microsoft Windows 11 Home (64-bit)</td></tr>
          <tr><td>Processor (CPU)</td><td>AMD Ryzen 5 7430U with Radeon Graphics (2.30 GHz, 6 Cores)</td></tr>
          <tr><td>Random Access Memory (RAM)</td><td>16.0 GB DDR4 Unified Memory</td></tr>
          <tr><td>Storage Capacity</td><td>512 GB PCIe NVMe M.2 Solid State Drive (SSD)</td></tr>
          <tr><td>Display Resolution</td><td>15.6-inch Full HD (1920 &times; 1080) IPS Anti-glare Display</td></tr>
          <tr><td>System Architecture</td><td>x64-based Processor, 64-bit Operating System</td></tr>
        </tbody>
      </table>

      <h3 class="subsection-title" style="margin-top: 20px;">1.5.2 Software Requirement</h3>
      <p class="justified-text">
        The development tools, programming runtimes, database management systems, and libraries used to construct PinjamGeng are summarized in Table 1.2:
      </p>

      <p class="table-caption">Table 1.2: Software Requirements</p>
      <table class="data-table">
        <thead>
          <tr><th>Software / Tool</th><th>Role &amp; Description</th></tr>
        </thead>
        <tbody>
          <tr><td>Visual Studio Code (VS Code)</td><td>Primary Integrated Development Environment (IDE) for PHP, HTML5, CSS3, JavaScript, and SQL authoring.</td></tr>
          <tr><td>XAMPP Stack (v8.2.12)</td><td>Local server development suite providing the Apache HTTP Server and MariaDB relational database engine.</td></tr>
          <tr><td>PHP (v8.2.12)</td><td>Server-side scripting language for business logic execution, session security, and database communication.</td></tr>
          <tr><td>MySQL / MariaDB</td><td>Relational Database Management System (RDBMS) storing normalized tables for users, equipment, packages, bookings, and tickets.</td></tr>
          <tr><td>Tailwind CSS &amp; FontAwesome</td><td>Modern utility-first CSS framework and comprehensive vector icon library delivering a responsive, warm campus brown aesthetic.</td></tr>
          <tr><td>Google Chrome &amp; Edge</td><td>Cross-platform modern web browsers for interface rendering, DevTools debugging, and responsive viewport validation.</td></tr>
          <tr><td>Git &amp; GitHub</td><td>Distributed version control system and cloud repository hosting for source code tracking and milestone archiving.</td></tr>
        </tbody>
      </table>

      <h2 class="section-title" style="margin-top: 25px;">1.6 Conclusion</h2>
      <p class="justified-text">
        Chapter 1 has established the contextual foundation of this Final Year Project, outlining the background of campus event equipment management at Universiti Poly-Tech Malaysia, the operational challenges associated with manual paper requisition forms, the lack of real-time availability visibility, and the absence of post-event return inspection mechanisms. To address these problems, the project establishes three clear objectives focused on centralized web-based management, package-driven reservation, and structured condition reporting. The scopes, target user personas, and required technical specifications have been comprehensively detailed, setting the roadmap for subsequent literature review, methodological execution, and system implementation.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 20 of 154</span>
      </div>
    </div>
    `;
  }
};
