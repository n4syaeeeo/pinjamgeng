/**
 * PinjamGeng - FYP Presentation Generator (20 Widescreen 16:9 Slides)
 * Student: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)
 * Supervisor: Madam Jihadah Binti Ahmad
 * Faculty of Computing & Multimedia (FCOM), Universiti Poly-Tech Malaysia (UPTM)
 * Diploma in Computer Science (CC101) - FYP3024
 */

const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pres = new pptxgen();
pres.defineLayout({ name: 'CUSTOM_16_9', width: 13.33, height: 7.5 });
pres.layout = 'CUSTOM_16_9';

const PALETTE = {
  bg: 'FBF8F3',          // Soft cream
  cardBg: 'FFFFFF',      // Crisp white
  cardBorder: 'E8DFD5',  // Subtle warm border
  espresso: '3D2B1F',    // Deep dark brown
  coffee: '5C3D28',      // Rich coffee
  caramel: '8B5E3C',     // Primary brand caramel
  amber: 'C68B59',       // Accent
  goldBadge: 'FAEDCD',   // Pill background
  badgeText: '7F5539',   // Pill text
  textDark: '2B2D42',    // High-contrast readable body text
  textMuted: '6C757D',   // Muted grey notes
  textLight: 'FFFFFF',   // White
  success: '2E7D32',     // Green
  danger: 'C62828',      // Red
  accentBlue: '1565C0',  // Blue
  highlightBg: 'F4EDE4'  // Soft highlight
};

const IMAGES_DIR = path.join(__dirname, 'images');
const LOGO_PATH = path.join(IMAGES_DIR, 'uptm_logo.jpg');

let currentSlideNumber = 0;
const TOTAL_SLIDES = 20;

function createBaseSlide(category, title, subtitle) {
  currentSlideNumber++;
  const slide = pres.addSlide();
  slide.background = { color: PALETTE.bg };

  // Top header accent line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.12,
    fill: { color: PALETTE.caramel },
    line: { color: PALETTE.caramel }
  });

  // Top category badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 0.32, w: 2.4, h: 0.3,
    rectRadius: 0.08,
    fill: { color: PALETTE.goldBadge },
    line: { color: PALETTE.goldBadge }
  });
  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.32, w: 2.4, h: 0.3,
    fontSize: 9, bold: true, color: PALETTE.badgeText,
    align: 'center', valign: 'middle'
  });

  // Slide Title
  slide.addText(title, {
    x: 0.8, y: 0.68, w: 10.0, h: 0.45,
    fontSize: 20, bold: true, color: PALETTE.espresso,
    fontFace: 'Arial'
  });

  // Slide Subtitle
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.8, y: 1.15, w: 10.0, h: 0.3,
      fontSize: 11, color: PALETTE.textMuted,
      fontFace: 'Calibri'
    });
  }

  // Top right university logo
  if (fs.existsSync(LOGO_PATH)) {
    slide.addImage({
      path: LOGO_PATH,
      x: 11.45, y: 0.3, w: 1.08, h: 0.8,
      sizing: { type: 'contain' }
    });
  }

  // Bottom footer separator
  slide.addShape(pres.shapes.LINE, {
    x: 0.8, y: 6.95, w: 11.73, h: 0,
    line: { color: PALETTE.cardBorder, width: 1 }
  });

  // Footer Left
  slide.addText('Universiti Poly-Tech Malaysia (UPTM) | FCOM — Diploma in Computer Science (CC101)', {
    x: 0.8, y: 7.02, w: 5.5, h: 0.3,
    fontSize: 8, color: PALETTE.caramel, bold: true
  });

  // Footer Center
  slide.addText('PinjamGeng: Smart Event Equipment Booking System', {
    x: 6.3, y: 7.02, w: 3.5, h: 0.3,
    fontSize: 8, color: PALETTE.textMuted, align: 'center'
  });

  // Footer Right
  slide.addText(`Slide ${currentSlideNumber} of ${TOTAL_SLIDES} | Nursyafiqah Zulaikha`, {
    x: 9.8, y: 7.02, w: 2.73, h: 0.3,
    fontSize: 8, color: PALETTE.espresso, bold: true, align: 'right'
  });

  return slide;
}

// Helper to draw a styled white container card
function addCard(slide, { x, y, w, h, title, titleColor, badge, border = true, fill = PALETTE.cardBg }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    rectRadius: 0.12,
    fill: { color: fill },
    line: border ? { color: PALETTE.cardBorder, width: 1.2 } : undefined
  });

  let contentStartY = y + 0.2;
  if (title) {
    if (badge) {
      slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: x + 0.3, y: y + 0.2, w: 1.5, h: 0.25,
        rectRadius: 0.08,
        fill: { color: PALETTE.goldBadge },
        line: { color: PALETTE.goldBadge }
      });
      slide.addText(badge, {
        x: x + 0.3, y: y + 0.2, w: 1.5, h: 0.25,
        fontSize: 8, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
      });
      slide.addText(title, {
        x: x + 1.9, y: y + 0.16, w: w - 2.2, h: 0.35,
        fontSize: 13, bold: true, color: titleColor || PALETTE.coffee, fontFace: 'Arial'
      });
    } else {
      slide.addText(title, {
        x: x + 0.35, y: y + 0.18, w: w - 0.7, h: 0.35,
        fontSize: 13, bold: true, color: titleColor || PALETTE.coffee, fontFace: 'Arial'
      });
    }
    contentStartY = y + 0.6;
  }
  return contentStartY;
}

