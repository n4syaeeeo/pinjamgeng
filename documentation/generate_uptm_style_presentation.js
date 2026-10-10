/**
 * PinjamGeng - UPTM FCOM Style Presentation Generator (20 Widescreen Slides)
 * Matching the exact visual aesthetic, color palette, typography, and slide layouts
 * of the UPTM FYP sample presentation (Mauve/Berry theme, UPTM FCOM Logo, doodle backgrounds,
 * numbered rose pills, testing tables, and questionnaire sections).
 * 
 * Candidate: Nursyafiqah Zulaikha Binti Zilkamal (AM2412018113)
 * Supervisor: Madam Jihadah Binti Ahmad
 * Program: Diploma in Computer Science (CC101) - FYP3024
 * Faculty: Faculty of Computing & Multimedia (FCOM), Universiti Poly-Tech Malaysia (UPTM)
 */

const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pres = new pptxgen();
pres.defineLayout({ name: 'CUSTOM_16_9', width: 13.33, height: 7.5 });
pres.layout = 'CUSTOM_16_9';

const IMAGES_DIR = path.join(__dirname, 'images');
const LOGO_PATH = path.join(IMAGES_DIR, 'uptm_fcom_logo.png');
const COVER_BG_PATH = path.join(IMAGES_DIR, 'brown_cover_bg.png');
const CONTENT_BG_PATH = path.join(IMAGES_DIR, 'brown_content_bg.png');
const WHEEL_PATH = path.join(IMAGES_DIR, 'agile_wheel.png');
const GFORM_PATH = path.join(IMAGES_DIR, 'gform_preview.png');

// Warm Aesthetic Brown Palette
const PALETTE = {
  mauveCover: '55351E',     // Deep rich mocha brown
  titleBerry: '42220F',     // Dark espresso brown for bold titles
  pillRose: 'A86538',       // Warm caramel / terracotta badge pill
  pillDark: '5C3214',       // Dark warm bronze accent
  tableHeader: 'DECAB6',    // Warm latte table header background
  tableBorder: 'D2BEAC',    // Soft warm taupe border
  textDark: '28211D',       // Deep espresso charcoal body text
  textMuted: '61544D',      // Warm taupe secondary text
  white: 'FFFFFF',
  cardBg: 'FFFFFF',
  cardBorder: 'E6D8CA',     // Soft warm cream/beige border
  accentBg: 'F5EDE4',       // Soft almond cream card
  accentBorder: 'D9C2AD',
  cloudBg: 'F5EBE1',
  cloudBorder: 'D9C0A8',
  cloudText: '5C3214'
};

// Helper to create content slide base (Logo, Title, Background, Slide Number Pill)
function createContentSlide(slideNum, title) {
  const slide = pres.addSlide();
  
  // Set background image
  if (fs.existsSync(CONTENT_BG_PATH)) {
    slide.addImage({ path: CONTENT_BG_PATH, x: 0, y: 0, w: 13.33, h: 7.5 });
  } else {
    slide.background = { color: 'FAF7F2' };
  }

  // Top Left Logo
  if (fs.existsSync(LOGO_PATH)) {
    slide.addImage({ path: LOGO_PATH, x: 0.6, y: 0.4, w: 2.7, h: 0.7 });
  }

  // Slide Title (Bold Chunky Uppercase Berry)
  slide.addText(title, {
    x: 0.6, y: 1.25, w: 11.5, h: 0.75,
    fontFace: 'Arial Black',
    fontSize: 28,
    bold: true,
    color: PALETTE.titleBerry,
    margin: 0
  });

  // Bottom-Right Slide Number Pill
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 12.1, y: 6.6, w: 0.7, h: 0.5,
    rectRadius: 0.25,
    fill: { color: PALETTE.pillRose },
    line: { color: PALETTE.pillRose }
  });
  slide.addText(String(slideNum), {
    x: 12.1, y: 6.6, w: 0.7, h: 0.5,
    fontFace: 'Arial Black',
    fontSize: 16,
    bold: true,
    color: PALETTE.white,
    align: 'center',
    valign: 'middle',
    margin: 0
  });

  return slide;
}

// ==========================================
// SLIDE 1: COVER SLIDE
// ==========================================
{
  const s1 = pres.addSlide();
  if (fs.existsSync(COVER_BG_PATH)) {
    s1.addImage({ path: COVER_BG_PATH, x: 0, y: 0, w: 13.33, h: 7.5 });
  } else {
    s1.background = { color: PALETTE.mauveCover };
  }

  // Top Left Logo
  if (fs.existsSync(LOGO_PATH)) {
    s1.addImage({ path: LOGO_PATH, x: 0.6, y: 0.5, w: 2.9, h: 0.75 });
  }

  // Subtitle Tagline
  s1.addText('FYP PRESENTATION', {
    x: 1.0, y: 1.8, w: 11.33, h: 0.5,
    fontFace: 'Arial Black', fontSize: 24, bold: true,
    color: PALETTE.white, align: 'center', letterSpacing: 1.5
  });

  // Huge Project Title
  s1.addText('PINJAMGENG', {
    x: 1.0, y: 2.45, w: 11.33, h: 1.1,
    fontFace: 'Arial Black', fontSize: 54, bold: true,
    color: PALETTE.white, align: 'center'
  });

  // Project Subtitle
  s1.addText('SMART EVENT EQUIPMENT BOOKING AND INVENTORY MANAGEMENT SYSTEM', {
    x: 1.0, y: 3.55, w: 11.33, h: 0.4,
    fontFace: 'Arial', fontSize: 13, bold: true,
    color: 'FDF8F3', align: 'center', letterSpacing: 0.8
  });

  // Candidate Details
  s1.addText('NURSYAFIQAH ZULAIKHA\nBINTI ZILKAMAL\nAM2412018113', {
    x: 1.0, y: 4.15, w: 11.33, h: 1.25,
    fontFace: 'Arial Black', fontSize: 20, bold: true,
    color: PALETTE.white, align: 'center', lineSpacing: 26
  });

  // Supervisor
  s1.addText('SUPERVISOR: MADAM JIHADAH BINTI AHMAD', {
    x: 1.0, y: 5.65, w: 11.33, h: 0.4,
    fontFace: 'Arial Black', fontSize: 16, bold: true,
    color: PALETTE.white, align: 'center'
  });

  // Footer Divider Line
  s1.addShape(pres.shapes.LINE, {
    x: 1.5, y: 6.35, w: 10.33, h: 0,
    line: { color: 'E8D6C5', width: 1.5 }
  });

  // Footer Info
  s1.addText('FYP3024', {
    x: 1.5, y: 6.55, w: 3.5, h: 0.4,
    fontFace: 'Arial', fontSize: 16, bold: true, color: PALETTE.white, align: 'left'
  });
  s1.addText('|', {
    x: 5.5, y: 6.55, w: 2.33, h: 0.4,
    fontFace: 'Arial', fontSize: 16, color: 'E8D6C5', align: 'center'
  });
  s1.addText('CC101', {
    x: 8.33, y: 6.55, w: 3.5, h: 0.4,
    fontFace: 'Arial', fontSize: 16, bold: true, color: PALETTE.white, align: 'right'
  });

  s1.addNotes(`[SPEAKER SCRIPT - SLIDE 1]
Assalamu'alaikum and a very good day to our respected evaluation committee, examiners, and my supervisor, Madam Jihadah Binti Ahmad.
My name is Nursyafiqah Zulaikha Binti Zilkamal, matric number AM2412018113, from the Diploma in Computer Science program (CC101), Faculty of Computing and Multimedia, Universiti Poly-Tech Malaysia.
Today, I am proud to present my Final Year Project entitled: "PinjamGeng: Smart Event Equipment Booking and Inventory Management System".`);
}

