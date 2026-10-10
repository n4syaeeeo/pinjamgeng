module.exports = {
  getChapter2: function() {
    return `
    <!-- CHAPTER 2: LITERATURE REVIEW -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 21 of 154</span>
      </div>

      <h1 class="chapter-num">CHAPTER 2</h1>
      <h1 class="chapter-title">LITERATURE REVIEW</h1>

      <h2 class="section-title">2.1 Introduction</h2>
      <p class="justified-text">
        This chapter presents a comprehensive review of existing literature, technological frameworks, and empirical studies concerning equipment loan management, inventory tracking, and reservation workflows in organizational and educational contexts. Effective asset management is recognized as a vital operational pillar for modern institutions; when equipment resources are mismanaged, organizations suffer from unnecessary duplicate purchases, delayed operations, asset degradation, and heightened administrative overhead. For an academic institution such as Universiti Poly-Tech Malaysia (UPTM), where expensive multimedia, computing, and staging assets are shared across multiple faculties, student societies, and administrative units, an optimized digital management platform is indispensable.
      </p>
      <p class="justified-text">
        The review begins by critically investigating the inherent limitations of traditional, manual equipment loan methods—specifically paper requisition forms, physical logbooks, and informal communication channels. It examines the operational consequences of data latency, schedule conflicts, and unmonitored equipment degradation. Subsequently, this chapter analyzes three benchmark commercial solutions in the asset and equipment tracking domain: <strong>Cheqroom</strong>, <strong>Booqable</strong>, and <strong>EZOfficeInventory</strong>. By evaluating their structural architectures, user interface paradigms, reservation mechanics, and reporting capabilities against the specific needs of UPTM, this chapter establishes the functional justification and design benchmarks that inform the development of PinjamGeng.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">2.2 Investigation</h2>
      <p class="justified-text">
        The investigation focuses on three interconnected operational dimensions that dictate the efficacy of equipment booking and inventory control: the vulnerability of physical paperwork, the necessity of real-time inventory synchronization, and the complexity of return condition tracking and audit reporting.
      </p>

      <h3 class="subsection-title">2.2.1 Manual Equipment Loan and Physical Form Processing Challenges</h3>
      <p class="justified-text">
        In educational institutions that continue to rely on manual workflows, equipment borrowing requires a convoluted administrative process. Organizers must acquire paper forms, secure physical signatures from club advisors, and submit the paperwork to equipment custodians during restricted counter operating hours. Empirical research by the Inventory Solutions Group (2020) demonstrates that manual paper-driven tracking systems typically exhibit an error rate between 10% and 15% due to transcription mistakes, illegible handwriting, misplaced sheets, and duplicated records.
      </p>
      <p class="justified-text">
        In the context of UPTM, manual forms present severe logistical risks. During busy preparation periods before major campus events, paper applications are frequently misplaced or delayed across administrative offices. Because these physical records are isolated at counter desks, there is no centralized historical repository accessible to faculty heads or technical supervisors. Studies on educational resource management confirm that transitioning from paper requisitions to centralized digital workflows eliminates over 70% of administrative processing delays while drastically curtailing data entry errors (Ioana Neamt, 2024).
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 21 of 154</span>
      </div>
    </div>

    <!-- PAGE 22-23 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 22 of 154</span>
      </div>

      <h3 class="subsection-title">2.2.2 The Critical Need for Real-Time Equipment Availability and Conflict Prevention</h3>
      <p class="justified-text">
        A fundamental weakness of manual physical logbooks is their static, asynchronous nature. A paper logbook only reflects inventory status at the exact moment a handwritten entry is recorded. When multiple student clubs organize events scheduled for the same weekend—such as a sports carnival, an annual general meeting, and a career symposium—technicians cannot instantly detect that the same high-output PA system or digital projector has been promised to two different groups.
      </p>
      <p class="justified-text">
        Research in supply chain and operational planning emphasizes that data latency significantly impedes decision-making, forcing managers into reactive and error-prone compromises (Albert, 2024). In campus environments, when organizers discover double-bookings hours before an event commences, emergency arrangements must be made, often resulting in event cancellations or expensive last-minute commercial equipment rentals. A computerized system that dynamically checks date-range availability and immediately flags booking conflicts at the point of application is essential for maintaining smooth campus operations.
      </p>

      <h3 class="subsection-title">2.2.3 Equipment Condition Tracking, Loss Prevention, and Reporting Complexity</h3>
      <p class="justified-text">
        The lifespan and reliability of shared educational assets depend heavily on systematic post-loan inspection. In a manual environment, when equipment is returned at the conclusion of an event, the check-in process is often hurried. Counter personnel frequently lack a standardized physical checklist, resulting in damaged items, frayed HDMI cables, or malfunctioning microphone transmitters being returned to inventory shelves without condition notes.
      </p>
      <p class="justified-text">
        Studies by Kang &amp; Gershwin (2005) indicate that unrecorded inventory defects and phantom stock severely degrade institutional efficiency, causing subsequent users to receive broken equipment during critical operations. Furthermore, manual systems lack the capability to aggregate maintenance costs, calculate asset depreciation, or identify chronic equipment failure trends. An automated system with integrated condition tracking (categorizing items as Excellent, Good, Fair, or Damaged) and automatic maintenance ticketing provides technicians with the tools necessary for proactive maintenance and data-driven procurement planning.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">2.3 Previous Case Study</h2>
      <p class="justified-text">
        To guide the architectural and functional design of PinjamGeng, three industry-standard commercial inventory and equipment reservation systems were critically evaluated:
      </p>

      <h3 class="subsection-title">2.3.1 Case Study 1: Cheqroom</h3>
      <p class="justified-text">
        <strong>Cheqroom</strong> is a specialized cloud-based asset tracking software engineered specifically for audio-visual (AV), media production, and IT equipment management within educational institutions, broadcast studios, and creative agencies. Cheqroom's core architecture emphasizes visual equipment catalogs, drag-and-drop reservation calendars, and automated conflict detection.
      </p>
      <p class="justified-text">
        A key strength of Cheqroom is its implementation of "Equipment Kits" or bundle groupings. Instead of requiring users to select cameras, tripods, batteries, memory cards, and microphones individually, Cheqroom allows administrators to define cohesive packages. When a kit is reserved, the platform automatically locks all nested components for the requested date window. Furthermore, Cheqroom provides custody tracking via QR code scanning and item condition logging upon check-in.
      </p>
      <p class="justified-text">
        However, Cheqroom is developed as an expensive enterprise Software-as-a-Service (SaaS) platform targeted primarily at corporate production studios and large Western universities with extensive IT budgets. Its configuration requires substantial training, and its interface includes numerous advanced modules—such as multi-location warehouse logistics, geofencing, and insurance depreciation accounting—that introduce unnecessary operational complexity for a localized campus setting like UPTM.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 22 of 154</span>
      </div>
    </div>

    <!-- PAGE 24-25 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 24 of 154</span>
      </div>

      <h3 class="subsection-title">2.3.2 Case Study 2: Booqable</h3>
      <p class="justified-text">
        <strong>Booqable</strong> is an all-in-one equipment rental and reservation software designed for small-to-medium rental businesses, event production companies, and photography rental houses. It integrates an online customer-facing booking storefront with backend inventory tracking, scheduling calendars, and order fulfillment workflows.
      </p>
      <p class="justified-text">
        Booqable excels in its customer-facing reservation experience. It employs an intuitive, step-by-step booking wizard that prompts users to select event start and return dates, verifies stock availability in real-time, displays high-resolution equipment cards, and summarizes the reservation into a clear digital order contract. On the administrative side, Booqable provides color-coded timeline bars that visualize equipment dispatch schedules, preventing over-commitment of popular gear.
      </p>
      <p class="justified-text">
        Despite its exceptional booking UX, Booqable's underlying business model is fundamentally structured around commercial rental transactions, invoicing, credit card payment processing (via Stripe/PayPal), and customer security deposits. In an internal university ecosystem such as UPTM, equipment is loaned to student clubs under institutional regulations rather than rented for commercial profit. Adapting Booqable's heavy commercial payment workflows to a university loan desk would be counterproductive, though its intuitive multi-step booking wizard provides valuable design principles for PinjamGeng.
      </p>

      <h3 class="subsection-title">2.3.3 Case Study 3: EZOfficeInventory</h3>
      <p class="justified-text">
        <strong>EZOfficeInventory</strong> is an enterprise-grade physical asset management and tracking platform widely deployed across corporate enterprises, healthcare facilities, and academic institutions. The system supports full asset lifecycle tracking, maintenance scheduling, vendor purchase orders, and multi-department checkout operations.
      </p>
      <p class="justified-text">
        A standout capability of EZOfficeInventory is its comprehensive maintenance management module. The system enables custodians to log service tickets, assign repair tasks to internal technicians or external vendors, record parts replacement costs, and transition assets into dedicated "Under Maintenance" statuses that automatically remove them from active reservation pools until technical clearance is granted. Furthermore, EZOfficeInventory offers robust reporting tools that generate exportable PDF and Excel utilization reports.
      </p>
      <p class="justified-text">
        Nonetheless, EZOfficeInventory suffers from a cluttered, data-dense interface that presents a steep learning curve for non-technical users. For student borrowers who only need to submit occasional booking requests for club events, navigating EZOfficeInventory's extensive enterprise menus is confusing and inefficient. Its administrative dashboard prioritizes financial depreciation and capital asset tracking over rapid event kit dispatch and simple counter inspections.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 24 of 154</span>
      </div>
    </div>

    <!-- PAGE 36-38: COMPARISON & DISCUSSION -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 36 of 154</span>
      </div>

      <h2 class="section-title">2.4 Comparison</h2>
      <p class="justified-text">
        A structured comparative analysis between the three commercial benchmark systems and the proposed PinjamGeng platform is summarized in Table 2.1 below:
      </p>

      <p class="table-caption">Table 2.1: Comparison of Existing Systems with PinjamGeng</p>
      <table class="data-table">
        <thead>
          <tr>
            <th>Feature / Capability</th>
            <th>Cheqroom</th>
            <th>Booqable</th>
            <th>EZOfficeInventory</th>
            <th>PinjamGeng (Proposed)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>System Architecture</strong></td>
            <td>Cloud SaaS (Commercial AV Focus)</td>
            <td>Cloud SaaS (Rental Commerce Focus)</td>
            <td>Enterprise Cloud Asset Management</td>
            <td>Lightweight Web Application (PHP / MySQL / XAMPP)</td>
          </tr>
          <tr>
            <td><strong>Target Domain</strong></td>
            <td>Media Production &amp; Film Schools</td>
            <td>Commercial Equipment Rental Companies</td>
            <td>Corporate Enterprises &amp; Large Facilities</td>
            <td>University Campus (UPTM Clubs, Staff &amp; Students)</td>
          </tr>
          <tr>
            <td><strong>Event Package Bundles</strong></td>
            <td>Yes (Equipment Kits)</td>
            <td>Yes (Product Bundles)</td>
            <td>Yes (Asset Bundles)</td>
            <td><strong>Yes (Smart Event Packages: AGM, Sports, Exhibition)</strong></td>
          </tr>
          <tr>
            <td><strong>Real-Time Conflict Prevention</strong></td>
            <td>Yes (Automated timeline check)</td>
            <td>Yes (Date-picker inventory lock)</td>
            <td>Yes (Calendar reservation check)</td>
            <td><strong>Yes (Dynamic date-range validation &amp; stock lock)</strong></td>
          </tr>
          <tr>
            <td><strong>Booking Experience</strong></td>
            <td>Complex drag-and-drop calendar</td>
            <td>Intuitive multi-step storefront wizard</td>
            <td>Dense tabular requisition forms</td>
            <td><strong>2-Step Booking Wizard with dynamic package autofill</strong></td>
          </tr>
          <tr>
            <td><strong>Official Loan Slip</strong></td>
            <td>Digital PDF confirmation</td>
            <td>Commercial invoice &amp; packing slip</td>
            <td>Asset checkout receipt</td>
            <td><strong>Standardized A4 Loan Agreement Slip (Sections A/B/C)</strong></td>
          </tr>
          <tr>
            <td><strong>Return Desk Inspection</strong></td>
            <td>Barcode/QR condition check</td>
            <td>Return checklist with damage fees</td>
            <td>Detailed maintenance status logging</td>
            <td><strong>Condition audit (4-tier) + auto-maintenance ticket</strong></td>
          </tr>
          <tr>
            <td><strong>Cost &amp; Licensing</strong></td>
            <td>High annual subscription fee</td>
            <td>Monthly fee + transaction commission</td>
            <td>High enterprise tier licensing</td>
            <td><strong>Zero licensing cost (Open-source campus deployment)</strong></td>
          </tr>
        </tbody>
      </table>

      <h2 class="section-title" style="margin-top: 25px;">2.5 Discussion</h2>
      <p class="justified-text">
        The comparative evaluation reveals that while commercial solutions like Cheqroom, Booqable, and EZOfficeInventory offer powerful capabilities, none of them are directly optimized for the operational workflows, resource constraints, and administrative policies of a Malaysian higher education institution. Commercial software is either burdened with complex e-commerce payment gateways (Booqable), priced out of reach for faculty departmental budgets (Cheqroom), or cluttered with corporate financial accounting modules that confuse student borrowers (EZOfficeInventory).
      </p>
      <p class="justified-text">
        Consequently, PinjamGeng synthesizes the most effective design paradigms from these systems into a unified, lightweight, and purpose-built platform. From Cheqroom, PinjamGeng adopts the package bundling philosophy, transforming it into campus-specific "Smart Event Packages" that prevent novice student organizers from omitting essential cables or accessories. From Booqable, it borrows the frictionless 2-step booking wizard, making equipment requisition fast, intuitive, and error-free. From EZOfficeInventory, it incorporates structured condition auditing and automatic maintenance ticketing, ensuring that damaged gear is immediately flagged and repaired. By delivering these capabilities within a warm, aesthetic campus interface requiring zero commercial subscription fees, PinjamGeng establishes a highly practical, sustainable solution for UPTM.
      </p>

      <h2 class="section-title" style="margin-top: 25px;">2.6 Conclusion</h2>
      <p class="justified-text">
        Chapter 2 has synthesized the academic literature and practical investigations surrounding equipment loan management, highlighting the critical deficiencies of manual paper-based forms and static logbooks. By analyzing three leading commercial solutions (Cheqroom, Booqable, and EZOfficeInventory), this review established a clear functional baseline for PinjamGeng, justifying the necessity of a package-driven, real-time inventory management platform tailored specifically for Universiti Poly-Tech Malaysia.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 38 of 154</span>
      </div>
    </div>
    `;
  }
};
