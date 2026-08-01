import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';

export async function DELETE(req, { params }) {
  const token = req.cookies.get('hf_session')?.value;
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { data: pdfPath, error } = await supabase.rpc('admin_delete_link', {
    p_session_token: token,
    p_id: params.id,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (pdfPath) {
    // best-effort cleanup of the stored PDF; ignore failures
    await supabase.storage.from('consent-pdfs').remove([pdfPath]).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