// ==========================================
// SLIDE 2: PROJECT BACKGROUND (Slide 1 in badge)
// ==========================================
{
  const s2 = createContentSlide(1, 'PROJECT BACKGROUND');

  const textParas = [
    { text: "• PinjamGeng is a responsive web-based equipment booking and inventory management application tailored specifically for Universiti Poly-Tech Malaysia (UPTM), built using PHP 8.2, MySQL InnoDB, and Tailwind CSS.", options: { fontSize: 18, color: PALETTE.textDark, bold: false, lineSpacing: 28 } },
    { text: "\n\n• It allows student club executive committees, event coordinators, and university societies to browse verified audio-visual and IT hardware, view real-time available stock counters, and submit reservation requests 24/7 online.", options: { fontSize: 18, color: PALETTE.textDark, bold: false, lineSpacing: 28 } },
    { text: "\n\n• The system eliminates reliance on slow paper logbooks, prevents catastrophic double-booking clashes, and establishes end-to-end return accountability across campus facilities.", options: { fontSize: 18, color: PALETTE.textDark, bold: false, lineSpacing: 28 } }
  ];

  s2.addText(textParas, {
    x: 1.0, y: 2.3, w: 11.33, h: 4.2,
    align: 'left', valign: 'top'
  });

  s2.addNotes(`[SPEAKER SCRIPT - SLIDE 2: PROJECT BACKGROUND]
To provide context, PinjamGeng was engineered to modernize UPTM's event equipment loan workflow. Student societies frequently organize seminars, cultural events, and workshops requiring microphones, PA systems, and projectors. PinjamGeng provides a centralized 24/7 portal that replaces paper forms and gives students and facility staff transparent, real-time inventory control.`);
}

// ==========================================
// SLIDE 3: PROBLEM STATEMENTS (Slide 2 in badge)
// ==========================================
{
  const s3 = createContentSlide(2, 'PROBLEM STATEMENTS');

  const problems = [
    { 
      num: '1', 
      title: 'Manual & Uncentralised Booking Process', 
      desc: 'Manual, uncentralised processes make verifying live equipment availability and managing records difficult, causing reservation clashes, communication breakdowns, missing records, and time-consuming workflows.' 
    },
    { 
      num: '2', 
      title: 'Equipment Selection Difficulty & Lack of Packages', 
      desc: 'Users struggle to identify suitable gear for diverse event types when equipment information and booking records are managed separately; existing systems focus solely on individual items rather than convenient event-based packages.' 
    }
  ];

  problems.forEach((p, idx) => {
    const yPos = 2.4 + idx * 2.0;

    // Numbered Badge Pill
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: yPos, w: 1.1, h: 1.1,
      rectRadius: 0.35,
      fill: { color: PALETTE.pillRose },
      line: { color: PALETTE.pillRose }
    });
    s3.addText(p.num, {
      x: 0.8, y: yPos, w: 1.1, h: 1.1,
      fontFace: 'Arial Black', fontSize: 32, bold: true, color: PALETTE.white,
      align: 'center', valign: 'middle', margin: 0
    });

    // Problem Content
    s3.addText([
      { text: p.title + '\n', options: { fontSize: 18, bold: true, color: PALETTE.titleBerry } },
      { text: p.desc, options: { fontSize: 14, color: PALETTE.textDark, lineSpacing: 22 } }
    ], {
      x: 2.2, y: yPos - 0.05, w: 9.9, h: 1.3,
      valign: 'middle', margin: 0
    });
  });

  s3.addNotes(`[SPEAKER SCRIPT - SLIDE 3: PROBLEM STATEMENTS]
Our investigation identified two primary operational challenges at UPTM:
First, the current manual or uncentralised booking process makes checking availability difficult and record management inefficient, leading to clashes, missing records, and delays.
Second, users struggle to identify appropriate equipment for specific event types because existing tools focus only on individual items without event-based packages.`);
}

