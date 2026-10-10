const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlPath = path.join(__dirname, 'PinjamGeng_UPTM_FCOM_Deck.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. New Slide 5 & 6 HTML
const newSlidesHtml = `
    <!-- SLIDE 5: LITERATURE REVIEW: EXISTING SYSTEM -->
    <div class="slide content-slide" id="slide-5">
      <div class="slide-header">
        <div class="logo-container"><img src="images/uptm_fcom_logo.png" alt="UPTM FCOM"></div>
      </div>
      <h2 class="slide-title">LITERATURE REVIEW: EXISTING SYSTEM</h2>
      <div class="slide-body" style="flex-direction: column; gap: 14px; justify-content: center;">
        
        <div style="background: #FFFFFF; border: 1.5px solid var(--card-border); border-radius: 12px; padding: 14px 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
          <h3 style="font-family: 'Montserrat', sans-serif; font-size: 18px; color: var(--title-berry); margin-bottom: 6px;">1. Cheqroom</h3>
          <p style="font-size: 14px; color: var(--text-dark); margin-bottom: 4px;">• Provides cloud-based asset tracking with equipment kit bundling and calendar reservation.</p>
          <p style="font-size: 14px; color: var(--text-dark); margin-bottom: 4px;">• Supports barcode/QR code custody tracking and item condition check-in logging.</p>
          <p style="font-size: 13.5px; color: var(--text-muted); font-style: italic;"><strong style="color: var(--pill-rose); font-style: normal;">Limitation:</strong> High annual enterprise subscription cost with excessive corporate features (geofencing, insurance depreciation) impractical for localized campus budgets.</p>
        </div>

        <div style="background: #FFFFFF; border: 1.5px solid var(--card-border); border-radius: 12px; padding: 14px 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
          <h3 style="font-family: 'Montserrat', sans-serif; font-size: 18px; color: var(--title-berry); margin-bottom: 6px;">2. Booqable</h3>
          <p style="font-size: 14px; color: var(--text-dark); margin-bottom: 4px;">• Offers an intuitive step-by-step booking wizard with real-time stock availability verification.</p>
          <p style="font-size: 14px; color: var(--text-dark); margin-bottom: 4px;">• Visualizes equipment dispatch schedules using color-coded order timeline bars.</p>
          <p style="font-size: 13.5px; color: var(--text-muted); font-style: italic;"><strong style="color: var(--pill-rose); font-style: normal;">Limitation:</strong> Heavily oriented toward commercial rental businesses requiring customer invoicing, security deposits, and credit card payments rather than internal university club loan rules.</p>
        </div>

        <div style="background: #FFFFFF; border: 1.5px solid var(--card-border); border-radius: 12px; padding: 14px 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
          <h3 style="font-family: 'Montserrat', sans-serif; font-size: 18px; color: var(--title-berry); margin-bottom: 6px;">3. EZOfficeInventory</h3>
          <p style="font-size: 14px; color: var(--text-dark); margin-bottom: 4px;">• Provides comprehensive asset lifecycle tracking with service tickets and "Under Maintenance" status flags.</p>
          <p style="font-size: 14px; color: var(--text-dark); margin-bottom: 4px;">• Generates exportable utilization and equipment condition audit reports.</p>
          <p style="font-size: 13.5px; color: var(--text-muted); font-style: italic;"><strong style="color: var(--pill-rose); font-style: normal;">Limitation:</strong> Complex and data-dense enterprise interface with a steep learning curve for student borrowers; lacks quick event-based packages.</p>
        </div>

      </div>
      <div class="slide-number-pill">4</div>
    </div>

    <!-- SLIDE 6: COMPARISON & RESEARCH GAP -->
    <div class="slide content-slide" id="slide-6">
      <div class="slide-header">
        <div class="logo-container"><img src="images/uptm_fcom_logo.png" alt="UPTM FCOM"></div>
      </div>
      <h2 class="slide-title">COMPARISON & RESEARCH GAP</h2>
      <div class="slide-body" style="align-items: center; justify-content: center;">
        <table class="test-table" style="font-size: 13px;">
          <thead>
            <tr>
              <th style="width: 280px;">Feature / Capability</th>
              <th style="text-align: center; width: 140px;">Cheqroom</th>
              <th style="text-align: center; width: 140px;">Booqable</th>
              <th style="text-align: center; width: 160px;">EZOfficeInventory</th>
              <th style="text-align: center; width: 220px; background: var(--pill-dark); color: #FFFFFF;">Proposed System<br><span style="font-size: 11px; font-weight: normal;">(PinjamGeng)</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight: 700;">Online Equipment Booking</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800; background: #FAF5F0;">✓</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Real-Time Stock Availability</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800; background: #FAF5F0;">✓</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Event-Based Equipment Packages</td>
              <td style="text-align: center; color: var(--text-dark);">✓ (Kits)</td>
              <td style="text-align: center; color: var(--text-dark);">✓ (Bundles)</td>
              <td style="text-align: center; color: var(--text-muted);">Not dedicated</td>
              <td style="text-align: center; color: #15803D; font-weight: 800; background: #FAF5F0;">✓ (Smart Packages)</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Automated Conflict Engine</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800; background: #FAF5F0;">✓</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Return Condition & Maintenance Log</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: var(--text-muted);">Not dedicated</td>
              <td style="text-align: center; color: #15803D; font-weight: 800;">✓</td>
              <td style="text-align: center; color: #15803D; font-weight: 800; background: #FAF5F0;">✓</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Official Digital A4 Loan Slip</td>
              <td style="text-align: center; color: var(--text-muted);">Not found</td>
              <td style="text-align: center; color: var(--text-muted);">Not dedicated</td>
              <td style="text-align: center; color: var(--text-muted);">Not dedicated</td>
              <td style="text-align: center; color: #15803D; font-weight: 800; background: #FAF5F0;">✓ (Standardized A4)</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Zero Subscription (Campus Tailored)</td>
              <td style="text-align: center; color: var(--text-muted);">Not found</td>
              <td style="text-align: center; color: var(--text-muted);">Not found</td>
              <td style="text-align: center; color: var(--text-muted);">Not found</td>
              <td style="text-align: center; color: #15803D; font-weight: 800; background: #FAF5F0;">✓ (100% Free Campus)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="slide-number-pill">5</div>
    </div>
`;

// Insert new slides after slide-4
const slide4EndMarker = `<!-- SLIDE 5: AGILE METHODOLOGY -->`;
html = html.replace(slide4EndMarker, newSlidesHtml + '\n    ' + slide4EndMarker);

// Re-index remaining slides: 5->7, 6->8, ..., 18->20
for (let oldId = 18; oldId >= 5; oldId--) {
  const newId = oldId + 2;
  const oldComment = `<!-- SLIDE ${oldId}:`;
  const newComment = `<!-- SLIDE ${newId}:`;
  html = html.replace(oldComment, newComment);

  const oldDiv = `id="slide-${oldId}"`;
  const newDiv = `id="slide-${newId}"`;
  html = html.replace(oldDiv, newDiv);
}

// Update slide pills:
// Slide 7 (was 5): pill 6
// Slide 8 (was 6): pill 7
// ... Slide 19 (was 17): pill 18
const pillReplacements = [
  { old: `<div class="slide content-slide" id="slide-7">`, pillOld: `<div class="slide-number-pill">4</div>`, pillNew: `<div class="slide-number-pill">6</div>` },
  { old: `<div class="slide content-slide" id="slide-8">`, pillOld: `<div class="slide-number-pill">5</div>`, pillNew: `<div class="slide-number-pill">7</div>` },
  { old: `<div class="slide content-slide" id="slide-9">`, pillOld: `<div class="slide-number-pill">6</div>`, pillNew: `<div class="slide-number-pill">8</div>` },
  { old: `<div class="slide content-slide" id="slide-10">`, pillOld: `<div class="slide-number-pill">7</div>`, pillNew: `<div class="slide-number-pill">9</div>` },
  { old: `<div class="slide content-slide" id="slide-11">`, pillOld: `<div class="slide-number-pill">8</div>`, pillNew: `<div class="slide-number-pill">10</div>` },
  { old: `<div class="slide content-slide" id="slide-12">`, pillOld: `<div class="slide-number-pill">9</div>`, pillNew: `<div class="slide-number-pill">11</div>` },
  { old: `<div class="slide content-slide" id="slide-13">`, pillOld: `<div class="slide-number-pill">10</div>`, pillNew: `<div class="slide-number-pill">12</div>` },
  { old: `<div class="slide content-slide" id="slide-14">`, pillOld: `<div class="slide-number-pill">11</div>`, pillNew: `<div class="slide-number-pill">13</div>` },
  { old: `<div class="slide content-slide" id="slide-15">`, pillOld: `<div class="slide-number-pill">12</div>`, pillNew: `<div class="slide-number-pill">14</div>` },
  { old: `<div class="slide content-slide" id="slide-16">`, pillOld: `<div class="slide-number-pill">13</div>`, pillNew: `<div class="slide-number-pill">15</div>` },
  { old: `<div class="slide content-slide" id="slide-17">`, pillOld: `<div class="slide-number-pill">14</div>`, pillNew: `<div class="slide-number-pill">16</div>` },
  { old: `<div class="slide content-slide" id="slide-18">`, pillOld: `<div class="slide-number-pill">15</div>`, pillNew: `<div class="slide-number-pill">17</div>` },
  { old: `<div class="slide content-slide" id="slide-19">`, pillOld: `<div class="slide-number-pill">16</div>`, pillNew: `<div class="slide-number-pill">18</div>` }
];

pillReplacements.forEach(r => {
  const slideIdx = html.indexOf(r.old);
  if (slideIdx !== -1) {
    const endSlideIdx = html.indexOf('</div>\n    </div>', slideIdx);
    const slice = html.substring(slideIdx, endSlideIdx + 20);
    const replaced = slice.replace(r.pillOld, r.pillNew);
    html = html.substring(0, slideIdx) + replaced + html.substring(endSlideIdx + 20);
  }
});

// Update UT05
html = html.replace(
  `<td>Damage</td>\n              <td>Penalty fine computation</td>\n              <td>Asset value & 30% tier</td>\n              <td>Exact penalty calculated (RM150.00)</td>`,
  `<td>Returns</td>\n              <td>Auto maintenance ticket on damage</td>\n              <td>Item condition = 'Damaged'</td>\n              <td>Status set to 'Under Maintenance' & ticket logged</td>`
);

// Update Innovation 03
html = html.replace(
  `<h3>03. Return Damage Engine</h3>\n            <p style="font-size: 15.5px; line-height: 1.5; color: var(--text-dark);">Standardized 4-tier condition inspection (10%, 30%, 60%, 100%) with automated fine calculation and instant maintenance locking.</p>`,
  `<h3>03. Return Condition & Maintenance Engine</h3>\n            <p style="font-size: 15.5px; line-height: 1.5; color: var(--text-dark);">Standardized physical condition inspection (Good vs Damaged) with automated maintenance ticket creation and instant inventory pool locking.</p>`
);

// Update totalSlides in controls
html = html.replace(`Slide 1 / 18`, `Slide 1 / 20`);
html = html.replace(`const totalSlides = 18;`, `const totalSlides = 20;`);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('SUCCESS: Updated PinjamGeng_UPTM_FCOM_Deck.html');

// Also update PinjamGeng_UPTM_FCOM_Deck_EN.html
const htmlEnPath = path.join(__dirname, 'PinjamGeng_UPTM_FCOM_Deck_EN.html');
fs.writeFileSync(htmlEnPath, html, 'utf8');
console.log('SUCCESS: Updated PinjamGeng_UPTM_FCOM_Deck_EN.html');
