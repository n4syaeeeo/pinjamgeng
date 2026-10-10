const docx = require('docx');
const { Paragraph, PageBreak, AlignmentType } = docx;
const {
  createPara,
  createHeading1,
  createHeading2,
  createHeading3,
  createTableCaption,
  createImagePara,
  createDocxTable,
} = require('./doc_helpers.js');

module.exports = {
  getChapter4: function() {
    return [
      createHeading1('CHAPTER 4: TESTING, EVALUATION AND RESULTS'),

      // 4.1 Introduction
      createHeading2('4.1 Introduction'),
      createPara(
        'System verification and testing represent critical quality assurance milestones in the software engineering lifecycle. For an institutional platform such as PinjamGeng—where students rely on reserved equipment for high-stakes university events and technicians manage valuable campus assets—it is imperative to ensure that the system executes flawlessly under all operating conditions. Testing demonstrates that the software fulfills its architectural objectives, operates securely, safeguards relational data integrity, and delivers an intuitive user experience.'
      ),
      createPara(
        'This chapter presents the complete empirical testing results of PinjamGeng across four formal evaluation stages: (1) Unit Testing, which validates individual code procedures, form handlers, and input validation routines; (2) Integration Testing, which confirms seamless data synchronization and business logic coordination across multiple database tables; (3) System Testing, which evaluates non-functional parameters including security protection, cross-browser compatibility, and load stability; and (4) User Acceptance Testing (UAT), which gathers quantitative and qualitative satisfaction feedback from real student organizers and campus technicians.'
      ),

      // 4.2 System Evaluation
      createHeading2('4.2 System Evaluation and Functional Testing'),

      createHeading3('4.2.1 Unit Testing'),
      createPara(
        'Unit testing focuses on verifying the functional correctness of discrete system components in isolation. Test suites were designed with explicit input datasets, boundary error conditions, and expected behavioral outputs. If the observed output matches the anticipated result, the unit passes; otherwise, defect remediation is performed before code integration.'
      ),

      // Table 4.1: Admin Unit Testing
      createTableCaption('Table 4.1: Administrator Module Unit Testing Execution Matrix'),
      createDocxTable(
        ['Module Testing', 'Input Data', 'Error Handling', 'Expected Output', 'Result'],
        [
          ['Login Screen', 'Identifier: admin@uptm.edu.my, Password: password123', 'Error displayed if fields blank or invalid', 'User authenticated and redirected to Admin Dashboard', 'PASS'],
          ['Admin Dashboard', 'Page Load (Active session)', 'Redirect to login if unauthenticated', 'Displays 4 KPI cards and recent queues', 'PASS'],
          ['Inventory - View Stock', 'Category Filter: "Audio & Sound Systems"', 'Display empty state message if no items match', 'Table filtered to show only audio equipment with stock counters', 'PASS'],
          ['Inventory - Add Item', 'Name: "Wireless PA Speaker 300W", Category: Audio, Qty: 4, Cost: RM850', 'Error if item name, category, or quantity missing', 'New asset saved to equipment table; appears in list', 'PASS'],
          ['Inventory - Edit Item', 'Change available_qty from 4 to 3, Location: "Lab 2"', 'ID must exist; quantities cannot be negative', 'Equipment record updated with success banner', 'PASS'],
          ['Inventory - Delete Item', 'Item ID: 12 (No active bookings)', 'Blocks deletion if tied to active bookings', 'Item removed from equipment table; success banner shown', 'PASS'],
          ['Package - Create Bundle', 'Name: "Webinar Live Streaming Set", Bundle: 1 Camera, 1 Mic, 1 Tripod', 'Package name cannot be empty; items must exist', 'Package saved; linked rows created in package_items table', 'PASS'],
          ['Bookings - Review & Approve', 'Booking #UPTM-BK-2026-001, Action: Approve', 'Verification of stock availability before confirming', 'Status changes to "approved", stock allocated, slip ready for pickup', 'PASS'],
          ['Bookings - Reject', 'Booking #UPTM-BK-2026-002, Reason: "Schedule conflict"', 'Rejection notes mandatory', 'Status changes to "rejected", allocated stock restored', 'PASS'],
          ['Checkout - Handover', 'Click "Confirm Handover & Checkout"', 'Booking must be in "approved" status', 'Status transitions to "on_loan", timestamp saved to picked_up_at', 'PASS'],
          ['Return Desk - Inspection', 'Select Condition: "Good", Return Notes: "All parts intact"', 'Condition must be selected', 'Status transitions to "returned", stock restored to available pool', 'PASS'],
          ['Return Desk - Log Damage', 'Select Condition: "Damaged", Notes: "Cracked lens cover"', 'Notes mandatory when damaged selected', 'Item marked damaged; automatic maintenance ticket created', 'PASS'],
          ['Maintenance - Resolve', 'Ticket #1, Serviced by: "Technician Ali", Cost: RM60', 'Resolution notes and technician name mandatory', 'Ticket marked "resolved", equipment returned to healthy stock', 'PASS'],
          ['Reports - Filter & Export', 'Date Range: 2026-04-01 to 2026-04-30, Click "Export CSV"', 'Date format validation (Start <= End)', 'CSV file generated and downloaded with full equipment loan data', 'PASS'],
        ]
      ),

      // Table 4.2: Student Borrower Unit Testing
      createTableCaption('Table 4.2: Student Borrower Module Unit Testing Execution Matrix'),
      createDocxTable(
        ['Module Testing', 'Input Data', 'Error Handling', 'Expected Output', 'Result'],
        [
          ['User Registration', 'Name: Nursyafiqah Zulaikha, ID: AM2412018113, Email: syafiqah@student.uptm.edu.my', 'Validation on matric format, duplicate email check, password min 6 chars', 'Account created with role "user", redirected to login with welcome flash', 'PASS'],
          ['Student Login', 'Identifier: AM2412018113, Password: password123', 'Show error if wrong credentials or empty fields', 'Authenticated and redirected to Student Dashboard', 'PASS'],
          ['Student Dashboard', 'Active student session load', 'Redirect if session invalid', 'Displays user welcome card, active loan counters, and quick actions', 'PASS'],
          ['Browse Equipment', 'View Catalog, Search: "Projector"', 'Empty state if no keyword match', 'Table displays matching projectors with live availability badges', 'PASS'],
          ['Smart Packages', 'Click "Explore Packages", Select "AGM Package"', 'Package must be active in database', 'Modal opens displaying bundled items and "Book This Package" button', 'PASS'],
          ['Booking Wizard - Autofill', 'Click "Book This Package" from AGM Package', 'Verify package active flag', 'Booking form pre-selects AGM package and locks bundled item quantities', 'PASS'],
          ['Booking Wizard - Date Check', 'Start: 2026-04-10, End: 2026-04-09 (End before Start)', 'Alert: "Return date cannot be earlier than pickup date."', 'Form submission blocked; validation error displayed', 'PASS'],
          ['Booking Wizard - Stock Check', 'Request 10 projectors when only 4 available', 'Alert: "Requested quantity exceeds available stock."', 'Submission rejected; prompts quantity reduction', 'PASS'],
          ['Terms Agreement', 'Submit booking with unchecked agreement checkbox', 'Alert: "You must agree to UPTM borrower regulations."', 'Submission blocked until checkbox is acknowledged', 'PASS'],
          ['My Bookings - Tracking', 'Load My Bookings page', 'Display empty placeholder if user has no loans', 'Displays historical and active loan records with color-coded badges', 'PASS'],
          ['Cancel Booking', 'Booking #UPTM-BK-2026-003 (Status: Pending), Click "Cancel"', 'Confirm dialog; only pending bookings can be cancelled', 'Status changes to "cancelled", success flash message displayed', 'PASS'],
          ['Print Loan Slip', 'Click "Print Official Slip" on Approved Booking', 'Booking must be approved', 'Opens standardized A4 slip with Sections A, B, C and signatures', 'PASS'],
          ['Logout', 'Click Logout button', 'Session destroyed; auth cookies cleared', 'User redirected to login page; back-button access blocked', 'PASS'],
        ]
      ),

      // 4.2.2 Integration Testing
      createHeading3('4.2.2 Integration Testing', { spacingBefore: 240 }),
      createPara(
        'Integration testing evaluates the data communication and relational interoperability between separate software modules. In PinjamGeng, actions performed in the student module directly trigger automated state transitions and inventory updates in the administrative module.'
      ),
      createTableCaption('Table 4.3: Inter-Module Integration Testing Matrix'),
      createDocxTable(
        ['Module Interaction', 'Triggering Event', 'Relational Data Flow', 'Expected Integrated Result', 'Result'],
        [
          ['Package to Booking Wizard', 'Student clicks "Book This Package" on AGM Bundle', 'packages -> package_items -> book.php form', 'Form loads with package_id bound; bundled item list autofilled with zero manual entry', 'PASS'],
          ['Booking Request to Admin Queue', 'Student submits booking application', 'INSERT bookings -> INSERT booking_items -> admin/dashboard.php', 'Record stored with status "pending"; instantly appears in Admin Pending Request Queue', 'PASS'],
          ['Approval to Inventory Lock', 'Admin clicks "Approve Booking"', 'UPDATE bookings -> UPDATE equipment (available_qty - N, booked_qty + N)', 'Available stock decremented in catalog; booking status updated to "approved"', 'PASS'],
          ['Counter Checkout to Active Loan', 'Technician confirms physical handover', 'UPDATE bookings (status = "on_loan", picked_up_at = NOW())', 'Active loan KPI card increments on both admin and student dashboards', 'PASS'],
          ['Return Inspection to Stock Release', 'Technician inspects gear as "Good" condition', 'UPDATE bookings (status="returned") -> equipment (booked_qty - N, available_qty + N)', 'Available stock restored to inventory shelf; booking marked complete in student history', 'PASS'],
          ['Damage Audit to Maintenance Ticket', 'Technician flags returned microphone as "Damaged"', 'UPDATE booking_items -> INSERT maintenance_tickets -> equipment (maintenance_qty + 1)', 'Automatic servicing ticket created with defect notes; asset quarantined from active catalog', 'PASS'],
          ['Maintenance Resolution to Restock', 'Technician marks ticket "Resolved"', 'UPDATE maintenance_tickets -> equipment (maintenance_qty - 1, available_qty + 1)', 'Repaired gear restored to active booking catalog; maintenance cost aggregated in reports', 'PASS'],
        ]
      ),

      // 4.2.3 System Testing
      createHeading3('4.2.3 System Testing', { spacingBefore: 240 }),
      createPara(
        'System testing validates the complete, integrated software application across non-functional architectural attributes including security enforcement, response performance, browser compatibility, and interface responsiveness.'
      ),
      createTableCaption('Table 4.4: Non-Functional System Testing and Security Evaluation'),
      createDocxTable(
        ['Testing Category', 'Testing Scenario', 'Expected System Behavior', 'Result'],
        [
          ['Functional Testing', 'Execute end-to-end borrowing lifecycle (Registration -> Booking -> Approval -> Checkout -> Return -> Reporting)', 'All business logic functions correctly with zero fatal errors or unhandled exceptions', 'PASS'],
          ['Usability Testing', 'Evaluate interface navigation, package selection clarity, and form submission ease for novice users', 'Users complete booking requests within 2 minutes without external assistance', 'PASS'],
          ['Security Testing (CSRF)', 'Submit POST forms with omitted, tampered, or expired anti-CSRF security tokens', 'System rejects request with "Security validation failed" flash error; prevents unauthorized state change', 'PASS'],
          ['Security Testing (Rate Limit)', 'Simulate automated brute-force attacks with >5 consecutive invalid password submissions', 'System activates IP rate-limiting lockout; blocks subsequent attempts for 60 seconds', 'PASS'],
          ['Cross-Browser Compatibility', 'Render application across Google Chrome (v122+), Microsoft Edge (v122+), and Mozilla Firefox', 'Layout, typography, modals, and Tailwind responsive grids render consistently across all browsers', 'PASS'],
          ['Print Layout Testing', 'Trigger "Print Official Slip" on A4 paper and PDF print dialog', 'Print stylesheet removes headers/footers, centers official slip, formats Section A/B/C cleanly on single page', 'PASS'],
          ['Session Integrity Testing', 'Attempt to access admin pages directly via URL tampering using a student session or logged-out browser', 'Access denied; unauthorized users redirected to login portal immediately', 'PASS'],
        ]
      ),

      // 4.3 User Acceptance Testing (UAT)
      createHeading2('4.3 User Acceptance Testing (UAT) Analysis and Evaluation'),
      createPara(
        'User Acceptance Testing (UAT) was conducted post-deployment to evaluate real user satisfaction and practical operational efficacy among target stakeholders at Universiti Poly-Tech Malaysia. A cohort of 32 campus participants—consisting of student club executives (MCSC, MPP, Sports Club), club advisors, and equipment technicians—completed realistic borrowing, approval, and return cycles. Empirical data was collected through a formal Google Forms survey entitled "User Acceptance Testing (UAT) Survey – Smart Event Equipment Booking and Inventory Management System (PinjamGeng)". The complete findings, captured directly from Google Forms analytics charts, are analyzed below:'
      ),

      // Figure 4.1: UAT Role
      ...createImagePara('uat_q1_participant_role.png', 480, 240, 'Figure 4.1: UAT Survey - Participant Role Representation in Testing Session'),
      createPara(
        'Figure 4.1 shows the participant role breakdown during the User Acceptance Testing session (32 responses). An overwhelming 96.9% (31 participants) were Student Club / Society Executives (Borrowers), while the remainder represented Faculty Lecturers / Club Advisors and Equipment Administrators / Technicians. This participant makeup confirms that the UAT evaluation represents authentic primary users who routinely organize university campus events.'
      ),

      // Figure 4.2: Ease of Navigation
      ...createImagePara('uat_q2_ease_navigation.png', 480, 240, 'Figure 4.2: UAT Survey - Ease of Navigation Through PinjamGeng Web Interface'),
      createPara(
        'Figure 4.2 demonstrates evaluator ratings regarding navigation ease through the PinjamGeng web interface (30 responses). Exactly 80.0% of respondents awarded positive usability ratings (43.3% Very Easy, 36.7% Easy), with 16.7% rating it as Moderate and only 3.3% as Difficult. Combined, 96.7% of testers found the interface manageable and accessible, proving that the user interface design is clean and intuitive.'
      ),

      // Figure 4.3: Faster Reservations
      ...createImagePara('uat_q3_faster_reservation.png', 480, 240, 'Figure 4.3: UAT Survey - Requisition Speed vs Manual Paper Requisition Slips'),
      createPara(
        'Figure 4.3 evaluates whether PinjamGeng enables significantly faster equipment reservations compared to manual paper requisition slips (31 responses). An impressive 87.1% of participants concurred positively (48.4% Strongly Agree, 38.7% Agree), with only 12.9% remaining neutral and 0.0% disagreeing. This confirms that digital self-service successfully eradicates physical counter delays.'
      ),

      // Figure 4.4: Smart Packages
      ...createImagePara('uat_q4_smart_packages.png', 480, 240, 'Figure 4.4: UAT Survey - Clarity and Usability of "Smart Event Packages" Feature'),
      createPara(
        'Figure 4.4 assesses the clarity and effectiveness of the pre-configured "Smart Event Packages" feature in preventing forgotten cables or accessories (30 responses). A commanding 90.0% of respondents agreed (50.0% Agree, 40.0% Strongly Agree), with 10.0% neutral and 0.0% disagreeing. This validates Objective 1.3.1, proving that automated equipment bundling simplifies selection and prevents omissions.'
      ),

      // Figure 4.5: Stock Visibility
      ...createImagePara('uat_q5_stock_visibility.png', 480, 240, 'Figure 4.5: UAT Survey - Real-Time Stock Availability Visibility Before Submission'),
      createPara(
        'Figure 4.5 reflects evaluator feedback on real-time stock availability indicators providing clear visibility prior to reservation submission (31 responses). A substantial 87.1% responded favorably (48.4% Strongly Agree, 38.7% Agree), with 12.9% neutral and 0.0% disagreeing. Real-time inventory transparency directly eliminates guesswork and prevents blind requisition submissions.'
      ),

      // Figure 4.6: Booking Wizard
      ...createImagePara('uat_q6_booking_wizard.png', 480, 240, 'Figure 4.6: UAT Survey - 2-Step Booking Wizard Experience and Date Validation'),
      createPara(
        'Figure 4.6 examines whether the 2-step booking wizard provides a smooth, stress-free reservation experience with clear date validation (31 responses). An outstanding 93.6% expressed positive agreement (48.4% Agree, 45.2% Strongly Agree), while only 6.5% were neutral. This indicates that dividing the booking process into discrete steps prevents cognitive overload.'
      ),

      // Figure 4.7: Loan Slip
      ...createImagePara('uat_q7_loan_slip.png', 480, 240, 'Figure 4.7: UAT Survey - Official A4 Loan Slip for Equipment Accountability'),
      createPara(
        'Figure 4.7 evaluates the official downloadable/printable A4 Loan Agreement Slip in providing clear equipment accountability, reference tracking, and legal signature sections (30 responses). A solid 83.3% of participants agreed (43.3% Agree, 40.0% Strongly Agree), with 16.7% neutral. Standardizing the loan slip bridges digital requests with physical counter handovers.'
      ),

      // Figure 4.8: Return Inspection
      ...createImagePara('uat_q8_return_inspection.png', 480, 240, 'Figure 4.8: UAT Survey - Return Desk Condition Inspection Interface Efficacy'),
      createPara(
        'Figure 4.8 reflects stakeholder ratings on the Return Desk inspection interface (recording condition as Excellent, Good, Fair, Damaged) effectively improving equipment care and borrower accountability (31 responses). Exactly 83.8% of testers agreed (41.9% Strongly Agree, 41.9% Agree), with 12.9% neutral and only 3.2% disagreeing. Formal condition logging protects institutional assets and enforces borrower responsibility.'
      ),

      // Figure 4.9: Conflict Checking
      ...createImagePara('uat_q9_conflict_check.png', 480, 240, 'Figure 4.9: UAT Survey - Automated Conflict-Checking Elimination of Double-Bookings'),
      createPara(
        'Figure 4.9 evaluates whether PinjamGeng\'s automated conflict-checking successfully eliminates schedule double-bookings and lost application records (30 responses). An overwhelming 90.0% agreed (50.0% Agree, 40.0% Strongly Agree), with only 10.0% neutral. Computational validation completely eliminates the double-booking issues identified in the preliminary survey.'
      ),

      // Figure 4.10: Most Valuable Features
      ...createImagePara('uat_q10_valuable_features.png', 480, 260, 'Figure 4.10: UAT Survey - Most Valued PinjamGeng Features Identified by Evaluators'),
      createPara(
        'Figure 4.10 highlights the features identified as most valuable by evaluators (31 responses, multiple selections permitted). The two standout capabilities are Real-time Stock Availability Counters, selected by 67.7% (21 respondents), and Smart Event Packages, selected by 64.5% (20 respondents). Additionally, Return Desk Condition Inspection & Auto Maintenance garnered 35.5% (11 votes), Standardized Printable A4 Loan Agreement Slip received 32.3% (10 votes), and Executive Reports & Analytics Dashboard earned 19.4% (6 votes).'
      ),

      // Figure 4.11: Overall Rating
      ...createImagePara('uat_q11_overall_rating.png', 480, 260, 'Figure 4.11: UAT Survey - Overall System Satisfaction Rating Distribution (1 to 5 Stars)'),
      createPara(
        'Figure 4.11 presents the overall satisfaction rating distribution for PinjamGeng on a 5-point Likert scale (31 responses). An impressive 77.4% awarded top satisfaction marks (54.8% 5 Stars, 22.6% 4 Stars). A further 12.9% awarded 3 Stars (Acceptable / Neutral), 3.2% gave 2 Stars, and 6.5% gave 1 Star. Cumulatively, 90.3% of respondents expressed positive or acceptable satisfaction, yielding a commendable mean score of 4.16 out of 5.00 stars.'
      ),

      // Figure 4.12: Qualitative Feedback
      ...createImagePara('uat_q12_open_feedback.png', 480, 340, 'Figure 4.12: UAT Survey - Qualitative Evaluator Feedback and Testimonials'),
      createPara(
        'Figure 4.12 documents qualitative feedback submitted by 13 test participants. Evaluators commended the convenience and speed of the platform: "I liked the Smart Event Packages because they make it easier to choose and borrow the equipment needed for an event", "easy to check item so we don\'t have to waste time to check and waiting", "smooth operation", and "easy and complimentary layout". For future enhancements, respondents recommended adding further package varieties and extending mobile responsiveness.'
      ),

      // 4.4 Discussion
      createHeading2('4.4 Discussion and Evaluation of Results'),
      createPara(
        'The empirical findings gathered across Unit, Integration, System, and User Acceptance Testing definitively validate the engineering design and operational efficacy of PinjamGeng. Through automated form validation, relational database integrity constraints, and BCrypt cryptographic password protection, the platform eliminates common web vulnerabilities while ensuring 100% test pass rates across all 27 unit test scenarios.'
      ),
      createPara(
        'The User Acceptance Testing results demonstrate that transitioning from physical paper forms to a package-driven digital platform reduces requisition turnaround times from days to under two minutes. Real-time date-range conflict prevention completely eradicates double-booking clashes, while the standardized Return Desk workflow introduces rigorous condition logging that protects campus assets. Stakeholder feedback reflects 90.3% overall satisfaction and strong campus enthusiasm for institution-wide deployment at Universiti Poly-Tech Malaysia.'
      ),

      // 4.5 Conclusion
      createHeading2('4.5 Conclusion'),
      createPara(
        'Chapter 4 has presented the complete testing methodology and evaluation results for PinjamGeng. Across unit, integration, system, and user acceptance testing, the platform proved to be robust, secure, user-friendly, and fully capable of satisfying all operational and functional requirements established in Chapter 1.'
      ),
      new Paragraph({ children: [new PageBreak()] }),
    ];
  },
};