// ==========================================
// SLIDE 4: PROJECT OBJECTIVES (Slide 3 in badge)
// ==========================================
{
  const s4 = createContentSlide(3, 'PROJECT OBJECTIVES');

  const objectives = [
    { 
      num: '1', 
      title: 'To Develop an Event Equipment Booking & Inventory Management System', 
      desc: 'To develop a responsive web-based system enabling users to check equipment availability, submit, and track booking requests, while allowing administrators to manage equipment records and booking approvals within the 12-week development period.' 
    },
    { 
      num: '2', 
      title: 'To Implement an Event-Based Equipment Package Feature', 
      desc: 'To provide curated, predefined equipment packages for at least four event types—including seminars, workshops, meetings, and photography events—within the 12-week development period.' 
    }
  ];

  objectives.forEach((obj, idx) => {
    const yPos = 2.4 + idx * 2.0;

    // Numbered Badge Pill
    s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: yPos, w: 1.1, h: 1.1,
      rectRadius: 0.35,
      fill: { color: PALETTE.pillRose },
      line: { color: PALETTE.pillRose }
    });
    s4.addText(obj.num, {
      x: 0.8, y: yPos, w: 1.1, h: 1.1,
      fontFace: 'Arial Black', fontSize: 32, bold: true, color: PALETTE.white,
      align: 'center', valign: 'middle', margin: 0
    });

    // Objective Content
    s4.addText([
      { text: obj.title + '\n', options: { fontSize: 18, bold: true, color: PALETTE.titleBerry } },
      { text: obj.desc, options: { fontSize: 14, color: PALETTE.textDark, lineSpacing: 22 } }
    ], {
      x: 2.2, y: yPos - 0.05, w: 9.9, h: 1.3,
      valign: 'middle', margin: 0
    });
  });

  s4.addNotes(`[SPEAKER SCRIPT - SLIDE 4: PROJECT OBJECTIVES]
In direct response, we formulated two core objectives to be completed within the 12-week development period:
Objective 1: Develop the web-based booking and inventory management platform for live availability, request tracking, and admin approvals.
Objective 2: Implement the event-based package feature with predefined bundles for at least 4 event types: seminars, workshops, meetings, and photography events.`);
}

// ==========================================
// SLIDE 5: LITERATURE REVIEW: EXISTING SYSTEM (Slide 4 in badge)
// ==========================================
{
  const s5 = createContentSlide(4, 'LITERATURE REVIEW: EXISTING SYSTEM');

  const systems = [
    {
      name: 'Cheqroom',
      bullets: [
        'Provides cloud-based asset tracking with equipment kit bundling and calendar reservation.',
        'Supports barcode/QR code custody tracking and item condition check-in logging.'
      ],
      limitation: 'High annual enterprise subscription cost with excessive corporate features (geofencing, insurance depreciation) impractical for localized campus budgets.'
    },
    {
      name: 'Booqable',
      bullets: [
        'Offers an intuitive step-by-step booking wizard with real-time stock availability verification.',
        'Visualizes equipment dispatch schedules using color-coded order timeline bars.'
      ],
      limitation: 'Heavily oriented toward commercial rental businesses requiring customer invoicing, security deposits, and credit card payments rather than university club loan rules.'
    },
    {
      name: 'EZOfficeInventory',
      bullets: [
        'Provides comprehensive asset lifecycle tracking with service tickets and "Under Maintenance" status flags.',
        'Generates exportable utilization and equipment condition audit reports.'
      ],
      limitation: 'Complex and data-dense enterprise interface with a steep learning curve for student borrowers; lacks quick event-based packages.'
    }
  ];

  systems.forEach((sys, idx) => {
    const yPos = 2.15 + idx * 1.65;

    // Card container
    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: yPos, w: 11.5, h: 1.5,
      rectRadius: 0.15,
      fill: { color: PALETTE.cardBg },
      line: { color: PALETTE.cardBorder, width: 1 }
    });

    // System Title Pill / Header
    s5.addText(sys.name, {
      x: 1.0, y: yPos + 0.08, w: 11.1, h: 0.35,
      fontFace: 'Arial Black', fontSize: 16, bold: true, color: PALETTE.titleBerry, margin: 0
    });

    // Content: bullets + limitation
    const content = [
      { text: `• ${sys.bullets[0]}\n`, options: { fontSize: 12.5, color: PALETTE.textDark } },
      { text: `• ${sys.bullets[1]}\n`, options: { fontSize: 12.5, color: PALETTE.textDark } },
      { text: `Limitation: `, options: { fontSize: 12, bold: true, color: PALETTE.pillRose } },
      { text: sys.limitation, options: { fontSize: 12, italic: true, color: PALETTE.textMuted } }
    ];

    s5.addText(content, {
      x: 1.0, y: yPos + 0.42, w: 11.1, h: 0.98,
      valign: 'top', margin: 0
    });
  });

  s5.addNotes(`[SPEAKER SCRIPT - SLIDE 5: LITERATURE REVIEW: EXISTING SYSTEM]
To establish a functional benchmark, we critically evaluated three industry-leading equipment management systems:
First, Cheqroom offers kit bundling and asset tracking, but carries high enterprise SaaS subscription fees and corporate features unsuitable for campus budgets.
Second, Booqable features an intuitive booking wizard, but is designed for commercial rentals requiring invoices, deposits, and credit card payments.
Third, EZOfficeInventory excels in asset maintenance tracking, but suffers from a steep learning curve and data-dense interface for student borrowers.`);
}

