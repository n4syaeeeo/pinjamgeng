module.exports = {
  getChapter3: function(imagesDir) {
    return `
    <!-- CHAPTER 3: METHODOLOGY -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 39 of 154</span>
      </div>

      <h1 class="chapter-num">CHAPTER 3</h1>
      <h1 class="chapter-title">METHODOLOGY</h1>

      <h2 class="section-title">3.1 Introduction</h2>
      <p class="justified-text">
        A disciplined, structured software development methodology is indispensable for ensuring that a software project is delivered on schedule, fulfills its architectural specifications, and effectively satisfies the operational needs of its target stakeholders. Developing a campus-wide inventory and booking system such as PinjamGeng requires continuous alignment between student event organizers, faculty laboratory technicians, and administrative decision-makers. Recent empirical software engineering studies, such as the comprehensive research by Palopak &amp; Huang (2024), demonstrate that iterative delivery, proactive technical execution, and continuous customer collaboration represent the primary determinants of project success in applied information systems.
      </p>
      <p class="justified-text">
        Accordingly, the <strong>Agile Development Methodology</strong> was selected as the operational framework for the conceptualization, design, development, and testing of PinjamGeng. By segmenting the project lifecycle into iterative two-week sprints, Agile provided the flexibility required to adapt user interface elements, refine booking wizard validation rules, and enhance condition reporting workflows based on direct, ongoing feedback from UPTM student club leaders and laboratory technicians.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">3.2 Agile Methodology</h2>
      <p class="justified-text">
        Unlike traditional linear-sequential frameworks such as the Waterfall model—which mandates that all functional specifications be frozen at the beginning of the project—the Agile methodology embraces change at any stage of development (Al-Saqqa et al., 2020). In a university campus setting, user expectations frequently evolve as stakeholders interact with tangible system prototypes. For instance, initial consultations suggested a simple individual equipment booking form; however, subsequent user reviews revealed that student committees struggled to remember all necessary peripheral accessories, directly inspiring the creation of the star "Smart Event Packages" bundling feature.
      </p>
      <p class="justified-text">
        Studies by Drus &amp; Alsalami (2020) emphasize that Agile's iterative feedback cycles dramatically elevate software quality and user satisfaction by uncovering defects and usability barriers early in the development lifecycle. Through continuous demonstration of working increments, PinjamGeng was systematically refined to deliver a stable, reliable, and aesthetically pleasing platform tailored to UPTM's unique logistical ecosystem.
      </p>

      <div class="figure-container" style="text-align: center; margin: 25px 0;">
        <img src="images/fig_3_1_agile_methodology.png" style="max-width:540px; width:100%; border:1px solid #000;" alt="Figure 3.1: Agile Methodology Execution Phases" />
        <p class="figure-caption">Figure 3.1: Figure Agile Methodology (Kumar, A, 2025)</p>
      </div>

      <h2 class="section-title">3.3 Phases in Agile Methodology</h2>
      <p class="justified-text">
        The Agile lifecycle executed during this project comprised six systematic, recurring phases:
      </p>

      <h3 class="subsection-title">3.3.1 Phase 1: Plan</h3>
      <p class="justified-text">
        The planning phase concentrated on investigating the existing equipment booking workflows at UPTM, identifying root operational friction, and establishing system requirements. Preliminary interviews with student club committees and laboratory staff highlighted that paper slips frequently went missing and double-booking occurred during major campus events. A structured requirements questionnaire was created via Google Forms and distributed among 25 campus stakeholders, validating that 88% of respondents experienced booking difficulties. These findings directly defined the product backlog and functional specifications for PinjamGeng.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 40 of 154</span>
      </div>
    </div>

    <!-- PAGE 41-42 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 41 of 154</span>
      </div>

      <h3 class="subsection-title">3.3.2 Phase 2: Design</h3>
      <p class="justified-text">
        During the design phase, the architectural foundation and user interfaces of PinjamGeng were mapped out. Wireframes were drafted for both student borrower and administrator views, emphasizing simplicity, modern visual hierarchy, and clear calls-to-action. The relational database schema was designed using MySQL, consisting of normalized entities for users, categories, equipment, packages, package items, bookings, booking items, maintenance tickets, and audit logs. Foreign key constraints were established to guarantee relational integrity and prevent orphan records.
      </p>

      <h3 class="subsection-title">3.3.3 Phase 3: Develop</h3>
      <p class="justified-text">
        The development phase involved translating designs into functional, secure software. The backend logic was engineered using modular, procedural PHP (v8.2.12) with PDO prepared statements for comprehensive SQL-injection immunity. The frontend was styled with Tailwind CSS, utilizing a distinctive warm espresso and caramel palette that evokes a modern campus atmosphere. Security features—including cryptographic password hashing via BCrypt, anti-CSRF token verification on all POST forms, session fixation protection, and brute-force rate-limiting lockout—were embedded into the core authentication engine. Key functional milestones included the 2-step booking wizard, package autofill mechanics, return condition auditing, and PDF/CSV export scripts.
      </p>

      <h3 class="subsection-title">3.3.4 Phase 4: Test</h3>
      <p class="justified-text">
        Rigorous testing was conducted across multiple stages: Unit Testing evaluated individual methods and form handlers (such as login credential verification, stock quantity validation, and package item allocation); Integration Testing validated data synchronization across database tables (ensuring stock deductions occurred seamlessly upon booking approval); System Testing confirmed performance, security, and cross-browser responsiveness across Google Chrome and Microsoft Edge; and User Acceptance Testing (UAT) gathered empirical usability ratings from student organizers and technicians.
      </p>

      <h3 class="subsection-title">3.3.5 Phase 5: Deploy</h3>
      <p class="justified-text">
        The system was staged and deployed within an optimized local web server environment using the XAMPP stack on Windows 11. Database migration scripts initialized all tables and seeded realistic campus data (student accounts, audio-visual equipment, curated packages, and loan history). The application was configured for multi-user local area network (LAN) access via IP addressing, allowing testers to interact with the platform on multiple laptops simultaneously.
      </p>

      <h3 class="subsection-title">3.3.6 Phase 6: Review</h3>
      <p class="justified-text">
        In the review phase, feedback gathered during testing trials was analyzed to identify opportunities for enhancement. Based on tester suggestions, the booking cancellation rules were refined to allow borrowers to cancel pending requests without administrative intervention, and warning badges were introduced to alert technicians to equipment flagged for maintenance.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 42 of 154</span>
      </div>
    </div>

    <!-- PAGE 43-49: DATA GATHERING & SURVEY CHARTS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 43 of 154</span>
      </div>

      <h2 class="section-title">3.4 Data Gathering and Requirement</h2>
      <p class="justified-text">
        To ensure that PinjamGeng authentically addresses the real challenges experienced across Universiti Poly-Tech Malaysia, a rigorous requirement gathering exercise was conducted. A structured questionnaire was distributed via Google Forms to campus stakeholders including student club executives (MCSC, MPP, Sports Club), event organizers, and faculty laboratory technicians. The quantitative and qualitative findings directly validated the project problem statements and informed the system's core capabilities.
      </p>

      <h3 class="subsection-title">3.4.1 User Requirement Analysis</h3>
      <p class="justified-text">
        The survey gathered responses across twelve essential dimensions regarding equipment borrowing practices, pain points, and expectations:
      </p>

      <!-- Figure 3.2 & 3.3 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_2_user_questionnaire_1.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.2: User questionnaire 1</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.2, which surveys 25 users at UPTM on their role in campus events, 72% are student club committee members, 16% are faculty lecturers / club advisors, and 12% are equipment administrators or technicians. This confirms that student event organizers represent the primary user demographic.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_3_user_questionnaire_2.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.3: User questionnaire 2</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.3, 44% of respondents borrow equipment on a monthly basis, 32% borrow several times per semester, 16% borrow weekly, and 8% annually. This proves that equipment borrowing is a frequent and recurring activity.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 44 of 154</span>
      </div>
    </div>

    <!-- PAGE 45 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 45 of 154</span>
      </div>

      <!-- Figure 3.4 & 3.5 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_4_user_questionnaire_3.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.4: User questionnaire 3</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.4, 60% of respondents have 1 to 2 years of experience organizing campus events, 24% have less than 1 year, and 16% have more than 2 years.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_5_user_questionnaire_4.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.5: User questionnaire 4</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.5, users reported multiple difficulties with manual paper forms: 84% noted slow approval processes and repeated counter visits, 76% cited lack of real-time stock availability, 64% experienced misplaced paper forms, and 48% frequently forgot essential cables or accessories.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 45 of 154</span>
      </div>
    </div>

    <!-- PAGE 46 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 46 of 154</span>
      </div>

      <!-- Figure 3.6 & 3.7 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_6_user_questionnaire_5.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.6: User questionnaire 5</p>
      </div>
      <p class="justified-text">
        Figure 3.6 shows that 68% of respondents experienced double-bookings or equipment clashes frequently during event weeks, 24% occasionally, and only 8% never. This validates the urgent need for computational conflict checking.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_7_user_questionnaire_6.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.7: User questionnaire 6</p>
      </div>
      <p class="justified-text">
        Figure 3.7 shows that 64% of respondents have received damaged, defective, or incomplete equipment upon collecting items from the counter, indicating that lack of return inspection compromises asset quality.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 46 of 154</span>
      </div>
    </div>

    <!-- PAGE 47 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 47 of 154</span>
      </div>

      <!-- Figure 3.8 & 3.9 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_8_user_questionnaire_7.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.8: User questionnaire 7</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.8, 60% of respondents spend 1 to 3 days completing the manual paperwork and obtaining physical signatures, and 28% spend more than 3 days. Only 12% receive approval on the same day.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_9_user_questionnaire_8.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.9: User questionnaire 8</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.9, 92% of respondents strongly agreed and 8% agreed that pre-configured Smart Event Packages would simplify booking and prevent forgotten cables.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 47 of 154</span>
      </div>
    </div>

    <!-- PAGE 48 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 48 of 154</span>
      </div>

      <!-- Figure 3.10 & 3.11 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_10_user_questionnaire_9.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.10: User questionnaire 9</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.10, 88% strongly agreed that real-time stock monitoring would help prevent schedule clashes and improve campus inventory control.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_11_user_questionnaire_10.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.11: User questionnaire 10</p>
      </div>
      <p class="justified-text">
        Figure 3.11 shows that 80% strongly agreed that a digital return inspection desk recording condition (Good/Damaged) would significantly improve equipment care and student accountability.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 48 of 154</span>
      </div>
    </div>

    <!-- PAGE 49 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 49 of 154</span>
      </div>

      <!-- Figure 3.12 & 3.13 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_12_user_questionnaire_11.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.12: User questionnaire 11</p>
      </div>
      <p class="justified-text">
        Based on Figure 3.12, 96% of respondents strongly agreed and 4% agreed that they would support the implementation of PinjamGeng at UPTM, reflecting total campus enthusiasm.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_3_13_user_questionnaire_12.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 3.13: User questionnaire 12</p>
      </div>
      <p class="justified-text">
        Figure 3.13 summarizes the qualitative recommendations: (1) create bundled packages for AGMs and sports, (2) provide deadline reminder alerts, and (3) ensure mobile-friendly navigation.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 49 of 154</span>
      </div>
    </div>

    <!-- PAGE 50-90: INTERFACE DESIGN & SCREENSHOT GUIDES -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 50 of 154</span>
      </div>

      <h2 class="section-title">3.5 Interface Design</h2>
      <p class="justified-text">
        The user interface of PinjamGeng was engineered following user-centered design (UCD) heuristics, emphasizing clean visual hierarchy, prominent status indicators, and responsive layout scaling across mobile and desktop displays.
      </p>

      <h3 class="subsection-title">3.5.1 Wireframe</h3>
      <p class="justified-text">
        Wireframes were produced during the design phase to establish structural screen layouts before frontend implementation. Figures 3.14 to 3.34 represent the initial wireframe blueprints for student borrower and administrative workflows:
      </p>

      <div class="screenshot-guide-box">
        <h4>[SCREENSHOT GUIDE: WIREFRAMES (FIGURES 3.14 TO 3.34)]</h4>
        <p><strong>Student Guide for Nursyafiqah:</strong> Insert your initial low-fidelity wireframe sketches (from Figma, Balsamiq, or paper design scans) into these figures matching the layout of pages 50 to 58 of the sample report:</p>
        <ul>
          <li><strong>Figure 3.14:</strong> Wireframe - Login Page (Two-column layout, branding banner left, login form right).</li>
          <li><strong>Figure 3.15:</strong> Wireframe - Register Page (Two-column layout, student particulars, role and club dropdowns).</li>
          <li><strong>Figure 3.16:</strong> Wireframe - Public Home / Catalog Preview (Hero banner, stats counter, feature cards).</li>
          <li><strong>Figure 3.17:</strong> Wireframe - Smart Packages Page (3-column package card grid with bundle equipment listings).</li>
          <li><strong>Figure 3.18 - 3.27:</strong> Wireframe - Admin Views (Dashboard KPI cards, Booking Review Queue, Inventory Table, Return Desk modal, Reports view).</li>
          <li><strong>Figure 3.28 - 3.34:</strong> Wireframe - Student Views (Student Dashboard, Equipment Catalog, 2-Step Booking Wizard, My Bookings tracking table, Printable Slip).</li>
        </ul>
      </div>

      
      <h3 class="subsection-title" style="margin-top: 30px;">3.5.2 Actual Interface (High-Fidelity Implementation)</h3>
      <p class="justified-text">
        Following the low-fidelity wireframing phase, the complete interactive web application was implemented. The system was developed using PHP for backend server-side logic and session handling, MySQL (MariaDB) for relational database persistence, and styled using Tailwind CSS and FontAwesome under an aesthetic campus warm palette (Deep Espresso #231308, Warm Cream #fdfbf7, Rich Caramel #d97736, and Honey Gold #e5a953). The actual interfaces provide clean, robust operational workflows for both Student Borrowers and Laboratory Administrators as documented in Figures 3.20 through 3.34 below:
      </p>

      <!-- Figure 3.20: Login Page -->
      <h4 class="sub-subsection-title">Figure 3.20: Student Authentication &amp; Portal Login Page</h4>
      <p class="justified-text">
        Figure 3.20 demonstrates the actual login portal for PinjamGeng. The interface features official UPTM branding, security badges indicating BCrypt password hashing and Anti-CSRF protection, and a quick-fill presentation demo assistant for streamlined testing. The authentication form includes input validation for institutional email or matric ID, secure masked password input with visibility toggle, and direct navigation links to student registration.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/01_Authentication_Login.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Student Authentication & Portal Login" />
        <div class="figure-caption">Figure 3.20: Actual Interface - Student Authentication &amp; Portal Login Page</div>
      </div>

      <!-- Figure 3.21: Student Dashboard -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.21: Student Borrower Dashboard</h4>
      <p class="justified-text">
        Figure 3.21 displays the Student Borrower Dashboard presented upon successful login. The dashboard features a personalized welcome header displaying the student's full name (Nursyafiqah Zulaikha Binti Zilkamal) and matric number (AM2412018113). Four interactive stat cards summarize the user's loan status: Total Bookings (3), Pending Review (2), Approved (0), and Active Loans (0). Prominent quick-action buttons allow single-click access to "Book Event Package" and "Custom Booking". Below, the "Recent Booking Records" section lists historical applications with real-time status indicators.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/02_Student_Dashboard.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Student Borrower Dashboard" />
        <div class="figure-caption">Figure 3.21: Actual Interface - Student Borrower Dashboard &amp; Activity Cockpit</div>
      </div>

      <!-- Figure 3.22: Live Stock Catalog -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.22: Live Equipment Catalog &amp; Real-Time Stock Availability</h4>
      <p class="justified-text">
        Figure 3.22 exhibits the Live Equipment Catalog interface. Users can search for equipment by name, brand, model, or asset tag, and filter items by category (Audio &amp; Sound Systems, Visual &amp; Projection, Staging &amp; Lighting, Computing Hardware) and availability status. Each equipment card showcases item details, physical storage location (e.g., IT Store Shelf 2, Audio Storage Area C), condition status ("Good Condition"), and a real-time availability progress bar indicating currently available units versus total inventory (e.g., 3 of 3 units, 2 of 4 units). An instantaneous "Book Item" trigger initiates reservation directly from the catalog.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/03_Live_Stock_Catalog.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Live Equipment Catalog" />
        <div class="figure-caption">Figure 3.22: Actual Interface - Live Equipment Catalog &amp; Stock Indicators</div>
      </div>

      <!-- Figure 3.23: Smart Packages -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.23: Pre-Configured "Smart Event Packages" Explorer</h4>
      <p class="justified-text">
        Figure 3.23 illustrates the innovative "Smart Event Packages" explorer—the core FYP innovation designed to resolve common equipment omissions. Organizers can filter packages across event types including Seminars &amp; Lectures, Workshops &amp; Labs, Meetings &amp; Conventions, Photography &amp; Media, and Outdoor &amp; Sports. The "Complete Seminar &amp; Lecture Package" card outlines the recommended attendee scale (50–300 pax), targeted audience, and an itemized breakdown of bundled hardware (Epson Full HD Projector, 84" Tripod Screen, Shure Dual Wireless Mics, JBL EON PA System, Presentation Clicker, and 4K HDMI Kit) with real-time bundle stock verification.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/04_Smart_Event_Packages.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Smart Event Packages Explorer" />
        <div class="figure-caption">Figure 3.23: Actual Interface - Pre-Configured "Smart Event Packages" Explorer</div>
      </div>

      <!-- Figure 3.24: Booking Wizard -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.24: 2-Step Equipment Booking Wizard</h4>
      <p class="justified-text">
        Figure 3.24 details the 2-Step Equipment Booking Wizard. Step 1 collects comprehensive event metadata: Program Title, Event Category dropdown, Campus Room/Location (e.g., Dewan Gemilang Level 2), Estimated Attendee Headcount (PAX), Pickup Date/Time, Return Date/Time, and brief justification purpose. Step 2 presents the item selection table where pre-bundled items are automatically populated with verified stock quantities, allowing the borrower to adjust item counts while dynamic client-side validation prevents requesting quantities exceeding available inventory.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/05_2Step_Booking_Wizard.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="2-Step Booking Wizard" />
        <div class="figure-caption">Figure 3.24: Actual Interface - 2-Step Equipment Booking Wizard &amp; Schedule Validation</div>
      </div>

      <!-- Figure 3.25: Loan Slip -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.25: Standardized Downloadable A4 Loan Agreement Slip</h4>
      <p class="justified-text">
        Figure 3.25 illustrates the official printable A4 Loan Agreement Slip generated dynamically upon booking approval. Conforming to UPTM institutional documentation standards, the voucher includes the university header, reference tracking code (#UPTM-BK-2026-001), Section A Applicant Details (Name, Matric ID, Faculty, Contact, Email), Section B Event Information (Event Name, Venue, Start/End Timestamps), Section C Borrowed Equipment Schedule (Asset Tags, Equipment Name, Quantity, Return Status), institutional liability terms, and formalized signature blocks for the student borrower, authorizing lab officer, and return desk custodian.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/06_Digital_Loan_Slip.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Official Printable Loan Slip" />
        <div class="figure-caption">Figure 3.25: Actual Interface - Official Downloadable &amp; Printable A4 Loan Agreement Slip</div>
      </div>

      <!-- Figure 3.26: Admin Dashboard -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.26: Admin Executive Dashboard &amp; Real-Time Cockpit</h4>
      <p class="justified-text">
        Figure 3.26 shows the Administrator Executive Dashboard accessed by laboratory officers and technicians. The cockpit provides high-level administrative visibility through four primary metric cards: Total Equipment (94 units, with 72 currently available in stock), Pending Review (2 requests requiring immediate action), Active Loans (1 event, 22 units currently out), and Damaged / Maintenance (0 units). A dedicated "Pending Booking Requests" queue enables rapid review and approval, while the "Active Loans" tracker monitors current campus borrowings.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/07_Admin_Dashboard.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Admin Executive Dashboard" />
        <div class="figure-caption">Figure 3.26: Actual Interface - Admin Executive Dashboard &amp; Real-Time Status Cockpit</div>
      </div>

      <!-- Figure 3.27: Admin Booking Approvals -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.27: Admin Reservation Requests &amp; Booking Approval Desk</h4>
      <p class="justified-text">
        Figure 3.27 depicts the central Booking Approval Desk. Laboratory administrators can filter applications using category tabs (All, Pending Review, Approved, Active Loans, Returned, Rejected) or search by reference number, applicant name, or matric ID. Each booking row displays the unique reference number (#UPTM-BK-...), applicant particulars, event details, venue, scheduled timestamps, and requested package badge, accompanied by a "Review &amp; Approve" trigger that opens the detailed allocation modal.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/08_Booking_Approval.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Booking Approval Desk" />
        <div class="figure-caption">Figure 3.27: Actual Interface - Admin Reservation Requests &amp; Approval Desk</div>
      </div>

      <!-- Figure 3.28: Return Desk -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.28: Admin Equipment Return Desk &amp; Condition Inspection Desk</h4>
      <p class="justified-text">
        Figure 3.28 illustrates the Return Desk and Inspection module used by technicians when equipment is returned post-event. The top section displays "Active Loans Awaiting Return", showing borrower contacts, issue dates, expected return times, and total unit counts. The lower section records the "Recent Return Inspection Logs", detailing return timestamps, inspected equipment, physical condition status ("Good Condition"), inspector remarks, and receiving officer authentication.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/09_Return_Penalty_Desk.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Return Desk & Inspection" />
        <div class="figure-caption">Figure 3.28: Actual Interface - Admin Equipment Return Desk &amp; Condition Inspection</div>
      </div>

      <!-- Figure 3.29: Inventory Management -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.29: Admin Master Inventory Management Suite</h4>
      <p class="justified-text">
        Figure 3.29 presents the Master Inventory Management suite. The interface displays all institutional equipment records with asset tag numbers (e.g., UPTM-SPK-002, UPTM-MIC-001), equipment names and models, category classifications, available versus total stock ratios (e.g., 3/3, 2/4, 10/12), and physical condition badges. Administrative action buttons allow staff to add new assets via modal, edit specifications, update storage locations, and manage category taxonomies.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/10_Inventory_Management.png" style="max-width: 80%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Master Inventory Management" />
        <div class="figure-caption">Figure 3.29: Actual Interface - Admin Master Inventory Management Suite (CRUD)</div>
      </div>

      <!-- Figure 3.30: Add Equipment Modal -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.30: Admin Popup Dialog - Register New Equipment Modal</h4>
      <p class="justified-text">
        Figure 3.30 illustrates the Admin Popup Dialog for registering new equipment assets into the database. When laboratory officers click "Add New Equipment" from the inventory management table, this centered modal overlay appears with a dimmed backdrop. The dialog captures mandatory institutional asset attributes: Unique Asset Tag Code (formatted to institutional naming conventions such as UPTM-PRJ-015), Category dropdown classification, Equipment Name, Brand &amp; Specific Model, Physical Storage Location (e.g., IT Store Shelf 2A - Multimedia Locker), Total Inventory Units, Initial Physical Condition rating (Good Condition / Fair / Maintenance), Package Eligibility checkbox, and Technical Specifications notes. Submitting the form triggers backend server-side validation and inserts an immutable audit log entry.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/modal_add_equipment.png" style="max-width: 90%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Register New Equipment Modal" />
        <div class="figure-caption">Figure 3.30: Actual Interface - Admin Popup Dialog: Register New Equipment Modal</div>
      </div>

      <!-- Figure 3.31: Edit Equipment Modal -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.31: Admin Popup Dialog - Update Equipment Record Modal</h4>
      <p class="justified-text">
        Figure 3.31 showcases the Admin Popup Dialog for updating existing equipment records. Accessible via the edit pencil icon on any inventory record row, the modal retrieves and populates the item's current attributes. A real-time allocation snapshot displays total units, currently available stock, and active loan counts. The Asset Tag field is locked as read-only to prevent tampering with physical barcode mapping. Administrators can update equipment descriptions, adjust brand details, reassign physical storage cabinets, update stock counts, adjust physical condition status, and record maintenance service notes. A secondary red action trigger allows administrators to archive retiring hardware.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/modal_edit_equipment.png" style="max-width: 90%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Update Equipment Record Modal" />
        <div class="figure-caption">Figure 3.31: Actual Interface - Admin Popup Dialog: Update Equipment Record Modal</div>
      </div>

      <!-- Figure 3.32: Action Confirmation Modal -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.32: Admin Action Confirmation Dialog - Booking Approval &amp; Stock Allocation Modal</h4>
      <p class="justified-text">
        Figure 3.32 details the Admin Action Confirmation Dialog presented during the booking review process. Before committing an approval or rejection, administrators are presented with this formal authorization modal. The dialog displays an essential requisition summary (Reference #UPTM-BK-2026-001, applicant name, scheduled event dates, and total requested unit counts) alongside an automated stock deduction notice warning that approval will immediately decrement available inventory. The administrator inputs mandatory counter pickup instructions and officer remarks that appear on the student's printed loan voucher. A mandatory verification checkbox certifies physical staging before the green "Confirm &amp; Authorize Booking" action executes an atomic database transaction.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/modal_confirm_action.png" style="max-width: 90%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Booking Approval & Stock Allocation Modal" />
        <div class="figure-caption">Figure 3.32: Actual Interface - Admin Action Confirmation Dialog: Booking Approval &amp; Stock Allocation Modal</div>
      </div>

      <!-- Figure 3.33: User Profile Page -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.33: Borrower Profile &amp; Account Security Management Page</h4>
      <p class="justified-text">
        Figure 3.33 displays the Borrower Profile &amp; Account Security Management Page. The two-column layout provides students and staff with transparent account governance. The left panel showcases verified borrower particulars, matric ID, institutional email, mobile contact, affiliated student society, and key borrower metrics (Total Bookings, 100% Clean Return Track Record, and RM 0.00 Overdue Penalties), alongside proactive notification preference toggles. The right panel houses the Security &amp; Password Management suite, featuring BCrypt cryptographic protection badges, masked password fields, a dynamic client-side password strength meter, and active device session indicators.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/screen_user_profile.png" style="max-width: 90%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Borrower Profile & Account Security Management" />
        <div class="figure-caption">Figure 3.33: Actual Interface - Borrower Profile &amp; Account Security Management Page</div>
      </div>

      <!-- Figure 3.34: Desktop Viewport -->
      <h4 class="sub-subsection-title" style="margin-top: 25px;">Figure 3.34: Multi-Device Responsive Desktop Layout</h4>
      <p class="justified-text">
        Figure 3.34 displays the desktop widescreen layout (1280px viewport) of the student booking portal, demonstrating fluid responsiveness, balanced whitespace, and optimal typographic legibility across modern campus laptop and workstation displays.
      </p>
      <div style="text-align: center; margin: 15px 0;">
        <img src="images/test_laptop_1280.png" style="max-width: 90%; height: auto; border: 1px solid #ddd; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);" alt="Desktop Viewport" />
        <div class="figure-caption">Figure 3.34: Actual Interface - High-Resolution Desktop Viewport Layout (1280px)</div>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 90 of 154</span>
      </div>
    </div>

    <!-- PAGE 91-95: SYSTEM & APPLICATION MODELLING (FLOWCHARTS, USE CASE) -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 91 of 154</span>
      </div>

      <h2 class="section-title">3.6 System and Application Modelling</h2>
      <p class="justified-text">
        System modeling provides the formal abstract blueprint representing system workflows, behavioral dynamics, and database architectures. Modeling ensures that software components operate cohesively, eliminating architectural flaws prior to and during system construction.
      </p>

      <h3 class="subsection-title">3.6.1 Flowchart</h3>
      <p class="justified-text">
        Two distinct, publication-standard black-and-white flowcharts were developed to specify the execution paths for both user classifications: the Administrator and the Student Borrower.
      </p>
      <p class="justified-text">
        Figure 3.35 details the Administrator Flowchart. The workflow initiates with credential authentication. Upon successful login, the administrator selects from four primary operational branches: (1) Booking Management (reviewing requests, approving or rejecting applications, allocating physical stock, and issuing loan slips); (2) Inventory &amp; Package Administration (adding, updating, and removing equipment and bundle packages); (3) Return Desk &amp; Inspection (inspecting returned assets, auditing physical condition, logging automatic maintenance tickets for damaged items, or restocked healthy gear); and (4) Reports &amp; Analytics (generating date-filtered utilization summaries and exporting PDF/CSV reports).
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 91 of 154</span>
      </div>
    </div>

    <!-- PAGE 92: ADMIN FLOWCHART IMAGE (FULL PAGE) -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 92 of 154</span>
      </div>

      <div style="text-align:center; margin: 10px 0;">
        <img src="images/fig_3_110_admin_flowchart.png" style="max-width:680px; width:100%; border:1px solid #000;" />
        <p class="figure-caption" style="margin-top: 15px;">Figure 3.35: Admin Operational Workflow Flowchart (Black &amp; White Publication Standard)</p>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 92 of 154</span>
      </div>
    </div>

    <!-- PAGE 93: STUDENT FLOWCHART IMAGE (FULL PAGE) -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 93 of 154</span>
      </div>

      <div style="text-align:center; margin: 10px 0;">
        <img src="images/fig_3_111_student_flowchart.png" style="max-width:680px; width:100%; border:1px solid #000;" />
        <p class="figure-caption" style="margin-top: 15px;">Figure 3.36: Student Borrower Workflow Flowchart (Black &amp; White Publication Standard)</p>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 93 of 154</span>
      </div>
    </div>

    <!-- PAGE 94: USE CASE DESCRIPTION -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 94 of 154</span>
      </div>

      <h3 class="subsection-title">3.6.2 Use Case Diagram</h3>
      <p class="justified-text">
        The Use Case Diagram defines the behavioral interactions between the system and its primary actors: the <strong>Student Borrower</strong> and the <strong>Administrator (FCM / IT Staff)</strong>.
      </p>
      <p class="justified-text">
        The Student Borrower interacts with use cases including: Account Registration, Authentication, Browsing Equipment Catalog, Exploring Smart Event Packages, Submitting Equipment Booking Requests, Tracking Booking Statuses, Printing Official Loan Slips, and Cancelling Pending Bookings. The "Submit Booking Request" use case includes two essential sub-processes: <code>&lt;&lt;include&gt;&gt;</code> Check Real-Time Stock Availability (which validates date-range inventory levels) and <code>&lt;&lt;include&gt;&gt;</code> Accept Loan Regulations (verifying borrower agreement to institutional liability terms).
      </p>
      <p class="justified-text">
        The Administrator possesses supervisory privileges encompassing: Reviewing &amp; Approving/Rejecting Bookings, Counter Handover &amp; Checkout, Inspecting Returned Equipment, Managing Equipment Inventory (CRUD), Managing Event Packages (CRUD), Managing Categories, Managing Maintenance Servicing, and Generating Analytical Reports. The "Inspect Return &amp; Condition" use case is linked to <code>&lt;&lt;extend&gt;&gt;</code> Auto-Generate Maintenance Ticket, which executes whenever an item is marked as Damaged.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 94 of 154</span>
      </div>
    </div>

    <!-- PAGE 95: USE CASE DIAGRAM IMAGE (FULL PAGE) -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 95 of 154</span>
      </div>

      <div style="text-align:center; margin: 10px 0;">
        <img src="images/fig_3_112_use_case_diagram.png" style="max-width:680px; width:100%; border:1px solid #000;" />
        <p class="figure-caption" style="margin-top: 15px;">Figure 3.37: Use Case Diagram for PinjamGeng (UML Standard, Black &amp; White)</p>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 95 of 154</span>
      </div>
    </div>

    <!-- PAGE 96: ERD DIAGRAM IMAGE (FULL PAGE) -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 96 of 154</span>
      </div>

      <h3 class="subsection-title">3.6.3 Entity Relational Diagram (ERD)</h3>
      <p class="justified-text">
        The Entity Relationship Diagram (Figure 3.38) establishes the normalized conceptual schema supporting PinjamGeng. The architecture comprises nine interconnected entities designed to 3rd Normal Form (3NF): <code>users</code>, <code>categories</code>, <code>equipment</code>, <code>packages</code>, <code>package_items</code>, <code>bookings</code>, <code>booking_items</code>, <code>maintenance_tickets</code>, and <code>audit_logs</code>.
      </p>

      <div style="text-align:center; margin: 10px 0;">
        <img src="images/fig_3_113_erd_diagram.png" style="max-width:680px; width:100%; border:1px solid #000;" />
        <p class="figure-caption" style="margin-top: 15px;">Figure 3.38: Entity Relational Diagram (ERD) in 3NF Normalization</p>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 96 of 154</span>
      </div>
    </div>

    <!-- PAGES 97-101: DATA DICTIONARY -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 97 of 154</span>
      </div>

      <h3 class="subsection-title">3.6.4 Data Dictionary</h3>
      <p class="justified-text">
        The data dictionary provides exhaustive technical documentation of each database table, attribute, data type, constraint, and operational description utilized within PinjamGeng:
      </p>

      <!-- Table 3.1: users -->
      <p class="table-caption">Table 3.1: users data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>user_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique identifier for each user</td><td>1</td></tr>
          <tr><td>full_name</td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Full legal name of the user</td><td>Nursyafiqah Zulaikha Binti Zilkamal</td></tr>
          <tr><td>matric_staff_id</td><td>VARCHAR(30)</td><td>NOT NULL, UNIQUE</td><td>Official UPTM matric or staff ID</td><td>AM2412018113</td></tr>
          <tr><td>email</td><td>VARCHAR(100)</td><td>NOT NULL, UNIQUE</td><td>Institutional email address</td><td>syafiqah@student.uptm.edu.my</td></tr>
          <tr><td>phone_no</td><td>VARCHAR(20)</td><td>NOT NULL</td><td>Active mobile contact number</td><td>012-3456789</td></tr>
          <tr><td>role</td><td>ENUM</td><td>NOT NULL</td><td>System authorization role ('admin', 'user')</td><td>user</td></tr>
          <tr><td>user_category</td><td>ENUM</td><td>NOT NULL</td><td>Borrower category ('student', 'committee', 'lecturer', 'staff')</td><td>committee</td></tr>
          <tr><td>organization</td><td>VARCHAR(150)</td><td>NULL</td><td>Associated student club, society or faculty</td><td>Multimedia &amp; Computing Club</td></tr>
          <tr><td>password_hash</td><td>VARCHAR(255)</td><td>NOT NULL</td><td>Cryptographic password hash (BCrypt)</td><td>$2y$10$abcdef12345...</td></tr>
          <tr><td>status</td><td>ENUM</td><td>DEFAULT 'active'</td><td>Account status ('active', 'suspended')</td><td>active</td></tr>
          <tr><td>created_at</td><td>TIMESTAMP</td><td>NOT NULL, CURRENT_TIMESTAMP</td><td>Account registration timestamp</td><td>2026-03-15 10:20:00</td></tr>
        </tbody>
      </table>

      <!-- Table 3.2: categories -->
      <p class="table-caption" style="margin-top: 25px;">Table 3.2: categories data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>category_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique category identifier</td><td>1</td></tr>
          <tr><td>category_name</td><td>VARCHAR(100)</td><td>NOT NULL, UNIQUE</td><td>Descriptive classification name</td><td>Visual &amp; Projection</td></tr>
          <tr><td>description</td><td>TEXT</td><td>NULL</td><td>Scope of equipment in category</td><td>Projectors, screens, and monitors</td></tr>
          <tr><td>icon</td><td>VARCHAR(50)</td><td>NOT NULL, DEFAULT 'fa-box'</td><td>FontAwesome vector icon class</td><td>fa-video</td></tr>
          <tr><td>color_class</td><td>VARCHAR(50)</td><td>NOT NULL</td><td>UI accent color identifier</td><td>bg-blue-600</td></tr>
          <tr><td>created_at</td><td>TIMESTAMP</td><td>NOT NULL</td><td>Category creation timestamp</td><td>2026-03-15 10:30:00</td></tr>
        </tbody>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 97 of 154</span>
      </div>
    </div>

    <!-- PAGE 98: DATA DICTIONARY CONT -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 98 of 154</span>
      </div>

      <!-- Table 3.3: equipment -->
      <p class="table-caption">Table 3.3: equipment data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>equipment_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique equipment item identifier</td><td>1</td></tr>
          <tr><td>category_id</td><td>INT</td><td>Foreign Key (categories.id)</td><td>Associated equipment category</td><td>1</td></tr>
          <tr><td>item_code</td><td>VARCHAR(30)</td><td>NOT NULL, UNIQUE</td><td>Unique institutional asset code</td><td>UPTM-EQ-001</td></tr>
          <tr><td>name</td><td>VARCHAR(150)</td><td>NOT NULL</td><td>Common name of equipment</td><td>Full HD Laser Projector (4500 Lumens)</td></tr>
          <tr><td>brand_model</td><td>VARCHAR(100)</td><td>NULL</td><td>Manufacturer brand and model</td><td>Epson EB-2250U</td></tr>
          <tr><td>total_qty</td><td>INT</td><td>NOT NULL, DEFAULT 1</td><td>Total owned asset units</td><td>5</td></tr>
          <tr><td>available_qty</td><td>INT</td><td>NOT NULL, DEFAULT 1</td><td>Units currently in storage available</td><td>4</td></tr>
          <tr><td>booked_qty</td><td>INT</td><td>NOT NULL, DEFAULT 0</td><td>Units committed to approved loans</td><td>1</td></tr>
          <tr><td>maintenance_qty</td><td>INT</td><td>NOT NULL, DEFAULT 0</td><td>Units quarantined for repair</td><td>0</td></tr>
          <tr><td>storage_location</td><td>VARCHAR(100)</td><td>NULL</td><td>Physical laboratory shelf/cabinet</td><td>FCOM Lab 3, Cabinet B1</td></tr>
          <tr><td>default_condition</td><td>ENUM</td><td>NOT NULL, DEFAULT 'excellent'</td><td>Standard working condition rating</td><td>excellent</td></tr>
          <tr><td>replacement_cost</td><td>DECIMAL(10,2)</td><td>NOT NULL, DEFAULT 0.00</td><td>Unit replacement cost in Ringgit Malaysia</td><td>3200.00</td></tr>
        </tbody>
      </table>

      <!-- Table 3.4: packages -->
      <p class="table-caption" style="margin-top: 25px;">Table 3.4: packages data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>package_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique package bundle identifier</td><td>1</td></tr>
          <tr><td>package_name</td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Title of the event package</td><td>Annual General Meeting (AGM) Package</td></tr>
          <tr><td>event_type</td><td>VARCHAR(50)</td><td>NOT NULL</td><td>Target event category</td><td>AGM / Formal Meeting</td></tr>
          <tr><td>description</td><td>TEXT</td><td>NULL</td><td>Overview of package capability</td><td>Complete audio-visual setup for formal AGMs</td></tr>
          <tr><td>icon</td><td>VARCHAR(50)</td><td>NOT NULL, DEFAULT 'fa-box'</td><td>FontAwesome vector icon class</td><td>fa-users-gear</td></tr>
          <tr><td>badge_color</td><td>VARCHAR(50)</td><td>NOT NULL</td><td>UI badge color class</td><td>bg-amber-600</td></tr>
          <tr><td>is_active</td><td>TINYINT(1)</td><td>NOT NULL, DEFAULT 1</td><td>Active package availability flag (1=ON)</td><td>1</td></tr>
        </tbody>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 98 of 154</span>
      </div>
    </div>

    <!-- PAGE 99: DATA DICTIONARY CONT -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 99 of 154</span>
      </div>

      <!-- Table 3.5: package_items -->
      <p class="table-caption">Table 3.5: package_items data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>package_item_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique bundle item link ID</td><td>1</td></tr>
          <tr><td>package_id</td><td>INT</td><td>Foreign Key (packages.id)</td><td>Associated parent package bundle</td><td>1</td></tr>
          <tr><td>equipment_id</td><td>INT</td><td>Foreign Key (equipment.id)</td><td>Equipment assigned to bundle</td><td>1</td></tr>
          <tr><td>quantity</td><td>INT</td><td>NOT NULL, DEFAULT 1</td><td>Number of units in package</td><td>1</td></tr>
        </tbody>
      </table>

      <!-- Table 3.6: bookings -->
      <p class="table-caption" style="margin-top: 25px;">Table 3.6: bookings data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>booking_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique reservation record ID</td><td>1</td></tr>
          <tr><td>booking_code</td><td>VARCHAR(30)</td><td>NOT NULL, UNIQUE</td><td>Official loan slip reference code</td><td>UPTM-BK-2026-001</td></tr>
          <tr><td>user_id</td><td>INT</td><td>Foreign Key (users.id)</td><td>Student borrower identity</td><td>2</td></tr>
          <tr><td>package_id</td><td>INT</td><td>Foreign Key (packages.id), NULL</td><td>Associated package bundle (if used)</td><td>1</td></tr>
          <tr><td>event_name</td><td>VARCHAR(150)</td><td>NOT NULL</td><td>Official name of campus event</td><td>MCSC Annual General Meeting 2026</td></tr>
          <tr><td>event_location</td><td>VARCHAR(150)</td><td>NOT NULL</td><td>Campus venue of activity</td><td>Dewan Kuliah Utama (DKU), UPTM</td></tr>
          <tr><td>purpose</td><td>TEXT</td><td>NOT NULL</td><td>Formal purpose of reservation</td><td>Annual reporting and committee voting</td></tr>
          <tr><td>start_date</td><td>DATE</td><td>NOT NULL</td><td>Required equipment pickup date</td><td>2026-04-10</td></tr>
          <tr><td>end_date</td><td>DATE</td><td>NOT NULL</td><td>Required equipment return date</td><td>2026-04-12</td></tr>
          <tr><td>status</td><td>ENUM</td><td>NOT NULL, DEFAULT 'pending'</td><td>Reservation state ('pending', 'approved', 'on_loan', 'returned', 'rejected', 'cancelled')</td><td>approved</td></tr>
          <tr><td>approved_by</td><td>INT</td><td>Foreign Key (users.id), NULL</td><td>Admin who verified the loan</td><td>1</td></tr>
          <tr><td>picked_up_at</td><td>DATETIME</td><td>NULL</td><td>Timestamp when gear was checked out</td><td>2026-04-10 09:15:00</td></tr>
          <tr><td>returned_at</td><td>DATETIME</td><td>NULL</td><td>Timestamp when gear was returned</td><td>2026-04-12 17:30:00</td></tr>
        </tbody>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 99 of 154</span>
      </div>
    </div>

    <!-- PAGE 100-101: DATA DICTIONARY CONT & CONCLUSION -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 100 of 154</span>
      </div>

      <!-- Table 3.7: booking_items -->
      <p class="table-caption">Table 3.7: booking_items data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>booking_item_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique line item reservation ID</td><td>1</td></tr>
          <tr><td>booking_id</td><td>INT</td><td>Foreign Key (bookings.id)</td><td>Associated booking record</td><td>1</td></tr>
          <tr><td>equipment_id</td><td>INT</td><td>Foreign Key (equipment.id)</td><td>Reserved equipment asset</td><td>1</td></tr>
          <tr><td>quantity_requested</td><td>INT</td><td>NOT NULL, DEFAULT 1</td><td>Units requested by borrower</td><td>1</td></tr>
          <tr><td>quantity_allocated</td><td>INT</td><td>NOT NULL, DEFAULT 0</td><td>Units physically approved by admin</td><td>1</td></tr>
          <tr><td>return_condition</td><td>ENUM</td><td>NULL</td><td>Condition at return desk ('excellent', 'good', 'fair', 'damaged')</td><td>excellent</td></tr>
          <tr><td>return_notes</td><td>TEXT</td><td>NULL</td><td>Technician notes upon return check</td><td>All cables and remote accounted for</td></tr>
        </tbody>
      </table>

      <!-- Table 3.8: maintenance_tickets -->
      <p class="table-caption" style="margin-top: 25px;">Table 3.8: maintenance_tickets data dictionary</p>
      <table class="data-table">
        <thead>
          <tr><th>Field Name</th><th>Data Type</th><th>Constraint</th><th>Description</th><th>Example</th></tr>
        </thead>
        <tbody>
          <tr><td>ticket_id</td><td>INT</td><td>Primary Key, Auto-increment</td><td>Unique servicing ticket identifier</td><td>1</td></tr>
          <tr><td>equipment_id</td><td>INT</td><td>Foreign Key (equipment.id)</td><td>Faulty equipment asset</td><td>3</td></tr>
          <tr><td>booking_id</td><td>INT</td><td>Foreign Key (bookings.id), NULL</td><td>Originating loan during which damage occurred</td><td>1</td></tr>
          <tr><td>reported_by</td><td>INT</td><td>Foreign Key (users.id)</td><td>Technician or admin logging ticket</td><td>1</td></tr>
          <tr><td>issue_type</td><td>VARCHAR(100)</td><td>NOT NULL</td><td>Category of fault</td><td>Broken Connector / Loose Cable</td></tr>
          <tr><td>description</td><td>TEXT</td><td>NOT NULL</td><td>Detailed description of defect</td><td>HDMI port pin bent during event setup</td></tr>
          <tr><td>severity</td><td>ENUM</td><td>NOT NULL, DEFAULT 'medium'</td><td>Defect severity ('low', 'medium', 'high', 'critical')</td><td>high</td></tr>
          <tr><td>status</td><td>ENUM</td><td>NOT NULL, DEFAULT 'open'</td><td>Ticket status ('open', 'in_progress', 'resolved', 'decommissioned')</td><td>open</td></tr>
          <tr><td>serviced_by</td><td>VARCHAR(100)</td><td>NULL</td><td>Internal technician or vendor name</td><td>FCOM AV Support Unit</td></tr>
          <tr><td>cost</td><td>DECIMAL(10,2)</td><td>NOT NULL, DEFAULT 0.00</td><td>Servicing or component replacement cost</td><td>150.00</td></tr>
        </tbody>
      </table>

      <h2 class="section-title" style="margin-top: 30px;">3.7 Conclusion</h2>
      <p class="justified-text">
        Chapter 3 has provided an exhaustive presentation of the developmental methodology, system requirements, interface designs, and architectural models governing PinjamGeng. By employing the Agile framework, user requirements were systematically transformed into functional, modular web components. The structural models—including black-and-white flowcharts, use case specifications, 3NF entity-relationship models, and detailed data dictionaries—establish a robust engineering baseline that guarantees the reliability, maintainability, and usability of PinjamGeng across Universiti Poly-Tech Malaysia.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 101 of 154</span>
      </div>
    </div>
    `;
  }
};
