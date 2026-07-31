import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { supabase } from '../../../../lib/supabaseClient';
import { getKoreanFontBytes } from '../../../../lib/font';
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

  let pdfBytes;
  try {
    const fontBytes = await getKoreanFontBytes();

    const doc = await PDFDocument.create();
    doc.registerFontkit(fontkit);
    const font = await doc.embedFont(fontBytes, { subset: true });

    const coverLogo = await doc.embedPng(Buffer.from(isAni ? coverTitleAniBase64 : coverTitleBase64, 'base64'));
    const docLogo = await doc.embedPng(Buffer.from(isAni ? docLogoAniBase64 : docLogoBase64, 'base64'));
    const smallLogo = await doc.embedPng(Buffer.from(isAni ? smallLogoAniBase64 : smallLogoBase64, 'base64'));

    const studentSigBuf = dataUrlToBuffer(studentSig);
    const parentSigBuf = dataUrlToBuffer(parentSig);
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