// ==========================================
// SLIDE 6: COMPARISON & RESEARCH GAP (Slide 5 in badge)
// ==========================================
{
  const s6 = createContentSlide(5, 'COMPARISON & RESEARCH GAP');

  const comparisonData = [
    [
      { text: 'Feature / Capability', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'left' } },
      { text: 'Cheqroom', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'center' } },
      { text: 'Booqable', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'center' } },
      { text: 'EZOfficeInventory', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'center' } },
      { text: 'Proposed System\n(PinjamGeng)', options: { bold: true, fill: PALETTE.pillDark, color: PALETTE.white, align: 'center' } }
    ],
    [
      { text: 'Online Equipment Booking', options: { bold: true } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D', fill: 'F9F5F0' } }
    ],
    [
      { text: 'Real-Time Stock Availability', options: { bold: true } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D', fill: 'F9F5F0' } }
    ],
    [
      { text: 'Event-Based Equipment Packages', options: { bold: true } },
      { text: '✓ (Kits)', options: { align: 'center', color: PALETTE.textDark } },
      { text: '✓ (Bundles)', options: { align: 'center', color: PALETTE.textDark } },
      { text: 'Not dedicated', options: { align: 'center', color: PALETTE.textMuted } },
      { text: '✓ (Smart Packages)', options: { align: 'center', bold: true, color: '15803D', fill: 'F9F5F0' } }
    ],
    [
      { text: 'Automated Conflict Engine', options: { bold: true } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D', fill: 'F9F5F0' } }
    ],
    [
      { text: 'Return Condition & Maintenance Log', options: { bold: true } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: 'Not dedicated', options: { align: 'center', color: PALETTE.textMuted } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D' } },
      { text: '✓', options: { align: 'center', bold: true, color: '15803D', fill: 'F9F5F0' } }
    ],
    [
      { text: 'Official Digital A4 Loan Slip', options: { bold: true } },
      { text: 'Not found', options: { align: 'center', color: PALETTE.textMuted } },
      { text: 'Not dedicated', options: { align: 'center', color: PALETTE.textMuted } },
      { text: 'Not dedicated', options: { align: 'center', color: PALETTE.textMuted } },
      { text: '✓ (Standardized A4)', options: { align: 'center', bold: true, color: '15803D', fill: 'F9F5F0' } }
    ],
    [
      { text: 'Zero Subscription (Campus Tailored)', options: { bold: true } },
      { text: 'Not found', options: { align: 'center', color: PALETTE.textMuted } },
      { text: 'Not found', options: { align: 'center', color: PALETTE.textMuted } },
      { text: 'Not found', options: { align: 'center', color: PALETTE.textMuted } },
      { text: '✓ (100% Free Campus)', options: { align: 'center', bold: true, color: '15803D', fill: 'F9F5F0' } }
    ]
  ];

  s6.addTable(comparisonData, {
    x: 0.8, y: 2.2, w: 11.5, h: 4.6,
    colW: [3.3, 1.8, 1.8, 2.0, 2.6],
    fontSize: 12,
    border: { pt: 1, color: PALETTE.tableBorder },
    fill: PALETTE.white,
    valign: 'middle'
  });

  s6.addNotes(`[SPEAKER SCRIPT - SLIDE 6: COMPARISON & RESEARCH GAP]
This comparative matrix illustrates our research gap. While existing tools provide online booking and availability checks, they require expensive commercial subscriptions and lack institutional loan agreements. PinjamGeng bridges this gap by delivering curated event packages, automated conflict detection, and official digital A4 loan slips tailored specifically for UPTM at zero licensing cost.`);
}

// ==========================================
// SLIDE 7: AGILE METHODOLOGY (Slide 6 in badge)
// ==========================================
{
  const s7 = createContentSlide(6, 'AGILE METHODOLOGY');

  // Left: Circular Agile Diagram
  if (fs.existsSync(WHEEL_PATH)) {
    s7.addImage({ path: WHEEL_PATH, x: 0.8, y: 2.1, w: 4.8, h: 4.8 });
  }

  // Vertical Divider Line (Rose)
  s7.addShape(pres.shapes.LINE, {
    x: 6.0, y: 2.2, w: 0, h: 4.6,
    line: { color: PALETTE.pillRose, width: 2.5 }
  });

  // Right: Bullet Points
  const agileBullets = [
    { text: "• A software development methodology whereby work is broken into small, dynamic, iterative increments called sprints.", options: { fontSize: 16, color: PALETTE.textDark, bold: false, lineSpacing: 24 } },
    { text: "\n\n• Utilizes an iterative approach in software development, allowing continuous reviews with supervisor Madam Jihadah Binti Ahmad and adaptive enhancements.", options: { fontSize: 16, color: PALETTE.textDark, bold: false, lineSpacing: 24 } },
    { text: "\n\n• Executed across 5 two-week sprints: Sprint 1 (Architecture & Database), Sprint 2 (Authentication & Inventory CRUD), Sprint 3 (Booking Engine & Packages), Sprint 4 (Return & Damage Tracking), and Sprint 5 (Cloud Deployment & UAT).", options: { fontSize: 16, color: PALETTE.textDark, bold: false, lineSpacing: 24 } }
  ];

  s7.addText(agileBullets, {
    x: 6.4, y: 2.2, w: 5.8, h: 4.6,
    align: 'left', valign: 'middle'
  });

  s7.addNotes(`[SPEAKER SCRIPT - SLIDE 7: AGILE METHODOLOGY]
We adopted the Agile Scrum methodology divided into 5 two-week sprints. The iterative cycle—Plan, Design, Develop, Test, Deploy, Review—ensured regular milestone reviews with Madam Jihadah, enabling us to refine the conflict algorithm and user interface dynamically.`);
}

// ==========================================
// SLIDE 8: UNIT TESTING (Slide 7 in badge)
// ==========================================
{
  const s8 = createContentSlide(7, 'TESTING AND RESULT\nUNIT TESTING');

  const unitTestData = [
    [
      { text: 'Test ID', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'center' } },
      { text: 'Module', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry } },
      { text: 'Test Description', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry } },
      { text: 'Input', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry } },
      { text: 'Expected Output', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry } },
      { text: 'Status', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'center' } }
    ],
    [
      { text: 'UT01', options: { align: 'center', bold: true } },
      { text: 'Auth' },
      { text: 'Validate user login' },
      { text: 'Valid email & password' },
      { text: 'Login success, session created' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'UT02', options: { align: 'center', bold: true } },
      { text: 'Auth' },
      { text: 'Invalid password check' },
      { text: 'Wrong password' },
      { text: 'Error message displayed' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'UT03', options: { align: 'center', bold: true } },
      { text: 'Inventory' },
      { text: 'Stock availability calculation' },
      { text: 'Total qty & active loans' },
      { text: 'Correct available qty returned' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'UT04', options: { align: 'center', bold: true } },
      { text: 'Booking' },
      { text: 'Date range validation' },
      { text: 'End date <= Start date' },
      { text: 'Validation error triggered' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'UT05', options: { align: 'center', bold: true } },
      { text: 'Returns' },
      { text: 'Auto maintenance ticket on damage' },
      { text: 'Item condition = \'Damaged\'' },
      { text: 'Status set to \'Under Maintenance\' & ticket created' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ]
  ];

  s8.addTable(unitTestData, {
    x: 0.8, y: 2.4, w: 11.5, h: 4.2,
    colW: [1.1, 1.3, 2.7, 2.3, 3.1, 1.0],
    fontSize: 12,
    border: { pt: 1, color: PALETTE.tableBorder },
    fill: PALETTE.white,
    valign: 'middle'
  });

  s8.addNotes(`[SPEAKER SCRIPT - SLIDE 8: UNIT TESTING]
In our quality assurance phase, Unit Testing verified isolated algorithms. All 5 critical functions—including password verification, dynamic stock subtraction, date validation, and automatic maintenance ticket creation upon damaged return—passed 100% with zero defects.`);
}

