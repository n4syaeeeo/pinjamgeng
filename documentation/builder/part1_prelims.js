module.exports = {
  getCoverAndPrelims: function() {
    return `
    <!-- COVER PAGE 1 -->
    <div class="page cover-page">
      <div class="cover-content">
        <h1 class="project-title">SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM FOR UNIVERSITI POLY-TECH MALAYSIA (PINJAMGENG)</h1>
        
        <div class="student-info">
          <p class="student-name">NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL</p>
          <p class="student-id">AM2412018113</p>
        </div>

        <div class="university-info">
          <p class="uni-name">UNIVERSITI POLY-TECH MALAYSIA</p>
        </div>
      </div>
    </div>

    <!-- COVER PAGE 2 -->
    <div class="page cover-page">
      <div class="cover-content">
        <h1 class="project-title">SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM FOR UNIVERSITI POLY-TECH MALAYSIA (PINJAMGENG)</h1>
        <p class="category-badge">CATEGORY A</p>
        
        <div class="student-info">
          <p class="student-name">NURSYAFIQAH ZULAIKHA BINTI ZILKAMAL</p>
        </div>

        <div class="fulfillment-block">
          <p>THIS FINAL YEAR PROJECT REPORT IS PREPARED TO FULFILL THE REQUIREMENT OF</p>
          <p class="degree-title">DIPLOMA IN COMPUTER SCIENCE</p>
        </div>

        <div class="university-info">
          <p class="faculty-name">FACULTY OF COMPUTING &amp; MULTIMEDIA</p>
          <p class="uni-name">UNIVERSITI POLY-TECH MALAYSIA</p>
          <p class="submission-date">APRIL 2026</p>
        </div>
      </div>
    </div>

    <!-- PAGE 3: DECLARATION OF ORIGINALITY -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 3 of 154</span>
      </div>

      <h2 class="section-title">Declaration of Originality</h2>
      <p class="justified-text">
        This project is all my own work and has not been copied in part or in whole from any other source except where duly acknowledged. As such, all use of previously published work (from books, journals, magazines, internet, etc.) has been acknowledged within the main report to an item in the References or Bibliography lists.
      </p>
      <p class="justified-text">
        I also agree that an electronic copy of this project may be stored and used for the purposes of plagiarism prevention and detection.
      </p>

      <h2 class="section-title" style="margin-top: 30px;">Copyright Acknowledgement</h2>
      <p class="justified-text">
        I acknowledge that the copyright of this project and report belongs to Universiti Poly-Tech Malaysia.
      </p>

      <div class="signature-section" style="margin-top: 50px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <p><strong>Author's Signature:</strong> _______________________</p>
            <p style="margin-top: 5px;"><strong>Date:</strong> 7/4/2026</p>
          </div>
        </div>

        <div class="stamp-box" style="margin-top: 60px; width: 220px; height: 120px; border: 1.5px solid #000; text-align: center; padding-top: 95px; font-size: 11px;">
          Coordinator / Office Stamp
        </div>
      </div>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 3 of 154</span>
      </div>
    </div>

    <!-- PAGE 4: ABSTRACT -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 4 of 154</span>
      </div>

      <h2 class="section-title" style="text-align: center; margin-bottom: 25px;">Abstract</h2>
      
      <p class="justified-text">
        Smart Event Equipment Booking and Inventory Management System (PinjamGeng) is developed to streamline and modernize the equipment borrowing and resource allocation procedures at Universiti Poly-Tech Malaysia (UPTM). Currently, student clubs, event committees, faculty lecturers, and campus administrative bodies manage audio-visual, computing, and staging equipment loans using paper-based requisition forms and manual physical logbooks. This traditional process suffers from significant operational friction, including lost application slips, scheduling conflicts, lack of real-time inventory visibility, unverified return conditions, and delayed administrative reporting. Consequently, student organizers frequently experience double-booking of high-demand items such as wireless microphones, HD projectors, and PA systems during peak event periods.
      </p>
      <p class="justified-text">
        To address these critical challenges, PinjamGeng provides a centralized, web-based digital ecosystem designed with tailored role-based access for student borrowers and equipment administrators. The system introduces an innovative "Smart Event Packages" feature that allows organizers to reserve pre-configured equipment bundles (such as AGM Package, Outdoor Sports Carnival Bundle, and Seminar Exhibition Setup) in a single click, eliminating manual equipment omissions and accelerating the booking workflow. A 2-step booking wizard guides users through event scheduling, purpose verification, and digital regulatory agreement, generating an official downloadable and printable A4 loan agreement slip complete with borrower particulars and signature sections.
      </p>
      <p class="justified-text">
        For administrative staff and technicians at the Faculty of Computing &amp; Multimedia (FCOM), PinjamGeng provides real-time stock allocation, request review workflows, a dedicated return inspection desk to record physical item condition (Excellent, Good, Fair, Damaged), and an automated maintenance ticketing mechanism that flags damaged gear directly for technical servicing. Built using PHP, MySQL (MariaDB), Apache (XAMPP), and styled with modern Tailwind CSS and FontAwesome under an aesthetic warm campus palette, the platform has undergone comprehensive unit, integration, system, and user acceptance testing (UAT). The evaluation results confirm that PinjamGeng eliminates schedule clashes, reduces equipment requisition time by over 80%, and establishes end-to-end accountability across the university's event operations.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 4 of 154</span>
      </div>
    </div>

    <!-- PAGES 5-6: TABLE OF CONTENTS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 5 of 154</span>
      </div>

      <h2 class="section-title">Table of Contents</h2>
      
      <table class="toc-table">
        <tr class="toc-chapter"><td>CHAPTER 1</td><td class="toc-page">14</td></tr>
        <tr class="toc-title"><td>INTRODUCTION</td><td class="toc-page">14</td></tr>
        <tr><td class="toc-indent-1">1.1 Introduction</td><td class="toc-page">14</td></tr>
        <tr><td class="toc-indent-1">1.2 Problem Statements</td><td class="toc-page">16</td></tr>
        <tr><td class="toc-indent-2">1.2.1 Manual Paper-Based Loan Forms &amp; Disorganized Tracking</td><td class="toc-page">16</td></tr>
        <tr><td class="toc-indent-2">1.2.2 Lack of Real-Time Equipment Availability &amp; Schedule Overlaps</td><td class="toc-page">16</td></tr>
        <tr><td class="toc-indent-2">1.2.3 Inefficient Return Inspection, Damaged Equipment Tracking &amp; Reporting</td><td class="toc-page">16</td></tr>
        <tr><td class="toc-indent-1">1.3 Project Objectives</td><td class="toc-page">17</td></tr>
        <tr><td class="toc-indent-2">1.3.1 To develop a centralized web-based equipment booking and inventory management system</td><td class="toc-page">17</td></tr>
        <tr><td class="toc-indent-2">1.3.2 To allow real-time equipment availability monitoring and event package selection</td><td class="toc-page">17</td></tr>
        <tr><td class="toc-indent-2">1.3.3 To establish an automated return inspection, condition logging, and maintenance reporting workflow</td><td class="toc-page">17</td></tr>
        <tr><td class="toc-indent-1">1.4 Scope and Target User</td><td class="toc-page">18</td></tr>
        <tr><td class="toc-indent-2">1.4.1 Project Scope</td><td class="toc-page">18</td></tr>
        <tr><td class="toc-indent-2">1.4.2 Product Scope</td><td class="toc-page">18</td></tr>
        <tr><td class="toc-indent-2">1.4.3 Target User</td><td class="toc-page">19</td></tr>
        <tr><td class="toc-indent-1">1.5 Project Requirement</td><td class="toc-page">19</td></tr>
        <tr><td class="toc-indent-2">1.5.1 Hardware Requirement</td><td class="toc-page">19</td></tr>
        <tr><td class="toc-indent-2">1.5.2 Software Requirement</td><td class="toc-page">20</td></tr>
        <tr><td class="toc-indent-1">1.6 Conclusion</td><td class="toc-page">20</td></tr>

        <tr class="toc-chapter"><td>CHAPTER 2</td><td class="toc-page">21</td></tr>
        <tr class="toc-title"><td>LITERATURE REVIEW</td><td class="toc-page">21</td></tr>
        <tr><td class="toc-indent-1">2.1 Introduction</td><td class="toc-page">21</td></tr>
        <tr><td class="toc-indent-1">2.2 Investigation</td><td class="toc-page">22</td></tr>
        <tr><td class="toc-indent-2">2.2.1 Manual Equipment Loan and Physical Form Processing Challenges</td><td class="toc-page">22</td></tr>
        <tr><td class="toc-indent-2">2.2.2 The Critical Need for Real-Time Equipment Availability and Conflict Prevention</td><td class="toc-page">23</td></tr>
        <tr><td class="toc-indent-2">2.2.3 Equipment Condition Tracking, Loss Prevention, and Reporting Complexity</td><td class="toc-page">24</td></tr>
        <tr><td class="toc-indent-1">2.3 Previous Case Study</td><td class="toc-page">25</td></tr>
        <tr><td class="toc-indent-2">2.3.1 Case Study 1: Cheqroom</td><td class="toc-page">25</td></tr>
        <tr><td class="toc-indent-2">2.3.2 Case Study 2: Booqable</td><td class="toc-page">27</td></tr>
        <tr><td class="toc-indent-2">2.3.3 Case Study 3: EZOfficeInventory</td><td class="toc-page">32</td></tr>
        <tr><td class="toc-indent-1">2.4 Comparison</td><td class="toc-page">36</td></tr>
        <tr><td class="toc-indent-1">2.5 Discussion</td><td class="toc-page">37</td></tr>
        <tr><td class="toc-indent-1">2.6 Conclusion</td><td class="toc-page">38</td></tr>

        <tr class="toc-chapter"><td>CHAPTER 3</td><td class="toc-page">39</td></tr>
        <tr class="toc-title"><td>METHODOLOGY</td><td class="toc-page">39</td></tr>
        <tr><td class="toc-indent-1">3.1 Introduction</td><td class="toc-page">39</td></tr>
        <tr><td class="toc-indent-1">3.2 Agile Methodology</td><td class="toc-page">40</td></tr>
        <tr><td class="toc-indent-1">3.3 Phases in Agile Methodology</td><td class="toc-page">41</td></tr>
        <tr><td class="toc-indent-2">3.3.1 Phase 1: Plan</td><td class="toc-page">41</td></tr>
        <tr><td class="toc-indent-2">3.3.2 Phase 2: Design</td><td class="toc-page">41</td></tr>
        <tr><td class="toc-indent-2">3.3.3 Phase 3: Develop</td><td class="toc-page">42</td></tr>
        <tr><td class="toc-indent-2">3.3.4 Phase 4: Test</td><td class="toc-page">42</td></tr>
        <tr><td class="toc-indent-2">3.3.5 Phase 5: Deploy</td><td class="toc-page">42</td></tr>
        <tr><td class="toc-indent-2">3.3.6 Phase 6: Review</td><td class="toc-page">43</td></tr>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 5 of 154</span>
      </div>
    </div>

    <!-- TOC PAGE 6 -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 6 of 154</span>
      </div>

      <table class="toc-table">
        <tr><td class="toc-indent-1">3.4 Data Gathering and Requirement</td><td class="toc-page">43</td></tr>
        <tr><td class="toc-indent-2">3.4.1 User Requirement Analysis</td><td class="toc-page">43</td></tr>
        <tr><td class="toc-indent-1">3.5 Interface Design</td><td class="toc-page">50</td></tr>
        <tr><td class="toc-indent-2">3.5.1 Wireframe</td><td class="toc-page">50</td></tr>
        <tr><td class="toc-indent-2">3.5.2 Actual Interface</td><td class="toc-page">59</td></tr>
        <tr><td class="toc-indent-1">3.6 System and Application Modelling</td><td class="toc-page">91</td></tr>
        <tr><td class="toc-indent-2">3.6.1 Flowchart</td><td class="toc-page">91</td></tr>
        <tr><td class="toc-indent-2">3.6.2 Use Case Diagram</td><td class="toc-page">94</td></tr>
        <tr><td class="toc-indent-2">3.6.3 Entity Relational Diagram</td><td class="toc-page">96</td></tr>
        <tr><td class="toc-indent-2">3.6.4 Data Dictionary</td><td class="toc-page">97</td></tr>
        <tr><td class="toc-indent-1">3.7 Conclusion</td><td class="toc-page">101</td></tr>

        <tr class="toc-chapter"><td>CHAPTER 4</td><td class="toc-page">102</td></tr>
        <tr class="toc-title"><td>FINDINGS AND RESULTS</td><td class="toc-page">102</td></tr>
        <tr><td class="toc-indent-1">4.1 Introduction</td><td class="toc-page">102</td></tr>
        <tr><td class="toc-indent-1">4.2 System Evaluation</td><td class="toc-page">103</td></tr>
        <tr><td class="toc-indent-2">4.2.1 Unit Testing</td><td class="toc-page">104</td></tr>
        <tr><td class="toc-indent-2">4.2.2 Integration Testing</td><td class="toc-page">111</td></tr>
        <tr><td class="toc-indent-2">4.2.3 System Testing</td><td class="toc-page">116</td></tr>
        <tr><td class="toc-indent-2">4.2.4 User Acceptance Testing</td><td class="toc-page">118</td></tr>
        <tr><td class="toc-indent-1">4.3 Discussion</td><td class="toc-page">124</td></tr>
        <tr><td class="toc-indent-1">4.4 Conclusion</td><td class="toc-page">125</td></tr>

        <tr class="toc-chapter"><td>CHAPTER 5</td><td class="toc-page">126</td></tr>
        <tr class="toc-title"><td>CONCLUSION</td><td class="toc-page">126</td></tr>
        <tr><td class="toc-indent-1">5.1 Introduction</td><td class="toc-page">126</td></tr>
        <tr><td class="toc-indent-1">5.2 Project Achievement</td><td class="toc-page">126</td></tr>
        <tr><td class="toc-indent-2">5.2.1 First Objective</td><td class="toc-page">127</td></tr>
        <tr><td class="toc-indent-2">5.2.2 Second Objective</td><td class="toc-page">128</td></tr>
        <tr><td class="toc-indent-2">5.2.3 Third Objective</td><td class="toc-page">129</td></tr>
        <tr><td class="toc-indent-1">5.3 Project Constraint and Limitation</td><td class="toc-page">131</td></tr>
        <tr><td class="toc-indent-1">5.4 Recommendation and Future Work</td><td class="toc-page">132</td></tr>
        <tr><td class="toc-indent-1">5.5 Conclusion</td><td class="toc-page">133</td></tr>

        <tr class="toc-chapter"><td>Appendix A – Questionnaire</td><td class="toc-page">134</td></tr>
        <tr class="toc-chapter"><td>Appendix B – User Manual</td><td class="toc-page">141</td></tr>
        <tr class="toc-chapter"><td>References</td><td class="toc-page">142</td></tr>
        <tr class="toc-chapter"><td>Originality Result</td><td class="toc-page">145</td></tr>
      </table>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 6 of 154</span>
      </div>
    </div>

    <!-- PAGE 13: ACKNOWLEDGEMENTS -->
    <div class="page standard-page">
      <div class="page-header">
        <span class="course-code">CC101</span>
        <span class="page-num">Page 13 of 154</span>
      </div>

      <h2 class="section-title" style="text-align: center; margin-bottom: 25px;">Acknowledgements</h2>

      <p class="justified-text">
        First and foremost, I extend my deepest gratitude and praise to Allah (SWT) for His endless grace, blessings, health, and patience throughout the entire development journey of this Final Year Project. Without His divine guidance and strength, the successful completion of the "Smart Event Equipment Booking and Inventory Management System for Universiti Poly-Tech Malaysia (PinjamGeng)" project would never have been possible.
      </p>
      <p class="justified-text">
        I would like to express my most heartfelt appreciation and gratitude to my dedicated supervisor, <strong>Madam Jihadah Binti Ahmad</strong>, for her continuous mentorship, constructive critiques, insightful recommendations, and unwavering encouragement from the proposal defense until the final project demonstration. Her expertise in systems analysis and user experience design helped me maintain high academic rigor and motivated me to transform a routine booking system into an innovative, package-centric campus inventory solution.
      </p>
      <p class="justified-text">
        My sincere appreciation is also extended to <strong>Madam Noraliza Binti Azizan</strong>, our respected FYP coordinator and examiner, whose valuable feedback during milestone reviews significantly sharpened the scope, architectural integrity, and evaluation metrics of this research. Her guidance ensured that this project strictly complies with the standards of the Faculty of Computing &amp; Multimedia (FCOM).
      </p>
      <p class="justified-text">
        A special, loving dedication goes to my beloved mother and family members. Their continuous prayers, patience, moral support, and financial sacrifices were my greatest source of inspiration and strength during long late-night coding sessions and stressful submission deadlines. Their belief in my potential kept me grounded and determined to complete my Diploma in Computer Science with excellence.
      </p>
      <p class="justified-text">
        Lastly, I wish to thank my precious classmates, close friends, and fellow student committee members at UPTM who actively participated in user requirement surveys and usability testing trials. Their honest feedback, peer support, and camaraderie made this learning journey memorable.
      </p>

      <div class="page-footer">
        <span class="footer-left">CC101</span>
        <span class="footer-right">Page 13 of 154</span>
      </div>
    </div>
    `;
  }
};
