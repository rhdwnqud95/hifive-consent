import { supabase } from './supabaseClient';

const FONT_CACHE_PATH = 'fonts/NotoSansKR-Regular.ttf';
const BUCKET = 'consent-pdfs';

let memoryCache = null;

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.0.0 Safari/537.36',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)',
];

const CSS_URLS = [
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap',
  'https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,700&subset=korean',
];

function extractTtfUrl(css) {
  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+?\.ttf)\)/);
  return match ? match[1] : null;
}

async function tryFetchCss(url, ua) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': ua } });
    if (!res.ok) return null;
    const css = await res.text();
    return extractTtfUrl(css);
  } catch (e) {
    return null;
  }
}

function looksLikeTtfOrOtf(buf) {
  if (!buf || buf.length < 4) return false;
  const sig = buf.readUInt32BE(0);
  // 0x00010000 = TrueType, 0x4F54544F ("OTTO") = OpenType/CFF, 0x74727565 ("true") = mac TrueType
  return sig === 0x00010000 || sig === 0x4f54544f || sig === 0x74727565;
}

async function findTtfUrl() {
  for (const cssUrl of CSS_URLS) {
    for (const ua of USER_AGENTS) {
      const ttfUrl = await tryFetchCss(cssUrl, ua);
      if (ttfUrl) return ttfUrl;
    }
  }
  return null;
}

async function fetchFromGoogleFonts() {
  const ttfUrl = await findTtfUrl();
  if (!ttfUrl) throw new Error('no ttf url found in fonts css');

  const ttfRes = await fetch(ttfUrl);
  if (!ttfRes.ok) throw new Error('ttf fetch failed: ' + ttfRes.status);
  const buf = Buffer.from(await ttfRes.arrayBuffer());
  if (!looksLikeTtfOrOtf(buf)) throw new Error('downloaded font bytes do not look like a valid ttf/otf');
  return buf;
}

export async function getKoreanFontBytes() {
  if (memoryCache) return memoryCache;

  // 1. try Supabase Storage cache
  try {
    const { data, error } = await supabase.storage.from(BUCKET).download(FONT_CACHE_PATH);
    if (!error && data) {
      const buf = Buffer.from(await data.arrayBuffer());
      if (buf.length > 100000 && looksLikeTtfOrOtf(buf)) {
        memoryCache = buf;
        return buf;
      }
    }
  } catch (e) {
    // ignore, fall through to fetch
  }

  // 2. fetch from Google Fonts CDN (multi-strategy: multiple UA strings x multiple css endpoints)
  const bytes = await fetchFromGoogleFonts();

  // 3. cache to storage (best-effort, ignore failure)
  try {
    await supabase.storage.from(BUCKET).upload(FONT_CACHE_PATH, bytes, {
      contentType: 'font/ttf',
      upsert: true,
    });
  } catch (e) {
    // ignore
  }

  memoryCache = bytes;
  return bytes;
}
