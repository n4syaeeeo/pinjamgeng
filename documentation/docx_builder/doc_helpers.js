const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ImageRun,
} = docx;

const imgDir = path.join(__dirname, '..', 'images');

// Body Text: 11 pt (size 22), 1.15 line spacing (line 276), 6 pt after paragraph (after 120)
function createPara(text, options = {}) {
  const isBold = options.bold || false;
  const isItalic = options.italic || false;
  const alignment = options.alignment || AlignmentType.JUSTIFIED;
  const spacingBefore = options.spacingBefore !== undefined ? options.spacingBefore : 0;
  const spacingAfter = options.spacingAfter !== undefined ? options.spacingAfter : 120; // 6 pt
  const size = options.size || 22; // 11 pt

  return new Paragraph({
    alignment: alignment,
    spacing: { line: 276, before: spacingBefore, after: spacingAfter },
    children: [
      new TextRun({
        text: text,
        font: 'Arial',
        size: size,
        bold: isBold,
        italics: isItalic,
        color: options.color || '000000',
      }),
    ],
  });
}

// Chapter Titles: 16 pt Bold (size 32), Uppercase, Centered
function createHeading1(text, options = {}) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { before: options.spacingBefore || 240, after: options.spacingAfter || 240 },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        font: 'Arial',
        size: 32, // 16 pt
        bold: true,
        color: '000000',
      }),
    ],
  });
}

// Heading 2 (e.g. 1.1): 13 pt Bold (size 26), Left-aligned
function createHeading2(text, options = {}) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { before: options.spacingBefore || 240, after: options.spacingAfter || 120 },
    children: [
      new TextRun({
        text: text,
        font: 'Arial',
        size: 26, // 13 pt
        bold: true,
        color: '000000',
      }),
    ],
  });
}

// Heading 3 (e.g. 1.2.1): 11 pt Bold (size 22), Left-aligned
function createHeading3(text, options = {}) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    alignment: AlignmentType.LEFT,
    spacing: { before: options.spacingBefore || 200, after: options.spacingAfter || 100 },
    children: [
      new TextRun({
        text: text,
        font: 'Arial',
        size: 22, // 11 pt
        bold: true,
        color: '000000',
      }),
    ],
  });
}

// Heading 4: 11 pt Bold Italic (size 22), Left-aligned
function createHeading4(text, options = {}) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_4,
    alignment: AlignmentType.LEFT,
    spacing: { before: options.spacingBefore || 160, after: options.spacingAfter || 80 },
    children: [
      new TextRun({
        text: text,
        font: 'Arial',
        size: 22, // 11 pt
        bold: true,
        italics: true,
        color: '000000',
      }),
    ],
  });
}

// Table Caption: Centered above table: Table X.X: Description (Bold, 10.5 pt = size 21)
function createTableCaption(captionText) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text: captionText,
        font: 'Arial',
        bold: true,
        size: 21, // 10.5 pt
        color: '000000',
      }),
    ],
  });
}

// Figure Captions: Centered below image: Figure X.X: Description (Bold, 10.5 pt = size 21)
function createImagePara(imgName, width, height, captionText) {
  let p = path.isAbsolute(imgName) ? imgName : path.join(imgDir, imgName);
  if (!fs.existsSync(p)) {
    // Try nested survey_and_uat/cards/ or wireframes/
    const alt1 = path.join(imgDir, 'survey_and_uat', 'cards', imgName);
    const alt2 = path.join(imgDir, 'wireframes', imgName);
    if (fs.existsSync(alt1)) p = alt1;
    else if (fs.existsSync(alt2)) p = alt2;
  }

  if (!fs.existsSync(p)) {
    console.warn('Image not found:', p);
    return [createPara(`[Missing Image: ${imgName}]`, { alignment: AlignmentType.CENTER, italic: true })];
  }

  const buf = fs.readFileSync(p);
  const elements = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          data: buf,
          transformation: { width, height },
        }),
      ],
      spacing: { before: 160, after: 80 },
    }),
  ];

  if (captionText) {
    elements.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: captionText,
            font: 'Arial',
            bold: true,
            size: 21, // 10.5 pt
            color: '000000',
          }),
        ],
        spacing: { before: 60, after: 180 },
      })
    );
  }
  return elements;
}

// Full-width styled table matching academic layout
function createDocxTable(headers, rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(h => new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: h, font: 'Arial', bold: true, size: 20, color: '000000' })],
              alignment: AlignmentType.CENTER,
              spacing: { line: 240, before: 60, after: 60 },
            }),
          ],
          shading: { fill: 'E5E7EB' },
          margins: { top: 100, bottom: 100, left: 120, right: 120 },
        })),
      }),
      ...rows.map(r => new TableRow({
        children: r.map(c => new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: String(c), font: 'Arial', size: 19, color: '000000' })],
              spacing: { line: 240, before: 40, after: 40 },
            }),
          ],
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        })),
      })),
    ],
  });
}

// APA 7th Edition Reference Paragraph with Hanging Indent (0.5 inch = 720 twips)
function createReferencePara(citationText) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    indent: { hanging: 720 },
    spacing: { line: 276, before: 40, after: 140 },
    children: [
      new TextRun({
        text: citationText,
        font: 'Arial',
        size: 22, // 11 pt
        color: '000000',
      }),
    ],
  });
}

// Callout box for system alerts and guidelines
function createCalloutBox(title, lines) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: title,
                    font: 'Arial',
                    bold: true,
                    size: 21,
                    color: '374151',
                  }),
                ],
                spacing: { line: 260, after: 80 },
              }),
              ...lines.map(l => new Paragraph({
                children: [
                  new TextRun({
                    text: l,
                    font: 'Arial',
                    size: 19,
                    color: '1F2937',
                  }),
                ],
                spacing: { line: 240, after: 60 },
              })),
            ],
            shading: { fill: 'F9FAFB' },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 8, color: '9CA3AF' },
              bottom: { style: BorderStyle.SINGLE, size: 8, color: '9CA3AF' },
              left: { style: BorderStyle.SINGLE, size: 24, color: '4B5563' },
              right: { style: BorderStyle.SINGLE, size: 8, color: '9CA3AF' },
            },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
          }),
        ],
      }),
    ],
  });
}

module.exports = {
  createPara,
  createHeading1,
  createHeading2,
  createHeading3,
  createHeading4,
  createTableCaption,
  createImagePara,
  createDocxTable,
  createReferencePara,
  createCalloutBox,
};
