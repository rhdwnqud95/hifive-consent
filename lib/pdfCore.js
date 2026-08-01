import { PDFDocument, rgb } from 'pdf-lib';

export const PAGE_W = 595.28;
export const PAGE_H = 841.89;
export const MARGIN = 48;
export const CONTENT_W = PAGE_W - MARGIN * 2;

export const NAVY = rgb(0 / 255, 75 / 255, 131 / 255);
export const NAVY_DARK = rgb(24 / 255, 38 / 255, 74 / 255);
export const GRAY_BAR = rgb(222 / 255, 223 / 255, 223 / 255);
export const GRAY_BOX = rgb(236 / 255, 236 / 255, 236 / 255);
export const BLACK = rgb(0.08, 0.08, 0.08);
export const WHITE = rgb(1, 1, 1);
export const RED = rgb(0.8, 0.1, 0.1);
export const GRAY_LINE = rgb(0.75, 0.75, 0.75);
export const GRAY_TEXT = rgb(0.4, 0.4, 0.4);

export { PROGRAMS, getProgramInfo } from './programs.js';
import { PROGRAMS } from './programs.js';

export function wrapText(font, text, size, maxWidth) {
  const paragraphs = String(text == null ? '' : text).split('\n');
  const lines = [];
  for (const para of paragraphs) {
    let current = '';
    for (const ch of para) {
      const test = current + ch;
      if (font.widthOfTextAtSize(test, size) > maxWidth && current.length > 0) {
        lines.push(current);
        current = ch === ' ' ? '' : ch;
      } else {
        current = test;
      }
    }
    lines.push(current);
  }
  return lines;
}

// chrome === true : navy bottom bar (academy name + phone) only — no top bar/logo/page number
function drawBarChrome(page, font, { academyNameShort } = {}) {
  const fh = 28;
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: fh, color: NAVY_DARK });
  page.drawText(academyNameShort || '하이파이브 미술학원', { x: MARGIN, y: 9, size: 11.5, font, color: WHITE });
  const phone = '문의 02-877-0717';
  const pw = font.widthOfTextAtSize(phone, 9.5);
  page.drawText(phone, { x: PAGE_W - MARGIN - pw, y: 10, size: 9.5, font, color: WHITE });
}

// chrome === 'plain' : just "A 주소  T 전화" text bottom-right, no logo, no bars
function drawPlainChrome(page, font) {
  const y = 26;
  const text = 'A  서울시 관악구 남부순환로 1761 서원빌딩 4층      T  02-877-0717';
  const tw = font.widthOfTextAtSize(text, 8.5);
  page.drawText(text, { x: PAGE_W - MARGIN - tw, y, size: 8.5, font, color: GRAY_TEXT });
}

// A no-op stand-in for a pdf-lib PDFPage, used only in Cursor's measureOnly
// mode (see below) so a full "dry run" of the document never has to touch
// pdf-lib or the (large, slow-to-measure-against) master font at all.
function makeFakePage() {
  return {
    drawText: () => {},
    drawRectangle: () => {},
    drawLine: () => {},
    drawImage: () => {},
  };
}
// Always returns 0, so wrapText's char-by-char accumulation never triggers a
// line break — irrelevant in measureOnly mode since we only care about which
// characters got drawn, not how they're wrapped into lines.
const FAKE_FONT = { widthOfTextAtSize: () => 0 };

export class Cursor {
  // textCollector: optional Set<string>. When provided, every string drawn
  // via this.page.drawText(...) is also added to it. Used for a "dry run"
  // measurement pass that discovers exactly which characters a document
  // needs, so the real Korean font can be subsetted down to just those
  // characters (see app/api/sign/[token]/route.js) instead of relying on a
  // small hand-curated character list that can't cover arbitrary user input
  // (real names, real addresses).
  //
  // measureOnly: when true, skips all real pdf-lib page/font/image work
  // (this.doc is never touched) and uses fake stand-ins instead — the dry
  // run only needs to discover which text strings get drawn, so there's no
  // need to actually lay out or render anything, which also avoids the
  // (slow at document scale) cost of measuring text against the huge,
  // unsubsetted master font.
  constructor(doc, font, assets, program, textCollector, measureOnly) {
    this.doc = doc;
    this.measureOnly = !!measureOnly;
    this.font = this.measureOnly ? FAKE_FONT : font;
    this.assets = assets || {};
    this.program = program || PROGRAMS.art;
    this.pageNum = 0;
    this.textCollector = textCollector || null;
  }

