import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(req) {
  const token = req.cookies.get('hf_session')?.value;
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { data: ok } = await supabase.rpc('admin_check_session', { p_token: token });
  if (!ok) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');
  if (!path) return NextResponse.json({ error: 'missing path' }, { status: 400 });

  const { data, error } = await supabase.storage.from('consent-pdfs').createSignedUrl(path, 600);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ url: data.signedUrl });
}
