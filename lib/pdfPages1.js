import { drawPages1to3 } from './pdfPages1a.js';
import { drawPages4to6 } from './pdfPages1b.js';

export function drawPages1to6(c, { link }) {
  drawPages1to3(c, { link });
  drawPages4to6(c);
}