  resetPageNum(n = 0) {
    this.pageNum = n;
  }

  // chrome: false (no footer at all, used only for the big cover page) | 'plain' | true (bar style)
  newPage({ chrome = true } = {}) {
    const page = this.measureOnly ? makeFakePage() : this.doc.addPage([PAGE_W, PAGE_H]);
    if (this.textCollector) {
      const collector = this.textCollector;
      const origDrawText = page.drawText.bind(page);
      page.drawText = (text, opts) => {
        if (typeof text === 'string') collector.add(text);
        return origDrawText(text, opts);
      };
    }
    this.page = page;
    this.pageNum += 1;
    if (chrome === true) {
      drawBarChrome(this.page, this.font, { pageNum: this.pageNum - 1, smallLogoImg: this.assets.smallLogo, academyNameShort: this.program.academyNameShort });
    } else if (chrome === 'plain') {
      drawPlainChrome(this.page, this.font);
    }
    this.y = PAGE_H - 56;
    return this.page;
  }

  space(n) {
    this.y -= n;
  }

  image(img, { x = MARGIN, maxWidth = CONTENT_W, y } = {}) {
    if (this.measureOnly) {
      const h = 80; // arbitrary stand-in height, discarded doc so exact layout doesn't matter
      this.y = (y != null ? y : this.y - h) - 8;
      return h;
    }
    const scale = Math.min(maxWidth / img.width, 1);
    const w = img.width * scale;
    const h = img.height * scale;
    const yy = y != null ? y : this.y - h;
    this.page.drawImage(img, { x, y: yy, width: w, height: h });
    this.y = yy - 8;
    return h;
  }

  title(text, { size = 15 } = {}) {
    this.page.drawRectangle({ x: MARGIN, y: this.y - 2, width: 4, height: size + 3, color: NAVY_DARK });
    this.page.drawText(text, { x: MARGIN + 10, y: this.y, size, font: this.font, color: BLACK });
    this.y -= size + 14;
  }

  subTitle(text, { size = 11.5 } = {}) {
    this.page.drawText(text, { x: MARGIN, y: this.y, size, font: this.font, color: NAVY });
    this.y -= size + 8;
  }

  paragraph(text, { size = 10, lineHeight = 15, color = BLACK, maxWidth = CONTENT_W, x = MARGIN } = {}) {
    const lines = wrapText(this.font, text, size, maxWidth);
    for (const line of lines) {
      this.page.drawText(line, { x, y: this.y, size, font: this.font, color });
      this.y -= lineHeight;
    }
  }

  bullets(items, { size = 9.6, lineHeight = 14, gap = 5, x = MARGIN, maxWidth = CONTENT_W - 14, colors = null } = {}) {
    items.forEach((item, idx) => {
      const color = (colors && colors[idx]) || BLACK;
      this.page.drawText('·', { x, y: this.y, size, font: this.font, color: BLACK });
      const lines = wrapText(this.font, item, size, maxWidth);
      for (const line of lines) {
        this.page.drawText(line, { x: x + 12, y: this.y, size, font: this.font, color });
        this.y -= lineHeight;
      }
      this.y -= gap;
    });
  }

  hr({ color = GRAY_LINE, x = MARGIN, width = CONTENT_W } = {}) {
    this.page.drawLine({ start: { x, y: this.y }, end: { x: x + width, y: this.y }, thickness: 1, color });
    this.y -= 12;
  }

