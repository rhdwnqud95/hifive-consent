import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(req) {
  const token = req.cookies.get('hf_session')?.value;
  if (!token) return NextResponse.json({ authed: false });
  const { data, error } = await supabase.rpc('admin_check_session', { p_token: token });
  return NextResponse.json({ authed: !error && data === true });
}
