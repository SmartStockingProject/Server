import PDFDocument from "pdfkit";
import { Response } from "express";

export const PAGE_MARGIN = 50;
export let INDEX_TABLE = 0;

// פונקציה ליצירת PDF והגדרת כותרות
export const createPdf = (res: Response) => {
  const doc = new PDFDocument({
    size: 'A4',
   });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');

  doc.pipe(res);
  const table = [
    ["שם", "כמות"],
    ["עט", "30"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["1עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["3עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["עיפרון", "100"],
    ["4עיפרון", "100"],
  ];
  generatePdfWithTable(doc, table, 0);
};

const addTitle = (
  doc: InstanceType<typeof PDFDocument>,
  title: string,
  date: string
): void => {
  doc.font("./src/utils/Heebo-Regular.ttf");
  doc.fontSize(24).text(title, { align: "center" });
  doc.fontSize(12).text(date, { align: "center" });
  doc.moveDown(2);
};

export const drawTable = (
  doc: InstanceType<typeof PDFDocument>,
  table: string[][],
  indexTable: number
): void => {
  console.log(`indexTable: ${indexTable} | INDEX_TABLE : ${INDEX_TABLE}`);
  
  const footerHeight = 50;
  const startX = doc.page.width - 150;;
  let startY = doc.y; // נקודת הY אחרי הכותרת עם מרווח
  const rowHeight = 30;
  const columnWidth = 100;
  const maxHeight = doc.page.height - footerHeight - 100; // height page -150

for (let rowIndex = indexTable; rowIndex < table.length; rowIndex++) {
  const row = table[rowIndex];
    
    if (/*y +*/ startY+ rowHeight > maxHeight || rowIndex > (table.length-2)) {        
      INDEX_TABLE= rowIndex;
      console.log(`PAGE BREAK at rowIndex: ${rowIndex} | INDEX_TABLE: ${INDEX_TABLE}`);
      break;
    } else {
      console.log(`Drawing row at x y: ${startX} | ${startY} | rowIndex: ${rowIndex} | INDEX_TABLE: ${INDEX_TABLE}`);
    }
    row.forEach((cell, colIndex) => {
      const x = startX - (colIndex * columnWidth);
      const y = startY;

      // ציור קו גבול
      doc.rect(x, y, columnWidth, rowHeight).stroke();

      // הוספת טקסט
      doc.text(cell, x + 5, y + 5); // הוספת טקסט עם מרווח פנימי
    });
    startY = startY + rowHeight; // מזיזה את הסמן לסוף ציור
  }
  
};

const addFooter = (
  doc: InstanceType<typeof PDFDocument>,
  name: string
): void => {

  const startX = convertRightToLeft(PAGE_MARGIN);
  const footerHeight = 100;
  const startY = doc.page.height - footerHeight;
  doc.fontSize(12).text(`${name} `, startX, startY, {
    align: "right",
    lineGap: 0,
    paragraphGap: 0,
  });
    doc
      .moveTo(startX - 50, startY +15)
      .lineTo(startX - 50 - 150, startY+15)
      .stroke();
};

const convertRightToLeft = (num: number): number => {
  const pageWidth = 595.28; 
  return pageWidth - num;
}

export const generatePdfWithTable = (doc: InstanceType<typeof PDFDocument>, table: string[][], indexTable: number): void => {
  addTitle(doc, " שפרה גלפמן " , "2024-10-10"); 
  drawTable(doc, table, indexTable); 
  addFooter(doc, "חתימה"); 
  console.log(`INDEX_TABLE after drawTable: ${INDEX_TABLE}`);
  
  if(INDEX_TABLE < (table.length -1)){
    doc.addPage();
    generatePdfWithTable(doc, table, INDEX_TABLE);
  }
  else{
    doc.end();
  }
};

