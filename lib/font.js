import { koreanFontBase64 } from './asset_koreanFont';

let memoryCache = null;

// Korean font (Noto Sans KR Regular, static instance) is bundled directly as a
// base64 asset (see lib/asset_koreanFont.js) instead of being fetched from
// Google Fonts at request time. The previous approach relied on UA-sniffing
// Google's CSS endpoint to find a .ttf URL, which stopped working reliably
// from Vercel's serverless network (causing "no ttf url found in fonts css").
// Bundling the font removes that external network dependency entirely.
export async function getKoreanFontBytes() {
  if (memoryCache) return memoryCache;
  memoryCache = Buffer.from(koreanFontBase64, 'base64');
  return memoryCache;
}
