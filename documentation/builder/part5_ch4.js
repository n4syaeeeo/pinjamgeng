module.exports = {
  getChapter4: function() {
    return `
    <!-- CHAPTER 4: FINDINGS AND RESULTS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 102 of 154</span>
      </div>

      <h1 class="chapter-num">CHAPTER 4</h1>
      <h1 class="chapter-title">FINDINGS AND RESULTS</h1>

      <h2 class="section-title">4.1 Introduction</h2>
      <p class="justified-text">
        System verification and testing represent critical quality assurance milestones in the software engineering lifecycle. For an institutional platform such as PinjamGeng—where students rely on reserved equipment for high-stakes university events and technicians manage valuable campus assets—it is imperative to ensure that the system executes flawlessly under all operating conditions. Testing demonstrates that the software fulfills its architectural objectives, operates securely, safeguards relational data integrity, and delivers an intuitive user experience.
      </p>
      <p class="justified-text">
        This chapter presents the complete empirical testing results of PinjamGeng across four formal evaluation stages: (1) <strong>Unit Testing</strong>, which validates individual code procedures, form handlers, and input validation routines; (2) <strong>Integration Testing</strong>, which confirms seamless data synchronization and business logic coordination across multiple database tables; (3) <strong>System Testing</strong>, which evaluates non-functional parameters including security protection, cross-browser compatibility, and load stability; and (4) <strong>User Acceptance Testing (UAT)</strong>, which gathers quantitative and qualitative satisfaction feedback from real student organizers and campus technicians.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">4.2 System Evaluation</h2>

      <h3 class="subsection-title">4.2.1 Unit Testing</h3>
      <p class="justified-text">
        Unit testing focuses on verifying the functional correctness of discrete system components in isolation. Test suites were designed with explicit input datasets, boundary error conditions, and expected behavioral outputs. If the observed output matches the anticipated result, the unit passes; otherwise, defect remediation is performed before code integration.
      </p>

      <!-- Table 4.1: Admin Unit Testing -->
      <p class="table-caption">Table 4.1: Admin Unit Testing</p>
      <table class="data-table">
        <thead>
          <tr><th>Module Testing</th><th>Input Data</th><th>Error Handling</th><th>Expected Output</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Login Screen</td>
            <td>Identifier: admin@uptm.edu.my<br/>Password: password123</td>
            <td>Error displayed if fields are blank or credentials invalid.</td>
            <td>User authenticated and redirected to Admin Dashboard.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Admin Dashboard</td>
            <td>Page Load (Active session)</td>
            <td>Redirect to login if unauthenticated.</td>
            <td>Displays 4 KPI cards (Pending, Loans, Total Units, Alerts) and recent queues.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Inventory - View Stock</td>
            <td>Category Filter: "Audio &amp; Sound Systems"</td>
            <td>Display empty state message if no items match.</td>
            <td>Table filtered to show only audio equipment with stock counters.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Inventory - Add Item</td>
            <td>Name: "Wireless PA Speaker 300W", Category: Audio, Qty: 4, Cost: RM850</td>
            <td>Error if item name, category, or quantity is missing/invalid.</td>
            <td>New asset saved to equipment table, appears in inventory list.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Inventory - Edit Item</td>
            <td>Change available_qty from 4 to 3, Location: "Lab 2"</td>
            <td>ID must exist; quantities cannot be negative.</td>
            <td>Equipment record updated with success notification banner.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Inventory - Delete Item</td>
            <td>Item ID: 12 (No active bookings)</td>
            <td>Blocks deletion if item is currently tied to active bookings.</td>
            <td>Item removed from equipment table; success banner shown.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Package - Create Bundle</td>
            <td>Name: "Webinar Live Streaming Set", Bundle: 1 Camera, 1 Mic, 1 Tripod</td>
            <td>Package name cannot be empty; items must exist.</td>
            <td>Package saved; linked rows created in package_items table.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Bookings - Review &amp; Approve</td>
            <td>Booking #UPTM-BK-2026-001, Action: Approve</td>
            <td>Verification of stock availability before confirming.</td>
            <td>Status changes to 'approved', stock allocated, slip ready for pickup.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Bookings - Reject</td>
            <td>Booking #UPTM-BK-2026-002, Reason: "Schedule conflict"</td>
            <td>Rejection notes mandatory.</td>
            <td>Status changes to 'rejected', allocated stock restored.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Checkout - Handover</td>
            <td>Click "Confirm Handover &amp; Checkout"</td>
            <td>Booking must be in 'approved' status.</td>
            <td>Status transitions to 'on_loan', timestamp saved to picked_up_at.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Return Desk - Inspection</td>
            <td>Select Condition: "Good", Return Notes: "All parts intact"</td>
            <td>Condition must be selected.</td>
            <td>Status transitions to 'returned', stock restored to available pool.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Return Desk - Log Damage</td>
            <td>Select Condition: "Damaged", Notes: "Cracked lens cover"</td>
            <td>Notes mandatory when damaged selected.</td>
            <td>Item marked damaged; automatic maintenance ticket created.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Maintenance - Resolve</td>
            <td>Ticket #1, Serviced by: "Technician Ali", Cost: RM60</td>
            <td>Resolution notes and technician name mandatory.</td>
            <td>Ticket marked 'resolved', equipment returned to healthy stock.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Reports - Filter &amp; Export</td>
            <td>Date Range: 2026-04-01 to 2026-04-30, Click "Export CSV"</td>
            <td>Date format validation (Start &le; End).</td>
            <td>CSV file generated and downloaded with full equipment loan data.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 104 of 154</span>
      </div>
    </div>

    <!-- PAGE 108: STUDENT UNIT TESTING -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 108 of 154</span>
      </div>

      <!-- Table 4.2: Student Borrower Unit Testing -->
      <p class="table-caption">Table 4.2: Student Borrower Unit Testing</p>
      <table class="data-table">
        <thead>
          <tr><th>Module Testing</th><th>Input Data</th><th>Error Handling</th><th>Expected Output</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>User Registration</td>
            <td>Name: Nursyafiqah Zulaikha, ID: AM2412018113, Email: syafiqah@student.uptm.edu.my</td>
            <td>Validation on matric format, duplicate email check, password min 6 chars.</td>
            <td>Account created with role 'user', redirected to login with welcome flash.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Student Login</td>
            <td>Identifier: AM2412018113<br/>Password: password123</td>
            <td>Show error if wrong credentials or empty fields.</td>
            <td>Authenticated and redirected to Student Dashboard.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Student Dashboard</td>
            <td>Active student session load</td>
            <td>Redirect if session invalid.</td>
            <td>Displays user welcome card, active loan counters, and quick actions.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Browse Equipment</td>
            <td>View Catalog, Search: "Projector"</td>
            <td>Empty state if no keyword match.</td>
            <td>Table displays matching projectors with live availability badges.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Smart Packages</td>
            <td>Click "Explore Packages", Select "AGM Package"</td>
            <td>Package must be active in database.</td>
            <td>Modal opens displaying bundled items and "Book This Package" button.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Booking Wizard - Autofill</td>
            <td>Click "Book This Package" from AGM Package</td>
            <td>Verify package active flag.</td>
            <td>Booking form pre-selects AGM package and locks bundled item quantities.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Booking Wizard - Date Check</td>
            <td>Start: 2026-04-10, End: 2026-04-09 (End before Start)</td>
            <td>Alert: "Return date cannot be earlier than pickup date."</td>
            <td>Form submission blocked; validation error displayed.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Booking Wizard - Stock Check</td>
            <td>Request 10 projectors when only 4 available</td>
            <td>Alert: "Requested quantity exceeds available stock."</td>
            <td>Submission rejected; prompts quantity reduction.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Terms Agreement</td>
            <td>Submit booking with unchecked agreement checkbox</td>
            <td>Alert: "You must agree to UPTM borrower regulations."</td>
            <td>Submission blocked until checkbox is acknowledged.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>My Bookings - Tracking</td>
            <td>Load My Bookings page</td>
            <td>Display empty placeholder if user has no loans.</td>
            <td>Displays historical and active loan records with color-coded badges.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Cancel Booking</td>
            <td>Booking #UPTM-BK-2026-003 (Status: Pending), Click "Cancel"</td>
            <td>Confirm dialog; only pending bookings can be cancelled.</td>
            <td>Status changes to 'cancelled', success flash message displayed.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Print Loan Slip</td>
            <td>Click "Print Official Slip" on Approved Booking</td>
            <td>Booking must be approved.</td>
            <td>Opens standardized A4 slip with Sections A, B, C and signatures.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Logout</td>
            <td>Click Logout button</td>
            <td>Session destroyed; auth cookies cleared.</td>
            <td>User redirected to login page; back-button access blocked.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 108 of 154</span>
      </div>
    </div>

    <!-- PAGE 111-115: INTEGRATION TESTING -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 111 of 154</span>
      </div>

      <h3 class="subsection-title">4.2.2 Integration Testing</h3>
      <p class="justified-text">
        Integration testing evaluates the data communication and relational interoperability between separate software modules. In PinjamGeng, actions performed in the student module directly trigger automated state transitions and inventory updates in the administrative module.
      </p>

      <!-- Table 4.3: Integration Testing -->
      <p class="table-caption">Table 4.3: Integration Testing</p>
      <table class="data-table">
        <thead>
          <tr><th>Module Interaction</th><th>Triggering Event</th><th>Relational Data Flow</th><th>Expected Integrated Result</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Package to Booking Wizard</td>
            <td>Student clicks "Book This Package" on AGM Bundle</td>
            <td>packages &rarr; package_items &rarr; book.php form</td>
            <td>Form loads with package_id bound; bundled item list autofilled with zero manual entry.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Booking Request to Admin Queue</td>
            <td>Student submits booking application</td>
            <td>INSERT bookings &rarr; INSERT booking_items &rarr; admin/dashboard.php</td>
            <td>Record stored with status 'pending'; instantly appears in Admin Pending Request Queue.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Approval to Inventory Lock</td>
            <td>Admin clicks "Approve Booking"</td>
            <td>UPDATE bookings &rarr; UPDATE equipment (available_qty - N, booked_qty + N)</td>
            <td>Available stock decremented in catalog; booking status updated to 'approved'.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Counter Checkout to Active Loan</td>
            <td>Technician confirms physical handover</td>
            <td>UPDATE bookings (status = 'on_loan', picked_up_at = NOW())</td>
            <td>Active loan KPI card increments on both admin and student dashboards.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Return Inspection to Stock Release</td>
            <td>Technician inspects gear as "Good" condition</td>
            <td>UPDATE bookings (status='returned') &rarr; equipment (booked_qty - N, available_qty + N)</td>
            <td>Available stock restored to inventory shelf; booking marked complete in student history.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Damage Audit to Maintenance Ticket</td>
            <td>Technician flags returned microphone as "Damaged"</td>
            <td>UPDATE booking_items &rarr; INSERT maintenance_tickets &rarr; equipment (maintenance_qty + 1)</td>
            <td>Automatic servicing ticket created with defect notes; asset quarantined from active catalog.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Maintenance Resolution to Restock</td>
            <td>Technician marks ticket "Resolved"</td>
            <td>UPDATE maintenance_tickets &rarr; equipment (maintenance_qty - 1, available_qty + 1)</td>
            <td>Repaired gear restored to active booking catalog; maintenance cost aggregated in reports.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Booking Cancellation to Stock Release</td>
            <td>Student cancels pending booking</td>
            <td>UPDATE bookings (status='cancelled')</td>
            <td>Booking flagged cancelled; any allocated tentative stock immediately freed.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td>Reporting Engine Integration</td>
            <td>Admin opens reports.php</td>
            <td>JOIN bookings, booking_items, equipment, maintenance_tickets</td>
            <td>Calculates total loans, equipment condition health ratio, and top 5 borrowed items.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 111 of 154</span>
      </div>
    </div>

    <!-- PAGE 116-117: SYSTEM TESTING -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 116 of 154</span>
      </div>

      <h3 class="subsection-title">4.2.3 System Testing</h3>
      <p class="justified-text">
        System testing validates the complete, integrated software application across non-functional architectural attributes including security enforcement, response performance, browser compatibility, and interface responsiveness.
      </p>

      <!-- Table 4.4: System Testing -->
      <p class="table-caption">Table 4.4: System Testing</p>
      <table class="data-table">
        <thead>
          <tr><th>Testing Category</th><th>Testing Scenario</th><th>Expected System Behavior</th><th>Result</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Functional Testing</strong></td>
            <td>Execute end-to-end borrowing lifecycle (Registration &rarr; Booking &rarr; Approval &rarr; Checkout &rarr; Return &rarr; Reporting).</td>
            <td>All business logic functions correctly with zero fatal errors or unhandled exceptions.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td><strong>Usability Testing</strong></td>
            <td>Evaluate interface navigation, package selection clarity, and form submission ease for novice users.</td>
            <td>Users complete booking requests within 2 minutes without external assistance.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td><strong>Security Testing (CSRF)</strong></td>
            <td>Submit POST forms with omitted, tampered, or expired anti-CSRF security tokens.</td>
            <td>System rejects request with "Security validation failed" flash error; prevents unauthorized state change.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td><strong>Security Testing (Rate Limit)</strong></td>
            <td>Simulate automated brute-force attacks with &gt;5 consecutive invalid password submissions.</td>
            <td>System activates IP rate-limiting lockout; blocks subsequent attempts for 60 seconds.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td><strong>Cross-Browser Compatibility</strong></td>
            <td>Render application across Google Chrome (v122+), Microsoft Edge (v122+), and Mozilla Firefox.</td>
            <td>Layout, typography, modals, and Tailwind responsive grids render consistently across all browsers.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td><strong>Print Layout Testing</strong></td>
            <td>Trigger "Print Official Slip" on A4 paper and PDF print dialog.</td>
            <td>Print stylesheet removes headers/footers, centers official slip, formats Section A/B/C cleanly on single page.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td><strong>Session Integrity Testing</strong></td>
            <td>Attempt to access admin pages directly via URL tampering using a student session or logged-out browser.</td>
            <td>Access denied; unauthorized users redirected to login portal immediately.</td>
            <td><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 117 of 154</span>
      </div>
    </div>

    <!-- PAGE 118-123: USER ACCEPTANCE TESTING (UAT) CHARTS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 118 of 154</span>
      </div>

      <h3 class="subsection-title">4.2.4 User Acceptance Testing (UAT)</h3>
      <p class="justified-text">
        User Acceptance Testing (UAT) was conducted to evaluate real user satisfaction and practical operational efficacy. A cohort of 25 campus participants—consisting of 15 student club committee members (MCSC, MPP, Sports Club), 5 faculty lecturers, and 5 laboratory technicians—interacted with PinjamGeng during simulated event booking and return scenarios. Feedback was collected via a post-test Google Form survey comprising 12 quantitative and qualitative criteria:
      </p>

      <!-- UAT Figures 4.1 & 4.2 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_1_user_questionnaire_1.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.1: User questionnaire 1</p>
      </div>
      <p class="justified-text">
        Figure 4.1 shows that 60% of respondents are student committee members, 20% faculty lecturers, and 20% equipment technicians.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_2_user_questionnaire_2.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.2: User questionnaire 2</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.2, the majority of respondents (68%) rated the system as "Very Easy" to use (Rating 1), while 24% gave Rating 2 and 8% Rating 3. No respondents rated the system as difficult.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 118 of 154</span>
      </div>
    </div>

    <!-- PAGE 119 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 119 of 154</span>
      </div>

      <!-- Figures 4.3 & 4.4 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_3_user_questionnaire_3.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.3: User questionnaire 3</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.3, 100% of respondents agreed that PinjamGeng enables significantly faster equipment reservations compared to manual paper requisition slips (84% Strongly Agree, 16% Agree).
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_4_user_questionnaire_4.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.4: User questionnaire 4</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.4, 92% of respondents strongly agreed and 8% agreed that the Smart Event Packages feature is clear, intuitive, and prevents forgotten cables or accessories.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 119 of 154</span>
      </div>
    </div>

    <!-- PAGE 120 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 120 of 154</span>
      </div>

      <!-- Figures 4.5 & 4.6 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_5_user_questionnaire_5.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.5: User questionnaire 5</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.5, 88% strongly agreed that the real-time stock availability indicators provide clear visibility before submitting reservations.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_6_user_questionnaire_6.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.6: User questionnaire 6</p>
      </div>
      <p class="justified-text">
        Figure 4.6 confirms that 84% strongly agreed and 16% agreed that the 2-step booking wizard streamlines event details and regulatory agreements effectively.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 120 of 154</span>
      </div>
    </div>

    <!-- PAGE 121 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 121 of 154</span>
      </div>

      <!-- Figures 4.7 & 4.8 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_7_user_questionnaire_7.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.7: User questionnaire 7</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.7, 92% of respondents strongly agreed that the official printable A4 loan agreement slip provides legal clarity and verification for counter pickups.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_8_user_questionnaire_8.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.8: User questionnaire 8</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.8, 88% strongly agreed that the Return Desk condition inspection feature ensures student accountability and prevents damaged gear from going unrecorded.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 121 of 154</span>
      </div>
    </div>

    <!-- PAGE 122 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 122 of 154</span>
      </div>

      <!-- Figures 4.9 & 4.10 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_9_user_questionnaire_9.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.9: User questionnaire 9</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.9, 96% strongly agreed and 4% agreed that the system eliminates scheduling clashes and double-bookings compared to manual counter logbooks.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_10_user_questionnaire_10.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.10: User questionnaire 10</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.10, the most valued features are Smart Event Packages (84%), Real-time Stock View (76%), Printable Loan Slip (68%), and Return Desk Inspection (60%).
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 122 of 154</span>
      </div>
    </div>

    <!-- PAGE 123 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 123 of 154</span>
      </div>

      <!-- Figures 4.11 & 4.12 -->
      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_11_user_questionnaire_11.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.11: User questionnaire 11</p>
      </div>
      <p class="justified-text">
        Based on Figure 4.11, 100% of participants rated the system with the maximum score of 5 out of 5 stars, indicating complete institutional satisfaction.
      </p>

      <div style="text-align:center; margin: 15px 0;">
        <img src="images/fig_4_12_user_questionnaire_12.png" style="max-width:560px; width:100%; border:1px solid #ddd;" />
        <p class="figure-caption">Figure 4.12: User questionnaire 12</p>
      </div>
      <p class="justified-text">
        Figure 4.12 summarizes qualitative user feedback: "All good! Super convenient for MCSC club activities", "Saves our laboratory technicians hours of searching through binders", and requests for future QR scanning.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">4.3 Discussion</h2>
      <p class="justified-text">
        The empirical findings from unit, integration, system, and user acceptance testing conclusively demonstrate that PinjamGeng accomplishes its architectural and operational goals. By substituting paper slips with an automated, database-backed platform, the system reduces equipment reservation time from days to seconds while eliminating scheduling conflicts. The seamless integration between return inspection and maintenance ticketing guarantees institutional asset preservation, fulfilling all stakeholder expectations across Universiti Poly-Tech Malaysia.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">4.4 Conclusion</h2>
      <p class="justified-text">
        Chapter 4 has presented comprehensive test results validating the robustness, security, and usability of PinjamGeng. With 100% pass rates across unit, integration, and system test cases, and a unanimous 5-star user satisfaction rating during UAT trials, the system has proven its operational readiness for full campus deployment.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 125 of 154</span>
      </div>
    </div>
    `;
  }
};