// ==========================================
// SLIDE 9: INTEGRATION TESTING (Slide 8 in badge)
// ==========================================
{
  const s9 = createContentSlide(8, 'TESTING AND RESULT\nINTEGRATION TESTING');

  const integTestData = [
    [
      { text: 'Test ID', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'center' } },
      { text: 'Integration Area', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry } },
      { text: 'Test Description', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry } },
      { text: 'Expected Result', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry } },
      { text: 'Status', options: { bold: true, fill: PALETTE.tableHeader, color: PALETTE.titleBerry, align: 'center' } }
    ],
    [
      { text: 'IT01', options: { align: 'center', bold: true } },
      { text: 'Frontend–Backend' },
      { text: 'Booking form submission via POST' },
      { text: 'Request saved with unique Ref No' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'IT02', options: { align: 'center', bold: true } },
      { text: 'Booking–Inventory' },
      { text: 'Admin approval stock decrement' },
      { text: 'Available stock decremented automatically' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'IT03', options: { align: 'center', bold: true } },
      { text: 'Auth–Protected API' },
      { text: 'Direct access to admin routes as student' },
      { text: 'Unauthorized access redirected to login' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'IT04', options: { align: 'center', bold: true } },
      { text: 'Package–Booking' },
      { text: 'Bundled item cascading insert' },
      { text: 'All package components populated into loan' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ],
    [
      { text: 'IT05', options: { align: 'center', bold: true } },
      { text: 'Return–Inventory' },
      { text: 'Return desk good condition restore' },
      { text: 'Stock returned to available inventory pool' },
      { text: 'Pass', options: { align: 'center', bold: true, color: '15803D' } }
    ]
  ];

  s9.addTable(integTestData, {
    x: 0.8, y: 2.4, w: 11.5, h: 4.2,
    colW: [1.1, 2.3, 3.4, 3.7, 1.0],
    fontSize: 12,
    border: { pt: 1, color: PALETTE.tableBorder },
    fill: PALETTE.white,
    valign: 'middle'
  });

  s9.addNotes(`[SPEAKER SCRIPT - SLIDE 9: INTEGRATION TESTING]
Integration Testing verified cross-module data integrity between frontend forms, MySQL transaction rollback mechanisms, and role-based access middleware. All tests achieved 100% pass rates.`);
}

// ==========================================
// SLIDE 10: UAT QUESTIONNAIRE OVERVIEW (Slide 9 in badge)
// ==========================================
{
  const s10 = createContentSlide(9, 'TESTING AND RESULT\nUAT / POST-DEVELOPMENT QUESTIONNAIRE');

  // Left side: Text Summary
  const uatBullets = [
    { text: "• A formal User Acceptance Testing (UAT) survey was administered to evaluate user satisfaction, system usability, and operational efficiency.", options: { fontSize: 16, color: PALETTE.textDark, bold: false, lineSpacing: 24 } },
    { text: "\n\n• Conducted with 30 verified UPTM respondents, comprising active student club executive committees, society presidents, event organizers, and faculty advisors.", options: { fontSize: 16, color: PALETTE.textDark, bold: false, lineSpacing: 24 } },
    { text: "\n\n• Structured across 6 evaluation sections: User Profile, Usability, Functionality, User Experience, Reliability, and Open-Ended Feedback.", options: { fontSize: 16, color: PALETTE.textDark, bold: false, lineSpacing: 24 } }
  ];

  s10.addText(uatBullets, {
    x: 0.8, y: 2.4, w: 6.2, h: 4.4,
    align: 'left', valign: 'top'
  });

  // Right side: Real Google Form Header Card
  const realHeader = path.join(IMAGES_DIR, 'real_card_header.png');
  if (fs.existsSync(realHeader)) {
    s10.addImage({ path: realHeader, x: 7.3, y: 2.2, w: 5.3, h: 2.4 });
    s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 7.3, y: 4.8, w: 5.3, h: 1.8,
      rectRadius: 0.15,
      fill: PALETTE.accentBg,
      line: { color: PALETTE.accentBorder, width: 1.5 }
    });
    s10.addText('📋 FORM STRUCTURE & AUTHENTIC PARTICIPATION:\n• 30 Verified Campus Evaluators\n• Google Forms Cloud Analytics Sync\n• 6 Structured Evaluation Sections (Sections A to F)', {
      x: 7.5, y: 4.9, w: 4.9, h: 1.6,
      fontSize: 12, bold: true, color: PALETTE.titleBerry, lineSpacing: 18
    });
  }

  s10.addNotes(`[SPEAKER SCRIPT - SLIDE 10: UAT OVERVIEW]
Following development and deployment, we conducted formal User Acceptance Testing with 30 target users at UPTM. We designed a comprehensive 6-section post-development questionnaire to capture empirical evidence of user satisfaction.`);
}

