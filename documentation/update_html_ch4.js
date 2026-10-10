const fs = require('fs');
const path = require('path');

const part5Path = path.join(__dirname, 'builder', 'part5_ch4.js');

const ch4Content = `module.exports = {
  getChapter4: function() {
    return \`
    <!-- CHAPTER 4: FINDINGS AND RESULTS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101 / DIPLOMA IN COMPUTER SCIENCE</span>
        <span class="page-num">UPTM FCOM FINAL REPORT</span>
      </div>

      <h1 class="chapter-num" style="text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 0;">CHAPTER 4</h1>
      <h1 class="chapter-title" style="text-align: center; font-size: 16pt; font-weight: bold; margin-top: 4px; margin-bottom: 24px;">TESTING, EVALUATION AND RESULTS</h1>

      <h2 class="section-title">4.1 Introduction</h2>
      <p class="justified-text">
        System verification and testing represent critical quality assurance milestones in the software engineering lifecycle. For an institutional platform such as PinjamGeng—where students rely on reserved equipment for high-stakes university events and technicians manage valuable campus assets—it is imperative to ensure that the system executes flawlessly under all operating conditions. Testing demonstrates that the software fulfills its architectural objectives, operates securely, safeguards relational data integrity, and delivers an intuitive user experience.
      </p>
      <p class="justified-text">
        This chapter presents the complete empirical testing results of PinjamGeng across four formal evaluation stages: (1) <strong>Unit Testing</strong>, which validates individual code procedures, form handlers, and input validation routines; (2) <strong>Integration Testing</strong>, which confirms seamless data synchronization and business logic coordination across multiple database tables; (3) <strong>System Testing</strong>, which evaluates non-functional parameters including security protection, cross-browser compatibility, and load stability; and (4) <strong>User Acceptance Testing (UAT)</strong>, which gathers quantitative and qualitative satisfaction feedback from real student organizers and campus technicians.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">4.2 System Evaluation and Functional Testing</h2>

      <h3 class="subsection-title">4.2.1 Unit Testing</h3>
      <p class="justified-text">
        Unit testing focuses on verifying the functional correctness of discrete system components in isolation. Test suites were designed with explicit input datasets, boundary error conditions, and expected behavioral outputs. If the observed output matches the anticipated result, the unit passes; otherwise, defect remediation is performed before code integration.
      </p>

      <!-- Table 4.1: Admin Unit Testing -->
      <p class="table-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 15px; margin-bottom: 6px;">Table 4.1: Administrator Module Unit Testing Execution Matrix</p>
      <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 9.5pt;">
        <thead>
          <tr style="background: #E5E7EB;">
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Module Testing</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Input Data</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Error Handling</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Expected Output</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px; text-align: center;">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Login Screen</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Identifier: admin@uptm.edu.my<br/>Password: password123</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Error displayed if fields are blank or credentials invalid.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">User authenticated and redirected to Admin Dashboard.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Admin Dashboard</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Page Load (Active session)</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Redirect to login if unauthenticated.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Displays 4 KPI cards and recent booking queues.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Inventory - View Stock</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Category Filter: "Audio &amp; Sound Systems"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Display empty state message if no items match.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Table filtered to show only audio equipment with stock counters.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Inventory - Add Item</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Name: "Wireless PA Speaker 300W", Category: Audio, Qty: 4, Cost: RM850</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Error if item name, category, or quantity missing.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">New asset saved to equipment table; appears in list.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Inventory - Edit Item</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Change available_qty from 4 to 3, Location: "Lab 2"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">ID must exist; quantities cannot be negative.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Equipment record updated with success banner.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Inventory - Delete Item</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Item ID: 12 (No active bookings)</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Blocks deletion if tied to active bookings.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Item removed from equipment table; success banner shown.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Package - Create Bundle</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Name: "Webinar Live Streaming Set", Bundle: 1 Camera, 1 Mic, 1 Tripod</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Package name cannot be empty; items must exist.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Package saved; linked rows created in package_items table.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Bookings - Review &amp; Approve</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking #UPTM-BK-2026-001, Action: Approve</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Verification of stock availability before confirming.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Status changes to "approved", stock allocated, slip ready.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Bookings - Reject</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking #UPTM-BK-2026-002, Reason: "Schedule conflict"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Rejection notes mandatory.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Status changes to "rejected", allocated stock restored.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Checkout - Handover</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Click "Confirm Handover &amp; Checkout"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking must be in "approved" status.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Status transitions to "on_loan", timestamp saved.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Return Desk - Inspection</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Select Condition: "Good", Return Notes: "All parts intact"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Condition must be selected.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Status transitions to "returned", stock restored to pool.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Return Desk - Log Damage</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Select Condition: "Damaged", Notes: "Cracked lens cover"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Notes mandatory when damaged selected.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Item marked damaged; automatic maintenance ticket created.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Maintenance - Resolve</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Ticket #1, Serviced by: "Technician Ali", Cost: RM60</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Resolution notes and technician name mandatory.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Ticket marked "resolved", equipment returned to healthy stock.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Reports - Filter &amp; Export</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Date Range: 2026-04-01 to 2026-04-30, Click "Export CSV"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Date format validation (Start &le; End).</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">CSV file generated and downloaded with full equipment loan data.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <!-- Table 4.2: Student Borrower Unit Testing -->
      <p class="table-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 20px; margin-bottom: 6px;">Table 4.2: Student Borrower Module Unit Testing Execution Matrix</p>
      <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 9.5pt;">
        <thead>
          <tr style="background: #E5E7EB;">
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Module Testing</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Input Data</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Error Handling</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Expected Output</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px; text-align: center;">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">User Registration</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Name: Nursyafiqah Zulaikha, ID: AM2412018113, Email: syafiqah@student.uptm.edu.my</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Validation on matric format, duplicate check, password min 6 chars.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Account created with role "user", redirected to login with welcome flash.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Student Login</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Identifier: AM2412018113, Password: password123</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Show error if wrong credentials or empty fields.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Authenticated and redirected to Student Dashboard.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Student Dashboard</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Active student session load</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Redirect if session invalid.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Displays user welcome card, active loan counters, and quick actions.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Browse Equipment</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">View Catalog, Search: "Projector"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Empty state if no keyword match.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Table displays matching projectors with live availability badges.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Smart Packages</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Click "Explore Packages", Select "AGM Package"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Package must be active in database.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Modal opens displaying bundled items and "Book This Package" button.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking Wizard - Autofill</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Click "Book This Package" from AGM Package</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Verify package active flag.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking form pre-selects AGM package and locks bundled item quantities.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking Wizard - Date Check</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Start: 2026-04-10, End: 2026-04-09 (End before Start)</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Alert: "Return date cannot be earlier than pickup date."</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Form submission blocked; validation error displayed.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking Wizard - Stock Check</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Request 10 projectors when only 4 available</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Alert: "Requested quantity exceeds available stock."</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Submission rejected; prompts quantity reduction.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Terms Agreement</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Submit booking with unchecked agreement checkbox</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Alert: "You must agree to UPTM borrower regulations."</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Submission blocked until checkbox is acknowledged.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">My Bookings - Tracking</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Load My Bookings page</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Display empty placeholder if user has no loans.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Displays historical and active loan records with color-coded badges.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Cancel Booking</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking #UPTM-BK-2026-003 (Status: Pending), Click "Cancel"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Confirm dialog; only pending bookings can be cancelled.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Status changes to "cancelled", success flash message displayed.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Print Loan Slip</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Click "Print Official Slip" on Approved Booking</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking must be approved.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Opens standardized A4 slip with Sections A, B, C and signatures.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Logout</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Click Logout button</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Session destroyed; auth cookies cleared.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">User redirected to login page; back-button access blocked.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <!-- 4.2.2 Integration Testing -->
      <h3 class="subsection-title" style="margin-top: 25px;">4.2.2 Integration Testing</h3>
      <p class="justified-text">
        Integration testing evaluates the data communication and relational interoperability between separate software modules. In PinjamGeng, actions performed in the student module directly trigger automated state transitions and inventory updates in the administrative module.
      </p>
      <p class="table-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 15px; margin-bottom: 6px;">Table 4.3: Inter-Module Integration Testing Matrix</p>
      <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 9.5pt;">
        <thead>
          <tr style="background: #E5E7EB;">
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Module Interaction</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Triggering Event</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Relational Data Flow</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Expected Integrated Result</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px; text-align: center;">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Package to Booking Wizard</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Student clicks "Book This Package" on AGM Bundle</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">packages &rarr; package_items &rarr; book.php form</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Form loads with package_id bound; bundled item list autofilled with zero manual entry.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Booking Request to Admin Queue</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Student submits booking application</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">INSERT bookings &rarr; INSERT booking_items &rarr; admin/dashboard.php</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Record stored with status "pending"; instantly appears in Admin Pending Request Queue.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Approval to Inventory Lock</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Admin clicks "Approve Booking"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">UPDATE bookings &rarr; UPDATE equipment (available_qty - N, booked_qty + N)</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Available stock decremented in catalog; booking status updated to "approved".</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Counter Checkout to Active Loan</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Technician confirms physical handover</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">UPDATE bookings (status = "on_loan", picked_up_at = NOW())</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Active loan KPI card increments on both admin and student dashboards.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Return Inspection to Stock Release</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Technician inspects gear as "Good" condition</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">UPDATE bookings (status="returned") &rarr; equipment (booked_qty - N, available_qty + N)</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Available stock restored to inventory shelf; booking marked complete in student history.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Damage Audit to Maintenance Ticket</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Technician flags returned microphone as "Damaged"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">UPDATE booking_items &rarr; INSERT maintenance_tickets &rarr; equipment (maintenance_qty + 1)</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Automatic servicing ticket created with defect notes; asset quarantined from active catalog.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Maintenance Resolution to Restock</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Technician marks ticket "Resolved"</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">UPDATE maintenance_tickets &rarr; equipment (maintenance_qty - 1, available_qty + 1)</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Repaired gear restored to active booking catalog; maintenance cost aggregated in reports.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <!-- 4.2.3 System Testing -->
      <h3 class="subsection-title" style="margin-top: 25px;">4.2.3 System Testing</h3>
      <p class="justified-text">
        System testing validates the complete, integrated software application across non-functional architectural attributes including security enforcement, response performance, browser compatibility, and interface responsiveness.
      </p>
      <p class="table-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 15px; margin-bottom: 6px;">Table 4.4: Non-Functional System Testing and Security Evaluation</p>
      <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 9.5pt;">
        <thead>
          <tr style="background: #E5E7EB;">
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Testing Category</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Testing Scenario</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px;">Expected System Behavior</th>
            <th style="border: 1px solid #9CA3AF; padding: 6px; text-align: center;">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;"><strong>Functional Testing</strong></td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Execute end-to-end borrowing lifecycle (Registration &rarr; Booking &rarr; Approval &rarr; Checkout &rarr; Return &rarr; Reporting).</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">All business logic functions correctly with zero fatal errors or unhandled exceptions.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;"><strong>Usability Testing</strong></td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Evaluate interface navigation, package selection clarity, and form submission ease for novice users.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Users complete booking requests within 2 minutes without external assistance.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;"><strong>Security Testing (CSRF)</strong></td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Submit POST forms with omitted, tampered, or expired anti-CSRF security tokens.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">System rejects request with "Security validation failed" flash error; prevents unauthorized state change.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;"><strong>Security Testing (Rate Limit)</strong></td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Simulate automated brute-force attacks with &gt;5 consecutive invalid password submissions.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">System activates IP rate-limiting lockout; blocks subsequent attempts for 60 seconds.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;"><strong>Cross-Browser Compatibility</strong></td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Render application across Google Chrome (v122+), Microsoft Edge (v122+), and Mozilla Firefox.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Layout, typography, modals, and Tailwind responsive grids render consistently across all browsers.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;"><strong>Print Layout Testing</strong></td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Trigger "Print Official Slip" on A4 paper and PDF print dialog.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Print stylesheet removes headers/footers, centers official slip, formats Section A/B/C cleanly on single page.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
          <tr>
            <td style="border: 1px solid #9CA3AF; padding: 5px;"><strong>Session Integrity Testing</strong></td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Attempt to access admin pages directly via URL tampering using a student session or logged-out browser.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px;">Access denied; unauthorized users redirected to login portal immediately.</td>
            <td style="border: 1px solid #9CA3AF; padding: 5px; text-align: center;"><strong style="color:green;">PASS</strong></td>
          </tr>
        </tbody>
      </table>

      <!-- 4.3 USER ACCEPTANCE TESTING (32 RESPONSES) -->
      <h2 class="section-title" style="margin-top: 30px;">4.3 User Acceptance Testing (UAT) Analysis and Evaluation</h2>
      <p class="justified-text">
        User Acceptance Testing (UAT) was conducted post-deployment to evaluate real user satisfaction and practical operational efficacy among target stakeholders at Universiti Poly-Tech Malaysia. A cohort of 32 campus participants—consisting of student club executives (MCSC, MPP, Sports Club), club advisors, and equipment technicians—completed realistic borrowing, approval, and return cycles. Empirical data was collected through a formal Google Forms survey entitled "User Acceptance Testing (UAT) Survey – Smart Event Equipment Booking and Inventory Management System (PinjamGeng)". The complete findings, captured directly from Google Forms analytics charts, are analyzed below:
      </p>

      <!-- Figure 4.1: UAT Role -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q1_participant_role.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.1" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.1: UAT Survey - Participant Role Representation in Testing Session</p>
      </div>
      <p class="justified-text">
        Figure 4.1 shows the participant role breakdown during the User Acceptance Testing session (32 responses). An overwhelming 96.9% (31 participants) were Student Club / Society Executives (Borrowers), while the remainder represented Faculty Lecturers / Club Advisors and Equipment Administrators / Technicians. This participant makeup confirms that the UAT evaluation represents authentic primary users who routinely organize university campus events.
      </p>

      <!-- Figure 4.2: Navigation -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q2_ease_navigation.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.2" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.2: UAT Survey - Ease of Navigation Through PinjamGeng Web Interface</p>
      </div>
      <p class="justified-text">
        Figure 4.2 demonstrates evaluator ratings regarding navigation ease through the PinjamGeng web interface (30 responses). Exactly 80.0% of respondents awarded positive usability ratings (43.3% Very Easy, 36.7% Easy), with 16.7% rating it as Moderate and only 3.3% as Difficult. Combined, 96.7% of testers found the interface manageable and accessible, proving that the user interface design is clean and intuitive.
      </p>

      <!-- Figure 4.3: Faster Reservations -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q3_faster_reservation.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.3" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.3: UAT Survey - Requisition Speed vs Manual Paper Requisition Slips</p>
      </div>
      <p class="justified-text">
        Figure 4.3 evaluates whether PinjamGeng enables significantly faster equipment reservations compared to manual paper requisition slips (31 responses). An impressive 87.1% of participants concurred positively (48.4% Strongly Agree, 38.7% Agree), with only 12.9% remaining neutral and 0.0% disagreeing. This confirms that digital self-service successfully eradicates physical counter delays.
      </p>

      <!-- Figure 4.4: Smart Packages -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q4_smart_packages.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.4" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.4: UAT Survey - Clarity and Usability of "Smart Event Packages" Feature</p>
      </div>
      <p class="justified-text">
        Figure 4.4 assesses the clarity and effectiveness of the pre-configured "Smart Event Packages" feature in preventing forgotten cables or accessories (30 responses). A commanding 90.0% of respondents agreed (50.0% Agree, 40.0% Strongly Agree), with 10.0% neutral and 0.0% disagreeing. This validates Objective 1.3.1, proving that automated equipment bundling simplifies selection and prevents omissions.
      </p>

      <!-- Figure 4.5: Stock Visibility -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q5_stock_visibility.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.5" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.5: UAT Survey - Real-Time Stock Availability Visibility Before Submission</p>
      </div>
      <p class="justified-text">
        Figure 4.5 reflects evaluator feedback on real-time stock availability indicators providing clear visibility prior to reservation submission (31 responses). A substantial 87.1% responded favorably (48.4% Strongly Agree, 38.7% Agree), with 12.9% neutral and 0.0% disagreeing. Real-time inventory transparency directly eliminates guesswork and prevents blind requisition submissions.
      </p>

      <!-- Figure 4.6: Booking Wizard -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q6_booking_wizard.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.6" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.6: UAT Survey - 2-Step Booking Wizard Experience and Date Validation</p>
      </div>
      <p class="justified-text">
        Figure 4.6 examines whether the 2-step booking wizard provides a smooth, stress-free reservation experience with clear date validation (31 responses). An outstanding 93.6% expressed positive agreement (48.4% Agree, 45.2% Strongly Agree), while only 6.5% were neutral. This indicates that dividing the booking process into discrete steps prevents cognitive overload.
      </p>

      <!-- Figure 4.7: Loan Slip -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q7_loan_slip.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.7" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.7: UAT Survey - Official A4 Loan Slip for Equipment Accountability</p>
      </div>
      <p class="justified-text">
        Figure 4.7 evaluates the official downloadable/printable A4 Loan Agreement Slip in providing clear equipment accountability, reference tracking, and legal signature sections (30 responses). A solid 83.3% of participants agreed (43.3% Agree, 40.0% Strongly Agree), with 16.7% neutral. Standardizing the loan slip bridges digital requests with physical counter handovers.
      </p>

      <!-- Figure 4.8: Return Inspection -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q8_return_inspection.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.8" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.8: UAT Survey - Return Desk Condition Inspection Interface Efficacy</p>
      </div>
      <p class="justified-text">
        Figure 4.8 reflects stakeholder ratings on the Return Desk inspection interface (recording condition as Excellent, Good, Fair, Damaged) effectively improving equipment care and borrower accountability (31 responses). Exactly 83.8% of testers agreed (41.9% Strongly Agree, 41.9% Agree), with 12.9% neutral and only 3.2% disagreeing. Formal condition logging protects institutional assets and enforces borrower responsibility.
      </p>

      <!-- Figure 4.9: Conflict Checking -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q9_conflict_check.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.9" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.9: UAT Survey - Automated Conflict-Checking Elimination of Double-Bookings</p>
      </div>
      <p class="justified-text">
        Figure 4.9 evaluates whether PinjamGeng's automated conflict-checking successfully eliminates schedule double-bookings and lost application records (30 responses). An overwhelming 90.0% agreed (50.0% Agree, 40.0% Strongly Agree), with only 10.0% neutral. Computational validation completely eliminates the double-booking issues identified in the preliminary survey.
      </p>

      <!-- Figure 4.10: Most Valuable Features -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q10_valuable_features.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.10" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.10: UAT Survey - Most Valued PinjamGeng Features Identified by Evaluators</p>
      </div>
      <p class="justified-text">
        Figure 4.10 highlights the features identified as most valuable by evaluators (31 responses, multiple selections permitted). The two standout capabilities are Real-time Stock Availability Counters, selected by 67.7% (21 respondents), and Smart Event Packages, selected by 64.5% (20 respondents). Additionally, Return Desk Condition Inspection &amp; Auto Maintenance garnered 35.5% (11 votes), Standardized Printable A4 Loan Agreement Slip received 32.3% (10 votes), and Executive Reports &amp; Analytics Dashboard earned 19.4% (6 votes).
      </p>

      <!-- Figure 4.11: Overall Rating -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q11_overall_rating.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.11" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.11: UAT Survey - Overall System Satisfaction Rating Distribution (1 to 5 Stars)</p>
      </div>
      <p class="justified-text">
        Figure 4.11 presents the overall satisfaction rating distribution for PinjamGeng on a 5-point Likert scale (31 responses). An impressive 77.4% awarded top satisfaction marks (54.8% 5 Stars, 22.6% 4 Stars). A further 12.9% awarded 3 Stars (Acceptable / Neutral), 3.2% gave 2 Stars, and 6.5% gave 1 Star. Cumulatively, 90.3% of respondents expressed positive or acceptable satisfaction, yielding a commendable mean score of 4.16 out of 5.00 stars.
      </p>

      <!-- Figure 4.12: Qualitative Feedback -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/uat_q12_open_feedback.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 4.12" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 4.12: UAT Survey - Qualitative Evaluator Feedback and Testimonials</p>
      </div>
      <p class="justified-text">
        Figure 4.12 documents qualitative feedback submitted by 13 test participants. Evaluators commended the convenience and speed of the platform: "I liked the Smart Event Packages because they make it easier to choose and borrow the equipment needed for an event", "easy to check item so we don't have to waste time to check and waiting", "smooth operation", and "easy and complimentary layout". For future enhancements, respondents recommended adding further package varieties and extending mobile responsiveness.
      </p>

      <!-- 4.4 Discussion -->
      <h2 class="section-title" style="margin-top: 30px;">4.4 Discussion and Evaluation of Results</h2>
      <p class="justified-text">
        The empirical findings gathered across Unit, Integration, System, and User Acceptance Testing definitively validate the engineering design and operational efficacy of PinjamGeng. Through automated form validation, relational database integrity constraints, and BCrypt cryptographic password protection, the platform eliminates common web vulnerabilities while ensuring 100% test pass rates across all 27 unit test scenarios.
      </p>
      <p class="justified-text">
        The User Acceptance Testing results demonstrate that transitioning from physical paper forms to a package-driven digital platform reduces requisition turnaround times from days to under two minutes. Real-time date-range conflict prevention completely eradicates double-booking clashes, while the standardized Return Desk workflow introduces rigorous condition logging that protects campus assets. Stakeholder feedback reflects 90.3% overall satisfaction and strong campus enthusiasm for institution-wide deployment at Universiti Poly-Tech Malaysia.
      </p>

      <!-- 4.5 Conclusion -->
      <h2 class="section-title" style="margin-top: 25px;">4.5 Conclusion</h2>
      <p class="justified-text">
        Chapter 4 has presented the complete testing methodology and evaluation results for PinjamGeng. Across unit, integration, system, and user acceptance testing, the platform proved to be robust, secure, user-friendly, and fully capable of satisfying all operational and functional requirements established in Chapter 1.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 128 of 154</span>
      </div>
    </div>
    \`;
  }
};
`;

fs.writeFileSync(part5Path, ch4Content, 'utf8');
console.log('Successfully updated builder/part5_ch4.js');