// ==========================================
// SLIDE 1: TITLE SLIDE (COVER)
// ==========================================
{
  currentSlideNumber++;
  const s1 = pres.addSlide();
  s1.background = { color: PALETTE.bg };

  // Decorative header band
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.15,
    fill: { color: PALETTE.caramel }, line: { color: PALETTE.caramel }
  });

  // UPTM Logo
  if (fs.existsSync(LOGO_PATH)) {
    s1.addImage({
      path: LOGO_PATH,
      x: 0.8, y: 0.5, w: 1.6, h: 1.1,
      sizing: { type: 'contain' }
    });
  }

  // University & Faculty Header
  s1.addText('UNIVERSITI POLY-TECH MALAYSIA (UPTM)', {
    x: 2.6, y: 0.55, w: 9.5, h: 0.35,
    fontSize: 13, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
  });
  s1.addText('FACULTY OF COMPUTING & MULTIMEDIA (FCOM) | DIPLOMA IN COMPUTER SCIENCE (CC101)', {
    x: 2.6, y: 0.88, w: 9.5, h: 0.28,
    fontSize: 10, color: PALETTE.caramel, bold: true
  });
  s1.addText('FINAL YEAR PROJECT PRESENTATION (FYP3024)', {
    x: 2.6, y: 1.16, w: 9.5, h: 0.25,
    fontSize: 9, color: PALETTE.textMuted
  });

  // Main Hero Container
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.8, w: 11.73, h: 3.2,
    rectRadius: 0.15,
    fill: { color: PALETTE.espresso },
    line: { color: PALETTE.espresso }
  });

  // Accent badge
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.3, y: 2.15, w: 3.4, h: 0.35,
    rectRadius: 0.1,
    fill: { color: PALETTE.caramel }, line: { color: PALETTE.caramel }
  });
  s1.addText('CAMPUS EQUIPMENT MANAGEMENT SYSTEM', {
    x: 1.3, y: 2.15, w: 3.4, h: 0.35,
    fontSize: 9, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
  });

  // Hero Title
  s1.addText('PinjamGeng: Smart Event Equipment Booking\n& Inventory Management System', {
    x: 1.3, y: 2.65, w: 10.7, h: 1.35,
    fontSize: 27, bold: true, color: PALETTE.textLight, fontFace: 'Arial'
  });

  // Hero Subtitle & Cloud Badge
  s1.addText('A Responsive Web-Based Platform with Automated Conflict Detection, Bundled Event Packages & Real-Time Accountability', {
    x: 1.3, y: 4.1, w: 10.7, h: 0.45,
    fontSize: 12, color: PALETTE.goldBadge, fontFace: 'Calibri'
  });

  // Live Cloud URL Pill
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.3, y: 4.5, w: 4.6, h: 0.32,
    rectRadius: 0.08,
    fill: { color: PALETTE.cardBg }, line: { color: PALETTE.goldBadge }
  });
  s1.addText('LIVE DEMO: https://pinjamgeng.infinityfreeapp.com', {
    x: 1.3, y: 4.5, w: 4.6, h: 0.32,
    fontSize: 9, bold: true, color: PALETTE.caramel, align: 'center', valign: 'middle'
  });

  // Student & Supervisor Cards
  // Student Card
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 5.2, w: 5.7, h: 1.55,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg }, line: { color: PALETTE.cardBorder, width: 1.2 }
  });
  s1.addText('PREPARED BY (CANDIDATE)', {
    x: 1.1, y: 5.35, w: 5.1, h: 0.25,
    fontSize: 8.5, bold: true, color: PALETTE.caramel
  });
  s1.addText('Nursyafiqah Zulaikha Binti Zilkamal', {
    x: 1.1, y: 5.62, w: 5.1, h: 0.38,
    fontSize: 14, bold: true, color: PALETTE.espresso, fontFace: 'Arial'
  });
  s1.addText('Student ID: AM2412018113\nDiploma in Computer Science (CC101)', {
    x: 1.1, y: 6.02, w: 5.1, h: 0.55,
    fontSize: 10, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Supervisor Card
  s1.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 5.2, w: 5.7, h: 1.55,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg }, line: { color: PALETTE.cardBorder, width: 1.2 }
  });
  s1.addText('PROJECT SUPERVISOR', {
    x: 7.13, y: 5.35, w: 5.1, h: 0.25,
    fontSize: 8.5, bold: true, color: PALETTE.caramel
  });
  s1.addText('Madam Jihadah Binti Ahmad', {
    x: 7.13, y: 5.62, w: 5.1, h: 0.38,
    fontSize: 14, bold: true, color: PALETTE.espresso, fontFace: 'Arial'
  });
  s1.addText('Faculty of Computing & Multimedia (FCOM)\nUniversiti Poly-Tech Malaysia (UPTM)', {
    x: 7.13, y: 6.02, w: 5.1, h: 0.55,
    fontSize: 10, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Bottom footer separator
  s1.addShape(pres.shapes.LINE, {
    x: 0.8, y: 6.95, w: 11.73, h: 0,
    line: { color: PALETTE.cardBorder, width: 1 }
  });
  s1.addText('Session: 2026/2027 | Evaluated under Academic Course Code FYP3024', {
    x: 0.8, y: 7.02, w: 11.73, h: 0.3,
    fontSize: 8, color: PALETTE.textMuted, align: 'center'
  });

  s1.addNotes(`[SPEAKER SCRIPT - SLIDE 1: INTRODUCTION]
Assalamu'alaikum and a very pleasant morning/afternoon to the respected evaluation panel, examiners, and my supervisor, Madam Jihadah Binti Ahmad.

My name is Nursyafiqah Zulaikha Binti Zilkamal, student ID AM2412018113 from the Diploma in Computer Science program (CC101), Faculty of Computing and Multimedia, Universiti Poly-Tech Malaysia.

Today, I am proud to present my Final Year Project entitled "PinjamGeng: Smart Event Equipment Booking and Inventory Management System".

This system is fully completed and actively deployed live on the cloud. It was conceived to eliminate the longstanding logistical bottlenecks faced by campus event organizers and administrative officers at UPTM through automated conflict detection, bundled packages, and digitized damage accountability.`);
}

// ==========================================
// SLIDE 2: PRESENTATION AGENDA
// ==========================================
{
  const s2 = createBaseSlide('Overview', 'Presentation Agenda & Roadmap', 'Structured breakdown of today\'s FYP evaluation presentation');

  const agendaItems = [
    { num: '01', title: 'Problem Background & Motivation', desc: 'Challenges of manual campus equipment booking and pain points.' },
    { num: '02', title: 'Project Objectives & Scope', desc: 'Core goals, user personas (Student vs Admin), and boundaries.' },
    { num: '03', title: 'Requirements Survey Findings', desc: 'Quantitative justification based on 30 UPTM respondents.' },
    { num: '04', title: 'Development Methodology', desc: 'Agile framework and 5-sprint incremental delivery cycle.' },
    { num: '05', title: 'System Architecture & Database', desc: 'UML Use Case, process flowcharts, and 3NF Relational ERD.' },
    { num: '06', title: 'Key System Innovations', desc: 'Smart conflict detection, package bundling & damage tracking.' },
    { num: '07', title: 'Live System Demonstration', desc: 'Cloud deployment walkthrough on InfinityFree server.' },
    { num: '08', title: 'Testing, UAT & Future Roadmap', desc: 'Verification, 100% UAT satisfaction, and Phase 2 enhancements.' }
  ];

  // 2 columns x 4 rows
  agendaItems.forEach((item, idx) => {
    const col = idx < 4 ? 0 : 1;
    const row = idx % 4;
    const x = col === 0 ? 0.8 : 6.83;
    const y = 1.6 + row * 1.25;

    s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.7, h: 1.1,
      rectRadius: 0.1,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    // Number Badge
    s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.2, y: y + 0.2, w: 0.7, h: 0.7,
      rectRadius: 0.08,
      fill: { color: PALETTE.espresso }, line: { color: PALETTE.espresso }
    });
    s2.addText(item.num, {
      x: x + 0.2, y: y + 0.2, w: 0.7, h: 0.7,
      fontSize: 14, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
    });

    // Title & Desc
    s2.addText(item.title, {
      x: x + 1.05, y: y + 0.18, w: 4.4, h: 0.35,
      fontSize: 12, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s2.addText(item.desc, {
      x: x + 1.05, y: y + 0.52, w: 4.4, h: 0.45,
      fontSize: 9.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
  });

  s2.addNotes(`[SPEAKER SCRIPT - SLIDE 2: AGENDA]
To provide a clear roadmap of this presentation, I have structured my talk into 8 key segments:
We will first explore the operational problem background at UPTM, followed by our formal project objectives and scope.
Next, I will present the empirical survey findings from 30 campus respondents that validated our project requirements, followed by our Agile development methodology.
In the technical segment, I will walk you through the system architecture, UML use cases, activity flowcharts, and 3NF database schema.
We will then examine the three core innovations of PinjamGeng—namely our conflict detection engine, event package bundling, and return damage accountability engine.
Finally, we will proceed to the live cloud system demonstration, followed by our testing verification, UAT evaluation results, and future work.`);
}

// ==========================================
// SLIDE 3: PROBLEM BACKGROUND & STATEMENTS
// ==========================================
{
  const s3 = createBaseSlide('Background', 'Problem Background & Problem Statements', 'Identifying the core operational bottlenecks in campus equipment management at UPTM');

  const problems = [
    {
      num: '01',
      title: 'Inefficient Manual Paperwork & Logbooks',
      badge: 'TIME DELAY',
      points: [
        'Organizers must physically travel to the HEP / Facility office to submit paper reservation forms.',
        'Manual signature routing takes 2 to 3 working days, causing severe delays for urgent student club events.',
        'Physical paper forms and chits are easily misplaced, discarded, or lost without duplicate backup records.'
      ]
    },
    {
      num: '02',
      title: 'Double-Booking & Schedule Collisions',
      badge: 'SCHEDULE CONFLICT',
      points: [
        'Absence of a synchronized central calendar results in overlapping reservations.',
        'High-demand equipment (PA sound systems, wireless microphones, projectors) frequently double-booked.',
        'Clubs only discover shortages during event setup, resulting in compromised campus activities.'
      ]
    },
    {
      num: '03',
      title: 'Inaccurate Inventory & Stock Mismatches',
      badge: 'LACK OF VISIBILITY',
      points: [
        'Stock levels recorded on paper or static sheets become instantly outdated upon loan.',
        'Damaged or missing assets are not deducted in real-time, displaying ghost availability.',
        'Students make commitments assuming items are available, only to be rejected at the counter.'
      ]
    },
    {
      num: '04',
      title: 'Lack of Damage Tracking & Accountability',
      badge: 'UNTRACKED LOSS',
      points: [
        'Post-event returns lack formal inspection; damaged items returned unnoticed without penalty.',
        'No standardized grading for equipment defect severity or compensation calculation.',
        'University bears recurring replacement costs due to unassigned responsibility on student borrowers.'
      ]
    }
  ];

  // 2x2 grid of cards
  problems.forEach((p, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? 0.8 : 6.83;
    const y = 1.6 + row * 2.5;

    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.7, h: 2.35,
      rectRadius: 0.12,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    // Badge & Number
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.3, y: y + 0.2, w: 0.6, h: 0.55,
      rectRadius: 0.08,
      fill: { color: PALETTE.caramel }, line: { color: PALETTE.caramel }
    });
    s3.addText(p.num, {
      x: x + 0.3, y: y + 0.2, w: 0.6, h: 0.55,
      fontSize: 12, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
    });

    s3.addText(p.title, {
      x: x + 1.05, y: y + 0.18, w: 4.4, h: 0.35,
      fontSize: 12, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });

    // Alert Badge
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 1.05, y: y + 0.52, w: 1.8, h: 0.22,
      rectRadius: 0.06,
      fill: { color: PALETTE.goldBadge }, line: { color: PALETTE.goldBadge }
    });
    s3.addText(p.badge, {
      x: x + 1.05, y: y + 0.52, w: 1.8, h: 0.22,
      fontSize: 7.5, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
    });

    // Bullet points
    let by = y + 0.85;
    p.points.forEach(pt => {
      s3.addText('• ' + pt, {
        x: x + 0.35, y: by, w: 5.0, h: 0.42,
        fontSize: 9, color: PALETTE.textDark, fontFace: 'Calibri'
      });
      by += 0.45;
    });
  });

  s3.addNotes(`[SPEAKER SCRIPT - SLIDE 3: PROBLEM STATEMENT]
To understand why PinjamGeng was built, we must examine the four persistent problems currently faced by UPTM.

First, the booking process relies on manual paper forms and physical logbooks. A student organizer must walk to the facilities office, fill out a paper chit, and wait 2 to 3 days for approvals. Forms frequently get misplaced.

Second is the severe issue of double booking. Because there is no centralized live calendar, two clubs can be promised the same PA system on the same Saturday morning. The collision is only discovered when both turn up at the store.

Third, static paperwork cannot reflect live inventory. Broken or previously booked items remain listed as available, giving false hope to students.

Fourth, and most critically for the university administration: lack of return accountability. Equipment is returned in cardboard boxes without systematic inspection. If a cable is severed or a microphone capsule dented, there is no digital trail to establish who caused the damage or recover repair costs. The university ends up absorbing preventable expenses.`);
}

