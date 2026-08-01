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

// chrome === true : gray top bar (small logo + page num) + navy bottom bar (academy name + phone)
function drawBarChrome(page, font, { pageNum, smallLogoImg, academyNameShort } = {}) {
  if (smallLogoImg) {
    const barH = 26;
    page.drawRectangle({ x: 0, y: PAGE_H - barH, width: PAGE_W, height: barH, color: GRAY_BAR });
    const scale = 16 / smallLogoImg.height;
    page.drawImage(smallLogoImg, {
      x: MARGIN,
      y: PAGE_H - barH + 5,
      width: smallLogoImg.width * scale,
      height: smallLogoImg.height * scale,
    });
    if (pageNum) {
      page.drawText(String(pageNum), { x: PAGE_W - MARGIN - 4, y: PAGE_H - barH + 7, size: 11, font, color: rgb(0.3, 0.3, 0.3) });
    }
  }
  const fh = 28;
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: fh, color: NAVY_DARK });
  page.drawText(academyNameShort || '하이파이브 미술학원', { x: MARGIN, y: 9, size: 11.5, font, color: WHITE });
  const phone = '문의 02-877-0717';
  const pw = font.widthOfTextAtSize(phone, 9.5);
  page.drawText(phone, { x: PAGE_W - MARGIN - pw, y: 10, size: 9.5, font, color: WHITE });
}

// chrome === 'plain' : just small logo top-left + "A 주소  T 전화" text bottom-right, no bars
function drawPlainChrome(page, font, { smallLogoImg, programKey } = {}) {
  const y = 26;
  if (smallLogoImg) {
    const scale = 16 / smallLogoImg.height;
    const lw = smallLogoImg.width * scale;
    const lh = smallLogoImg.height * scale;
    // The art-program logo asset is an OPAQUE light-gray badge (matches the
    // GRAY_BAR header elsewhere), so on a plain white page it needs a matching
    // backing rectangle behind it, otherwise it shows as a mismatched box.
    // The AniHi-program logo asset is a TRANSPARENT PNG with navy text meant
    // to sit directly on the white page, so it must NOT get a backing rect
    // (that previously produced a stray gray box behind clean navy text).
    if (programKey !== 'ani') {
      const pad = 4;
      page.drawRectangle({ x: MARGIN - pad, y: y - 3 - pad, width: lw + pad * 2, height: lh + pad * 2, color: GRAY_BAR });
    }
    page.drawImage(smallLogoImg, { x: MARGIN, y: y - 3, width: lw, height: lh });
  }
  const text = 'A  서울시 관악구 남부순환로 1761 서원빌딩 4층      T  02-877-0717';
  const tw = font.widthOfTextAtSize(text, 8.5);
  page.drawText(text, { x: PAGE_W - MARGIN - tw, y, size: 8.5, font, color: GRAY_TEXT });
}

export class Cursor {
  constructor(doc, font, assets, program) {
    this.doc = doc;
    this.font = font;
    this.assets = assets;
    this.program = program || PROGRAMS.art;
    this.pageNum = 0;
  }

  resetPageNum(n = 0) {
    this.pageNum = n;
  }

  // chrome: false (no footer at all, used only for the big cover page) | 'plain' | true (bar style)
  newPage({ chrome = true } = {}) {
    this.page = this.doc.addPage([PAGE_W, PAGE_H]);
    this.pageNum += 1;
    if (chrome === true) {
      drawBarChrome(this.page, this.font, { pageNum: this.pageNum - 1, smallLogoImg: this.assets.smallLogo, academyNameShort: this.program.academyNameShort });
    } else if (chrome === 'plain') {
      drawPlainChrome(this.page, this.font, { smallLogoImg: this.assets.smallLogo, programKey: this.program.key });
    }
    this.y = PAGE_H - 56;
    return this.page;
  }

  space(n) {
    this.y -= n;
  }

  image(img, { x = MARGIN, maxWidth = CONTENT_W, y } = {}) {
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
