const docx = require('docx');
const { Paragraph, PageBreak, AlignmentType } = docx;
const {
  createPara,
  createHeading1,
  createHeading2,
  createHeading3,
  createHeading4,
  createTableCaption,
  createImagePara,
  createDocxTable,
} = require('./doc_helpers.js');

module.exports = {
  getChapter3: function() {
    return [
      createHeading1('CHAPTER 3: METHODOLOGY AND SYSTEM DESIGN'),

      // 3.1 Introduction
      createHeading2('3.1 Introduction'),
      createPara(
        'A disciplined, structured software development methodology is indispensable for ensuring that a software project is delivered on schedule, fulfills its architectural specifications, and effectively satisfies the operational needs of its target stakeholders. Developing a campus-wide inventory and booking system such as PinjamGeng requires continuous alignment between student event organizers, faculty laboratory technicians, and administrative decision-makers. Recent empirical software engineering studies, such as the comprehensive research by Palopak & Huang (2024), demonstrate that iterative delivery, proactive technical execution, and continuous customer collaboration represent the primary determinants of project success in applied information systems.'
      ),
      createPara(
        'Accordingly, the Agile Development Methodology was selected as the operational framework for the conceptualization, design, development, and testing of PinjamGeng. By segmenting the project lifecycle into iterative two-week sprints, Agile provided the flexibility required to adapt user interface elements, refine booking wizard validation rules, and enhance condition reporting workflows based on direct, ongoing feedback from UPTM student club leaders and laboratory technicians.'
      ),

      // 3.2 Agile Methodology
      createHeading2('3.2 Agile Methodology'),
      createPara(
        'Unlike traditional linear-sequential frameworks such as the Waterfall model—which mandates that all functional specifications be frozen at the beginning of the project—the Agile methodology embraces change at any stage of development (Al-Saqqa et al., 2020). In a university campus setting, user expectations frequently evolve as stakeholders interact with tangible system prototypes. For instance, initial consultations suggested a simple individual equipment booking form; however, subsequent user reviews revealed that student committees struggled to remember all necessary peripheral accessories, directly inspiring the creation of the star "Smart Event Packages" bundling feature.'
      ),
      createPara(
        'Studies by Drus & Alsalami (2020) emphasize that Agile\'s iterative feedback cycles dramatically elevate software quality and user satisfaction by uncovering defects and usability barriers early in the development lifecycle. Through continuous demonstration of working increments, PinjamGeng was systematically refined to deliver a stable, reliable, and aesthetically pleasing platform tailored to UPTM\'s unique logistical ecosystem.'
      ),

      ...createImagePara('fig_3_1_agile_methodology.png', 480, 180, 'Figure 3.1: Agile Scrum Development Lifecycle (Kumar, A., 2025)'),

      // 3.3 Phases in Agile Methodology
      createHeading2('3.3 Phases in Agile Methodology'),
      createPara(
        'The Agile lifecycle executed during this project comprised six systematic, recurring phases:'
      ),

      createHeading3('3.3.1 Phase 1: Plan'),
      createPara(
        'The planning phase concentrated on investigating the existing equipment booking workflows at UPTM, identifying root operational friction, and establishing system requirements. Preliminary interviews with student club committees and laboratory staff highlighted that paper slips frequently went missing and double-booking occurred during major campus events. A structured requirements questionnaire was created via Google Forms and distributed among campus stakeholders, validating that manual processes created severe operational bottlenecks. These findings directly defined the product backlog and functional specifications for PinjamGeng.'
      ),

      createHeading3('3.3.2 Phase 2: Design'),
      createPara(
        'During the design phase, the architectural foundation and user interfaces of PinjamGeng were mapped out. Low-fidelity wireframes were drafted for both student borrower and administrator views, emphasizing simplicity, modern visual hierarchy, and clear calls-to-action. The relational database schema was designed using MySQL, consisting of normalized entities for users, categories, equipment, packages, package items, bookings, booking items, maintenance tickets, and audit logs. Foreign key constraints were established to guarantee relational integrity and prevent orphan records.'
      ),

      createHeading3('3.3.3 Phase 3: Develop'),
      createPara(
        'The development phase involved translating designs into functional, secure software. The backend logic was engineered using modular, procedural PHP (v8.2.12) with PDO prepared statements for comprehensive SQL-injection immunity. The frontend was styled with Tailwind CSS, utilizing a distinctive warm espresso and caramel palette that evokes a modern campus atmosphere. Security features—including cryptographic password hashing via BCrypt, anti-CSRF token verification on all POST forms, session fixation protection, and brute-force rate-limiting lockout—were embedded into the core authentication engine. Key functional milestones included the 2-step booking wizard, package autofill mechanics, return condition auditing, and PDF/CSV export scripts.'
      ),

      createHeading3('3.3.4 Phase 4: Test'),
      createPara(
        'Rigorous testing was conducted across multiple stages: Unit Testing evaluated individual methods and form handlers (such as login credential verification, stock quantity validation, and package item allocation); Integration Testing validated data synchronization across database tables (ensuring stock deductions occurred seamlessly upon booking approval); System Testing confirmed performance, security, and cross-browser responsiveness across Google Chrome and Microsoft Edge; and User Acceptance Testing (UAT) gathered empirical usability ratings from student organizers and technicians.'
      ),

      createHeading3('3.3.5 Phase 5: Deploy'),
      createPara(
        'The system was staged and deployed within an optimized local web server environment using the XAMPP stack on Windows 11 as well as live cloud hosting at InfinityFree. Database migration scripts initialized all tables and seeded realistic campus data (student accounts, audio-visual equipment, curated packages, and loan history). The application was configured for multi-user access, allowing testers to interact with the platform simultaneously.'
      ),

      createHeading3('3.3.6 Phase 6: Review'),
      createPara(
        'In the review phase, feedback gathered during testing trials was analyzed to identify opportunities for enhancement. Based on tester suggestions, the booking cancellation rules were refined to allow borrowers to cancel pending requests without administrative intervention, and warning badges were introduced to alert technicians to equipment flagged for maintenance.'
      ),

      // 3.4 Data Gathering & Requirements Survey Analysis
      createHeading2('3.4 Data Gathering and User Requirements Survey Analysis'),
      createPara(
        'To ensure that PinjamGeng authentically addresses the real challenges experienced across Universiti Poly-Tech Malaysia, a rigorous requirement gathering exercise was conducted. A structured questionnaire entitled "Survey on Event Equipment Booking and Inventory Management System (PinjamGeng) at Universiti Poly-Tech Malaysia (UPTM)" was administered via Google Forms to 42 campus stakeholders. The empirical survey results, captured directly from Google Forms analytics, are documented below across all twelve evaluated dimensions:'
      ),

      // Figure 3.2: Role
      ...createImagePara('prelim_q1_role.png', 480, 240, 'Figure 3.2: User Requirements Survey - Stakeholder Primary Role in Campus Events'),
      createPara(
        'Figure 3.2 captures the primary roles of survey respondents within campus events at UPTM (40 responses). The overwhelming majority—97.5% (39 respondents)—are active Student Club / Society Committee Members, while the remaining proportion consists of Faculty Lecturers / Club Advisors and Equipment Administrators / Laboratory Technicians. This empirical finding establishes that student event committee members represent the primary borrower demographic, directly justifying the need for a self-service, user-friendly booking interface.'
      ),

      // Figure 3.3: Experience
      ...createImagePara('prelim_q2_experience.png', 480, 240, 'Figure 3.3: User Requirements Survey - Duration of Campus Event Management Experience'),
      createPara(
        'Figure 3.3 illustrates the duration of involvement in organizing student or campus events at UPTM (41 responses). Over half of the respondents—51.2% (21 respondents)—possess between 1 to 2 years of active event management experience, 43.9% (18 respondents) have less than 1 year, and 4.9% (2 respondents) have more than 2 years of experience. This distribution confirms that the sample consists of experienced student leaders who possess firsthand familiarity with the university\'s equipment logistics.'
      ),

      // Figure 3.4: Frequency
      ...createImagePara('prelim_q3_frequency.png', 480, 240, 'Figure 3.4: User Requirements Survey - Frequency of Event Equipment Loans per Semester'),
      createPara(
        'Figure 3.4 demonstrates how frequently student organizations borrow event equipment during an academic semester (41 responses). The survey indicates that 41.5% borrow equipment several times per semester, 31.7% borrow monthly, 22.0% borrow annually, and 4.9% borrow on a weekly basis. With over 78% of student clubs borrowing equipment on a monthly or recurring basis, an automated digital management system is essential to handle frequent requisition cycles.'
      ),

      // Figure 3.5: Difficulties
      ...createImagePara('prelim_q4_difficulties.png', 480, 260, 'Figure 3.5: User Requirements Survey - Operational Difficulties with Manual Paper Forms'),
      createPara(
        'Figure 3.5 summarizes the operational difficulties encountered when using the current manual paper requisition forms at UPTM (41 responses). The leading obstacle, reported by 63.4% of respondents (26 respondents), is the slow approval process requiring repeated physical counter visits. Additionally, 58.5% (24 respondents) cite a lack of real-time visibility on equipment availability, 41.5% (17 respondents) frequently forget essential peripheral cables or accessories, and 31.7% (13 respondents) encounter misplaced paper forms or lost loan records. These empirical findings substantiate the core problem statements outlined in Section 1.2.'
      ),

      // Figure 3.6: Clashes
      ...createImagePara('prelim_q5_clashes.png', 480, 240, 'Figure 3.6: User Requirements Survey - Incidence of Schedule Clashes and Double-Bookings'),
      createPara(
        'Figure 3.6 investigates whether respondents have experienced equipment schedule clashes or double-bookings during peak campus event periods (41 responses). A critical 53.7% (22 respondents) reported experiencing clashes sometimes or occasionally, and 34.1% (14 respondents) experience clashes often, particularly during major campus event weeks. Only 12.2% reported never experiencing a clash. This proves that 87.8% of event organizers have been negatively impacted by booking conflicts, underscoring the absolute necessity of PinjamGeng\'s automated conflict-checking engine.'
      ),

      // Figure 3.7: Damaged Gear
      ...createImagePara('prelim_q6_defects.png', 480, 240, 'Figure 3.7: User Requirements Survey - Frequency of Damaged or Incomplete Equipment Received'),
      createPara(
        'Figure 3.7 reveals that 65.9% of respondents (27 respondents) have received damaged, defective, or incomplete equipment upon collecting items from the university equipment counter, while only 34.1% have not encountered this issue. This finding proves that without a standardized check-in inspection log, equipment wear and defects go undocumented, causing subsequent borrowers to receive faulty gear during vital campus functions.'
      ),

      // Figure 3.8: Turnaround
      ...createImagePara('prelim_q7_turnaround.png', 480, 240, 'Figure 3.8: User Requirements Survey - Average Turnaround Time for Manual Loan Approvals'),
      createPara(
        'Figure 3.8 depicts the average turnaround time required for manual equipment loan requests to be fully approved and confirmed (40 responses). Equal shares of respondents—47.5% (19 respondents each)—reported waiting between 1 to 3 days and more than 3 days, respectively. Only 5.0% (2 respondents) received approval within the same day. This demonstrates that manual paper processing imposes significant waiting periods that delay event planning.'
      ),

      // Figure 3.9: Packages
      ...createImagePara('prelim_q8_packages.png', 480, 240, 'Figure 3.9: User Requirements Survey - Stakeholder Demand for "Smart Event Packages"'),
      createPara(
        'Figure 3.9 evaluates stakeholder receptivity toward pre-configured "Smart Event Packages" (e.g., AGM Package, Outdoor Sports Carnival Bundle, Seminar Exhibition Setup) to simplify booking and prevent forgotten cables (41 responses). An overwhelming 85.4% expressed positive agreement (48.8% Strongly Agree, 36.6% Agree), while 12.2% remained neutral and only 2.4% disagreed. This empirical validation confirms that package-based bundling is one of the most critical functional requirements demanded by campus users.'
      ),

      // Figure 3.10: Real-Time Stock
      ...createImagePara('prelim_q9_realtime_stock.png', 480, 240, 'Figure 3.10: User Requirements Survey - Importance of Real-Time Stock Availability Indicators'),
      createPara(
        'Figure 3.10 assesses the importance of real-time online equipment availability indicators prior to submitting a reservation (41 responses). Over 82.9% of respondents affirmed positive agreement, with 56.1% rating it as "Strongly Agree (Essential to prevent clashes)" and 26.8% rating it as "Agree". Only 14.6% were neutral and 2.4% disagreed. This confirms that dynamic inventory visibility directly addresses the root cause of booking uncertainty.'
      ),

      // Figure 3.11: Return Desk
      ...createImagePara('prelim_q10_return_desk.png', 480, 240, 'Figure 3.11: User Requirements Survey - Digital Return Desk Inspection for Condition Logging'),
      createPara(
        'Figure 3.11 evaluates whether a digital Return Desk inspection that logs item condition (Excellent, Good, Fair, Damaged) would improve student accountability and equipment care (41 responses). A strong 80.5% of respondents concurred (48.8% Strongly Agree, 31.7% Agree), with 14.6% neutral and 4.9% disagreeing. This demonstrates that students recognize the necessity of formal condition check-ins to safeguard shared university assets.'
      ),

      // Figure 3.12: System Support
      ...createImagePara('prelim_q11_system_support.png', 480, 240, 'Figure 3.12: User Requirements Survey - Stakeholder Support for PinjamGeng Implementation'),
      createPara(
        'Figure 3.12 measures overall campus support for implementing the PinjamGeng web-based system to replace manual paper forms at UPTM (41 responses). An exceptional 85.4% of respondents voiced strong support (53.7% Strongly Agree, 31.7% Agree), with 12.2% neutral and only 2.4% disagreeing. This overwhelming endorsement confirms strong campus viability and user demand.'
      ),

      // Figure 3.13: Feedback
      ...createImagePara('prelim_q12_open_feedback.png', 480, 360, 'Figure 3.13: User Requirements Survey - Qualitative Stakeholder Recommendations and Suggestions'),
      createPara(
        'Figure 3.13 captures qualitative recommendations submitted by 17 respondents regarding desired system features. Salient stakeholder suggestions include: (1) adding visual preview photographs of equipment items to assist identification, (2) maintaining a permanent loan history record so clubs have verifiable proof of custody, (3) providing clear borrowing time windows to avoid clashes between sequential events, (4) embedding an interactive calendar interface, and (5) providing automated status notifications and clear repayment/return schedules. These recommendations were incorporated directly into the system design phase.'
      ),

      // 3.5 Interface Design
      createHeading2('3.5 Interface Design and Low-Fidelity Wireframes'),
      createPara(
        'In accordance with software engineering and user-centered design (UCD) best practices, low-fidelity wireframes were developed during the initial design phase to establish structural information hierarchy, spatial component layouts, and user task workflows before frontend coding. The wireframes follow clean, architectural blueprint standards—avoiding distracting photorealistic graphics to ensure rigorous focus on functional usability, input ergonomics, and logical data flow.'
      ),

      createHeading3('3.5.1 Wireframe 3.1: Student Authentication & Portal Login'),
      createPara(
        'Figure 3.14 illustrates the wireframe blueprint for the Student Authentication and Login interface. The layout features a clean, centered credential container with explicit student ID / institutional email and password input fields, a "Remember Me" toggle, and a clear call-to-action button, ensuring rapid, secure entry into the system.'
      ),
      ...createImagePara('wf_01_login.png', 500, 260, 'Figure 3.14: Wireframe 3.1 - Student Authentication & Portal Login Interface'),

      createHeading3('3.5.2 Wireframe 3.2: Live Equipment Catalog & Stock Indicators'),
      createPara(
        'Figure 3.15 depicts the Live Equipment Catalog and Stock Availability wireframe. The interface incorporates a top global search bar, category filter pills (Audio, Visual, Stage, Media), and a responsive 4-column card grid. Each equipment card features a placeholder image container, equipment specifications, a real-time availability badge (e.g., "Stock: 4 / 6 Avail"), and an intuitive selection button.'
      ),
      ...createImagePara('wf_02_catalog.png', 500, 260, 'Figure 3.15: Wireframe 3.2 - Live Equipment Catalog & Real-Time Stock Availability'),

      createHeading3('3.5.3 Wireframe 3.3: Pre-Configured "Smart Event Packages"'),
      createPara(
        'Figure 3.16 presents the wireframe for the Pre-Configured "Smart Event Packages" interface. Designed to resolve Problem Statement 1.2.2, this view displays bundled equipment cards for four standard campus event categories (Seminar, Workshop, Committee Meeting, and Outdoor Sports). Each card specifies all bundled items and includes a single-click "Select Package & Book" trigger.'
      ),
      ...createImagePara('wf_03_smart_packages.png', 500, 260, 'Figure 3.16: Wireframe 3.3 - Pre-Configured "Smart Event Packages" Selection Interface'),

      createHeading3('3.5.4 Wireframe 3.4: 2-Step Booking Wizard & Date Validation'),
      createPara(
        'Figure 3.17 outlines the 2-Step Booking Wizard wireframe. Step 1 collects essential event particulars (title, club name, venue, and required pickup/return timestamps). It features an integrated automated conflict-checking banner that verifies date-range stock availability in real time, accompanied by a dynamic sidebar summary of selected items.'
      ),
      ...createImagePara('wf_04_booking_wizard.png', 500, 260, 'Figure 3.17: Wireframe 3.4 - 2-Step Booking Wizard with Automated Conflict Check'),

      createHeading3('3.5.5 Wireframe 3.5: Downloadable A4 Loan Agreement Slip'),
      createPara(
        'Figure 3.18 illustrates the standardized A4 Loan Agreement Slip wireframe. Generated dynamically upon administrative booking approval, the slip incorporates institutional branding, a unique requisition reference code (e.g., PG-2026-0842), applicant particulars, an itemized equipment schedule with issue/return condition columns, institutional liability disclaimers, and dual physical signature blocks for counter verification.'
      ),
      ...createImagePara('wf_05_loan_slip.png', 480, 290, 'Figure 3.18: Wireframe 3.5 - Standardized Downloadable A4 Loan Agreement Voucher'),

      createHeading3('3.5.6 Wireframe 3.6: Admin Console Return Desk & Inspection'),
      createPara(
        'Figure 3.19 details the Administrator Return Desk and Condition Inspection wireframe. The console displays high-level KPI stat cards (Pending Approvals, Active Loans, Under Maintenance, Total Assets) alongside an interactive physical inspection modal. Technicians evaluate returned equipment using condition radio buttons (Good vs Damaged), with automatic maintenance ticket generation triggered when damage is logged.'
      ),
      ...createImagePara('wf_06_admin_return_desk.png', 500, 260, 'Figure 3.19: Wireframe 3.6 - Admin Console Return Desk & Physical Condition Inspection'),
      new Paragraph({ children: [new PageBreak()] }),

      // 3.5.2 Actual Interface Implementation
      createHeading3('3.5.2 Actual Interface (High-Fidelity Implementation)'),
      createPara(
        'Following the low-fidelity wireframing phase, the complete interactive web application was implemented. The system was developed using PHP for backend server-side logic and session handling, MySQL (MariaDB) for relational database persistence, and styled using Tailwind CSS and FontAwesome under an aesthetic campus warm palette (Deep Espresso #231308, Warm Cream #fdfbf7, Rich Caramel #d97736, and Honey Gold #e5a953). The actual interfaces provide clean, robust operational workflows for both Student Borrowers and Laboratory Administrators as documented in Figures 3.20 through 3.34 below:'
      ),

      createHeading4('Figure 3.20: Student Authentication & Portal Login Page'),
      createPara(
        'Figure 3.20 demonstrates the actual login portal for PinjamGeng. The interface features official UPTM branding, security badges indicating BCrypt password hashing and Anti-CSRF protection, and a quick-fill presentation demo assistant for streamlined testing. The authentication form includes input validation for institutional email or matric ID, secure masked password input with visibility toggle, and direct navigation links to student registration.'
      ),
      ...createImagePara('01_Authentication_Login.png', 420, 560, 'Figure 3.20: Actual Interface - Student Authentication & Portal Login Page'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.21: Student Borrower Dashboard'),
      createPara(
        'Figure 3.21 displays the Student Borrower Dashboard presented upon successful login. The dashboard features a personalized welcome header displaying the student\'s full name (Nursyafiqah Zulaikha Binti Zilkamal) and matric number (AM2412018113). Four interactive stat cards summarize the user\'s loan status: Total Bookings (3), Pending Review (2), Approved (0), and Active Loans (0). Prominent quick-action buttons allow single-click access to "Book Event Package" and "Custom Booking". Below, the "Recent Booking Records" section lists historical applications with real-time status indicators.'
      ),
      ...createImagePara('02_Student_Dashboard.png', 420, 560, 'Figure 3.21: Actual Interface - Student Borrower Dashboard & Activity Cockpit'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.22: Live Equipment Catalog & Real-Time Stock Availability'),
      createPara(
        'Figure 3.22 exhibits the Live Equipment Catalog interface. Users can search for equipment by name, brand, model, or asset tag, and filter items by category (Audio & Sound Systems, Visual & Projection, Staging & Lighting, Computing Hardware) and availability status. Each equipment card showcases item details, physical storage location (e.g., IT Store Shelf 2, Audio Storage Area C), condition status ("Good Condition"), and a real-time availability progress bar indicating currently available units versus total inventory (e.g., 3 of 3 units, 2 of 4 units). An instantaneous "Book Item" trigger initiates reservation directly from the catalog.'
      ),
      ...createImagePara('03_Live_Stock_Catalog.png', 420, 560, 'Figure 3.22: Actual Interface - Live Equipment Catalog & Stock Indicators'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.23: Pre-Configured "Smart Event Packages" Explorer'),
      createPara(
        'Figure 3.23 illustrates the innovative "Smart Event Packages" explorer—the core FYP innovation designed to resolve common equipment omissions. Organizers can filter packages across event types including Seminars & Lectures, Workshops & Labs, Meetings & Conventions, Photography & Media, and Outdoor & Sports. The "Complete Seminar & Lecture Package" card outlines the recommended attendee scale (50–300 pax), targeted audience, and an itemized breakdown of bundled hardware (Epson Full HD Projector, 84" Tripod Screen, Shure Dual Wireless Mics, JBL EON PA System, Presentation Clicker, and 4K HDMI Kit) with real-time bundle stock verification.'
      ),
      ...createImagePara('04_Smart_Event_Packages.png', 420, 560, 'Figure 3.23: Actual Interface - Pre-Configured "Smart Event Packages" Explorer'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.24: 2-Step Equipment Booking Wizard'),
      createPara(
        'Figure 3.24 details the 2-Step Equipment Booking Wizard. Step 1 collects comprehensive event metadata: Program Title, Event Category dropdown, Campus Room/Location (e.g., Dewan Gemilang Level 2), Estimated Attendee Headcount (PAX), Pickup Date/Time, Return Date/Time, and brief justification purpose. Step 2 presents the item selection table where pre-bundled items are automatically populated with verified stock quantities, allowing the borrower to adjust item counts while dynamic client-side validation prevents requesting quantities exceeding available inventory.'
      ),
      ...createImagePara('05_2Step_Booking_Wizard.png', 420, 560, 'Figure 3.24: Actual Interface - 2-Step Equipment Booking Wizard & Schedule Validation'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.25: Standardized Downloadable A4 Loan Agreement Slip'),
      createPara(
        'Figure 3.25 illustrates the official printable A4 Loan Agreement Slip generated dynamically upon booking approval. Conforming to UPTM institutional documentation standards, the voucher includes the university header, reference tracking code (#UPTM-BK-2026-001), Section A Applicant Details (Name, Matric ID, Faculty, Contact, Email), Section B Event Information (Event Name, Venue, Start/End Timestamps), Section C Borrowed Equipment Schedule (Asset Tags, Equipment Name, Quantity, Return Status), institutional liability terms, and formalized signature blocks for the student borrower, authorizing lab officer, and return desk custodian.'
      ),
      ...createImagePara('06_Digital_Loan_Slip.png', 420, 560, 'Figure 3.25: Actual Interface - Official Downloadable & Printable A4 Loan Agreement Slip'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.26: Admin Executive Dashboard & Real-Time Status Cockpit'),
      createPara(
        'Figure 3.26 shows the Administrator Executive Dashboard accessed by laboratory officers and technicians. The cockpit provides high-level administrative visibility through four primary metric cards: Total Equipment (94 units, with 72 currently available in stock), Pending Review (2 requests requiring immediate action), Active Loans (1 event, 22 units currently out), and Damaged / Maintenance (0 units). A dedicated "Pending Booking Requests" queue enables rapid review and approval, while the "Active Loans" tracker monitors current campus borrowings.'
      ),
      ...createImagePara('07_Admin_Dashboard.png', 420, 560, 'Figure 3.26: Actual Interface - Admin Executive Dashboard & Real-Time Status Cockpit'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.27: Admin Reservation Requests & Booking Approval Desk'),
      createPara(
        'Figure 3.27 depicts the central Booking Approval Desk. Laboratory administrators can filter applications using category tabs (All, Pending Review, Approved, Active Loans, Returned, Rejected) or search by reference number, applicant name, or matric ID. Each booking row displays the unique reference number (#UPTM-BK-...), applicant particulars, event details, venue, scheduled timestamps, and requested package badge, accompanied by a "Review & Approve" trigger that opens the detailed allocation modal.'
      ),
      ...createImagePara('08_Booking_Approval.png', 420, 560, 'Figure 3.27: Actual Interface - Admin Reservation Requests & Approval Desk'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.28: Admin Equipment Return Desk & Condition Inspection Desk'),
      createPara(
        'Figure 3.28 illustrates the Return Desk and Inspection module used by technicians when equipment is returned post-event. The top section displays "Active Loans Awaiting Return", showing borrower contacts, issue dates, expected return times, and total unit counts. The lower section records the "Recent Return Inspection Logs", detailing return timestamps, inspected equipment, physical condition status ("Good Condition"), inspector remarks, and receiving officer authentication.'
      ),
      ...createImagePara('09_Return_Penalty_Desk.png', 420, 560, 'Figure 3.28: Actual Interface - Admin Equipment Return Desk & Condition Inspection'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.29: Admin Master Inventory Management Suite'),
      createPara(
        'Figure 3.29 presents the Master Inventory Management suite. The interface displays all institutional equipment records with asset tag numbers (e.g., UPTM-SPK-002, UPTM-MIC-001), equipment names and models, category classifications, available versus total stock ratios (e.g., 3/3, 2/4, 10/12), and physical condition badges. Administrative action buttons allow staff to add new assets via modal, edit specifications, update storage locations, and manage category taxonomies.'
      ),
      ...createImagePara('10_Inventory_Management.png', 420, 560, 'Figure 3.29: Actual Interface - Admin Master Inventory Management Suite (CRUD)'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.30: Admin Popup Dialog - Register New Equipment Modal'),
      createPara(
        'Figure 3.30 illustrates the Admin Popup Dialog for registering new equipment assets into the database. When laboratory officers click "Add New Equipment" from the inventory management table, this centered modal overlay appears with a dimmed backdrop. The dialog captures mandatory institutional asset attributes: Unique Asset Tag Code (formatted to institutional naming conventions such as UPTM-PRJ-015), Category dropdown classification, Equipment Name, Brand & Specific Model, Physical Storage Location (e.g., IT Store Shelf 2A - Multimedia Locker), Total Inventory Units, Initial Physical Condition rating (Good Condition / Fair / Maintenance), Package Eligibility checkbox, and Technical Specifications notes. Submitting the form triggers backend server-side validation and inserts an immutable audit log entry.'
      ),
      ...createImagePara('modal_add_equipment.png', 500, 336, 'Figure 3.30: Actual Interface - Admin Popup Dialog: Register New Equipment Modal'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.31: Admin Popup Dialog - Update Equipment Record Modal'),
      createPara(
        'Figure 3.31 showcases the Admin Popup Dialog for updating existing equipment records. Accessible via the edit pencil icon on any inventory record row, the modal retrieves and populates the item\'s current attributes. A real-time allocation snapshot displays total units, currently available stock, and active loan counts. The Asset Tag field is locked as read-only to prevent tampering with physical barcode mapping. Administrators can update equipment descriptions, adjust brand details, reassign physical storage cabinets, update stock counts, adjust physical condition status, and record maintenance service notes. A secondary red action trigger allows administrators to archive retiring hardware.'
      ),
      ...createImagePara('modal_edit_equipment.png', 500, 336, 'Figure 3.31: Actual Interface - Admin Popup Dialog: Update Equipment Record Modal'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.32: Admin Action Confirmation Dialog - Booking Approval & Stock Allocation Modal'),
      createPara(
        'Figure 3.32 details the Admin Action Confirmation Dialog presented during the booking review process. Before committing an approval or rejection, administrators are presented with this formal authorization modal. The dialog displays an essential requisition summary (Reference #UPTM-BK-2026-001, applicant name, scheduled event dates, and total requested unit counts) alongside an automated stock deduction notice warning that approval will immediately decrement available inventory. The administrator inputs mandatory counter pickup instructions and officer remarks that appear on the student\'s printed loan voucher. A mandatory verification checkbox certifies physical staging before the green "Confirm & Authorize Booking" action executes an atomic database transaction.'
      ),
      ...createImagePara('modal_confirm_action.png', 500, 336, 'Figure 3.32: Actual Interface - Admin Action Confirmation Dialog: Booking Approval & Stock Allocation Modal'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.33: Borrower Profile & Account Security Management Page'),
      createPara(
        'Figure 3.33 displays the Borrower Profile & Account Security Management Page. The two-column layout provides students and staff with transparent account governance. The left panel showcases verified borrower particulars, matric ID, institutional email, mobile contact, affiliated student society, and key borrower metrics (Total Bookings, 100% Clean Return Track Record, and RM 0.00 Overdue Penalties), alongside proactive notification preference toggles. The right panel houses the Security & Password Management suite, featuring BCrypt cryptographic protection badges, masked password fields, a dynamic client-side password strength meter, and active device session indicators.'
      ),
      ...createImagePara('screen_user_profile.png', 500, 363, 'Figure 3.33: Actual Interface - Borrower Profile & Account Security Management Page'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading4('Figure 3.34: Multi-Device Responsive Desktop Layout'),
      createPara(
        'Figure 3.34 displays the desktop widescreen layout (1280px viewport) of the student booking portal, demonstrating fluid responsiveness, balanced whitespace, and optimal typographic legibility across modern campus laptop and workstation displays.'
      ),
      ...createImagePara('test_laptop_1280.png', 500, 312, 'Figure 3.34: Actual Interface - High-Resolution Desktop Viewport Layout (1280px)'),
      new Paragraph({ children: [new PageBreak()] }),

      // 3.6 System and Application Modelling
      createHeading2('3.6 System and Application Modelling'),
      createPara(
        'System modeling provides the formal abstract blueprint representing system workflows, behavioral dynamics, and database architectures. Modeling ensures that software components operate cohesively, eliminating architectural flaws prior to and during system construction.'
      ),

      createHeading3('3.6.1 Flowchart'),
      createPara(
        'Two distinct, publication-standard black-and-white flowcharts were developed to specify the execution paths for both user classifications: the Administrator and the Student Borrower.'
      ),
      createPara(
        'Figure 3.35 details the Administrator Flowchart. The workflow initiates with credential authentication. Upon successful login, the administrator selects from four primary operational branches: (1) Booking Management (reviewing requests, approving or rejecting applications, allocating physical stock, and issuing loan slips); (2) Inventory & Package Administration (adding, updating, and removing equipment and bundle packages); (3) Return Desk & Inspection (inspecting returned assets, auditing physical condition, logging automatic maintenance tickets for damaged items, or restocked healthy gear); and (4) Reports & Analytics (generating date-filtered utilization summaries and exporting PDF/CSV reports).'
      ),

      // Figure 3.35 Full Page Framed
      ...createImagePara('fig_3_110_admin_flowchart.png', 500, 650, 'Figure 3.35: Admin Operational Workflow Flowchart (Black & White Publication Standard)'),
      new Paragraph({ children: [new PageBreak()] }),

      createPara(
        'Figure 3.36 details the Student Borrower Flowchart. The process begins with account login or new user registration. Borrowers browse available inventory or explore curated Smart Event Packages. If a package is chosen, bundled items are automatically loaded into the 2-step booking wizard. The borrower selects required pickup and return dates. The system performs dynamic conflict checking; if stock is unavailable, an error prompt guides the user to revise their dates. If available, the borrower agrees to UPTM regulations and submits the request. Once approved by administration, the student downloads and prints the official A4 loan slip for physical collection.'
      ),

      // Figure 3.36 Full Page Framed
      ...createImagePara('fig_3_111_student_flowchart.png', 500, 650, 'Figure 3.36: Student Borrower Workflow Flowchart (Black & White Publication Standard)'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading3('3.6.2 Use Case Diagram'),
      createPara(
        'The Use Case Diagram defines the behavioral interactions between the system and its primary actors: the Student Borrower and the Administrator (FCOM / IT Staff).'
      ),
      createPara(
        'The Student Borrower interacts with use cases including: Account Registration, Authentication, Browsing Equipment Catalog, Exploring Smart Event Packages, Submitting Equipment Booking Requests, Tracking Booking Statuses, Printing Official Loan Slips, and Cancelling Pending Bookings. The "Submit Booking Request" use case includes two essential sub-processes: <<include>> Check Real-Time Stock Availability (which validates date-range inventory levels) and <<include>> Accept Loan Regulations (verifying borrower agreement to institutional liability terms).'
      ),
      createPara(
        'The Administrator possesses supervisory privileges encompassing: Reviewing & Approving/Rejecting Bookings, Counter Handover & Checkout, Inspecting Returned Equipment, Managing Equipment Inventory (CRUD), Managing Event Packages (CRUD), Managing Categories, Managing Maintenance Servicing, and Generating Analytical Reports. The "Inspect Return & Condition" use case is linked to <<extend>> Auto-Generate Maintenance Ticket, which executes whenever an item is marked as Damaged.'
      ),

      // Figure 3.37 Full Page Framed
      ...createImagePara('fig_3_112_use_case_diagram.png', 500, 650, 'Figure 3.37: Use Case Diagram for PinjamGeng (UML Standard, Black & White)'),
      new Paragraph({ children: [new PageBreak()] }),

      createHeading3('3.6.3 Entity Relational Diagram (ERD)'),
      createPara(
        'The Entity Relationship Diagram (Figure 3.38) establishes the normalized conceptual schema supporting PinjamGeng. The architecture comprises nine interconnected entities designed to 3rd Normal Form (3NF): users, categories, equipment, packages, package_items, bookings, booking_items, maintenance_tickets, and audit_logs.'
      ),

      // Figure 3.38 Full Page Framed
      ...createImagePara('fig_3_113_erd_diagram.png', 500, 650, 'Figure 3.38: Entity Relational Diagram (ERD) in 3NF Normalization'),
      new Paragraph({ children: [new PageBreak()] }),

      // 3.6.4 Data Dictionary
      createHeading3('3.6.4 Data Dictionary'),
      createPara(
        'The data dictionary provides exhaustive technical documentation of each database table, attribute, data type, constraint, and operational description utilized within PinjamGeng:'
      ),

      // Table 3.1: users
      createTableCaption('Table 3.1: Database Schema Dictionary - users Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['user_id', 'INT', 'Primary Key, Auto', 'Unique identifier for each user', '1'],
          ['full_name', 'VARCHAR(100)', 'NOT NULL', 'Full legal name of the user', 'Nursyafiqah Zulaikha Binti Zilkamal'],
          ['matric_staff_id', 'VARCHAR(30)', 'NOT NULL, UNIQUE', 'Official UPTM matric or staff ID', 'AM2412018113'],
          ['email', 'VARCHAR(100)', 'NOT NULL, UNIQUE', 'Institutional email address', 'syafiqah@student.uptm.edu.my'],
          ['phone_no', 'VARCHAR(20)', 'NOT NULL', 'Active mobile contact number', '012-3456789'],
          ['role', 'ENUM', 'NOT NULL', 'System authorization role (admin/user)', 'user'],
          ['user_category', 'ENUM', 'NOT NULL', 'Borrower category (student/committee/lecturer)', 'committee'],
          ['organization', 'VARCHAR(150)', 'NULL', 'Associated student club, society or faculty', 'Multimedia & Computing Club'],
          ['password_hash', 'VARCHAR(255)', 'NOT NULL', 'Cryptographic password hash (BCrypt)', '$2y$10$abcdef12345...'],
          ['created_at', 'DATETIME', 'NOT NULL', 'Timestamp of account creation', '2026-02-15 10:30:00'],
        ]
      ),

      // Table 3.2: categories
      createTableCaption('Table 3.2: Database Schema Dictionary - categories Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['category_id', 'INT', 'Primary Key, Auto', 'Unique category identifier', '1'],
          ['category_name', 'VARCHAR(100)', 'NOT NULL, UNIQUE', 'Name of equipment classification', 'Audio & Sound Systems'],
          ['description', 'TEXT', 'NULL', 'Detailed operational description of category', 'PA systems, wireless mics, cables'],
          ['icon_class', 'VARCHAR(50)', 'NULL', 'FontAwesome visual icon class', 'fa-volume-high'],
          ['display_order', 'INT', 'DEFAULT 0', 'Position ranking in user catalog UI', '1'],
        ]
      ),

      // Table 3.3: equipment
      createTableCaption('Table 3.3: Database Schema Dictionary - equipment Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['equipment_id', 'INT', 'Primary Key, Auto', 'Unique equipment asset identifier', '101'],
          ['category_id', 'INT', 'Foreign Key (categories)', 'Category reference link', '1'],
          ['item_name', 'VARCHAR(150)', 'NOT NULL', 'Official equipment asset name', 'EPSON EB-E01 Projector'],
          ['model_no', 'VARCHAR(100)', 'NULL', 'Manufacturer model or serial number', 'EB-E01-XGA'],
          ['total_qty', 'INT', 'NOT NULL', 'Total inventory asset units owned', '6'],
          ['available_qty', 'INT', 'NOT NULL', 'Units currently available for loan', '4'],
          ['booked_qty', 'INT', 'DEFAULT 0', 'Units actively reserved in approved bookings', '2'],
          ['maintenance_qty', 'INT', 'DEFAULT 0', 'Units quarantined under repair', '0'],
          ['replacement_cost', 'DECIMAL(10,2)', 'NOT NULL', 'Replacement value in Ringgit Malaysia', '1850.00'],
          ['storage_location', 'VARCHAR(100)', 'NOT NULL', 'Physical campus room or cabinet store', 'FCOM Store Room A-2'],
          ['status', 'ENUM', 'NOT NULL', 'Operational status (active/maintenance)', 'active'],
        ]
      ),

      // Table 3.4: packages
      createTableCaption('Table 3.4: Database Schema Dictionary - packages Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['package_id', 'INT', 'Primary Key, Auto', 'Unique smart package identifier', '1'],
          ['package_name', 'VARCHAR(150)', 'NOT NULL', 'Commercial title of curated package', 'Seminar & Exhibition Setup'],
          ['event_type', 'VARCHAR(50)', 'NOT NULL', 'Target event category classification', 'seminar'],
          ['description', 'TEXT', 'NOT NULL', 'Purpose summary and bundle contents', 'Includes projector, screen, and 2 mics'],
          ['banner_image', 'VARCHAR(255)', 'NULL', 'Relative image file path', 'seminar_bundle.jpg'],
          ['is_active', 'TINYINT(1)', 'DEFAULT 1', 'Status flag allowing user selection', '1'],
        ]
      ),

      // Table 3.5: package_items
      createTableCaption('Table 3.5: Database Schema Dictionary - package_items Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['item_map_id', 'INT', 'Primary Key, Auto', 'Mapping row identifier', '1'],
          ['package_id', 'INT', 'Foreign Key (packages)', 'Parent package reference', '1'],
          ['equipment_id', 'INT', 'Foreign Key (equipment)', 'Included equipment reference', '101'],
          ['default_quantity', 'INT', 'NOT NULL', 'Mandatory bundled unit count', '1'],
        ]
      ),

      // Table 3.6: bookings
      createTableCaption('Table 3.6: Database Schema Dictionary - bookings Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['booking_id', 'INT', 'Primary Key, Auto', 'Unique loan transaction identifier', '501'],
          ['booking_reference', 'VARCHAR(30)', 'NOT NULL, UNIQUE', 'Official printable slip reference number', 'PG-2026-0842'],
          ['user_id', 'INT', 'Foreign Key (users)', 'Borrower user reference link', '1'],
          ['package_id', 'INT', 'NULL, Foreign Key (packages)', 'Optional bundle package reference link', '1'],
          ['event_title', 'VARCHAR(200)', 'NOT NULL', 'Official campus event name', 'UPTM Career Fair 2026'],
          ['event_venue', 'VARCHAR(150)', 'NOT NULL', 'Campus venue location', 'Main Auditorium & Concourse'],
          ['start_datetime', 'DATETIME', 'NOT NULL', 'Scheduled equipment pickup timestamp', '2026-11-15 08:30:00'],
          ['end_datetime', 'DATETIME', 'NOT NULL', 'Scheduled equipment return timestamp', '2026-11-17 17:00:00'],
          ['status', 'ENUM', 'NOT NULL', 'Loan state (pending/approved/on_loan/returned/cancelled)', 'approved'],
          ['created_at', 'DATETIME', 'NOT NULL', 'Application submission timestamp', '2026-11-01 14:20:00'],
        ]
      ),

      // Table 3.7: booking_items
      createTableCaption('Table 3.7: Database Schema Dictionary - booking_items Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['booking_item_id', 'INT', 'Primary Key, Auto', 'Unique item schedule record', '1001'],
          ['booking_id', 'INT', 'Foreign Key (bookings)', 'Associated booking reference', '501'],
          ['equipment_id', 'INT', 'Foreign Key (equipment)', 'Reserved equipment asset link', '101'],
          ['quantity', 'INT', 'NOT NULL', 'Quantity allocated for booking', '1'],
          ['issue_condition', 'ENUM', 'DEFAULT "Good"', 'Physical condition at counter checkout', 'Good'],
          ['return_condition', 'ENUM', 'NULL', 'Physical condition evaluated at return desk', 'Good'],
        ]
      ),

      // Table 3.8: maintenance_tickets
      createTableCaption('Table 3.8: Database Schema Dictionary - maintenance_tickets Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['ticket_id', 'INT', 'Primary Key, Auto', 'Unique maintenance ticket identifier', '201'],
          ['equipment_id', 'INT', 'Foreign Key (equipment)', 'Defective equipment asset link', '101'],
          ['booking_id', 'INT', 'NULL, Foreign Key (bookings)', 'Loan record where damage occurred', '501'],
          ['defect_description', 'TEXT', 'NOT NULL', 'Physical condition and defect remarks', 'HDMI port loose, cable missing'],
          ['cost_estimate', 'DECIMAL(10,2)', 'NULL', 'Estimated repair or replacement cost', '150.00'],
          ['status', 'ENUM', 'NOT NULL', 'Ticket state (pending/in_servicing/resolved)', 'pending'],
          ['created_at', 'DATETIME', 'NOT NULL', 'Defect logging timestamp', '2026-11-17 17:15:00'],
        ]
      ),

      // Table 3.9: audit_logs
      createTableCaption('Table 3.9: Database Schema Dictionary - audit_logs Table'),
      createDocxTable(
        ['Field Name', 'Data Type', 'Constraint', 'Description', 'Example'],
        [
          ['log_id', 'INT', 'Primary Key, Auto', 'Audit log sequential record', '5001'],
          ['user_id', 'INT', 'Foreign Key (users)', 'Actor responsible for action', '1'],
          ['action_type', 'VARCHAR(50)', 'NOT NULL', 'System event (LOGIN, BOOKING_SUBMIT, RETURN)', 'BOOKING_SUBMIT'],
          ['details', 'TEXT', 'NOT NULL', 'Event telemetry and affected entities', 'Booking #PG-2026-0842 submitted'],
          ['ip_address', 'VARCHAR(45)', 'NOT NULL', 'Network IP address of client', '192.168.1.105'],
          ['logged_at', 'DATETIME', 'NOT NULL', 'Exact UTC timestamp of event', '2026-11-01 14:20:00'],
        ]
      ),

      new Paragraph({ children: [new PageBreak()] }),
    ];
  },
};
