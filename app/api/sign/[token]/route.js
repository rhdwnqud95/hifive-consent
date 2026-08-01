import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { supabase } from '../../../../lib/supabaseClient';
import { getKoreanFontBytes, getMasterKoreanFontBytes } from '../../../../lib/font';
import { buildConsentPdf } from '../../../../lib/pdfBuilder';
import {
  coverTitleBase64, docLogoBase64, smallLogoBase64,
  coverTitleAniBase64, docLogoAniBase64, smallLogoAniBase64,
} from '../../../../lib/assets';

export async function GET(req, { params }) {
  const { token } = params;
  const { data, error } = await supabase.rpc('get_consent_link', { p_token: token });
  if (error || !data || !data[0]) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  return NextResponse.json({ link: data[0] });
}

function dataUrlToBuffer(dataUrl) {
  if (!dataUrl) return null;
  const idx = dataUrl.indexOf(',');
  const b64 = idx >= 0 ? dataUrl.slice(idx + 1) : dataUrl;
  return Buffer.from(b64, 'base64');
}

// Every printable ASCII character (digits, punctuation, Latin letters) is
// always included in the subsetted font regardless of what appears in the
// document text, so things like phone numbers/dates never depend on being
// "noticed" by the measurement pass below.
const ASCII_RANGE = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) => String.fromCharCode(0x20 + i)).join('');

export async function POST(req, { params }) {
  const { token } = params;
  const body = await req.json();
  const { form, studentSig, parentSig } = body;

  if (!form) {
    return NextResponse.json({ error: 'missing_form' }, { status: 400 });
  }

  const { data: linkRows, error: linkErr } = await supabase.rpc('get_consent_link', { p_token: token });
  if (linkErr || !linkRows || !linkRows[0]) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  const link = linkRows[0];
  if (link.already_signed) {
    return NextResponse.json({ error: 'already_signed' }, { status: 409 });
  }

  const isAni = link.program === 'ani';
  const coverLogoBuf = Buffer.from(isAni ? coverTitleAniBase64 : coverTitleBase64, 'base64');
  const docLogoBuf = Buffer.from(isAni ? docLogoAniBase64 : docLogoBase64, 'base64');
  const smallLogoBuf = Buffer.from(isAni ? smallLogoAniBase64 : smallLogoBase64, 'base64');
  const studentSigBuf = dataUrlToBuffer(studentSig);
  const parentSigBuf = dataUrlToBuffer(parentSig);

  let pdfBytes;
  try {
    // NOTE: pdf-lib/fontkit has two separate bugs with very large CJK fonts:
    // - subset:true on a huge (20k+ glyph) font silently drops glyphs
    //   (garbled/missing Korean text).
    // - subset:false skips writing a correct per-glyph /W (width) array,
    //   so glyphs render right but PDF viewers use the wrong advance width,
    //   causing text to overflow past the page edge.
    // A small (<~700 glyph) font avoids both bugs when embedded with
    // subset:true. The problem: a *fixed* small curated font can only ever
    // cover characters we thought to include ahead of time — real user
    // input (student/parent names, home addresses) can contain any Hangul
    // syllable, so a static whitelist inevitably shows boxes for whatever
    // it missed.
    //
    // Fix: subset the font fresh for every submission. First do a throwaway
    // "measurement" render of the whole document using the full-coverage
    // master font (see lib/asset_masterKoreanFont.js) with a text collector
    // attached, which tells us exactly which characters this specific
    // document uses (static template text + whatever was typed into the
    // form). Then use `subset-font` (harfbuzz) — a real, correct font
    // subsetter, unlike pdf-lib's own buggy one — to cut the master font
    // down to just those characters. That per-request font is small enough
    // to safely embed with pdf-lib's subset:true for the real PDF.
    let fontBytes;
    try {
      const masterFontBytes = await getMasterKoreanFontBytes();
      const textCollector = new Set();

      // measureOnly: true — a pure-JS dry run (no pdf-lib page/font/image
      // work at all) that just walks the same document-building code to see
      // which text strings get drawn. Much faster than actually laying the
      // document out against the full 23k-glyph master font, and the exact
      // line-wrapping doesn't matter here — only which characters appear.
      await buildConsentPdf({
        font: null,
        assets: {},
        link,
        form,
        studentSigImg: null,
        parentSigImg: null,
        textCollector,
        measureOnly: true,
      });

      const requiredText = [...textCollector].join('') + ASCII_RANGE;
      const { default: subsetFont } = await import('subset-font');
      fontBytes = await subsetFont(masterFontBytes, requiredText, { targetFormat: 'sfnt' });
    } catch (smartFontErr) {
      // Fall back to the small pre-curated font (covers template text +
      // common names) rather than failing the whole submission — worst
      // case some unusual characters in free-text fields render as boxes,
      // same as before this fix, instead of the submission failing outright.
      console.error('dynamic font subsetting failed, falling back to static font', smartFontErr);
      fontBytes = await getKoreanFontBytes();
    }

    const doc = await PDFDocument.create();
    doc.registerFontkit(fontkit);
    const font = await doc.embedFont(fontBytes, { subset: true });

    const coverLogo = await doc.embedPng(coverLogoBuf);
    const docLogo = await doc.embedPng(docLogoBuf);
    const smallLogo = await doc.embedPng(smallLogoBuf);
    const studentSigImg = studentSigBuf ? await doc.embedPng(studentSigBuf) : null;
    const parentSigImg = parentSigBuf ? await doc.embedPng(parentSigBuf) : null;

    await buildConsentPdf({
      font,
      assets: { doc, coverLogo, docLogo, smallLogo },
      link,
      form,
      studentSigImg,
      parentSigImg,
    });

    pdfBytes = await doc.save();
  } catch (e) {
    console.error('pdf build failed', e);
    return NextResponse.json({ error: 'pdf_build_failed: ' + (e && e.message ? e.message : String(e)) }, { status: 500 });
  }

  const path = `${token}/${Date.now()}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from('consent-pdfs')
    .upload(path, pdfBytes, { contentType: 'application/pdf', upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data, error } = await supabase.rpc('submit_consent', {
    p_token: token,
    p_form: form || {},
    p_pdf_path: path,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const result = data && data[0];
  if (!result || !result.ok) {
    return NextResponse.json({ error: (result && result.message) || 'failed' }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
