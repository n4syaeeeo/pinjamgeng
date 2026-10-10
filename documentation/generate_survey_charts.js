const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgDir = path.join(__dirname, 'images');
const chromeExe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Generating updated Google Forms survey charts from real response data...');

function createPieCard(title, responsesText, slices) {
  let currentAngle = 0;
  const paths = slices.map(s => {
    const angle = (s.pct / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;

    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;

    const x1 = 130 + 80 * Math.cos(startRad);
    const y1 = 100 + 80 * Math.sin(startRad);
    const x2 = 130 + 80 * Math.cos(endRad);
    const y2 = 100 + 80 * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;
    if (s.pct >= 99.9) {
      return `<circle cx="130" cy="100" r="80" fill="${s.color}" />`;
    }
    const d = `M 130 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return `<path d="${d}" fill="${s.color}" />`;
  }).join('\n');

  const legend = slices.map(s => `
    <div style="display:flex; align-items:center; margin-bottom:6px; font-size:11px;">
      <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${s.color}; margin-right:8px; flex-shrink:0;"></span>
      <span>${s.label} (${s.pct}%)</span>
    </div>
  `).join('\n');

  return `
  <div style="width:620px; border:1px solid #dadce0; border-radius:8px; padding:18px 24px; background:#fff; font-family:'Google Sans',Roboto,Arial,sans-serif; margin-bottom:15px; box-sizing:border-box;">
    <div style="font-size:13px; font-weight:500; color:#202124; margin-bottom:3px;">${title}</div>
    <div style="font-size:11px; color:#5f6368; margin-bottom:15px;">${responsesText}</div>
    <div style="display:flex; align-items:center; justify-content:space-between;">
      <svg width="260" height="200" viewBox="0 0 260 200">
        ${paths}
      </svg>
      <div style="flex:1; padding-left:25px;">
        ${legend}
      </div>
    </div>
  </div>`;
}

function createBarCard(title, responsesText, bars) {
  const renderedBars = bars.map(b => `
    <div style="margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:3px; color:#3c4043;">
        <span>${b.label}</span>
        <span style="font-weight:bold;">${b.count} (${b.pct}%)</span>
      </div>
      <div style="background:#f1f3f4; border-radius:4px; height:16px; width:100%; overflow:hidden;">
        <div style="background:${b.color || '#4285f4'}; width:${b.pct}%; height:100%; border-radius:4px;"></div>
      </div>
    </div>
  `).join('\n');

  return `
  <div style="width:620px; border:1px solid #dadce0; border-radius:8px; padding:18px 24px; background:#fff; font-family:'Google Sans',Roboto,Arial,sans-serif; margin-bottom:15px; box-sizing:border-box;">
    <div style="font-size:13px; font-weight:500; color:#202124; margin-bottom:3px;">${title}</div>
    <div style="font-size:11px; color:#5f6368; margin-bottom:15px;">${responsesText}</div>
    <div>
      ${renderedBars}
    </div>
  </div>`;
}

function createTextCard(title, responsesText, items) {
  const renderedItems = items.map(it => `
    <div style="background:#f8f9fa; border-left:3px solid #1a73e8; padding:8px 12px; margin-bottom:8px; font-size:11px; color:#3c4043; border-radius:0 4px 4px 0;">
      "${it}"
    </div>
  `).join('\n');

  return `
  <div style="width:620px; border:1px solid #dadce0; border-radius:8px; padding:18px 24px; background:#fff; font-family:'Google Sans',Roboto,Arial,sans-serif; margin-bottom:15px; box-sizing:border-box;">
    <div style="font-size:13px; font-weight:500; color:#202124; margin-bottom:3px;">${title}</div>
    <div style="font-size:11px; color:#5f6368; margin-bottom:12px;">${responsesText}</div>
    <div>
      ${renderedItems}
    </div>
  </div>`;
}

// ==========================================
// FORM 1: USER REQUIREMENTS SURVEY (41 RESPONSES)
// ==========================================

const survey1Html = createPieCard('What is your primary role in campus events at UPTM?', '39 responses', [
  { label: 'Student Club / Society Committee Member', pct: 97.4, color: '#4285f4' },
  { label: 'Faculty Lecturer / Club Advisor', pct: 2.6, color: '#ea4335' }
]);

const survey2Html = createPieCard('How long have you been involved in organizing student or campus events at UPTM?', '40 responses', [
  { label: '1 to 2 years', pct: 50.0, color: '#4285f4' },
  { label: 'Less than 1 year', pct: 45.0, color: '#ea4335' },
  { label: 'More than 2 years', pct: 5.0, color: '#fbbc05' }
]);

const survey3Html = createPieCard('How frequently do you or your organization borrow event equipment during an academic semester?', '40 responses', [
  { label: 'Several times per semester', pct: 42.5, color: '#ea4335' },
  { label: 'Monthly', pct: 30.0, color: '#4285f4' },
  { label: 'Annually', pct: 22.5, color: '#34a853' },
  { label: 'Weekly', pct: 5.0, color: '#fbbc05' }
]);

const survey4Html = createBarCard('What difficulties have you encountered when using the current manual paper requisition forms at UPTM?', '40 responses', [
  { label: 'Slow approval process and repeated physical counter visits', count: 26, pct: 65.0, color: '#5c6bc0' },
  { label: 'Lack of real-time visibility on equipment availability', count: 23, pct: 57.5, color: '#5c6bc0' },
  { label: 'Forgetting to request essential peripheral cables or accessories', count: 17, pct: 42.5, color: '#5c6bc0' },
  { label: 'Misplaced paper forms or lost loan records', count: 13, pct: 32.5, color: '#5c6bc0' }
]);

const survey5Html = createPieCard('Have you experienced equipment schedule clashes or double-bookings during major campus event periods?', '40 responses', [
  { label: 'Sometimes / Occasionally', pct: 55.0, color: '#ea4335' },
  { label: 'Often (especially during peak event weeks)', pct: 35.0, color: '#4285f4' },
  { label: 'Never', pct: 10.0, color: '#fbbc05' }
]);

const survey6Html = createPieCard('Have you ever received damaged, defective or incomplete equipment upon collecting items from the counter?', '40 responses', [
  { label: 'Yes, frequently or occasionally', pct: 67.5, color: '#4285f4' },
  { label: 'No, never', pct: 32.5, color: '#ea4335' }
]);

const survey7Html = createPieCard('On average, how long does it take for a manual equipment loan request to be fully approved and confirmed?', '39 responses', [
  { label: 'More than 3 days', pct: 48.7, color: '#ea4335' },
  { label: '1 to 3 days', pct: 46.2, color: '#4285f4' },
  { label: 'Within the same day', pct: 5.1, color: '#fbbc05' }
]);

const survey8Html = createPieCard('Would pre-configured "Smart Event Packages" simplify the booking process and prevent forgotten cables?', '40 responses', [
  { label: 'Strongly Agree', pct: 50.0, color: '#4285f4' },
  { label: 'Agree', pct: 35.0, color: '#ea4335' },
  { label: 'Neutral', pct: 12.5, color: '#fbbc05' },
  { label: 'Disagree', pct: 2.5, color: '#34a853' }
]);

const survey9Html = createPieCard('How important is having real-time online equipment availability indicators before submitting a reservation?', '40 responses', [
  { label: 'Strongly Agree (Essential to prevent clashes)', pct: 57.5, color: '#4285f4' },
  { label: 'Agree', pct: 25.0, color: '#ea4335' },
  { label: 'Neutral', pct: 15.0, color: '#fbbc05' },
  { label: 'Disagree', pct: 2.5, color: '#34a853' }
]);

const survey10Html = createPieCard('Would a digital Return Desk inspection that logs item condition improve student accountability and equipment care?', '40 responses', [
  { label: 'Strongly Agree', pct: 50.0, color: '#4285f4' },
  { label: 'Agree', pct: 30.0, color: '#ea4335' },
  { label: 'Neutral', pct: 15.0, color: '#fbbc05' },
  { label: 'Disagree', pct: 5.0, color: '#34a853' }
]);

const survey11Html = createPieCard('Would you support the implementation of the PinjamGeng web-based system to replace manual paper forms at UPTM?', '40 responses', [
  { label: 'Strongly Agree', pct: 55.0, color: '#4285f4' },
  { label: 'Agree', pct: 30.0, color: '#ea4335' },
  { label: 'Neutral', pct: 12.5, color: '#fbbc05' },
  { label: 'Disagree', pct: 2.5, color: '#34a853' }
]);

const survey12Html = createTextCard('What additional features or recommendations would you suggest for the PinjamGeng system?', '17 responses', [
  'Add pictures of the equipment for easy recognition.',
  'Maintain past loan history so borrowers have proof of transaction.',
  'Provide "period times" to avoid schedule clashes between societies.',
  'Interactive calendar view and automatic time logs for scheduling.',
  'Send loan status notifications and clear return deadline reminders.',
  'Consider AI fraud detection to analyze borrowing patterns.'
]);

// ==========================================
// FORM 2: USER ACCEPTANCE TESTING (30 RESPONSES)
// ==========================================

const uat1Html = createPieCard('What is your role during this User Acceptance Testing (UAT) session?', '30 responses', [
  { label: 'Student Club / Society Executive (Borrower)', pct: 96.7, color: '#4285f4' },
  { label: 'Faculty Lecturer / Club Advisor', pct: 3.3, color: '#ea4335' }
]);

const uat2Html = createPieCard('How easy was it to navigate through the PinjamGeng web interface?', '29 responses', [
  { label: 'Very Easy', pct: 44.8, color: '#4285f4' },
  { label: 'Easy', pct: 34.5, color: '#ea4335' },
  { label: 'Moderate', pct: 17.2, color: '#fbbc05' },
  { label: 'Difficult', pct: 3.5, color: '#34a853' }
]);

const uat3Html = createPieCard('PinjamGeng enables significantly faster equipment reservations compared to manual paper requisition slips.', '30 responses', [
  { label: 'Strongly Agree', pct: 50.0, color: '#4285f4' },
  { label: 'Agree', pct: 36.7, color: '#ea4335' },
  { label: 'Neutral', pct: 13.3, color: '#fbbc05' }
]);

const uat4Html = createPieCard('The pre-configured "Smart Event Packages" feature is clear, intuitive, and prevents forgotten cables or accessories.', '29 responses', [
  { label: 'Agree', pct: 48.3, color: '#ea4335' },
  { label: 'Strongly Agree', pct: 41.4, color: '#4285f4' },
  { label: 'Neutral', pct: 10.3, color: '#fbbc05' }
]);

const uat5Html = createPieCard('The real-time stock availability indicators provide clear visibility before submitting a reservation request.', '30 responses', [
  { label: 'Strongly Agree', pct: 50.0, color: '#4285f4' },
  { label: 'Agree', pct: 36.7, color: '#ea4335' },
  { label: 'Neutral', pct: 13.3, color: '#fbbc05' }
]);

const uat6Html = createPieCard('The 2-step booking wizard provides a smooth, stress-free reservation experience with clear date validation.', '30 responses', [
  { label: 'Strongly Agree', pct: 46.7, color: '#4285f4' },
  { label: 'Agree', pct: 46.7, color: '#ea4335' },
  { label: 'Neutral', pct: 6.7, color: '#fbbc05' }
]);

const uat7Html = createPieCard('The official downloadable/printable A4 Loan Agreement Slip provides clear equipment accountability and tracking.', '29 responses', [
  { label: 'Strongly Agree', pct: 41.4, color: '#4285f4' },
  { label: 'Agree', pct: 41.4, color: '#ea4335' },
  { label: 'Neutral', pct: 17.2, color: '#fbbc05' }
]);

const uat8Html = createPieCard('The Return Desk inspection interface (recording condition as Excellent, Good, Fair, Damaged) improves accountability.', '30 responses', [
  { label: 'Strongly Agree', pct: 43.3, color: '#4285f4' },
  { label: 'Agree', pct: 40.0, color: '#ea4335' },
  { label: 'Neutral', pct: 13.3, color: '#fbbc05' },
  { label: 'Disagree', pct: 3.4, color: '#34a853' }
]);

const uat9Html = createPieCard('PinjamGeng\'s automated conflict-checking successfully eliminates schedule double-bookings and lost application records.', '29 responses', [
  { label: 'Agree', pct: 48.3, color: '#ea4335' },
  { label: 'Strongly Agree', pct: 41.4, color: '#4285f4' },
  { label: 'Neutral', pct: 10.3, color: '#fbbc05' }
]);

const uat10Html = createBarCard('Which feature of PinjamGeng did you find the most valuable?', '30 responses', [
  { label: 'Real-time Stock Availability Counters', count: 21, pct: 70.0, color: '#4285f4' },
  { label: 'Smart Event Packages (Pre-bundled equipment sets)', count: 19, pct: 63.3, color: '#4285f4' },
  { label: 'Return Desk Condition Inspection & Auto Maintenance', count: 11, pct: 36.7, color: '#4285f4' },
  { label: 'Standardized Printable A4 Loan Agreement Slip', count: 10, pct: 33.3, color: '#4285f4' },
  { label: 'Executive Reports & Analytics Dashboard', count: 6, pct: 20.0, color: '#4285f4' }
]);

const uat11Html = createBarCard('What is your overall satisfaction rating for the PinjamGeng system? (Scale 1 to 5)', '30 responses', [
  { label: 'Rating 5 (Highest Satisfaction)', count: 17, pct: 56.7, color: '#34a853' },
  { label: 'Rating 4 (High Satisfaction)', count: 6, pct: 20.0, color: '#4285f4' },
  { label: 'Rating 3 (Neutral / Acceptable)', count: 4, pct: 13.3, color: '#fbbc05' },
  { label: 'Rating 2 (Low Satisfaction)', count: 1, pct: 3.3, color: '#ea4335' },
  { label: 'Rating 1 (Dissatisfied)', count: 2, pct: 6.7, color: '#d93025' }
]);

const uat12Html = createTextCard('What did you like most about the system, and what future improvements would you suggest?', '13 responses', [
  'I liked the Smart Event Packages because they make it easier to choose and borrow equipment.',
  'Easy to check items so we do not have to waste time checking and waiting at the counter.',
  'Smooth operation and clear layout.',
  'Suggest adding more package options in the future and continuous UI enhancements.',
  'Everything is good so far, very convenient!'
]);

// Master HTML
const masterChartsHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { margin:0; padding:20px; background:#f0f2f5; display:flex; flex-direction:column; align-items:center; }
  .chart-wrapper { margin-bottom: 25px; }
</style>
</head>
<body>
  <div id="survey1" class="chart-wrapper">${survey1Html}</div>
  <div id="survey2" class="chart-wrapper">${survey2Html}</div>
  <div id="survey3" class="chart-wrapper">${survey3Html}</div>
  <div id="survey4" class="chart-wrapper">${survey4Html}</div>
  <div id="survey5" class="chart-wrapper">${survey5Html}</div>
  <div id="survey6" class="chart-wrapper">${survey6Html}</div>
  <div id="survey7" class="chart-wrapper">${survey7Html}</div>
  <div id="survey8" class="chart-wrapper">${survey8Html}</div>
  <div id="survey9" class="chart-wrapper">${survey9Html}</div>
  <div id="survey10" class="chart-wrapper">${survey10Html}</div>
  <div id="survey11" class="chart-wrapper">${survey11Html}</div>
  <div id="survey12" class="chart-wrapper">${survey12Html}</div>

  <div id="uat1" class="chart-wrapper">${uat1Html}</div>
  <div id="uat2" class="chart-wrapper">${uat2Html}</div>
  <div id="uat3" class="chart-wrapper">${uat3Html}</div>
  <div id="uat4" class="chart-wrapper">${uat4Html}</div>
  <div id="uat5" class="chart-wrapper">${uat5Html}</div>
  <div id="uat6" class="chart-wrapper">${uat6Html}</div>
  <div id="uat7" class="chart-wrapper">${uat7Html}</div>
  <div id="uat8" class="chart-wrapper">${uat8Html}</div>
  <div id="uat9" class="chart-wrapper">${uat9Html}</div>
  <div id="uat10" class="chart-wrapper">${uat10Html}</div>
  <div id="uat11" class="chart-wrapper">${uat11Html}</div>
  <div id="uat12" class="chart-wrapper">${uat12Html}</div>
</body>
</html>`;

fs.writeFileSync(path.join(imgDir, 'charts_master.html'), masterChartsHtml, 'utf8');

const chartList = [
  { id: 'survey1', name: 'fig_3_2_user_questionnaire_1.png', html: survey1Html },
  { id: 'survey2', name: 'fig_3_3_user_questionnaire_2.png', html: survey2Html },
  { id: 'survey3', name: 'fig_3_4_user_questionnaire_3.png', html: survey3Html },
  { id: 'survey4', name: 'fig_3_5_user_questionnaire_4.png', html: survey4Html },
  { id: 'survey5', name: 'fig_3_6_user_questionnaire_5.png', html: survey5Html },
  { id: 'survey6', name: 'fig_3_7_user_questionnaire_6.png', html: survey6Html },
  { id: 'survey7', name: 'fig_3_8_user_questionnaire_7.png', html: survey7Html },
  { id: 'survey8', name: 'fig_3_9_user_questionnaire_8.png', html: survey8Html },
  { id: 'survey9', name: 'fig_3_10_user_questionnaire_9.png', html: survey9Html },
  { id: 'survey10', name: 'fig_3_11_user_questionnaire_10.png', html: survey10Html },
  { id: 'survey11', name: 'fig_3_12_user_questionnaire_11.png', html: survey11Html },
  { id: 'survey12', name: 'fig_3_13_user_questionnaire_12.png', html: survey12Html },
  { id: 'uat1', name: 'fig_4_1_user_questionnaire_1.png', html: uat1Html },
  { id: 'uat2', name: 'fig_4_2_user_questionnaire_2.png', html: uat2Html },
  { id: 'uat3', name: 'fig_4_3_user_questionnaire_3.png', html: uat3Html },
  { id: 'uat4', name: 'fig_4_4_user_questionnaire_4.png', html: uat4Html },
  { id: 'uat5', name: 'fig_4_5_user_questionnaire_5.png', html: uat5Html },
  { id: 'uat6', name: 'fig_4_6_user_questionnaire_6.png', html: uat6Html },
  { id: 'uat7', name: 'fig_4_7_user_questionnaire_7.png', html: uat7Html },
  { id: 'uat8', name: 'fig_4_8_user_questionnaire_8.png', html: uat8Html },
  { id: 'uat9', name: 'fig_4_9_user_questionnaire_9.png', html: uat9Html },
  { id: 'uat10', name: 'fig_4_10_user_questionnaire_10.png', html: uat10Html },
  { id: 'uat11', name: 'fig_4_11_user_questionnaire_11.png', html: uat11Html },
  { id: 'uat12', name: 'fig_4_12_user_questionnaire_12.png', html: uat12Html },
];

for (const c of chartList) {
  const cHtml = `<!DOCTYPE html><html><body style="margin:0; padding:10px; background:#ffffff; display:flex; justify-content:center;">${c.html}</body></html>`;
  const tmpFile = path.join(imgDir, 'tmp_' + c.id + '.html');
  const outFile = path.join(imgDir, c.name);
  fs.writeFileSync(tmpFile, cHtml, 'utf8');

  try {
    const cmd = `"${chromeExe}" --headless --disable-gpu --window-size=680,320 --screenshot="${outFile}" "${tmpFile}"`;
    execSync(cmd);
    console.log('Rendered:', c.name);
  } catch (e) {
    console.error('Error rendering', c.name, e.message);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}

console.log('All 24 survey charts successfully generated with real response data!');