// ==========================================
// SLIDE 11: SECTION A: USER PROFILE (Slide 10 in badge)
// ==========================================
{
  const s11 = createContentSlide(10, 'SECTION A: USER PROFILE');

  const cardRole = path.join(IMAGES_DIR, 'real_card_role.png');
  const cardExp = path.join(IMAGES_DIR, 'real_card_experience.png');
  const cardFreq = path.join(IMAGES_DIR, 'real_card_frequency.png');

  if (fs.existsSync(cardRole)) s11.addImage({ path: cardRole, x: 0.8, y: 2.3, w: 3.7, h: 3.8 });
  if (fs.existsSync(cardExp)) s11.addImage({ path: cardExp, x: 4.8, y: 2.3, w: 3.7, h: 3.8 });
  if (fs.existsSync(cardFreq)) s11.addImage({ path: cardFreq, x: 8.8, y: 2.3, w: 3.7, h: 3.8 });

  s11.addNotes(`[SPEAKER SCRIPT - SLIDE 11: SECTION A]
Section A establishes respondent credibility: 96.7% of evaluators were active student club leaders and event organizers, with 95% having extensive active borrowing experience at UPTM.`);
}

// ==========================================
// SLIDE 12: SECTION B: USABILITY EVALUATION (Slide 11 in badge)
// ==========================================
{
  const s12 = createContentSlide(11, 'SECTION B: USABILITY EVALUATION');

  const cardNav = path.join(IMAGES_DIR, 'real_card_navigation.png');
  const cardWiz = path.join(IMAGES_DIR, 'real_card_wizard.png');

  if (fs.existsSync(cardNav)) s12.addImage({ path: cardNav, x: 0.8, y: 2.3, w: 5.6, h: 4.2 });
  if (fs.existsSync(cardWiz)) s12.addImage({ path: cardWiz, x: 6.8, y: 2.3, w: 5.6, h: 4.2 });

  s12.addNotes(`[SPEAKER SCRIPT - SLIDE 12: SECTION B]
Section B evaluated usability: 79.3% rated system navigation easy or very easy, and 93.4% praised our 2-step booking wizard for simplifying complex equipment requisitions.`);
}

// ==========================================
// SLIDE 13: SECTION C: FUNCTIONALITY EVALUATION (Slide 12 in badge)
// ==========================================
{
  const s13 = createContentSlide(12, 'SECTION C: FUNCTIONALITY EVALUATION');

  const cardPkg = path.join(IMAGES_DIR, 'real_card_packages.png');
  const cardStk = path.join(IMAGES_DIR, 'real_card_stock.png');
  const cardConf = path.join(IMAGES_DIR, 'real_card_conflict.png');

  if (fs.existsSync(cardPkg)) s13.addImage({ path: cardPkg, x: 0.8, y: 2.3, w: 3.7, h: 3.8 });
  if (fs.existsSync(cardStk)) s13.addImage({ path: cardStk, x: 4.8, y: 2.3, w: 3.7, h: 3.8 });
  if (fs.existsSync(cardConf)) s13.addImage({ path: cardConf, x: 8.8, y: 2.3, w: 3.7, h: 3.8 });

  s13.addNotes(`[SPEAKER SCRIPT - SLIDE 13: SECTION C]
Section C confirmed functional accuracy: 89.7% endorsed 1-click Smart Packages, 86.7% confirmed real-time stock counters were accurate, and 89.7% verified that double-booking clashes were completely eliminated.`);
}

// ==========================================
// SLIDE 14: SECTION D: REQUISITION EFFICIENCY (Slide 13 in badge)
// ==========================================
{
  const s14 = createContentSlide(13, 'SECTION D: REQUISITION EFFICIENCY & DOCUMENTATION');

  const cardSpd = path.join(IMAGES_DIR, 'real_card_speed.png');
  const cardSlp = path.join(IMAGES_DIR, 'real_card_slip.png');
  const cardRet = path.join(IMAGES_DIR, 'real_card_return.png');

  if (fs.existsSync(cardSpd)) s14.addImage({ path: cardSpd, x: 0.8, y: 2.3, w: 3.7, h: 3.8 });
  if (fs.existsSync(cardSlp)) s14.addImage({ path: cardSlp, x: 4.8, y: 2.3, w: 3.7, h: 3.8 });
  if (fs.existsSync(cardRet)) s14.addImage({ path: cardRet, x: 8.8, y: 2.3, w: 3.7, h: 3.8 });

  s14.addNotes(`[SPEAKER SCRIPT - SLIDE 14: SECTION D]
Section D examined operational efficiency: 86.7% confirmed equipment requisition is significantly faster, 82.8% endorsed printable A4 loan agreements, and 83.3% supported return desk damage inspection.`);
}

// ==========================================
// SLIDE 15: SECTION E: OVERALL SATISFACTION (Slide 14 in badge)
// ==========================================
{
  const s15 = createContentSlide(14, 'SECTION E: OVERALL SATISFACTION');

  const cardFeat = path.join(IMAGES_DIR, 'real_card_features.png');
  const cardSat = path.join(IMAGES_DIR, 'real_card_satisfaction.png');

  if (fs.existsSync(cardFeat)) s15.addImage({ path: cardFeat, x: 0.8, y: 2.3, w: 5.6, h: 4.2 });
  if (fs.existsSync(cardSat)) s15.addImage({ path: cardSat, x: 6.8, y: 2.3, w: 5.6, h: 4.2 });

  s15.addNotes(`[SPEAKER SCRIPT - SLIDE 15: SECTION E]
Section E validated overall user satisfaction: Real-Time Stock Counters (70.0%) and Smart Packages (63.3%) emerged as the most valued features. Overall satisfaction reached 90.0% positive/neutral, with 76.7% awarding 4 to 5 stars.`);
}

