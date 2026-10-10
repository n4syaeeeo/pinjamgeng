const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const part4Path = path.join(__dirname, 'builder', 'part4_ch3.js');
const part5Path = path.join(__dirname, 'builder', 'part5_ch4.js');

// 1. Rewrite Chapter 3 (part4_ch3.js) with 42 survey responses and 6 clean wireframes
const ch3Content = `module.exports = {
  getChapter3: function(imagesDir) {
    return \`
    <!-- CHAPTER 3: METHODOLOGY -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101 / DIPLOMA IN COMPUTER SCIENCE</span>
        <span class="page-num">UPTM FCOM FINAL REPORT</span>
      </div>

      <h1 class="chapter-num" style="text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 0;">CHAPTER 3</h1>
      <h1 class="chapter-title" style="text-align: center; font-size: 16pt; font-weight: bold; margin-top: 4px; margin-bottom: 24px;">METHODOLOGY AND SYSTEM DESIGN</h1>

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
        <img src="images/fig_3_1_agile_methodology.png" style="max-width:540px; width:100%; border:1px solid #000;" alt="Figure 3.1: Agile Scrum Development Lifecycle" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.1: Agile Scrum Development Lifecycle (Kumar, A., 2025)</p>
      </div>

      <h2 class="section-title">3.3 Phases in Agile Methodology</h2>
      <p class="justified-text">
        The Agile lifecycle executed during this project comprised six systematic, recurring phases:
      </p>

      <h3 class="subsection-title">3.3.1 Phase 1: Plan</h3>
      <p class="justified-text">
        The planning phase concentrated on investigating the existing equipment booking workflows at UPTM, identifying root operational friction, and establishing system requirements. Preliminary interviews with student club committees and laboratory staff highlighted that paper slips frequently went missing and double-booking occurred during major campus events. A structured requirements questionnaire was created via Google Forms and distributed among 42 campus stakeholders, validating that manual processes created severe operational bottlenecks. These findings directly defined the product backlog and functional specifications for PinjamGeng.
      </p>

      <h3 class="subsection-title">3.3.2 Phase 2: Design</h3>
      <p class="justified-text">
        During the design phase, the architectural foundation and user interfaces of PinjamGeng were mapped out. Low-fidelity wireframes were drafted for both student borrower and administrator views, emphasizing simplicity, modern visual hierarchy, and clear calls-to-action. The relational database schema was designed using MySQL, consisting of normalized entities for users, categories, equipment, packages, package items, bookings, booking items, maintenance tickets, and audit logs. Foreign key constraints were established to guarantee relational integrity and prevent orphan records.
      </p>

      <h3 class="subsection-title">3.3.3 Phase 3: Develop</h3>
      <p class="justified-text">
        The development phase involved translating designs into functional, secure software. The backend logic was engineered using modular, procedural PHP (v8.2.12) with PDO prepared statements for comprehensive SQL-injection immunity. The frontend was styled with Tailwind CSS, utilizing a distinctive warm espresso and caramel palette that evokes a modern campus atmosphere. Security features—including cryptographic password hashing via BCrypt, anti-CSRF token verification on all POST forms, session fixation protection, and brute-force rate-limiting lockout—were embedded into the core authentication engine. Key functional milestones included the 2-step booking wizard, package autofill mechanics, return condition auditing, and PDF/CSV export scripts.
      </p>

      <h3 class="subsection-title">3.3.4 Phase 4: Test</h3>
      <p class="justified-text">
        Rigorous testing was conducted across multiple stages: Unit Testing evaluated individual methods and form handlers; Integration Testing validated data synchronization across database tables; System Testing confirmed performance, security, and cross-browser responsiveness across Google Chrome and Microsoft Edge; and User Acceptance Testing (UAT) gathered empirical usability ratings from 32 student organizers and technicians.
      </p>

      <h3 class="subsection-title">3.3.5 Phase 5: Deploy</h3>
      <p class="justified-text">
        The system was staged and deployed within an optimized local web server environment using the XAMPP stack on Windows 11 as well as live cloud hosting on InfinityFree. Database migration scripts initialized all tables and seeded realistic campus data. The application was configured for multi-user access, allowing testers to interact with the platform simultaneously.
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

    <!-- DATA GATHERING & USER REQUIREMENTS SURVEY CHARTS (42 RESPONSES) -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101 / DIPLOMA IN COMPUTER SCIENCE</span>
        <span class="page-num">UPTM FCOM FINAL REPORT</span>
      </div>

      <h2 class="section-title">3.4 Data Gathering and User Requirements Survey Analysis</h2>
      <p class="justified-text">
        To ensure that PinjamGeng authentically addresses the real challenges experienced across Universiti Poly-Tech Malaysia, a rigorous requirement gathering exercise was conducted. A structured questionnaire entitled "Survey on Event Equipment Booking and Inventory Management System (PinjamGeng) at Universiti Poly-Tech Malaysia (UPTM)" was administered via Google Forms to 42 campus stakeholders. The empirical findings, captured directly from Google Forms analytics, are documented below:
      </p>

      <!-- Figure 3.2: Role -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q1_role.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.2" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.2: User Requirements Survey - Stakeholder Primary Role in Campus Events</p>
      </div>
      <p class="justified-text">
        Figure 3.2 captures the primary roles of survey respondents within campus events at UPTM (40 responses). The overwhelming majority—97.5% (39 respondents)—are active Student Club / Society Committee Members, while the remaining proportion consists of Faculty Lecturers / Club Advisors and Equipment Administrators / Laboratory Technicians. This empirical finding establishes that student event committee members represent the primary borrower demographic, directly justifying the need for a self-service, user-friendly booking interface.
      </p>

      <!-- Figure 3.3: Experience -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q2_experience.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.3" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.3: User Requirements Survey - Duration of Campus Event Management Experience</p>
      </div>
      <p class="justified-text">
        Figure 3.3 illustrates the duration of involvement in organizing student or campus events at UPTM (41 responses). Over half of the respondents—51.2% (21 respondents)—possess between 1 to 2 years of active event management experience, 43.9% (18 respondents) have less than 1 year, and 4.9% (2 respondents) have more than 2 years of experience. This distribution confirms that the sample consists of experienced student leaders who possess firsthand familiarity with the university's equipment logistics.
      </p>

      <!-- Figure 3.4: Frequency -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q3_frequency.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.4" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.4: User Requirements Survey - Frequency of Event Equipment Loans per Semester</p>
      </div>
      <p class="justified-text">
        Figure 3.4 demonstrates how frequently student organizations borrow event equipment during an academic semester (41 responses). The survey indicates that 41.5% borrow equipment several times per semester, 31.7% borrow monthly, 22.0% borrow annually, and 4.9% borrow on a weekly basis. With over 78% of student clubs borrowing equipment on a monthly or recurring basis, an automated digital management system is essential to handle frequent requisition cycles.
      </p>

      <!-- Figure 3.5: Difficulties -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q4_difficulties.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.5" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.5: User Requirements Survey - Operational Difficulties with Manual Paper Forms</p>
      </div>
      <p class="justified-text">
        Figure 3.5 summarizes the operational difficulties encountered when using the current manual paper requisition forms at UPTM (41 responses). The leading obstacle, reported by 63.4% of respondents (26 respondents), is the slow approval process requiring repeated physical counter visits. Additionally, 58.5% (24 respondents) cite a lack of real-time visibility on equipment availability, 41.5% (17 respondents) frequently forget essential peripheral cables or accessories, and 31.7% (13 respondents) encounter misplaced paper forms or lost loan records. These empirical findings substantiate the core problem statements outlined in Section 1.2.
      </p>

      <!-- Figure 3.6: Clashes -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q5_clashes.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.6" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.6: User Requirements Survey - Incidence of Schedule Clashes and Double-Bookings</p>
      </div>
      <p class="justified-text">
        Figure 3.6 investigates whether respondents have experienced equipment schedule clashes or double-bookings during peak campus event periods (41 responses). A critical 53.7% (22 respondents) reported experiencing clashes sometimes or occasionally, and 34.1% (14 respondents) experience clashes often, particularly during major campus event weeks. Only 12.2% reported never experiencing a clash. This proves that 87.8% of event organizers have been negatively impacted by booking conflicts, underscoring the absolute necessity of PinjamGeng's automated conflict-checking engine.
      </p>

      <!-- Figure 3.7: Damaged Gear -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q6_defects.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.7" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.7: User Requirements Survey - Frequency of Damaged or Incomplete Equipment Received</p>
      </div>
      <p class="justified-text">
        Figure 3.7 reveals that 65.9% of respondents (27 respondents) have received damaged, defective, or incomplete equipment upon collecting items from the university equipment counter, while only 34.1% have not encountered this issue. This finding proves that without a standardized check-in inspection log, equipment wear and defects go undocumented, causing subsequent borrowers to receive faulty gear during vital campus functions.
      </p>

      <!-- Figure 3.8: Turnaround -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q7_turnaround.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.8" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.8: User Requirements Survey - Average Turnaround Time for Manual Loan Approvals</p>
      </div>
      <p class="justified-text">
        Figure 3.8 depicts the average turnaround time required for manual equipment loan requests to be fully approved and confirmed (40 responses). Equal shares of respondents—47.5% (19 respondents each)—reported waiting between 1 to 3 days and more than 3 days, respectively. Only 5.0% (2 respondents) received approval within the same day. This demonstrates that manual paper processing imposes significant waiting periods that delay event planning.
      </p>

      <!-- Figure 3.9: Packages -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q8_packages.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.9" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.9: User Requirements Survey - Stakeholder Demand for "Smart Event Packages"</p>
      </div>
      <p class="justified-text">
        Figure 3.9 evaluates stakeholder receptivity toward pre-configured "Smart Event Packages" (e.g., AGM Package, Outdoor Sports Carnival Bundle, Seminar Exhibition Setup) to simplify booking and prevent forgotten cables (41 responses). An overwhelming 85.4% expressed positive agreement (48.8% Strongly Agree, 36.6% Agree), while 12.2% remained neutral and only 2.4% disagreed. This empirical validation confirms that package-based bundling is one of the most critical functional requirements demanded by campus users.
      </p>

      <!-- Figure 3.10: Real-Time Stock -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q9_realtime_stock.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.10" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.10: User Requirements Survey - Importance of Real-Time Stock Availability Indicators</p>
      </div>
      <p class="justified-text">
        Figure 3.10 assesses the importance of real-time online equipment availability indicators prior to submitting a reservation (41 responses). Over 82.9% of respondents affirmed positive agreement, with 56.1% rating it as "Strongly Agree (Essential to prevent clashes)" and 26.8% rating it as "Agree". Only 14.6% were neutral and 2.4% disagreed. This confirms that dynamic inventory visibility directly addresses the root cause of booking uncertainty.
      </p>

      <!-- Figure 3.11: Return Desk -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q10_return_desk.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.11" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.11: User Requirements Survey - Digital Return Desk Inspection for Condition Logging</p>
      </div>
      <p class="justified-text">
        Figure 3.11 evaluates whether a digital Return Desk inspection that logs item condition (Excellent, Good, Fair, Damaged) would improve student accountability and equipment care (41 responses). A strong 80.5% of respondents concurred (48.8% Strongly Agree, 31.7% Agree), with 14.6% neutral and 4.9% disagreeing. This demonstrates that students recognize the necessity of formal condition check-ins to safeguard shared university assets.
      </p>

      <!-- Figure 3.12: System Support -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q11_system_support.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.12" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.12: User Requirements Survey - Stakeholder Support for PinjamGeng Implementation</p>
      </div>
      <p class="justified-text">
        Figure 3.12 measures overall campus support for implementing the PinjamGeng web-based system to replace manual paper forms at UPTM (41 responses). An exceptional 85.4% of respondents voiced strong support (53.7% Strongly Agree, 31.7% Agree), with 12.2% neutral and only 2.4% disagreeing. This overwhelming endorsement confirms strong campus viability and user demand.
      </p>

      <!-- Figure 3.13: Feedback -->
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/prelim_q12_open_feedback.png" style="max-width:580px; width:100%; border:1px solid #ddd; border-radius: 4px;" alt="Figure 3.13" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.13: User Requirements Survey - Qualitative Stakeholder Recommendations and Suggestions</p>
      </div>
      <p class="justified-text">
        Figure 3.13 captures qualitative recommendations submitted by 17 respondents regarding desired system features. Salient stakeholder suggestions include: (1) adding visual preview photographs of equipment items to assist identification, (2) maintaining a permanent loan history record so clubs have verifiable proof of custody, (3) providing clear borrowing time windows to avoid clashes between sequential events, (4) embedding an interactive calendar interface, and (5) providing automated status notifications and clear repayment/return schedules. These recommendations were incorporated directly into the system design phase.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 50 of 154</span>
      </div>
    </div>

    <!-- 3.5 INTERFACE DESIGN & LOW-FIDELITY WIREFRAMES -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101 / DIPLOMA IN COMPUTER SCIENCE</span>
        <span class="page-num">UPTM FCOM FINAL REPORT</span>
      </div>

      <h2 class="section-title">3.5 Interface Design and Low-Fidelity Wireframes</h2>
      <p class="justified-text">
        In accordance with software engineering and user-centered design (UCD) best practices, low-fidelity wireframes were developed during the initial design phase to establish structural information hierarchy, spatial component layouts, and user task workflows before frontend coding. The wireframes follow clean, architectural blueprint standards—avoiding distracting photorealistic graphics to ensure rigorous focus on functional usability, input ergonomics, and logical data flow.
      </p>

      <h3 class="subsection-title">3.5.1 Wireframe 3.1: Student Authentication &amp; Portal Login</h3>
      <p class="justified-text">
        Figure 3.14 illustrates the wireframe blueprint for the Student Authentication and Login interface. The layout features a clean, centered credential container with explicit student ID / institutional email and password input fields, a "Remember Me" toggle, and a clear call-to-action button, ensuring rapid, secure entry into the system.
      </p>
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/wf_01_login.png" style="max-width:580px; width:100%; border:1px solid #4B5563; border-radius: 4px;" alt="Figure 3.14" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.14: Wireframe 3.1 - Student Authentication &amp; Portal Login Interface</p>
      </div>

      <h3 class="subsection-title">3.5.2 Wireframe 3.2: Live Equipment Catalog &amp; Stock Indicators</h3>
      <p class="justified-text">
        Figure 3.15 depicts the Live Equipment Catalog and Stock Availability wireframe. The interface incorporates a top global search bar, category filter pills (Audio, Visual, Stage, Media), and a responsive 4-column card grid. Each equipment card features a placeholder image container, equipment specifications, a real-time availability badge (e.g., "Stock: 4 / 6 Avail"), and an intuitive selection button.
      </p>
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/wf_02_catalog.png" style="max-width:580px; width:100%; border:1px solid #4B5563; border-radius: 4px;" alt="Figure 3.15" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.15: Wireframe 3.2 - Live Equipment Catalog &amp; Real-Time Stock Availability</p>
      </div>

      <h3 class="subsection-title">3.5.3 Wireframe 3.3: Pre-Configured "Smart Event Packages"</h3>
      <p class="justified-text">
        Figure 3.16 presents the wireframe for the Pre-Configured "Smart Event Packages" interface. Designed to resolve Problem Statement 1.2.2, this view displays bundled equipment cards for four standard campus event categories (Seminar, Workshop, Committee Meeting, and Outdoor Sports). Each card specifies all bundled items and includes a single-click "Select Package &amp; Book" trigger.
      </p>
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/wf_03_smart_packages.png" style="max-width:580px; width:100%; border:1px solid #4B5563; border-radius: 4px;" alt="Figure 3.16" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.16: Wireframe 3.3 - Pre-Configured "Smart Event Packages" Selection Interface</p>
      </div>

      <h3 class="subsection-title">3.5.4 Wireframe 3.4: 2-Step Booking Wizard &amp; Date Validation</h3>
      <p class="justified-text">
        Figure 3.17 outlines the 2-Step Booking Wizard wireframe. Step 1 collects essential event particulars (title, club name, venue, and required pickup/return timestamps). It features an integrated automated conflict-checking banner that verifies date-range stock availability in real time, accompanied by a dynamic sidebar summary of selected items.
      </p>
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/wf_04_booking_wizard.png" style="max-width:580px; width:100%; border:1px solid #4B5563; border-radius: 4px;" alt="Figure 3.17" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.17: Wireframe 3.4 - 2-Step Booking Wizard with Automated Conflict Check</p>
      </div>

      <h3 class="subsection-title">3.5.5 Wireframe 3.5: Downloadable A4 Loan Agreement Slip</h3>
      <p class="justified-text">
        Figure 3.18 illustrates the standardized A4 Loan Agreement Slip wireframe. Generated dynamically upon administrative booking approval, the slip incorporates institutional branding, a unique requisition reference code (e.g., PG-2026-0842), applicant particulars, an itemized equipment schedule with issue/return condition columns, institutional liability disclaimers, and dual physical signature blocks for counter verification.
      </p>
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/wf_05_loan_slip.png" style="max-width:580px; width:100%; border:1px solid #4B5563; border-radius: 4px;" alt="Figure 3.18" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.18: Wireframe 3.5 - Standardized Downloadable A4 Loan Agreement Voucher</p>
      </div>

      <h3 class="subsection-title">3.5.6 Wireframe 3.6: Admin Console Return Desk &amp; Inspection</h3>
      <p class="justified-text">
        Figure 3.19 details the Administrator Return Desk and Condition Inspection wireframe. The console displays high-level KPI stat cards (Pending Approvals, Active Loans, Under Maintenance, Total Assets) alongside an interactive physical inspection modal. Technicians evaluate returned equipment using condition radio buttons (Good vs Damaged), with automatic maintenance ticket generation triggered when damage is logged.
      </p>
      <div style="text-align:center; margin: 20px 0;">
        <img src="images/wf_06_admin_return_desk.png" style="max-width:580px; width:100%; border:1px solid #4B5563; border-radius: 4px;" alt="Figure 3.19" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.19: Wireframe 3.6 - Admin Console Return Desk &amp; Physical Condition Inspection</p>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 58 of 154</span>
      </div>
    </div>

    <!-- 3.6 SYSTEM MODELLING: FLOWCHARTS, USE CASE & ERD -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101 / DIPLOMA IN COMPUTER SCIENCE</span>
        <span class="page-num">UPTM FCOM FINAL REPORT</span>
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
        Figure 3.20 details the Administrator Flowchart. The workflow initiates with credential authentication. Upon successful login, the administrator selects from four primary operational branches: (1) Booking Management; (2) Inventory &amp; Package Administration; (3) Return Desk &amp; Inspection; and (4) Reports &amp; Analytics.
      </p>

      <div style="text-align:center; margin: 20px 0;">
        <img src="images/fig_3_110_admin_flowchart.png" style="max-width:560px; width:100%; border:1px solid #000;" alt="Figure 3.20" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.20: Admin Operational Workflow Flowchart (Black &amp; White Publication Standard)</p>
      </div>

      <p class="justified-text">
        Figure 3.21 details the Student Borrower Flowchart. The process begins with account login or new user registration. Borrowers browse available inventory or explore curated Smart Event Packages. The borrower selects required pickup and return dates, passes automated conflict checking, agrees to loan regulations, and submits the request.
      </p>

      <div style="text-align:center; margin: 20px 0;">
        <img src="images/fig_3_111_student_flowchart.png" style="max-width:560px; width:100%; border:1px solid #000;" alt="Figure 3.21" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.21: Student Borrower Workflow Flowchart (Black &amp; White Publication Standard)</p>
      </div>

      <h3 class="subsection-title">3.6.2 Use Case Diagram</h3>
      <p class="justified-text">
        The Use Case Diagram (Figure 3.22) defines the behavioral interactions between the system and its primary actors: the Student Borrower and the Administrator (FCOM / IT Staff).
      </p>

      <div style="text-align:center; margin: 20px 0;">
        <img src="images/fig_3_112_use_case_diagram.png" style="max-width:560px; width:100%; border:1px solid #000;" alt="Figure 3.22" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.22: Use Case Diagram for PinjamGeng (UML Standard, Black &amp; White)</p>
      </div>

      <h3 class="subsection-title">3.6.3 Entity Relational Diagram (ERD)</h3>
      <p class="justified-text">
        The Entity Relationship Diagram (Figure 3.23) establishes the normalized conceptual schema supporting PinjamGeng. The architecture comprises nine interconnected entities designed to 3rd Normal Form (3NF): users, categories, equipment, packages, package_items, bookings, booking_items, maintenance_tickets, and audit_logs.
      </p>

      <div style="text-align:center; margin: 20px 0;">
        <img src="images/fig_3_113_erd_diagram.png" style="max-width:560px; width:100%; border:1px solid #000;" alt="Figure 3.23" />
        <p class="figure-caption" style="text-align: center; font-weight: bold; font-size: 10.5pt; margin-top: 8px;">Figure 3.23: Entity Relational Diagram (ERD) in 3NF Normalization</p>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 62 of 154</span>
      </div>
    </div>
    \`;
  }
};
`;

fs.writeFileSync(part4Path, ch3Content, 'utf8');
console.log('Successfully updated builder/part4_ch3.js');