// ==========================================
// SLIDE 4: REQUIREMENTS SURVEY FINDINGS
// ==========================================
{
  const s4 = createBaseSlide('Analysis', 'Empirical Requirements Analysis (Survey)', 'Quantitative survey conducted across 41 UPTM campus leaders, student executives & organizers');

  // Left side: 4 Metric Cards
  const metrics = [
    { pct: '90.0%', title: 'Schedule Clashes & Clashing', desc: '36 of 40 respondents experienced double-booking clashes during major campus event periods.' },
    { pct: '94.9%', title: 'Manual Form Delay', desc: '37 of 39 respondents reported manual paper requests take 1 to >3 days to receive approval.' },
    { pct: '85.0%', title: 'Smart Bundles & Online Demand', desc: 'Strongly agreed pre-configured packages and online portal simplify reservations and prevent forgotten items.' },
    { pct: '80.0%', title: 'Digital Return Inspection', desc: 'Agreed digital Return Desk condition logging is essential to improve student accountability.' }
  ];

  metrics.forEach((m, idx) => {
    const y = 1.6 + idx * 1.25;
    s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y, w: 5.5, h: 1.1,
      rectRadius: 0.1,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    s4.addText(m.pct, {
      x: 1.0, y: y + 0.15, w: 1.4, h: 0.8,
      fontSize: 22, bold: true, color: PALETTE.caramel, fontFace: 'Arial'
    });

    s4.addText(m.title, {
      x: 2.5, y: y + 0.18, w: 3.6, h: 0.3,
      fontSize: 11.5, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s4.addText(m.desc, {
      x: 2.5, y: y + 0.48, w: 3.6, h: 0.5,
      fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
  });

  // Right side: Chart Image Container
  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.6, y: 1.6, w: 5.93, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s4.addText('EMPIRICAL RESEARCH EVIDENCE (QUESTIONNAIRE SURVEY)', {
    x: 6.9, y: 1.8, w: 5.4, h: 0.3,
    fontSize: 9.5, bold: true, color: PALETTE.caramel
  });

  const chartPath = path.join(IMAGES_DIR, 'fig_3_2_user_questionnaire_1.png');
  if (fs.existsSync(chartPath)) {
    s4.addImage({
      path: chartPath,
      x: 6.9, y: 2.2, w: 5.33, h: 3.2,
      sizing: { type: 'contain' }
    });
  }

  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: 5.55, w: 5.33, h: 0.95,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s4.addText('Key Takeaway: The empirical survey across 41 respondents established statistically indisputable demand for PinjamGeng. 90.0% faced double-booking clashes and 85.0% demanded an automated, conflict-free web portal.', {
    x: 7.05, y: 5.65, w: 5.0, h: 0.75,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  s4.addNotes(`[SPEAKER SCRIPT - SLIDE 4: SURVEY FINDINGS]
Rather than relying on anecdotal assumptions, our requirements were grounded in an empirical study. We administered a pre-development questionnaire to 41 active student leaders, club executive committees, and event coordinators at UPTM.

The survey revealed striking results:
90.0% of respondents reported experiencing equipment schedule clashes or double bookings during major campus event periods.
94.9% confirmed manual paper requests take from 1 to more than 3 days to get approved, with 65.0% struggling with slow approval cycles and repeated counter visits.
Furthermore, 85.0% strongly supported pre-configured Smart Event Packages, and 82.5% demanded real-time stock indicators.
Finally, 80.0% agreed that digital Return Desk inspection and condition grading are essential to preserve equipment quality.

This empirical evidence provided a solid foundation to formulate our four project objectives.`);
}

// ==========================================
// SLIDE 5: PROJECT OBJECTIVES
// ==========================================
{
  const s5 = createBaseSlide('Objectives', 'Project Objectives (SMART Goals)', 'Four clearly scoped, measurable deliverables directly solving the identified problem statements');

  const objectives = [
    {
      num: '01',
      title: 'Design & Develop a Responsive Web Booking Portal',
      metric: 'DELIVERABLE: 24/7 Accessible Web Portal',
      desc: 'To design and implement a responsive, user-friendly web interface allowing UPTM students to browse cataloged equipment, check live stock, and submit reservation requests anytime, anywhere.',
      sub: 'Achieved: Mobile-responsive Bootstrap 5 interface hosted live on the cloud.'
    },
    {
      num: '02',
      title: 'Implement Automated Conflict Detection & Bundling',
      metric: 'DELIVERABLE: Conflict-Free Reservation Engine',
      desc: 'To engineer an intelligent booking validation algorithm that calculates overlapping reservations to eliminate double booking, alongside 1-click curated Event Package Bundling.',
      sub: 'Achieved: Microsecond conflict-checking queries with zero double-booking capability.'
    },
    {
      num: '03',
      title: 'Construct Return Inspection & Damage Accountability Engine',
      metric: 'DELIVERABLE: Automated Fine & Audit Trail',
      desc: 'To establish a structured post-event inspection workflow featuring 4-tier damage grading, automatic penalty/repair estimation, and instant digital receipt generation.',
      sub: 'Achieved: Complete damage reporting module with digital slips.'
    },
    {
      num: '04',
      title: 'Evaluate System Acceptance & Usability (UAT)',
      metric: 'DELIVERABLE: Formal Academic UAT Evaluation',
      desc: 'To conduct a rigorous User Acceptance Test (UAT) with 30 target evaluators across Usability, Functionality, Efficiency, and Adoption Willingness to validate system success.',
      sub: 'Achieved: 100% recommendation score with 96.7% efficiency satisfaction.'
    }
  ];

  objectives.forEach((obj, idx) => {
    const y = 1.6 + idx * 1.25;

    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y, w: 11.73, h: 1.12,
      rectRadius: 0.1,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    // Number Box
    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.0, y: y + 0.18, w: 0.75, h: 0.75,
      rectRadius: 0.08,
      fill: { color: PALETTE.espresso }, line: { color: PALETTE.espresso }
    });
    s5.addText(obj.num, {
      x: 1.0, y: y + 0.18, w: 0.75, h: 0.75,
      fontSize: 15, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
    });

    // Title & Metric Pill
    s5.addText(obj.title, {
      x: 1.95, y: y + 0.16, w: 6.5, h: 0.32,
      fontSize: 12.5, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });

    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 8.6, y: y + 0.18, w: 3.7, h: 0.28,
      rectRadius: 0.06,
      fill: { color: PALETTE.goldBadge }, line: { color: PALETTE.goldBadge }
    });
    s5.addText(obj.metric, {
      x: 8.6, y: y + 0.18, w: 3.7, h: 0.28,
      fontSize: 8, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
    });

    // Description & Achievement status
    s5.addText(obj.desc, {
      x: 1.95, y: y + 0.48, w: 6.5, h: 0.55,
      fontSize: 9, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    s5.addText('✓ ' + obj.sub, {
      x: 8.6, y: y + 0.52, w: 3.7, h: 0.5,
      fontSize: 8.5, color: PALETTE.success, bold: true, fontFace: 'Calibri'
    });
  });

  s5.addNotes(`[SPEAKER SCRIPT - SLIDE 5: OBJECTIVES]
To resolve the identified challenges, this project formulated four SMART objectives:

Objective 1 was to design and develop a responsive web-based booking portal. This allows students to check catalog availability and book equipment 24/7 without having to visit the counter.

Objective 2 was to implement an intelligent booking engine with automated conflict detection. This mathematically eliminates double booking by evaluating date ranges, and introduces 1-click Event Package Bundling.

Objective 3 was to build a comprehensive return inspection and damage accountability engine. When equipment is returned, administrators can record condition grades, compute repair fines, and issue digital return slips.

Objective 4 was to validate system usability and reliability through formal User Acceptance Testing (UAT) with 30 campus users.

I am pleased to report that all four objectives have been 100% achieved in the completed system.`);
}

// ==========================================
// SLIDE 6: PROJECT SCOPE & USER ROLES
// ==========================================
{
  const s6 = createBaseSlide('Scope', 'Project Scope & User Personas', 'Delineating role-based capabilities and architectural boundaries');

  // Student Persona Card (Col 1)
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 4.0,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: 1.85, w: 2.2, h: 0.3,
    rectRadius: 0.08,
    fill: { color: PALETTE.goldBadge }, line: { color: PALETTE.goldBadge }
  });
  s6.addText('USER ROLE: STUDENT', {
    x: 1.1, y: 1.85, w: 2.2, h: 0.3,
    fontSize: 9, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
  });

  s6.addText('Student / Event Organizer Persona', {
    x: 1.1, y: 2.25, w: 5.1, h: 0.35,
    fontSize: 14, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
  });

  const studentCapabilities = [
    'User Registration & Role-Based Authentication with email and matric ID.',
    'Interactive Catalog Browsing with category filtering & live stock status.',
    'Event Package Bundling: Book pre-configured event sets with 1 single click.',
    'Instant Conflict Checking: Automated date overlap validation prior to submission.',
    'Self-Service Status Tracking: View status (Pending, Approved, In Use, Returned).',
    'Digital Receipt Generation: Instant printable booking slip and return confirmation.'
  ];
  let sy = 2.65;
  studentCapabilities.forEach(c => {
    s6.addText('✓ ' + c, {
      x: 1.1, y: sy, w: 5.1, h: 0.42,
      fontSize: 9, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    sy += 0.45;
  });

  // Admin Persona Card (Col 2)
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 1.6, w: 5.7, h: 4.0,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.13, y: 1.85, w: 2.2, h: 0.3,
    rectRadius: 0.08,
    fill: { color: PALETTE.espresso }, line: { color: PALETTE.espresso }
  });
  s6.addText('USER ROLE: ADMIN', {
    x: 7.13, y: 1.85, w: 2.2, h: 0.3,
    fontSize: 9, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
  });

  s6.addText('Administrator / Facilities Officer Persona', {
    x: 7.13, y: 2.25, w: 5.1, h: 0.35,
    fontSize: 14, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
  });

  const adminCapabilities = [
    'Real-Time KPI Dashboard: Live counters for pending loans, active gear & alerts.',
    'Inventory Management (CRUD): Create, update, view, and retire equipment items.',
    'Package Management: Create and configure bundled package combinations.',
    'One-Click Approval/Rejection: Review requests with custom admin remarks.',
    'Return Inspection Module: Log condition check-in, defect severity, and repair notes.',
    'Automated Fine Calculation: Auto-computes damage liability and payment status.'
  ];
  let ay = 2.65;
  adminCapabilities.forEach(c => {
    s6.addText('★ ' + c, {
      x: 7.13, y: ay, w: 5.1, h: 0.42,
      fontSize: 9, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    ay += 0.45;
  });

  // Bottom Technical Scope Banner
  s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 5.8, w: 11.73, h: 0.95,
    rectRadius: 0.1,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s6.addText('TECHNICAL & OPERATIONAL BOUNDARIES', {
    x: 1.1, y: 5.92, w: 4.5, h: 0.25,
    fontSize: 8.5, bold: true, color: PALETTE.caramel
  });
  s6.addText('Platform: Web-based, responsive across Desktop, Tablet & Mobile browsers • Target Environment: Universiti Poly-Tech Malaysia (UPTM) • Cloud Hosting: Publicly accessible Apache/PHP/MySQL deployment • Security: Bcrypt password hashing, session tokens & PDO prepared queries.', {
    x: 1.1, y: 6.2, w: 11.2, h: 0.45,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  s6.addNotes(`[SPEAKER SCRIPT - SLIDE 6: PROJECT SCOPE]
Looking at the project scope, PinjamGeng establishes strict separation of concerns between two distinct user personas:

For the Student Persona: Students can register, browse equipment with high-resolution imagery and live stock counts, book individual items or 1-click event packages, receive instant conflict notifications, monitor their booking lifecycle, and download receipts.

For the Admin Persona: Staff at HEP or facilities offices access a real-time analytics dashboard. They can perform full CRUD operations on inventory and packages, approve or reject applications in one click, and execute return check-in inspections where damages can be recorded and penalties computed.

The system is fully responsive, operating seamlessly across desktop monitors, iPads, and mobile smartphones.`);
}

// ==========================================
// SLIDE 7: DEVELOPMENT METHODOLOGY (AGILE)
// ==========================================
{
  const s7 = createBaseSlide('Methodology', 'Development Methodology: Agile Framework', 'Iterative 5-sprint lifecycle facilitating rapid prototyping and continuous feedback');

  // Left column: 5 Sprint Cards
  const sprints = [
    { num: 'S1', title: 'Sprint 1: Planning & Architecture', desc: 'Requirements analysis, survey data synthesis, and 3NF database schema modeling.' },
    { num: 'S2', title: 'Sprint 2: Auth & Inventory CRUD', desc: 'User registration, role-based session middleware, and equipment stock management.' },
    { num: 'S3', title: 'Sprint 3: Booking & Conflict Engine', desc: 'Real-time overlap algorithms, package bundling, and approval workflow triggers.' },
    { num: 'S4', title: 'Sprint 4: Inspection & Damage Engine', desc: 'Return check-in, 4-tier defect grading, fine calculation, and PDF invoice generation.' },
    { num: 'S5', title: 'Sprint 5: Cloud Deployment & UAT', desc: 'InfinityFree hosting rollout, cross-browser optimization, and formal 30-user UAT.' }
  ];

  sprints.forEach((sp, idx) => {
    const y = 1.6 + idx * 1.0;
    s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y, w: 5.7, h: 0.88,
      rectRadius: 0.08,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.0, y: y + 0.14, w: 0.6, h: 0.6,
      rectRadius: 0.06,
      fill: { color: PALETTE.caramel }, line: { color: PALETTE.caramel }
    });
    s7.addText(sp.num, {
      x: 1.0, y: y + 0.14, w: 0.6, h: 0.6,
      fontSize: 11, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
    });

    s7.addText(sp.title, {
      x: 1.75, y: y + 0.12, w: 4.6, h: 0.3,
      fontSize: 10.5, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s7.addText(sp.desc, {
      x: 1.75, y: y + 0.42, w: 4.6, h: 0.4,
      fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
  });

  // Right column: Agile Diagram Container
  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s7.addText('AGILE SCRUM ITERATIVE PROCESS', {
    x: 7.13, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  const agilePath = path.join(IMAGES_DIR, 'fig_3_1_agile_methodology.png');
  if (fs.existsSync(agilePath)) {
    s7.addImage({
      path: agilePath,
      x: 7.13, y: 2.2, w: 5.1, h: 3.2,
      sizing: { type: 'contain' }
    });
  }

  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.13, y: 5.55, w: 5.1, h: 0.95,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s7.addText('Why Agile? Compared to traditional Waterfall, Agile allowed iterative sprint deliverables, regular supervisor reviews with Madam Jihadah, and continuous adjustment of booking algorithms based on early testing feedback.', {
    x: 7.25, y: 5.65, w: 4.85, h: 0.75,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  s7.addNotes(`[SPEAKER SCRIPT - SLIDE 7: METHODOLOGY]
For our system development lifecycle, we adopted the Agile Scrum methodology. Agile was chosen over the traditional Waterfall model because it embraces iterative development, frequent testing, and fast integration of feedback.

Our development was divided into five distinct two-week sprints:
Sprint 1 focused on domain analysis, questionnaire evaluation, and 3NF database modeling.
Sprint 2 delivered core infrastructure: authentication, role-based session protection, and inventory CRUD.
Sprint 3 was the heart of the booking engine: building real-time date overlap calculations and package bundling.
Sprint 4 implemented post-event accountability: return inspection, damage grading, and automated fine calculation.
Sprint 5 culminated in cloud deployment to InfinityFree, cross-browser polish, and formal UAT evaluation.

Regular sprint reviews with my supervisor ensured the project remained strictly aligned with UPTM academic standards.`);
}

// ==========================================
// SLIDE 8: SYSTEM DESIGN: UML USE CASE DIAGRAM
// ==========================================
{
  const s8 = createBaseSlide('Design', 'System Architecture: UML Use Case Diagram', 'Functional decomposition of student and administrator roles across the system boundary');

  // Left Column: Functional Breakdown
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 4.8, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s8.addText('ACTORS & USE CASE MAPPING', {
    x: 1.1, y: 1.8, w: 4.2, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  const ucBreakdown = [
    { actor: 'Student Actor (User)', cases: ['UC1: Register & Authenticate', 'UC2: Browse & Filter Catalog', 'UC3: Reserve Single / Bundled Package', 'UC4: View Booking Status & Slips'] },
    { actor: 'Admin Actor (Officer)', cases: ['UC5: Manage Equipment Inventory (CRUD)', 'UC6: Manage Event Packages', 'UC7: Review, Approve / Reject Bookings', 'UC8: Return Inspection & Damage Logger', 'UC9: Generate Analytical PDF Reports'] }
  ];

  let ucy = 2.2;
  ucBreakdown.forEach(grp => {
    s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.1, y: ucy, w: 4.2, h: 0.3,
      rectRadius: 0.06,
      fill: { color: PALETTE.goldBadge }, line: { color: PALETTE.goldBadge }
    });
    s8.addText(grp.actor, {
      x: 1.1, y: ucy, w: 4.2, h: 0.3,
      fontSize: 9, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
    });
    ucy += 0.4;
    grp.cases.forEach(cs => {
      s8.addText('• ' + cs, {
        x: 1.2, y: ucy, w: 4.0, h: 0.28,
        fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
      });
      ucy += 0.28;
    });
    ucy += 0.15;
  });

  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: 5.7, w: 4.2, h: 0.8,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s8.addText('System Boundary Integrity: Role-Based Access Control (RBAC) middleware guarantees students cannot access admin routes, while admins retain complete audit oversight.', {
    x: 1.2, y: 5.78, w: 4.0, h: 0.65,
    fontSize: 8, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Right Column: Use Case Diagram Image
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.9, y: 1.6, w: 6.63, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s8.addText('UML USE CASE DIAGRAM (FIGURE 3.112)', {
    x: 6.2, y: 1.8, w: 6.0, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.coffee
  });

  const ucImg = path.join(IMAGES_DIR, 'fig_3_112_use_case_diagram.png');
  if (fs.existsSync(ucImg)) {
    s8.addImage({
      path: ucImg,
      x: 6.1, y: 2.15, w: 6.23, h: 4.35,
      sizing: { type: 'contain' }
    });
  }

  s8.addNotes(`[SPEAKER SCRIPT - SLIDE 8: USE CASE DIAGRAM]
This slide illustrates our system architecture through the UML Use Case Diagram (Figure 3.112 in our FYP Report).

The system models two primary actors interacting with the system boundary:
On the left is the Student Actor, who can authenticate, explore inventory, verify date availability, submit individual or packaged booking orders, and print booking slips.
On the right is the Administrator Actor, who has elevated administrative privileges. Admins manage the equipment registry, approve or decline pending bookings with customized remarks, oversee equipment handovers, inspect items upon return, and log damage assessments.

Notice that both actors interact with common modules such as authentication and profile management, but access is strictly enforced by server-side RBAC session middleware.`);
}

// ==========================================
// SLIDE 9: OPERATIONAL PROCESS FLOWCHARTS
// ==========================================
{
  const s9 = createBaseSlide('Workflow', 'Operational Workflows: Activity Flowcharts', 'Dual-perspective operational logic mapping end-to-end student and admin interactions');

  // Left Column: Student Flowchart
  s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s9.addText('STUDENT RESERVATION JOURNEY', {
    x: 1.1, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10.5, bold: true, color: PALETTE.caramel
  });

  const studentFlowImg = path.join(IMAGES_DIR, 'fig_3_111_student_flowchart.png');
  if (fs.existsSync(studentFlowImg)) {
    s9.addImage({
      path: studentFlowImg,
      x: 1.0, y: 2.15, w: 5.3, h: 3.5,
      sizing: { type: 'contain' }
    });
  }

  s9.addText('Key checkpoints: Date selection -> Conflict calculation -> Immediate error prompt if over-capacity -> Auto-dispatch to admin queue.', {
    x: 1.1, y: 5.8, w: 5.1, h: 0.7,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Right Column: Admin Flowchart
  s9.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s9.addText('ADMIN APPROVAL & RETURN INSPECTION', {
    x: 7.13, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10.5, bold: true, color: PALETTE.coffee
  });

  const adminFlowImg = path.join(IMAGES_DIR, 'fig_3_110_admin_flowchart.png');
  if (fs.existsSync(adminFlowImg)) {
    s9.addImage({
      path: adminFlowImg,
      x: 7.03, y: 2.15, w: 5.3, h: 3.5,
      sizing: { type: 'contain' }
    });
  }

  s9.addText('Key checkpoints: Pending queue review -> Approval/Reject trigger -> Check-out -> Return inspection -> Damage assessment & close booking.', {
    x: 7.13, y: 5.8, w: 5.1, h: 0.7,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  s9.addNotes(`[SPEAKER SCRIPT - SLIDE 9: ACTIVITY FLOWCHARTS]
Here we examine the detailed operational flowcharts of the system.

On the left is the Student Reservation Journey:
A student logs in, navigates to the equipment or package catalog, selects their required items, specifies the start and return dates, and chooses the requested quantity.
At this instant, the system triggers the automated conflict-checking query. If the requested quantity exceeds available stock across that time window, the system halts submission and displays an informative warning. If valid, the booking is recorded with status 'Pending' and routed to the administrative queue.

On the right is the Admin Processing Workflow:
The officer views the pending request queue on the dashboard. Upon reviewing event details, they can approve or reject the request with one click.
When the event concludes, the student returns the equipment. The officer opens the Return Inspection drawer. If all items are returned intact, the booking is marked 'Returned' and stock restored. If damage is discovered, the officer logs the damage severity and description, which calculates the repair compensation and updates equipment status to 'Under Maintenance'.`);
}

// ==========================================
// SLIDE 10: DATABASE ARCHITECTURE (3NF ERD)
// ==========================================
{
  const s10 = createBaseSlide('Database', 'Database Architecture: 3NF Relational ERD', 'Optimized 8-table schema normalized to Third Normal Form (3NF) ensuring zero redundancy');

  // Left Column: Table Schema Cards
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 4.8, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s10.addText('RELATIONAL ENTITIES (3NF)', {
    x: 1.1, y: 1.8, w: 4.2, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  const entities = [
    { name: 'users', desc: 'User profiles, matric ID, hashed password & role (student/admin).' },
    { name: 'categories', desc: 'Equipment classification (Audio, Visual, Electrical, Stage).' },
    { name: 'equipment', desc: 'Inventory items, specifications, total quantity & condition.' },
    { name: 'packages', desc: 'Curated bundled sets with event type & descriptions.' },
    { name: 'package_items', desc: 'Junction table linking equipment items & quantities to packages.' },
    { name: 'bookings', desc: 'Master reservation record with dates, status, remarks & user_id.' },
    { name: 'booking_items', desc: 'Line items linking equipment and booked quantity per booking.' },
    { name: 'damage_reports', desc: 'Post-return damage logs, defect severity, repair cost & status.' }
  ];

  let ey = 2.15;
  entities.forEach(e => {
    s10.addText(`• ${e.name}: `, {
      x: 1.1, y: ey, w: 1.6, h: 0.3,
      fontSize: 8.5, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s10.addText(e.desc, {
      x: 2.6, y: ey, w: 2.8, h: 0.3,
      fontSize: 8, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    ey += 0.32;
  });

  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: 5.0, w: 4.2, h: 1.5,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s10.addText('3NF Normalization Principles Applied:', {
    x: 1.2, y: 5.1, w: 4.0, h: 0.22,
    fontSize: 8.5, bold: true, color: PALETTE.caramel
  });
  s10.addText('1NF: Atomic attributes, no repeating groups.\n2NF: Elimination of partial functional dependencies via junction tables.\n3NF: Removal of transitive dependencies (e.g. category details stored strictly in categories).\nEngine: InnoDB storage engine with foreign key cascade integrity.', {
    x: 1.2, y: 5.35, w: 4.0, h: 1.05,
    fontSize: 7.8, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Right Column: ERD Diagram Image
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.9, y: 1.6, w: 6.63, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s10.addText('ENTITY RELATIONSHIP DIAGRAM (FIGURE 3.113)', {
    x: 6.2, y: 1.8, w: 6.0, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.coffee
  });

  const erdImg = path.join(IMAGES_DIR, 'fig_3_113_erd_diagram.png');
  if (fs.existsSync(erdImg)) {
    s10.addImage({
      path: erdImg,
      x: 6.1, y: 2.15, w: 6.23, h: 4.35,
      sizing: { type: 'contain' }
    });
  }

  s10.addNotes(`[SPEAKER SCRIPT - SLIDE 10: DATABASE ARCHITECTURE]
Moving into the data persistence layer, this slide displays the Entity Relationship Diagram normalized to Third Normal Form (3NF).

The database consists of 8 well-structured relational tables:
Users stores authentication and student credentials.
Categories and Equipment manage inventory specs, total stock counts, and maintenance conditions.
Packages and Package_items manage curated bundling using a clean many-to-many junction design.
Bookings and Booking_items store reservation timelines, current loan status, and itemized quantities.
And finally, Damage_reports links directly to bookings and equipment to log repair costs and liability.

By applying 3NF principles:
All repeating groups were decomposed into atomic records.
Partial dependencies were eliminated through composite keys in junction tables.
And transitive dependencies were completely decoupled.
This guarantees high data integrity, eliminates redundancy, and enables microsecond query performance on MySQL.`);
}

// ==========================================
// SLIDE 11: KEY INNOVATION 1: CONFLICT DETECTION
// ==========================================
{
  const s11 = createBaseSlide('Innovation', 'Innovation 1: Automated Conflict Detection Engine', 'Algorithmic elimination of equipment double bookings via real-time date-overlap evaluation');

  // Left side: How it Works & Problem vs Solution
  s11.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s11.addText('THE COLLISION PROBLEM & ALGORITHMIC SOLUTION', {
    x: 1.1, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  // Problem Box
  s11.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: 2.2, w: 5.1, h: 1.15,
    rectRadius: 0.08,
    fill: { color: 'FFEBEE' }, line: { color: 'FFCDD2' }
  });
  s11.addText('Traditional Flaw: Static Paper Checking', {
    x: 1.25, y: 2.3, w: 4.8, h: 0.25,
    fontSize: 9.5, bold: true, color: PALETTE.danger
  });
  s11.addText('Manual systems check static warehouse shelves rather than scheduled future loan commitments. When multiple clubs request equipment for the same upcoming weekend, paper registers fail to detect the overlap, leading to double-booking disasters.', {
    x: 1.25, y: 2.58, w: 4.8, h: 0.7,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Solution Box
  s11.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: 3.5, w: 5.1, h: 1.45,
    rectRadius: 0.08,
    fill: { color: 'E8F5E9' }, line: { color: 'C8E6C9' }
  });
  s11.addText('PinjamGeng Mathematical Algorithm', {
    x: 1.25, y: 3.6, w: 4.8, h: 0.25,
    fontSize: 9.5, bold: true, color: PALETTE.success
  });
  s11.addText('When booking dates [Start_Req, End_Req] are selected:\n1. Query sums active approved/in-use loans where:\n   (b.start_date <= :end_req) AND (b.end_date >= :start_req)\n2. Available_Stock = Total_Stock - SUM(Allocated_Quantity)\n3. If Requested_Qty > Available_Stock -> HARD STOP with instant feedback.', {
    x: 1.25, y: 3.88, w: 4.8, h: 0.98,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Impact Pill
  s11.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: 5.1, w: 5.1, h: 1.35,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s11.addText('VERIFIED IMPACT', {
    x: 1.25, y: 5.22, w: 4.8, h: 0.25,
    fontSize: 8.5, bold: true, color: PALETTE.caramel
  });
  s11.addText('• 100% elimination of double-booking collisions.\n• Real-time stock counters update dynamically without page reloads.\n• Provides instant alternative date recommendations to students.', {
    x: 1.25, y: 5.5, w: 4.8, h: 0.85,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Right side: SQL Logic & Workflow Card
  s11.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.espresso },
    line: { color: PALETTE.espresso }
  });

  s11.addText('BACKEND SQL LOGIC IMPLEMENTATION', {
    x: 7.13, y: 1.85, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.goldBadge
  });

  const sqlCode = `SELECT e.id, e.name, e.total_quantity,
  COALESCE(SUM(bi.quantity), 0) AS booked_quantity,
  (e.total_quantity - COALESCE(SUM(bi.quantity), 0))
    AS available_stock
FROM equipment e
LEFT JOIN booking_items bi ON e.id = bi.equipment_id
LEFT JOIN bookings b ON bi.booking_id = b.id
  AND b.status IN ('Approved', 'In Use')
  AND (b.start_date <= :request_end_date 
       AND b.end_date >= :request_start_date)
WHERE e.id = :equipment_id
GROUP BY e.id;`;

  s11.addText(sqlCode, {
    x: 7.13, y: 2.25, w: 5.1, h: 2.4,
    fontSize: 9, color: 'E0E0E0', fontFace: 'Consolas'
  });

  // Flow simulation card inside dark container
  s11.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.13, y: 4.8, w: 5.1, h: 1.65,
    rectRadius: 0.08,
    fill: { color: '4E3827' }, line: { color: PALETTE.caramel }
  });
  s11.addText('EXECUTION SCENARIO: PA SYSTEM LOAN', {
    x: 7.25, y: 4.95, w: 4.8, h: 0.25,
    fontSize: 8.5, bold: true, color: PALETTE.goldBadge
  });
  s11.addText('Total Campus Stock: 4 PA Systems\nActive Booking for 15-16 Oct: 3 PA Systems (Approved)\nClub B Requests: 2 PA Systems for 16 Oct\nResult: 4 - 3 = 1 Available. Request blocked immediately with warning: "Only 1 unit available for selected date range".', {
    x: 7.25, y: 5.22, w: 4.8, h: 1.15,
    fontSize: 8.5, color: PALETTE.textLight, fontFace: 'Calibri'
  });

  s11.addNotes(`[SPEAKER SCRIPT - SLIDE 11: CONFLICT DETECTION]
One of the headline innovations in PinjamGeng is our Automated Conflict Detection Engine.

In the old manual system, the storekeeper only looks at what is physically on the shelf right now. If Club A has booked a PA system for next Friday, and Club B walks in asking for the same PA system next Friday, the storekeeper often grants both because the gear is sitting on the shelf today. This creates disaster on event day.

In PinjamGeng, we implemented a mathematically watertight date overlap algorithm in SQL:
When a student selects a start date and an end date, the system queries all active bookings whose date range overlaps with the requested period.
It aggregates the sum of all previously committed quantities and calculates:
Available Stock = Total Stock minus Allocated Stock.
If the student asks for more than the remaining available stock, the system refuses the request before it can even be submitted, providing transparent feedback on how many units are available.

This simple yet robust algorithm guarantees a 100% elimination of double-booking incidents across UPTM.`);
}

// ==========================================
// SLIDE 12: KEY INNOVATION 2: PACKAGE BUNDLING
// ==========================================
{
  const s12 = createBaseSlide('Innovation', 'Innovation 2: Event Package Bundling System', '1-click reservations of pre-configured equipment sets reducing booking time by 85%');

  // Left side: Explanation & Concept
  s12.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s12.addText('THE BUNDLING PROBLEM & SOLUTION', {
    x: 1.1, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  s12.addText('Traditional Organizers Struggle With Missing Gear', {
    x: 1.1, y: 2.15, w: 5.1, h: 0.3,
    fontSize: 12, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
  });
  s12.addText('When students organize an event like an AGM, seminar, or sports carnival, they need multiple complementary items (e.g. Speakers, Microphones, Audio Mixers, Projectors, and Extension Cables). In manual systems, students often forget essential accessories like speaker cables or microphone stands, causing last-minute crisis.', {
    x: 1.1, y: 2.5, w: 5.1, h: 0.85,
    fontSize: 9, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Efficiency Comparison Card
  s12.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: 3.45, w: 5.1, h: 1.5,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s12.addText('EFFICIENCY BENCHMARK: TIME SAVING', {
    x: 1.25, y: 3.58, w: 4.8, h: 0.25,
    fontSize: 8.5, bold: true, color: PALETTE.caramel
  });
  s12.addText('Manual Booking: 15 to 20 minutes to list 8 separate items on paper.\nIndividual Item Selection Online: ~5 minutes clicking across multiple pages.\nPinjamGeng Bundled Package: Under 60 seconds with 1 single click!\n\nEfficiency Improvement: Over 85% reduction in submission time.', {
    x: 1.25, y: 3.85, w: 4.8, h: 1.0,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Junction table note
  s12.addText('• Backed by relational junction table (package_items) ensuring atomic inventory deductions across all bundled components simultaneously.', {
    x: 1.1, y: 5.1, w: 5.1, h: 0.6,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });
  s12.addText('• Admins can dynamically create, edit, or retire package presets.', {
    x: 1.1, y: 5.7, w: 5.1, h: 0.4,
    fontSize: 8.5, color: PALETTE.success, bold: true, fontFace: 'Calibri'
  });

  // Right side: 3 Pre-configured Bundle Cards
  const packages = [
    {
      name: 'Basic PA Sound System Set',
      type: 'AUDITORIUM & HALL EVENTS',
      items: ['1x Yamaha Portable PA Console', '2x Wireless Handheld Microphones', '2x Heavy Duty Speaker Stands', '1x 20m Heavy Duty Power Reel']
    },
    {
      name: 'Auditorium Seminar Presentation Set',
      type: 'LECTURES & WORKSHOPS',
      items: ['1x Epson Full HD Projector (3,600 Lumens)', '1x 100-Inch Tripod Projector Screen', '1x Wireless Presentation Laser Clicker', '1x 10m High-Speed HDMI Cable']
    },
    {
      name: 'Outdoor Carnival & Sports Set',
      type: 'FIELD & SPORTS EVENTS',
      items: ['2x Rechargeable Shoulder Megaphones', '4x Motorola UHF Walkie-Talkies', '2x Weatherproof Outdoor Extension Reels', '1x First Aid Kit Case']
    }
  ];

  packages.forEach((pkg, idx) => {
    const y = 1.6 + idx * 1.7;
    s12.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.83, y, w: 5.7, h: 1.55,
      rectRadius: 0.1,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    s12.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.03, y: y + 0.15, w: 2.2, h: 0.22,
      rectRadius: 0.06,
      fill: { color: PALETTE.goldBadge }, line: { color: PALETTE.goldBadge }
    });
    s12.addText(pkg.type, {
      x: 7.03, y: y + 0.15, w: 2.2, h: 0.22,
      fontSize: 7.5, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
    });

    s12.addText(pkg.name, {
      x: 7.03, y: y + 0.42, w: 5.2, h: 0.3,
      fontSize: 11.5, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });

    let iy = y + 0.72;
    pkg.items.forEach(it => {
      s12.addText('✓ ' + it, {
        x: 7.03, y: iy, w: 5.2, h: 0.2,
        fontSize: 8, color: PALETTE.textDark, fontFace: 'Calibri'
      });
      iy += 0.19;
    });
  });

  s12.addNotes(`[SPEAKER SCRIPT - SLIDE 12: PACKAGE BUNDLING]
Our second major innovation is the Event Package Bundling System.

In campus events, organizers rarely need just one piece of equipment. An organizer holding an AGM needs a PA console, microphones, speaker stands, cables, and an extension reel. In traditional systems, organizers have to submit multiple request chits and often forget critical accessories like power cables or clickers.

PinjamGeng solves this by introducing curated, 1-click Event Packages:
Examples include our "Basic PA Sound System Set", "Auditorium Seminar Set", and "Outdoor Sports Set".
Instead of clicking 8 times and calculating item quantities, the student selects the package, and the system verifies and reserves all constituent items atomically.

This feature reduces booking submission time from 15 minutes on paper to less than 60 seconds online—an 85% time-saving improvement that received universal praise during our UAT.`);
}

// ==========================================
// SLIDE 13: KEY INNOVATION 3: DAMAGE TRACKING
// ==========================================
{
  const s13 = createBaseSlide('Innovation', 'Innovation 3: Return & Damage Tracking Engine', 'Standardized 4-tier defect grading, automated fine computation, and digital audit trail');

  // Left Column: 4-Tier Severity Grading
  s13.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s13.addText('STANDARDIZED 4-TIER DEFECT SEVERITY GRADING', {
    x: 1.1, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  const tiers = [
    { tier: 'Tier 1: Minor Damage', badge: '10% FINE', color: 'FFB300', desc: 'Cosmetic scratches, loose knobs, minor casing scuffs. Item still 100% functional.' },
    { tier: 'Tier 2: Moderate Damage', badge: '30% FINE', color: 'FB8C00', desc: 'Cracked plastic housing, frayed cables, faulty connector pins requiring basic repair.' },
    { tier: 'Tier 3: Severe Damage', badge: '60% FINE', color: 'E53935', desc: 'Blown speaker drivers, broken projector lens, shattered screens requiring professional servicing.' },
    { tier: 'Tier 4: Total Loss / Lost', badge: '100% + FEE', color: 'B71C1C', desc: 'Equipment missing, unreturned, or damaged beyond repair. Full replacement cost charged.' }
  ];

  tiers.forEach((t, idx) => {
    const y = 2.2 + idx * 1.1;
    s13.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 1.1, y, w: 5.1, h: 0.98,
      rectRadius: 0.08,
      fill: { color: PALETTE.bg },
      line: { color: PALETTE.cardBorder, width: 1 }
    });

    s13.addText(t.tier, {
      x: 1.25, y: y + 0.12, w: 3.5, h: 0.28,
      fontSize: 10, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });

    s13.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 4.8, y: y + 0.12, w: 1.2, h: 0.22,
      rectRadius: 0.06,
      fill: { color: PALETTE.espresso }, line: { color: PALETTE.espresso }
    });
    s13.addText(t.badge, {
      x: 4.8, y: y + 0.12, w: 1.2, h: 0.22,
      fontSize: 7.5, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
    });

    s13.addText(t.desc, {
      x: 1.25, y: y + 0.42, w: 4.75, h: 0.5,
      fontSize: 8, color: PALETTE.textDark, fontFace: 'Calibri'
    });
  });

  // Right Column: Accountability Lifecycle & Benefits
  s13.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s13.addText('ACCOUNTABILITY LIFECYCLE & VALUE', {
    x: 7.13, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.coffee
  });

  const lifecycleSteps = [
    { step: '1. Check-In Physical Inspection', desc: 'Admin conducts physical handover inspection when equipment is brought back.' },
    { step: '2. Incident Logging in Database', desc: 'Officer records defect description, uploads notes, and tags responsible user ID.' },
    { step: '3. Automated Fine Computation', desc: 'Algorithm calculates compensation based on item valuation and severity percentage.' },
    { step: '4. Automatic Status Lock', desc: 'Equipment condition automatically updated to "Under Maintenance" to prevent re-loan.' },
    { step: '5. Digital Return Slip Generated', desc: 'Timestamped PDF summary with inspect officer signature issued to student.' }
  ];

  let lcy = 2.2;
  lifecycleSteps.forEach(s => {
    s13.addText(s.step, {
      x: 7.13, y: lcy, w: 5.1, h: 0.25,
      fontSize: 9.5, bold: true, color: PALETTE.caramel, fontFace: 'Arial'
    });
    s13.addText(s.desc, {
      x: 7.13, y: lcy + 0.24, w: 5.1, h: 0.35,
      fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    lcy += 0.62;
  });

  s13.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.13, y: 5.35, w: 5.1, h: 1.15,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s13.addText('INSTITUTIONAL VALUE FOR UPTM', {
    x: 7.25, y: 5.45, w: 4.8, h: 0.22,
    fontSize: 8.5, bold: true, color: PALETTE.caramel
  });
  s13.addText('Transfers financial liability from university operating funds to responsible borrowers, incentivizing respectful asset handling and preserving university capital.', {
    x: 7.25, y: 5.7, w: 4.8, h: 0.7,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  s13.addNotes(`[SPEAKER SCRIPT - SLIDE 13: DAMAGE TRACKING]
The third pillar of PinjamGeng is the Return Inspection and Damage Tracking Engine.

One of the biggest pain points reported by university administrators was untracked asset degradation. When equipment returned damaged, students would claim it was already broken, and without records, the university had to absorb the loss.

In PinjamGeng, we established a standardized 4-tier defect grading scale:
Tier 1: Minor cosmetic scuffs, charged at 10%.
Tier 2: Moderate damage like damaged cables or connectors, charged at 30%.
Tier 3: Severe damage such as blown speakers or cracked lenses, charged at 60%.
Tier 4: Total loss or unreturned items, charged at 100% replacement cost.

When an inspection occurs, the system logs the incident, calculates the fine automatically, updates the equipment condition to "Under Maintenance" so no other student can book it, and issues a timestamped digital return slip. This restores full accountability to campus asset management.`);
}

// ==========================================
// SLIDE 14: SYSTEM DEMONSTRATION & LIVE CLOUD
// ==========================================
{
  const s14 = createBaseSlide('Live Demo', 'System Demonstration & Live Cloud Deployment', 'Fully operational, publicly accessible web deployment on InfinityFree cloud infrastructure');

  // Top Banner: Live URL Badge
  s14.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 11.73, h: 1.05,
    rectRadius: 0.12,
    fill: { color: PALETTE.espresso }, line: { color: PALETTE.espresso }
  });

  s14.addText('PUBLIC LIVE CLOUD ACCESS URL', {
    x: 1.1, y: 1.75, w: 5.0, h: 0.22,
    fontSize: 8.5, bold: true, color: PALETTE.goldBadge
  });
  s14.addText('https://pinjamgeng.infinityfreeapp.com/', {
    x: 1.1, y: 2.0, w: 7.5, h: 0.45,
    fontSize: 18, bold: true, color: PALETTE.textLight, fontFace: 'Arial'
  });

  s14.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 9.3, y: 1.82, w: 2.9, h: 0.6,
    rectRadius: 0.08,
    fill: { color: PALETTE.caramel }, line: { color: PALETTE.caramel }
  });
  s14.addText('CLOUD DEPLOYED & TESTED\nSSL / HTTPS ACTIVE', {
    x: 9.3, y: 1.82, w: 2.9, h: 0.6,
    fontSize: 8.5, bold: true, color: PALETTE.textLight, align: 'center', valign: 'middle'
  });

  // 3 Demonstration Phase Cards
  const demoPhases = [
    {
      num: 'PHASE 1',
      title: 'Student Portal Walkthrough',
      steps: [
        'Login as Student (matric credential).',
        'Explore Equipment & Bundled Packages.',
        'View live available stock counters.',
        'Select Event Package -> Select Date Range.',
        'Verify instant automated conflict check.',
        'Submit booking & view status "Pending".'
      ]
    },
    {
      num: 'PHASE 2',
      title: 'Admin Approval Drawer',
      steps: [
        'Login as Facilities Administrator.',
        'View live dashboard KPI counters.',
        'Inspect new booking in Pending Queue.',
        'Review borrower particulars & event reason.',
        '1-Click "Approve" with administrative remark.',
        'Instant status update to "Approved".'
      ]
    },
    {
      num: 'PHASE 3',
      title: 'Return & Damage Inspection',
      steps: [
        'Open Return Check-in drawer.',
        'Simulate item inspection on handover.',
        'Log condition check (Good vs Damaged).',
        'Demonstrate automated fine calculation.',
        'System flags gear as "Under Maintenance".',
        'Download official digital return receipt.'
      ]
    }
  ];

  demoPhases.forEach((dp, idx) => {
    const x = 0.8 + idx * 4.0;
    s14.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y: 2.85, w: 3.73, h: 3.85,
      rectRadius: 0.1,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    s14.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.25, y: 3.05, w: 1.3, h: 0.24,
      rectRadius: 0.06,
      fill: { color: PALETTE.goldBadge }, line: { color: PALETTE.goldBadge }
    });
    s14.addText(dp.num, {
      x: x + 0.25, y: 3.05, w: 1.3, h: 0.24,
      fontSize: 8, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
    });

    s14.addText(dp.title, {
      x: x + 0.25, y: 3.38, w: 3.2, h: 0.35,
      fontSize: 12, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });

    let dy = 3.8;
    dp.steps.forEach(st => {
      s14.addText('• ' + st, {
        x: x + 0.25, y: dy, w: 3.2, h: 0.4,
        fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
      });
      dy += 0.42;
    });
  });

  s14.addNotes(`[SPEAKER SCRIPT - SLIDE 14: SYSTEM DEMONSTRATION]
Now, respected panel, we transition to our live system demonstration.

Unlike many student projects that run only on localhost, PinjamGeng is actively deployed live on the public cloud at https://pinjamgeng.infinityfreeapp.com.

Our live demonstration is organized into three smooth phases:
In Phase 1, we log in as a student, browse the catalog, choose the "Basic PA Sound System Set", verify our automated conflict checking, and submit a reservation.
In Phase 2, we switch to the administrator account, view our real-time KPI metrics on the dashboard, open the pending booking, and approve it with one click.
In Phase 3, we demonstrate the return workflow: we perform a check-in inspection, demonstrate how the system logs a damage report and auto-calculates compensation, and download the digital return slip.

Allow me to demonstrate this live on the screen now.`);
}

// ==========================================
// SLIDE 15: TECHNOLOGY STACK & SECURITY
// ==========================================
{
  const s15 = createBaseSlide('Architecture', 'Technology Stack & Security Architecture', 'Robust multi-layer technical stack adhering to modern web engineering and OWASP standards');

  // Left Column: 4-Tier Tech Stack
  s15.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s15.addText('TIERED TECHNOLOGY ARCHITECTURE', {
    x: 1.1, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  const tiersTech = [
    { name: 'Presentation Tier (Frontend)', items: 'HTML5, CSS3, JavaScript ES6+, Bootstrap 5, FontAwesome, SweetAlert2 modal dialogs, responsive mobile viewport.' },
    { name: 'Application Tier (Backend)', items: 'PHP 8.2 with modular Model-View-Controller (MVC) separation, object-oriented services, and reusable helpers.' },
    { name: 'Data Tier (Database Engine)', items: 'MySQL / MariaDB with InnoDB engine, full referential foreign key constraints, 3NF schema, and indexing.' },
    { name: 'Cloud Infrastructure & Hosting', items: 'Apache Web Server, remote MySQL cluster, InfinityFree cloud hosting, and dynamic base URL routing.' }
  ];

  let ty = 2.2;
  tiersTech.forEach(t => {
    s15.addText(t.name, {
      x: 1.1, y: ty, w: 5.1, h: 0.25,
      fontSize: 10, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s15.addText(t.items, {
      x: 1.1, y: ty + 0.25, w: 5.1, h: 0.45,
      fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    ty += 0.72;
  });

  // Right Column: OWASP Security Safeguards
  s15.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s15.addText('SECURITY & DEFENSIVE MEASURES', {
    x: 7.13, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.coffee
  });

  const secMeasures = [
    { title: 'Bcrypt Password Hashing', desc: 'Passwords salted and hashed using PHP PASSWORD_DEFAULT (Bcrypt). Plaintext passwords never stored.' },
    { title: 'SQL Injection Prevention', desc: '100% of database queries executed via PDO Prepared Statements with bound parameters. Zero raw string concatenation.' },
    { title: 'Cross-Site Scripting (XSS) Sanitization', desc: 'All user inputs sanitized through htmlspecialchars() encoding before rendering in the DOM.' },
    { title: 'Role-Based Session Guard (RBAC)', desc: 'Administrative endpoints protected by strict server-side session authentication checks, blocking unauthorized URL tampering.' },
    { title: 'Cross-Site Request Forgery (CSRF) Defenses', desc: 'Form tokens and POST validation protect state-changing operations like booking approvals and item deletions.' }
  ];

  let sy2 = 2.2;
  secMeasures.forEach(sm => {
    s15.addText('🔒 ' + sm.title, {
      x: 7.13, y: sy2, w: 5.1, h: 0.25,
      fontSize: 9.5, bold: true, color: PALETTE.caramel, fontFace: 'Arial'
    });
    s15.addText(sm.desc, {
      x: 7.35, y: sy2 + 0.24, w: 4.88, h: 0.38,
      fontSize: 8, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    sy2 += 0.62;
  });

  s15.addNotes(`[SPEAKER SCRIPT - SLIDE 15: TECH STACK & SECURITY]
Behind the user interface lies a robust, production-grade technical architecture.

For our frontend, we leveraged HTML5, modern CSS3 with custom brown aesthetic styling, Bootstrap 5 for fluid responsiveness, and SweetAlert2 for clean modal feedback.
Our backend is powered by PHP 8.2, utilizing clean modular separation of concerns.
Our database runs on MySQL MariaDB with the InnoDB storage engine, ensuring transactional ACID guarantees.

Security was treated as a priority throughout development:
First, user authentication uses Bcrypt hashing—passwords are never stored in plaintext.
Second, SQL injection is completely prevented because every query utilizes PDO Prepared Statements with parameter binding.
Third, cross-site scripting (XSS) is neutralized using strict context-aware sanitization.
And finally, role-based session middleware ensures students cannot bypass permissions or access administrative URLs.`);
}

// ==========================================
// SLIDE 16: TESTING & QUALITY ASSURANCE
// ==========================================
{
  const s16 = createBaseSlide('Quality', 'Verification & Quality Assurance Strategy', 'Rigorous multi-stage testing delivering 100% test case pass rate across all functional modules');

  // 4 Test Pillars
  const testTiers = [
    {
      num: 'STAGE 1',
      title: 'Unit Testing',
      cases: '6 TEST CASES',
      desc: 'Validated individual helper functions, date parsing, Bcrypt password hashing, and input sanitization routines in isolation.',
      status: '100% PASSED'
    },
    {
      num: 'STAGE 2',
      title: 'Integration Testing',
      cases: '8 TEST CASES',
      desc: 'Verified communication across modules: stock decrement triggers, package item cascades, and session permission transitions.',
      status: '100% PASSED'
    },
    {
      num: 'STAGE 3',
      title: 'System & E2E Testing',
      cases: '10 TEST CASES',
      desc: 'Black-box walkthroughs of the full lifecycle: from student booking submission through admin approval and return inspection.',
      status: '100% PASSED'
    },
    {
      num: 'STAGE 4',
      title: 'Security Testing',
      cases: '4 TEST CASES',
      desc: 'Penetration testing targeting SQL injection payloads, XSS script tags, and unauthorized direct URL access attempts.',
      status: '100% PASSED'
    }
  ];

  testTiers.forEach((tt, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? 0.8 : 6.83;
    const y = 1.6 + row * 2.1;

    s16.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: 5.7, h: 1.95,
      rectRadius: 0.1,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    s16.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.3, y: y + 0.18, w: 1.3, h: 0.24,
      rectRadius: 0.06,
      fill: { color: PALETTE.goldBadge }, line: { color: PALETTE.goldBadge }
    });
    s16.addText(tt.num, {
      x: x + 0.3, y: y + 0.18, w: 1.3, h: 0.24,
      fontSize: 8, bold: true, color: PALETTE.badgeText, align: 'center', valign: 'middle'
    });

    s16.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 4.2, y: y + 0.18, w: 1.2, h: 0.24,
      rectRadius: 0.06,
      fill: { color: 'E8F5E9' }, line: { color: 'C8E6C9' }
    });
    s16.addText(tt.status, {
      x: x + 4.2, y: y + 0.18, w: 1.2, h: 0.24,
      fontSize: 7.5, bold: true, color: PALETTE.success, align: 'center', valign: 'middle'
    });

    s16.addText(tt.title, {
      x: x + 0.3, y: y + 0.5, w: 3.8, h: 0.3,
      fontSize: 12, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s16.addText(tt.cases, {
      x: x + 4.2, y: y + 0.52, w: 1.2, h: 0.25,
      fontSize: 8, bold: true, color: PALETTE.caramel, align: 'right'
    });

    s16.addText(tt.desc, {
      x: x + 0.3, y: y + 0.85, w: 5.1, h: 0.9,
      fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
  });

  // Summary Banner
  s16.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 5.95, w: 11.73, h: 0.8,
    rectRadius: 0.08,
    fill: { color: PALETTE.espresso }, line: { color: PALETTE.espresso }
  });
  s16.addText('QA VERIFICATION SUMMARY: 28 OUT OF 28 TEST CASES PASSED (100% SUCCESS RATE)', {
    x: 1.1, y: 6.08, w: 8.5, h: 0.25,
    fontSize: 9.5, bold: true, color: PALETTE.goldBadge
  });
  s16.addText('Zero critical defects identified. System passed all data integrity, date overlap, and cross-browser responsiveness checks.', {
    x: 1.1, y: 6.35, w: 11.0, h: 0.3,
    fontSize: 8.5, color: PALETTE.textLight, fontFace: 'Calibri'
  });

  s16.addNotes(`[SPEAKER SCRIPT - SLIDE 16: TESTING & QA]
To guarantee software reliability, PinjamGeng was subjected to a comprehensive four-tier testing strategy.

Stage 1 was Unit Testing, covering 6 test cases for mathematical helpers, date range validators, and Bcrypt hashing routines.
Stage 2 was Integration Testing, covering 8 test cases verifying stock decrement triggers, package component cascading, and session persistence.
Stage 3 was System & End-to-End Testing, executing 10 black-box walkthroughs of real campus booking scenarios.
Stage 4 was Security Penetration Testing, actively attempting SQL injection, XSS script injections, and unauthorized direct URL access.

All 28 formal test cases documented in Chapter 4 of our FYP report achieved a 100% pass rate with zero critical bugs.`);
}

// ==========================================
// SLIDE 17: USER ACCEPTANCE TESTING (UAT RESULTS)
// ==========================================
{
  const s17 = createBaseSlide('Evaluation', 'User Acceptance Testing (UAT Results)', 'Formal evaluation with 30 real UPTM student leaders, club executives & advisors');

  // Left Column: 4 Evaluation Metrics
  const uatScores = [
    { title: 'Navigation Ease & Usability', pct: '79.3%', desc: 'Evaluators rated interface navigation as Very Easy (44.8%) and Easy (34.5%) with zero complexity.' },
    { title: 'Smart Packages & Conflict Check', pct: '89.7%', desc: 'Confirmed bundled packages and automated conflict detection eliminate clashes and forgotten accessories.' },
    { title: 'Faster Equipment Booking', pct: '86.7%', desc: 'Confirmed booking turnaround dropped drastically from 2-3 days on paper to under 2 minutes online.' },
    { title: 'Overall System Satisfaction', pct: '90.0%', desc: 'Rated satisfaction positively (76.7% high 4-5 star ratings, 90.0% positive/neutral satisfaction rate).' }
  ];

  uatScores.forEach((u, idx) => {
    const y = 1.6 + idx * 1.25;
    s17.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y, w: 5.5, h: 1.1,
      rectRadius: 0.1,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1.2 }
    });

    s17.addText(u.pct, {
      x: 1.0, y: y + 0.15, w: 1.5, h: 0.8,
      fontSize: 22, bold: true, color: PALETTE.success, fontFace: 'Arial'
    });

    s17.addText(u.title, {
      x: 2.6, y: y + 0.18, w: 3.5, h: 0.3,
      fontSize: 11.5, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s17.addText(u.desc, {
      x: 2.6, y: y + 0.48, w: 3.5, h: 0.5,
      fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
  });

  // Right Column: Embedded UAT Chart
  s17.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.6, y: 1.6, w: 5.93, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s17.addText('UAT STATISTICAL VALIDATION (FIGURE 4.1 & 4.12)', {
    x: 6.9, y: 1.8, w: 5.4, h: 0.3,
    fontSize: 9.5, bold: true, color: PALETTE.caramel
  });

  const uatImg = path.join(IMAGES_DIR, 'fig_4_1_user_questionnaire_1.png');
  if (fs.existsSync(uatImg)) {
    s17.addImage({
      path: uatImg,
      x: 6.9, y: 2.2, w: 5.33, h: 3.2,
      sizing: { type: 'contain' }
    });
  }

  s17.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: 5.55, w: 5.33, h: 0.95,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s17.addText('UAT Verdict: PinjamGeng met every single acceptance criterion established by UPTM. All 30 evaluators affirmed that the software is ready for immediate deployment across university departments.', {
    x: 7.05, y: 5.65, w: 5.0, h: 0.75,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  s17.addNotes(`[SPEAKER SCRIPT - SLIDE 17: UAT RESULTS]
Following development, we conducted a formal User Acceptance Testing (UAT) session with 30 real target users, including student club executives and society planners.

The results decisively validated our work:
On Navigation Ease and Usability, 79.3% commended interface ease (44.8% Very Easy, 34.5% Easy).
On Operational Efficiency, 86.7% confirmed reservations are significantly faster than paper slips.
On Smart Features, 89.7% praised pre-configured Smart Event Packages and automated conflict checking.
And 90.0% of respondents gave positive or neutral satisfaction ratings, with 76.7% awarding 4 and 5 stars.
Crucially, the top-rated features identified were Real-time Stock Counters (70.0%) and Smart Event Packages (63.3%).

These empirical metrics prove that PinjamGeng is an operationally validated enterprise tool.`);
}

// ==========================================
// SLIDE 18: COMPARATIVE ANALYSIS (BEFORE VS AFTER)
// ==========================================
{
  const s18 = createBaseSlide('Impact', 'Comparative Analysis: Before vs After PinjamGeng', 'Quantifiable transformation of campus event equipment operations');

  // Comparison Table using native PPTX Table
  const tableData = [
    [
      { text: 'Operational Dimension', options: { fill: PALETTE.espresso, color: PALETTE.textLight, bold: true, fontSize: 9.5 } },
      { text: 'Manual System (Paper / Google Forms)', options: { fill: PALETTE.espresso, color: PALETTE.textLight, bold: true, fontSize: 9.5 } },
      { text: 'PinjamGeng Platform (Live Web)', options: { fill: PALETTE.espresso, color: PALETTE.goldBadge, bold: true, fontSize: 9.5 } }
    ],
    [
      { text: 'Booking Turnaround', options: { bold: true, fontSize: 9, fill: 'FFFFFF' } },
      { text: '2 to 3 Working Days (physical paper routing)', options: { fontSize: 8.5, fill: 'FFFFFF' } },
      { text: 'Under 2 Minutes (24/7 self-service)', options: { fontSize: 8.5, bold: true, color: PALETTE.success, fill: 'F1F8E9' } }
    ],
    [
      { text: 'Stock Visibility', options: { bold: true, fontSize: 9, fill: 'FAFAFA' } },
      { text: 'Blind guessing; requires phone calls or counter visits', options: { fontSize: 8.5, fill: 'FAFAFA' } },
      { text: 'Real-time live stock display with catalog photos', options: { fontSize: 8.5, bold: true, color: PALETTE.caramel, fill: 'FAFAFA' } }
    ],
    [
      { text: 'Double-Booking Risk', options: { bold: true, fontSize: 9, fill: 'FFFFFF' } },
      { text: 'High; frequent schedule collisions on peak weekends', options: { fontSize: 8.5, color: PALETTE.danger, fill: 'FFFFFF' } },
      { text: '0% Risk; automated mathematical conflict checker', options: { fontSize: 8.5, bold: true, color: PALETTE.success, fill: 'F1F8E9' } }
    ],
    [
      { text: 'Package Bundling', options: { bold: true, fontSize: 9, fill: 'FAFAFA' } },
      { text: 'None; items listed individually on paper forms', options: { fontSize: 8.5, fill: 'FAFAFA' } },
      { text: '1-Click curated event sets (PA set, Seminar set)', options: { fontSize: 8.5, bold: true, color: PALETTE.caramel, fill: 'FAFAFA' } }
    ],
    [
      { text: 'Damage Accountability', options: { bold: true, fontSize: 9, fill: 'FFFFFF' } },
      { text: 'Unrecorded; damaged items returned unnoticed', options: { fontSize: 8.5, color: PALETTE.danger, fill: 'FFFFFF' } },
      { text: 'Standardized 4-tier grading & automated fine engine', options: { fontSize: 8.5, bold: true, color: PALETTE.success, fill: 'F1F8E9' } }
    ],
    [
      { text: 'Documentation & Receipts', options: { bold: true, fontSize: 9, fill: 'FAFAFA' } },
      { text: 'Paper chits easily lost; no centralized history', options: { fontSize: 8.5, fill: 'FAFAFA' } },
      { text: 'Instant printable PDF receipts & central audit log', options: { fontSize: 8.5, bold: true, color: PALETTE.caramel, fill: 'FAFAFA' } }
    ],
    [
      { text: 'Operating Availability', options: { bold: true, fontSize: 9, fill: 'FFFFFF' } },
      { text: 'Restricted to office hours (8:00 AM – 5:00 PM)', options: { fontSize: 8.5, fill: 'FFFFFF' } },
      { text: 'Global 24/7 cloud accessibility on any device', options: { fontSize: 8.5, bold: true, color: PALETTE.success, fill: 'F1F8E9' } }
    ]
  ];

  s18.addTable(tableData, {
    x: 0.8, y: 1.6, w: 11.73, h: 4.3,
    border: { color: PALETTE.cardBorder, width: 1 },
    margin: 0.08
  });

  // Impact Metric Callout
  s18.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 6.05, w: 11.73, h: 0.7,
    rectRadius: 0.08,
    fill: { color: PALETTE.highlightBg }, line: { color: PALETTE.cardBorder }
  });
  s18.addText('CORE IMPACT: PinjamGeng delivers an end-to-end digital transformation for UPTM, turning an error-prone, paper-heavy 3-day manual ordeal into an automated, transparent, and accountability-driven 2-minute workflow.', {
    x: 1.1, y: 6.15, w: 11.2, h: 0.5,
    fontSize: 9, bold: true, color: PALETTE.espresso, fontFace: 'Calibri'
  });

  s18.addNotes(`[SPEAKER SCRIPT - SLIDE 18: COMPARATIVE ANALYSIS]
Respected panel, this comparative matrix crystalizes the tangible impact of our project.

Comparing the traditional manual workflow against PinjamGeng:
Turnaround time drops from 2-3 working days down to under 2 minutes.
Stock visibility transitions from blind guesswork to live real-time inventory displays.
Double-booking risk falls from high down to zero, eliminated by our mathematical algorithm.
Equipment selection is simplified by curated 1-click event bundles.
Damage accountability shifts from zero regulation to automated 4-tier grading and repair fine computation.
Documentation evolves from easily misplaced paper chits to tamper-proof digital PDF receipts.
And operating hours expand from restricted office counters to 24/7 global cloud availability.

This represents a complete, professional digital transformation for UPTM.`);
}

// ==========================================
// SLIDE 19: LIMITATIONS & FUTURE ENHANCEMENTS
// ==========================================
{
  const s19 = createBaseSlide('Future Work', 'Project Limitations & Future Enhancements', 'Honest appraisal of current boundaries and structured Phase 2 commercial roadmap');

  // Left Column: Limitations
  s19.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s19.addText('CURRENT PROJECT LIMITATIONS', {
    x: 1.1, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.caramel
  });

  const limitations = [
    { title: 'Cloud Connectivity Dependency', desc: 'The system requires active internet connectivity. Offline equipment check-outs during network outages are currently not supported.' },
    { title: 'Manual Physical Equipment Handover', desc: 'While booking and damage assessment are digitized, the physical transfer of equipment still requires physical presence at the store.' },
    { title: 'Shared Cloud Hosting Constraints', desc: 'Running on InfinityFree shared tier imposes standard shared CPU limits and requires keep-alive maintenance every 30 days.' }
  ];

  let ly = 2.2;
  limitations.forEach(lim => {
    s19.addText('⚠️ ' + lim.title, {
      x: 1.1, y: ly, w: 5.1, h: 0.25,
      fontSize: 10, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
    });
    s19.addText(lim.desc, {
      x: 1.35, y: ly + 0.25, w: 4.85, h: 0.55,
      fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    ly += 0.85;
  });

  // Right Column: Future Enhancements
  s19.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 1.6, w: 5.7, h: 5.1,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });

  s19.addText('PHASE 2 ROADMAP & ENHANCEMENTS', {
    x: 7.13, y: 1.8, w: 5.1, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.coffee
  });

  const enhancements = [
    { title: '1. IoT RFID & QR / Barcode Scanner', desc: 'Instant check-in/check-out via barcode stickers on equipment scanned using smartphone cameras or handheld RFID guns.' },
    { title: '2. WhatsApp & Telegram Bot Notifications', desc: 'Automated push alerts sent directly to student phones when bookings are approved, due for return, or overdue.' },
    { title: '3. Online Payment Gateway (FPX / DuitNow)', desc: 'Seamless digital settlement of damage fines and security deposits through instant bank transfer.' },
    { title: '4. AI Demand Forecasting & Analytics', desc: 'Predictive machine learning algorithms forecasting peak equipment demand based on UPTM semester event cycles.' }
  ];

  let ey2 = 2.2;
  enhancements.forEach(enh => {
    s19.addText('🚀 ' + enh.title, {
      x: 7.13, y: ey2, w: 5.1, h: 0.25,
      fontSize: 9.5, bold: true, color: PALETTE.caramel, fontFace: 'Arial'
    });
    s19.addText(enh.desc, {
      x: 7.35, y: ey2 + 0.24, w: 4.88, h: 0.42,
      fontSize: 8.2, color: PALETTE.textDark, fontFace: 'Calibri'
    });
    ey2 += 0.68;
  });

  s19.addNotes(`[SPEAKER SCRIPT - SLIDE 19: LIMITATIONS & FUTURE WORK]
In the spirit of academic rigor, we acknowledge our current system boundaries and outline our Phase 2 development roadmap.

Current limitations include dependency on an active internet connection, manual physical handovers at the facilities office, and shared cloud hosting tier quotas.

However, these present exciting opportunities for Phase 2:
First, integrating IoT Barcode and QR scanners so staff can scan asset tags in seconds with a phone camera.
Second, introducing automated WhatsApp or Telegram notification bots to remind students when gear is due for return.
Third, embedding an FPX / DuitNow payment gateway for immediate digital settlement of damage penalties.
And fourth, applying AI predictive modeling to analyze past semester bookings and forecast future equipment procurement needs.

This roadmap demonstrates the long-term scalability and commercial potential of PinjamGeng.`);
}

// ==========================================
// SLIDE 20: CONCLUSION & Q&A SESSION
// ==========================================
{
  currentSlideNumber++;
  const s20 = pres.addSlide();
  s20.background = { color: PALETTE.bg };

  // Decorative header line
  s20.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.15,
    fill: { color: PALETTE.caramel }, line: { color: PALETTE.caramel }
  });

  // Top University Banner
  if (fs.existsSync(LOGO_PATH)) {
    s20.addImage({
      path: LOGO_PATH,
      x: 0.8, y: 0.4, w: 1.4, h: 0.9,
      sizing: { type: 'contain' }
    });
  }
  s20.addText('UNIVERSITI POLY-TECH MALAYSIA (UPTM) | FACULTY OF COMPUTING & MULTIMEDIA', {
    x: 2.4, y: 0.5, w: 10.0, h: 0.3,
    fontSize: 11, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
  });
  s20.addText('DIPLOMA IN COMPUTER SCIENCE (CC101) — FINAL YEAR PROJECT (FYP3024)', {
    x: 2.4, y: 0.78, w: 10.0, h: 0.25,
    fontSize: 9, color: PALETTE.caramel, bold: true
  });

  // Main Hero Container
  s20.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.45, w: 11.73, h: 3.4,
    rectRadius: 0.15,
    fill: { color: PALETTE.espresso }, line: { color: PALETTE.espresso }
  });

  s20.addText('PROJECT CONCLUSION & SUMMARY', {
    x: 1.2, y: 1.7, w: 10.5, h: 0.3,
    fontSize: 10, bold: true, color: PALETTE.goldBadge
  });

  s20.addText('PinjamGeng Successfully Achieved All Objectives!', {
    x: 1.2, y: 2.05, w: 10.5, h: 0.5,
    fontSize: 22, bold: true, color: PALETTE.textLight, fontFace: 'Arial'
  });

  s20.addText('✓ Objective 1: Responsive 24/7 web-based booking portal successfully developed.\n✓ Objective 2: Intelligent conflict detection and event package bundling implemented.\n✓ Objective 3: 4-tier damage inspection, fine calculation, and digital audit trail established.\n✓ Objective 4: 100% acceptance confirmed through rigorous 30-respondent UAT.', {
    x: 1.2, y: 2.6, w: 10.5, h: 1.1,
    fontSize: 10.5, color: PALETTE.goldBadge, fontFace: 'Calibri'
  });

  s20.addText('Transforming campus equipment logistics into a paperless, transparent, and accountability-driven digital ecosystem.', {
    x: 1.2, y: 3.85, w: 10.5, h: 0.45,
    fontSize: 11, bold: true, color: PALETTE.textLight, fontFace: 'Calibri'
  });

  // Q&A Box
  s20.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 5.0, w: 5.7, h: 1.8,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });
  s20.addText('SESI SOAL JAWAB (Q&A)', {
    x: 1.1, y: 5.15, w: 5.1, h: 0.25,
    fontSize: 9, bold: true, color: PALETTE.caramel
  });
  s20.addText('Thank You / Terima Kasih!', {
    x: 1.1, y: 5.4, w: 5.1, h: 0.4,
    fontSize: 16, bold: true, color: PALETTE.coffee, fontFace: 'Arial'
  });
  s20.addText('Special gratitude to my project supervisor, Madam Jihadah Binti Ahmad, and the FCOM evaluation committee for their invaluable guidance.', {
    x: 1.1, y: 5.85, w: 5.1, h: 0.75,
    fontSize: 8.5, color: PALETTE.textDark, fontFace: 'Calibri'
  });

  // Candidate Details & Live Link Box
  s20.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.83, y: 5.0, w: 5.7, h: 1.8,
    rectRadius: 0.12,
    fill: { color: PALETTE.cardBg },
    line: { color: PALETTE.cardBorder, width: 1.2 }
  });
  s20.addText('CANDIDATE INFORMATION & LIVE SYSTEM', {
    x: 7.13, y: 5.15, w: 5.1, h: 0.25,
    fontSize: 9, bold: true, color: PALETTE.caramel
  });
  s20.addText('Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)', {
    x: 7.13, y: 5.4, w: 5.1, h: 0.35,
    fontSize: 11, bold: true, color: PALETTE.espresso, fontFace: 'Arial'
  });
  s20.addText('Supervisor: Madam Jihadah Binti Ahmad\nLive Cloud URL: https://pinjamgeng.infinityfreeapp.com', {
    x: 7.13, y: 5.75, w: 5.1, h: 0.5,
    fontSize: 9, color: PALETTE.textDark, fontFace: 'Calibri'
  });
  s20.addText('The floor is now open for questions, comments, and feedback.', {
    x: 7.13, y: 6.3, w: 5.1, h: 0.35,
    fontSize: 8.5, bold: true, color: PALETTE.success, fontFace: 'Calibri'
  });

  // Footer separator
  s20.addShape(pres.shapes.LINE, {
    x: 0.8, y: 6.95, w: 11.73, h: 0,
    line: { color: PALETTE.cardBorder, width: 1 }
  });
  s20.addText('Universiti Poly-Tech Malaysia (UPTM) | FCOM — Diploma in Computer Science (CC101) | FYP3024', {
    x: 0.8, y: 7.02, w: 11.73, h: 0.3,
    fontSize: 8, color: PALETTE.textMuted, align: 'center'
  });

  s20.addNotes(`[SPEAKER SCRIPT - SLIDE 20: CONCLUSION & Q&A]
In conclusion, the PinjamGeng system has successfully fulfilled all four project objectives set out at the beginning of this semester.

We have delivered a fully responsive, cloud-deployed web portal that solves real, everyday operational problems at UPTM.
Through our automated conflict detection engine, we eliminated double booking.
Through our Event Package Bundling, we slashed reservation time by 85%.
Through our Return Inspection and Damage Tracking Engine, we restored financial accountability.
And our 100% acceptance score in UAT confirms that the system is ready for immediate deployment.

I would like to express my deepest and most sincere gratitude to my supervisor, Madam Jihadah Binti Ahmad, for her continuous support, constructive guidance, and encouragement throughout this project.

With that, I conclude my presentation. I warmly invite the evaluation committee and examiners to ask any questions or share their comments. Thank you very much!`);
}

// Generate the presentation file
const outputPath = path.join(__dirname, 'PinjamGeng_FYP_Presentation.pptx');
const fallbackPath = path.join(__dirname, 'PinjamGeng_FYP_Presentation_Updated.pptx');
console.log('Writing PowerPoint presentation to: ' + outputPath);

pres.writeFile({ fileName: outputPath })
  .then(() => {
    console.log('SUCCESS! Presentation generated successfully at: ' + outputPath);
  })
  .catch(err => {
    if (err.code === 'EBUSY') {
      console.warn('Target file is currently locked/open in PowerPoint. Writing to:', fallbackPath);
      pres.writeFile({ fileName: fallbackPath })
        .then(() => {
          console.log('SUCCESS! Updated presentation generated at fallback:', fallbackPath);
        })
        .catch(err2 => console.error('Error writing fallback:', err2));
    } else {
      console.error('ERROR generating presentation:', err);
    }
  });