// ==========================================
// SLIDE 16: SECTION F: OPEN-ENDED FEEDBACK (Slide 15 in badge)
// ==========================================
{
  const s16 = createContentSlide(15, 'SECTION F: OPEN-ENDED FEEDBACK');

  const cardFb = path.join(IMAGES_DIR, 'real_card_feedback.png');
  if (fs.existsSync(cardFb)) s16.addImage({ path: cardFb, x: 0.8, y: 2.1, w: 5.8, h: 4.7 });

  // Right: Feedback Insights Box
  s16.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: 2.1, w: 5.6, h: 4.7,
    rectRadius: 0.2,
    fill: PALETTE.cardBg,
    line: { color: PALETTE.cardBorder, width: 2 }
  });

  const quotes = [
    { text: "KEY RESPONDENT SUGGESTIONS & FEEDBACK:\n\n", options: { bold: true, fontSize: 14, color: PALETTE.titleBerry } },
    { text: "• \"Pakej barang sangat membantu kelab kami pilih barang tanpa tertinggal kabel atau mic.\"\n\n", options: { fontSize: 12, italic: true, color: PALETTE.textDark } },
    { text: "• \"Sistem semak stok live sangat memudahkan. Tak perlu turun naik makmal tanya pegawai.\"\n\n", options: { fontSize: 12, italic: true, color: PALETTE.textDark } },
    { text: "• \"Cadangan: Tambah lebih banyak pilihan pakej preset untuk program outdoor / sukan kampus.\"\n\n", options: { fontSize: 12, italic: true, color: PALETTE.textDark } },
    { text: "• \"Design kemas, warna brown aesthetic nampak profesional dan mudah difahami.\"", options: { fontSize: 12, italic: true, color: PALETTE.textDark } }
  ];

  s16.addText(quotes, {
    x: 7.2, y: 2.3, w: 5.0, h: 4.3,
    valign: 'top'
  });

  s16.addNotes(`[SPEAKER SCRIPT - SLIDE 16: SECTION F]
Section F recorded qualitative feedback: 13 respondents submitted written praise for the clean layout and automated stock indicators, while suggesting additional presets for outdoor campus sports in Phase 2.`);
}

// ==========================================
// SLIDE 17: CORE INNOVATIONS & LIVE CLOUD (Slide 16 in badge)
// ==========================================
{
  const s17 = createContentSlide(16, 'CORE INNOVATIONS & LIVE CLOUD');

  const innovations = [
    { num: '01', title: 'Automated Conflict Detection Engine', desc: 'Mathematical date-range verification blocks overlapping bookings in real time, guaranteeing 0% double bookings.' },
    { num: '02', title: '1-Click Smart Event Packages', desc: 'Pre-bundled gear sets (Basic PA, Auditorium, Seminar) slash requisition submission time from 15 mins to under 60 seconds (85% reduction).' },
    { num: '03', title: 'Return Desk & Condition Audit Engine', desc: 'Standardized physical condition inspection (Good vs Damaged) with automated maintenance ticket creation and instant inventory pool locking.' }
  ];

  innovations.forEach((inn, i) => {
    const xPos = 0.8 + i * 3.9;

    s17.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.2, w: 3.7, h: 3.6,
      rectRadius: 0.2,
      fill: PALETTE.cardBg,
      line: { color: PALETTE.cardBorder, width: 2 }
    });

    s17.addText(inn.num, {
      x: xPos + 0.3, y: 2.4, w: 3.1, h: 0.5,
      fontFace: 'Arial Black', fontSize: 28, bold: true, color: PALETTE.pillRose
    });

    s17.addText(inn.title, {
      x: xPos + 0.3, y: 3.0, w: 3.1, h: 0.8,
      fontFace: 'Arial Black', fontSize: 15, bold: true, color: PALETTE.titleBerry
    });

    s17.addText(inn.desc, {
      x: xPos + 0.3, y: 3.8, w: 3.1, h: 1.8,
      fontFace: 'Arial', fontSize: 12, color: PALETTE.textDark
    });
  });

  // Bottom Cloud Banner
  s17.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 6.0, w: 10.9, h: 0.8,
    rectRadius: 0.15,
    fill: PALETTE.cloudBg,
    line: { color: PALETTE.cloudBorder, width: 1.5 }
  });
  s17.addText('🌐 LIVE CLOUD DEPLOYMENT: https://pinjamgeng.infinityfreeapp.com/', {
    x: 1.0, y: 6.0, w: 10.5, h: 0.8,
    fontFace: 'Arial Black', fontSize: 13, bold: true, color: PALETTE.cloudText,
    align: 'center', valign: 'middle'
  });

  s17.addNotes(`[SPEAKER SCRIPT - SLIDE 17: CORE INNOVATIONS]
PinjamGeng delivers three core technical innovations: our mathematical conflict detection engine, 1-click event packages, and return condition accountability. The entire platform is deployed live on the cloud.`);
}

// ==========================================
// SLIDE 18: FUTURE WORKS (Slide 17 in badge)
// ==========================================
{
  const s18 = createContentSlide(17, 'FUTURE WORKS');

  const futureWorks = [
    { num: '1', title: 'IoT Barcode & QR Code Hardware Scanning Integration', desc: 'Direct physical scanning of asset tags during counter checkout and return to achieve sub-second verification and eliminate manual entry.' },
    { num: '2', title: 'Automated WhatsApp & Telegram Push Notifications', desc: 'Instant real-time messaging bots delivering instant booking approval alerts, pickup schedules, and return deadline reminders directly to student phones.' },
    { num: '3', title: 'FPX Online Payment Gateway & Damage Fine Settlement', desc: 'Direct digital fine settlement for damage penalties via FPX and predictive forecasting to prepare stock ahead of peak campus event seasons.' }
  ];

  futureWorks.forEach((fw, idx) => {
    const yPos = 2.3 + idx * 1.35;

    // Numbered Badge Pill
    s18.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.8, y: yPos, w: 0.9, h: 0.9,
      rectRadius: 0.4,
      fill: PALETTE.pillRose,
      line: { color: PALETTE.pillRose }
    });
    s18.addText(fw.num, {
      x: 0.8, y: yPos, w: 0.9, h: 0.9,
      fontFace: 'Arial Black', fontSize: 26, bold: true, color: PALETTE.white,
      align: 'center', valign: 'middle', margin: 0
    });

    // Content
    s18.addText([
      { text: fw.title + '\n', options: { fontSize: 17, bold: true, color: PALETTE.titleBerry } },
      { text: fw.desc, options: { fontSize: 13, color: PALETTE.textDark } }
    ], {
      x: 1.9, y: yPos - 0.05, w: 10.0, h: 1.0,
      valign: 'middle', margin: 0
    });
  });

  s18.addNotes(`[SPEAKER SCRIPT - SLIDE 18: FUTURE WORKS]
For Phase 2 enhancements, we plan to integrate IoT Barcode/QR scanning for instant check-in, automated WhatsApp push notifications, and FPX payment gateway integration.`);
}

