const docx = require('docx');
const { Paragraph, PageBreak } = docx;
const { createPara, createHeading1, createHeading2, createHeading3, createDocxTable } = require('./doc_helpers.js');

module.exports = {
  getChapter2: function() {
    return [
      createHeading1('CHAPTER 2: LITERATURE REVIEW'),

      // 2.1 Introduction
      createHeading2('2.1 Introduction'),
      createPara(
        'This chapter presents a comprehensive review of existing literature, technological frameworks, and empirical studies concerning equipment loan management, inventory tracking, and reservation workflows in organizational and educational contexts. Effective asset management is recognized as a vital operational pillar for modern institutions; when equipment resources are mismanaged, organizations suffer from unnecessary duplicate purchases, delayed operations, asset degradation, and heightened administrative overhead. For an academic institution such as Universiti Poly-Tech Malaysia (UPTM), where expensive multimedia, computing, and staging assets are shared across multiple faculties, student societies, and administrative units, an optimized digital management platform is indispensable.'
      ),
      createPara(
        'The review begins by critically investigating the inherent limitations of traditional, manual equipment loan methods—specifically paper requisition forms, physical logbooks, and informal communication channels. It examines the operational consequences of data latency, schedule conflicts, and unmonitored equipment degradation. Subsequently, this chapter analyzes three benchmark commercial solutions in the asset and equipment tracking domain: Cheqroom, Booqable, and EZOfficeInventory. By evaluating their structural architectures, user interface paradigms, reservation mechanics, and reporting capabilities against the specific needs of UPTM, this chapter establishes the functional justification and design benchmarks that inform the development of PinjamGeng.'
      ),

      // 2.2 Investigation
      createHeading2('2.2 Investigation'),
      createPara(
        'The investigation focuses on three interconnected operational dimensions that dictate the efficacy of equipment booking and inventory control: the vulnerability of physical paperwork, the necessity of real-time inventory synchronization, and the complexity of return condition tracking and audit reporting.'
      ),

      createHeading3('2.2.1 Manual Equipment Loan and Physical Form Processing Challenges'),
      createPara(
        'In educational institutions that continue to rely on manual workflows, equipment borrowing requires a convoluted administrative process. Organizers must acquire paper forms, secure physical signatures from club advisors, and submit the paperwork to equipment custodians during restricted counter operating hours. Empirical research by the Inventory Solutions Group (2020) demonstrates that manual paper-driven tracking systems typically exhibit an error rate between 10% and 15% due to transcription mistakes, illegible handwriting, misplaced sheets, and duplicated records.'
      ),
      createPara(
        'In the context of UPTM, manual forms present severe logistical risks. During busy preparation periods before major campus events, paper applications are frequently misplaced or delayed across administrative offices. Because these physical records are isolated at counter desks, there is no centralized historical repository accessible to faculty heads or technical supervisors. Studies on educational resource management confirm that transitioning from paper requisitions to centralized digital workflows eliminates over 70% of administrative processing delays while drastically curtailing data entry errors (Ioana Neamt, 2024).'
      ),

      createHeading3('2.2.2 The Critical Need for Real-Time Equipment Availability and Conflict Prevention'),
      createPara(
        'A fundamental weakness of manual physical logbooks is their static, asynchronous nature. A paper logbook only reflects inventory status at the exact moment a handwritten entry is recorded. When multiple student clubs organize events scheduled for the same weekend—such as a sports carnival, an annual general meeting, and a career symposium—technicians cannot instantly detect that the same high-output PA system or digital projector has been promised to two different groups.'
      ),
      createPara(
        'Research in supply chain and operational planning emphasizes that data latency significantly impedes decision-making, forcing managers into reactive and error-prone compromises (Albert, 2024). In campus environments, when organizers discover double-bookings hours before an event commences, emergency arrangements must be made, often resulting in event cancellations or expensive last-minute commercial equipment rentals. A computerized system that dynamically checks date-range availability and immediately flags booking conflicts at the point of application is essential for maintaining smooth campus operations.'
      ),

      createHeading3('2.2.3 Equipment Condition Tracking, Loss Prevention, and Reporting Complexity'),
      createPara(
        'The lifespan and reliability of shared educational assets depend heavily on systematic post-loan inspection. In a manual environment, when equipment is returned at the conclusion of an event, the check-in process is often hurried. Counter personnel frequently lack a standardized physical checklist, resulting in damaged items, frayed HDMI cables, or malfunctioning microphone transmitters being returned to inventory shelves without condition notes.'
      ),
      createPara(
        'Studies by Kang & Gershwin (2005) indicate that unrecorded inventory defects and phantom stock severely degrade institutional efficiency, causing subsequent users to receive broken equipment during critical operations. Furthermore, manual systems lack the capability to aggregate maintenance costs, calculate asset depreciation, or identify chronic equipment failure trends. An automated system with integrated condition tracking (categorizing items as Excellent, Good, Fair, or Damaged) and automatic maintenance ticketing provides technicians with the tools necessary for proactive maintenance and data-driven procurement planning.'
      ),

      // 2.3 Previous Case Study
      createHeading2('2.3 Previous Case Study'),
      createPara(
        'To guide the architectural and functional design of PinjamGeng, three industry-standard commercial inventory and equipment reservation systems were critically evaluated:'
      ),

      createHeading3('2.3.1 Case Study 1: Cheqroom'),
      createPara(
        'Cheqroom is a specialized cloud-based asset tracking software engineered specifically for audio-visual (AV), media production, and IT equipment management within educational institutions, broadcast studios, and creative agencies. Cheqroom\'s core architecture emphasizes visual equipment catalogs, drag-and-drop reservation calendars, and automated conflict detection.'
      ),
      createPara(
        'A key strength of Cheqroom is its implementation of "Equipment Kits" or bundle groupings. Instead of requiring users to select cameras, tripods, batteries, memory cards, and microphones individually, Cheqroom allows administrators to define cohesive packages. When a kit is reserved, the platform automatically locks all nested components for the requested date window. Furthermore, Cheqroom provides custody tracking via QR code scanning and item condition logging upon check-in.'
      ),
      createPara(
        'However, Cheqroom is developed as an expensive enterprise Software-as-a-Service (SaaS) platform targeted primarily at corporate production studios and large Western universities with extensive IT budgets. Its configuration requires substantial training, and its interface includes numerous advanced modules—such as multi-location warehouse logistics, geofencing, and insurance depreciation accounting—that introduce unnecessary operational complexity for a localized campus setting like UPTM.'
      ),

      createHeading3('2.3.2 Case Study 2: Booqable'),
      createPara(
        'Booqable is an all-in-one equipment rental and reservation software designed for small-to-medium rental businesses, event production companies, and photography rental houses. It integrates an online customer-facing booking storefront with backend inventory tracking, scheduling calendars, and order fulfillment workflows.'
      ),
      createPara(
        'Booqable excels in its customer-facing reservation experience. It employs an intuitive, step-by-step booking wizard that prompts users to select event start and return dates, verifies stock availability in real-time, displays high-resolution equipment cards, and summarizes the reservation into a clear digital order contract. On the administrative side, Booqable provides color-coded timeline bars that visualize equipment dispatch schedules, preventing over-commitment of popular gear.'
      ),
      createPara(
        'Despite its exceptional booking UX, Booqable\'s underlying business model is fundamentally structured around commercial rental transactions, invoicing, credit card payment processing (via Stripe/PayPal), and customer security deposits. In an internal university ecosystem such as UPTM, equipment is loaned to student clubs under institutional regulations rather than rented for commercial profit. Adapting Booqable\'s heavy commercial payment workflows to a university loan desk would be counterproductive, though its intuitive multi-step booking wizard provides valuable design principles for PinjamGeng.'
      ),

      createHeading3('2.3.3 Case Study 3: EZOfficeInventory'),
      createPara(
        'EZOfficeInventory is an enterprise-grade physical asset management and tracking platform widely deployed across corporate enterprises, healthcare facilities, and academic institutions. The system supports full asset lifecycle tracking, maintenance scheduling, vendor purchase orders, and multi-department checkout operations.'
      ),
      createPara(
        'A standout capability of EZOfficeInventory is its comprehensive maintenance management module. The system enables custodians to log service tickets, assign repair tasks to internal technicians or external vendors, record parts replacement costs, and transition assets into dedicated "Under Maintenance" statuses that automatically remove them from active reservation pools until technical clearance is granted. Furthermore, EZOfficeInventory offers robust reporting tools that generate exportable PDF and Excel utilization reports.'
      ),
      createPara(
        'Nonetheless, EZOfficeInventory suffers from a cluttered, data-dense interface that presents a steep learning curve for non-technical users. For student borrowers who only need to submit occasional booking requests for club events, navigating EZOfficeInventory\'s extensive enterprise menus is confusing and inefficient. Its administrative dashboard prioritizes financial depreciation and capital asset tracking over rapid event kit dispatch and simple counter inspections.'
      ),

      // 2.4 Comparison
      createHeading2('2.4 Comparison'),
      createPara(
        'A structured comparative analysis between the three commercial benchmark systems and the proposed PinjamGeng platform is summarized in Table 2.1 below:'
      ),
      createPara('Table 2.1: Comparison of Existing Systems with PinjamGeng', { bold: true }),
      createDocxTable(
        ['Feature / Capability', 'Cheqroom', 'Booqable', 'EZOfficeInventory', 'PinjamGeng (Proposed)'],
        [
          ['System Architecture', 'Cloud SaaS (Commercial AV Focus)', 'Cloud SaaS (Rental Commerce Focus)', 'Enterprise Cloud Asset Management', 'Lightweight Web Application (PHP / MySQL / XAMPP)'],
          ['Target Domain', 'Media Production & Film Schools', 'Commercial Equipment Rental Companies', 'Corporate Enterprises & Large Facilities', 'University Campus (UPTM Clubs, Staff & Students)'],
          ['Event Package Bundles', 'Yes (Equipment Kits)', 'Yes (Product Bundles)', 'Yes (Asset Bundles)', 'Yes (Smart Event Packages: AGM, Sports, Exhibition)'],
          ['Real-Time Conflict Prevention', 'Yes (Automated timeline check)', 'Yes (Date-picker inventory lock)', 'Yes (Calendar reservation check)', 'Yes (Dynamic date-range validation & stock lock)'],
          ['Booking Experience', 'Complex drag-and-drop calendar', 'Intuitive multi-step storefront wizard', 'Dense tabular requisition forms', '2-Step Booking Wizard with dynamic package autofill'],
          ['Official Loan Slip', 'Digital PDF confirmation', 'Commercial invoice & packing slip', 'Asset checkout receipt', 'Standardized A4 Loan Agreement Slip (Sections A/B/C)'],
          ['Return Desk Inspection', 'Barcode/QR condition check', 'Return checklist with damage fees', 'Detailed maintenance status logging', 'Condition audit (4-tier) + auto-maintenance ticket'],
          ['Cost & Licensing', 'High annual subscription fee', 'Monthly fee + transaction commission', 'High enterprise tier licensing', 'Zero licensing cost (Open-source campus deployment)'],
        ]
      ),

      // 2.5 Discussion
      createHeading2('2.5 Discussion'),
      createPara(
        'The comparative evaluation reveals that while commercial solutions like Cheqroom, Booqable, and EZOfficeInventory offer powerful capabilities, none of them are directly optimized for the operational workflows, resource constraints, and administrative policies of a Malaysian higher education institution. Commercial software is either burdened with complex e-commerce payment gateways (Booqable), priced out of reach for faculty departmental budgets (Cheqroom), or cluttered with corporate financial accounting modules that confuse student borrowers (EZOfficeInventory).'
      ),
      createPara(
        'Consequently, PinjamGeng synthesizes the most effective design paradigms from these systems into a unified, lightweight, and purpose-built platform. From Cheqroom, PinjamGeng adopts the package bundling philosophy, transforming it into campus-specific "Smart Event Packages" that prevent novice student organizers from omitting essential cables or accessories. From Booqable, it borrows the frictionless 2-step booking wizard, making equipment requisition fast, intuitive, and error-free. From EZOfficeInventory, it incorporates structured condition auditing and automatic maintenance ticketing, ensuring that damaged gear is immediately flagged and repaired. By delivering these capabilities within a warm, aesthetic campus interface requiring zero commercial subscription fees, PinjamGeng establishes a highly practical, sustainable solution for UPTM.'
      ),

      // 2.6 Conclusion
      createHeading2('2.6 Conclusion'),
      createPara(
        'Chapter 2 has synthesized the academic literature and practical investigations surrounding equipment loan management, highlighting the critical deficiencies of manual paper-based forms and static logbooks. By analyzing three leading commercial solutions (Cheqroom, Booqable, and EZOfficeInventory), this review established a clear functional baseline for PinjamGeng, justifying the necessity of a package-driven, real-time inventory management platform tailored specifically for Universiti Poly-Tech Malaysia.'
      ),
      new Paragraph({ children: [new PageBreak()] }),
    ];
  },
};
