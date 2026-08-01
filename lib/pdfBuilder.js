import { PDFDocument, rgb } from 'pdf-lib';
import { PAGE_W, PAGE_H, MARGIN, CONTENT_W, Cursor, getProgramInfo } from './pdfCore.js';
import { drawPages1to6 } from './pdfPages1.js';
import { drawPages7to9 } from './pdfPages2.js';
import { drawPage10 } from './pdfPages3.js';

export { PAGE_W, PAGE_H, MARGIN, CONTENT_W };

export async function buildConsentPdf({ font, assets, link, form, studentSigImg, parentSigImg, textCollector, measureOnly }) {
  const doc = assets && assets.doc;
  const program = getProgramInfo(link && link.program);
  const c = new Cursor(doc, font, assets, program, textCollector, measureOnly);
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  drawPages1to6(c, { link });
  drawPages7to9(c, { link, form, dateStr, studentSigImg, parentSigImg });
  drawPage10(c, { form, dateStr, studentSigImg, parentSigImg });

  return c;
}