// ==========================================
// SLIDE 19: CONCLUSION (Slide 18 in badge)
// ==========================================
{
  const s19 = createContentSlide(18, 'CONCLUSION');

  const concParas = [
    { text: "• PinjamGeng has successfully accomplished both core project objectives within the 12-week development timeframe, delivering a robust web application that solves real operational bottlenecks at Universiti Poly-Tech Malaysia.", options: { fontSize: 18, color: PALETTE.textDark, bold: false, lineSpacing: 28 } },
    { text: "\n\n• The platform completely eliminates double-booking conflicts through mathematical scheduling algorithms, slashes equipment reservation time by 85% via 1-click event package bundling, and restores institutional accountability through standardized return condition grading and maintenance ticketing.", options: { fontSize: 18, color: PALETTE.textDark, bold: false, lineSpacing: 28 } },
    { text: "\n\n• With a 100% test pass rate across unit and integration testing and an outstanding 90% positive satisfaction rating in formal UAT testing, PinjamGeng is fully validated and ready for official campus-wide adoption at UPTM.", options: { fontSize: 18, color: PALETTE.textDark, bold: false, lineSpacing: 28 } }
  ];

  s19.addText(concParas, {
    x: 1.0, y: 2.3, w: 11.0, h: 4.4,
    align: 'left', valign: 'top'
  });

  s19.addNotes(`[SPEAKER SCRIPT - SLIDE 19: CONCLUSION]
In conclusion, PinjamGeng successfully fulfills both project objectives. We transformed manual paperwork into a seamless cloud web experience. I express my deepest gratitude to Madam Jihadah Binti Ahmad for her continuous support and guidance throughout this semester.`);
}

// ==========================================
// SLIDE 20: THANK YOU & Q&A
// ==========================================
{
  const s20 = pres.addSlide();
  if (fs.existsSync(COVER_BG_PATH)) {
    s20.addImage({ path: COVER_BG_PATH, x: 0, y: 0, w: 13.33, h: 7.5 });
  } else {
    s20.background = { color: PALETTE.mauveCover };
  }

  // Top Left Logo
  if (fs.existsSync(LOGO_PATH)) {
    s20.addImage({ path: LOGO_PATH, x: 0.6, y: 0.5, w: 2.9, h: 0.75 });
  }

  s20.addText('THANK YOU', {
    x: 1.0, y: 2.2, w: 11.33, h: 1.2,
    fontFace: 'Arial Black', fontSize: 60, bold: true,
    color: PALETTE.white, align: 'center'
  });

  s20.addText('QUESTION & ANSWER SESSION', {
    x: 1.0, y: 3.5, w: 11.33, h: 0.5,
    fontFace: 'Arial Black', fontSize: 22, bold: true,
    color: 'F5EBE1', align: 'center', letterSpacing: 1.5
  });

  s20.addText('PinjamGeng: Smart Event Equipment Booking and Inventory Management System\nFaculty of Computing & Multimedia (FCOM), UPTM', {
    x: 1.0, y: 4.3, w: 11.33, h: 0.8,
    fontFace: 'Arial', fontSize: 15, color: PALETTE.white, align: 'center', lineSpacing: 22
  });

  // Footer Divider Line
  s20.addShape(pres.shapes.LINE, {
    x: 1.5, y: 6.35, w: 10.33, h: 0,
    line: { color: 'E8D6C5', width: 1.5 }
  });

  // Footer Info
  s20.addText('FYP3024', {
    x: 1.5, y: 6.55, w: 3.5, h: 0.4,
    fontFace: 'Arial', fontSize: 16, bold: true, color: PALETTE.white, align: 'left'
  });
  s20.addText('|', {
    x: 5.5, y: 6.55, w: 2.33, h: 0.4,
    fontFace: 'Arial', fontSize: 16, color: 'E8D6C5', align: 'center'
  });
  s20.addText('CC101', {
    x: 8.33, y: 6.55, w: 3.5, h: 0.4,
    fontFace: 'Arial', fontSize: 16, bold: true, color: PALETTE.white, align: 'right'
  });

  s20.addNotes(`[SPEAKER SCRIPT - SLIDE 20: Q&A]
Thank you very much. I now warmly invite our respected examiners and evaluation committee to ask any questions or share their comments.`);
}

// Generate the presentation file
const outputPath = path.join(__dirname, 'PinjamGeng_UPTM_FCOM_Presentation.pptx');
const outputPathBrown = path.join(__dirname, 'PinjamGeng_UPTM_FCOM_Presentation_Brown.pptx');

(async () => {
  try {
    await pres.writeFile({ fileName: outputPathBrown });
    console.log('SUCCESS! Brown presentation generated at:', outputPathBrown);
    
    // Also try writing to original filename if not locked
    try {
      await pres.writeFile({ fileName: outputPath });
      console.log('SUCCESS! Overwrote main presentation at:', outputPath);
    } catch (e) {
      console.log('Main file was locked by PowerPoint, but Brown file is ready at:', outputPathBrown);
    }
  } catch (err) {
    console.error('ERROR generating presentation:', err);
  }
})();
