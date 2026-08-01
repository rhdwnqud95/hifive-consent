import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';

// Lets the parent/student view the PDF they already submitted, using only
// their own link token (no admin session). Does NOT allow editing/resubmitting.
export async function GET(req, { params }) {
  const { token } = params;
  const { data: path, error } = await supabase.rpc('get_consent_pdf_path', { p_token: token });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!path) return NextResponse.json({ error: 'not_submitted' }, { status: 404 });

  const { data, error: urlError } = await supabase.storage.from('consent-pdfs').createSignedUrl(path, 600);
  if (urlError) return NextResponse.json({ error: urlError.message }, { status: 400 });
  return NextResponse.json({ url: data.signedUrl });
}