  centeredText(text, { size = 13, color = BLACK } = {}) {
    const tw = this.font.widthOfTextAtSize(text, size);
    this.page.drawText(text, { x: (PAGE_W - tw) / 2, y: this.y, size, font: this.font, color });
    this.y -= size + 10;
  }

  table({ x = MARGIN, colWidths, rows, rowHeight = 24, fontSize = 9.4, align = 'center' }) {
    for (let r = 0; r < rows.length; r++) {
      let cx = x;
      const h = Array.isArray(rowHeight) ? rowHeight[r] : rowHeight;
      for (let c = 0; c < rows[r].length; c++) {
        const w = colWidths[c];
        const cellSpec = rows[r][c];
        const cellText = typeof cellSpec === 'string' ? cellSpec : cellSpec.text || '';
        const isHeaderCell = typeof cellSpec === 'object' && cellSpec.head;
        const bold = typeof cellSpec === 'object' && cellSpec.bold;
        const bg = isHeaderCell ? NAVY : null;
        if (bg) this.page.drawRectangle({ x: cx, y: this.y - h, width: w, height: h, color: bg });
        this.page.drawRectangle({ x: cx, y: this.y - h, width: w, height: h, borderColor: GRAY_LINE, borderWidth: 0.75 });
        const textColor = bg ? WHITE : bold ? NAVY_DARK : BLACK;
        const lines = wrapText(this.font, cellText, fontSize, w - 10);
        const totalTextH = lines.length * (fontSize + 3);
        let ty = this.y - h / 2 + totalTextH / 2 - fontSize + 1;
        for (const line of lines) {
          const tw = this.font.widthOfTextAtSize(line, fontSize);
          const tx = align === 'center' ? cx + (w - tw) / 2 : cx + 7;
          this.page.drawText(line, { x: tx, y: ty, size: fontSize, font: this.font, color: textColor });
          ty -= fontSize + 3;
        }
        cx += w;
      }
      this.y -= h;
    }
    this.y -= 10;
  }

  field(label, value, { x = MARGIN, labelW = 78, size = 10, valueColor = BLACK } = {}) {
    this.page.drawText(label, { x, y: this.y, size, font: this.font, color: GRAY_TEXT });
    this.page.drawLine({ start: { x: x + labelW, y: this.y - 3 }, end: { x: PAGE_W - MARGIN, y: this.y - 3 }, thickness: 0.75, color: GRAY_LINE });
    if (value) this.page.drawText(value, { x: x + labelW + 4, y: this.y, size, font: this.font, color: valueColor });
    this.y -= size + 14;
  }

  checkbox(x, y, checked) {
    this.page.drawRectangle({ x, y, width: 10, height: 10, borderColor: BLACK, borderWidth: 1, color: checked ? NAVY : WHITE });
    if (checked) {
      this.page.drawText('V', { x: x + 1.3, y: y + 1, size: 9, font: this.font, color: WHITE });
    }
  }

  agreeBox(label, x, y, selected) {
    const w = this.font.widthOfTextAtSize(label, 9.5) + 14;
    this.page.drawRectangle({ x, y, width: w, height: 18, color: selected ? NAVY : WHITE, borderColor: GRAY_LINE, borderWidth: 0.75 });
    this.page.drawText(label, { x: x + 7, y: y + 5, size: 9.5, font: this.font, color: selected ? WHITE : BLACK });
    return w;
  }

  signatureBox(x, y, w, h, label, imgBytesEmbed) {
    this.page.drawText(label, { x, y: y + h + 4, size: 8.5, font: this.font, color: GRAY_TEXT });
    this.page.drawRectangle({ x, y, width: w, height: h, borderColor: GRAY_LINE, borderWidth: 0.75 });
    if (imgBytesEmbed) {
      const scale = Math.min((w - 10) / imgBytesEmbed.width, (h - 10) / imgBytesEmbed.height);
      const iw = imgBytesEmbed.width * scale;
      const ih = imgBytesEmbed.height * scale;
      this.page.drawImage(imgBytesEmbed, { x: x + (w - iw) / 2, y: y + (h - ih) / 2, width: iw, height: ih });
    }
  }
}
