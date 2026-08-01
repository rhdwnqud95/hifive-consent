import { koreanFontBase64 } from './asset_koreanFont';
import { masterKoreanFontBase64 } from './asset_masterKoreanFont';

let memoryCache = null;
let masterMemoryCache = null;

// Small pre-curated font (safe fallback): covers the static template text
// plus a set of common Korean name characters. Used only if per-request font
// subsetting (see getMasterKoreanFontBytes + subset-font in the sign route)
// fails for any reason — it will render fine but may show missing glyphs for
// unusual characters typed into free-text fields (addresses, rare names).
export async function getKoreanFontBytes() {
  if (memoryCache) return memoryCache;
  memoryCache = Buffer.from(koreanFontBase64, 'base64');
  return memoryCache;
}

// Full-coverage master font (Noto Sans KR Regular, static instance — all
// modern Hangul syllables + Latin). NOT embedded directly into PDFs (too
// large, and pdf-lib's subset:true silently drops glyphs on fonts this big —
// see notes in app/api/sign/[token]/route.js). Instead it's subsetted down
// to just the characters actually used in a given document (template text +
// whatever the student/parent typed into the form) at request time via the
// `subset-font` package (harfbuzz), producing a small per-request font that
// is then safe to embed with pdf-lib's subset:true.
export async function getMasterKoreanFontBytes() {
  if (masterMemoryCache) return masterMemoryCache;
  masterMemoryCache = Buffer.from(masterKoreanFontBase64, 'base64');
  return masterMemoryCache;
}
