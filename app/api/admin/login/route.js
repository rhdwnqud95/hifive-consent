import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function POST(req) {
  const { password } = await req.json();
  if (!password) {
    return NextResponse.json({ error: '비밀번호를 입력하세요.' }, { status: 400 });
  }
  const { data, error } = await supabase.rpc('admin_login', { p_password: password });
  if (error || !data || !data[0]) {
    return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }
  const token = data[0].session_token;
  const res = NextResponse.json({ ok: true });
  res.cookies.set('hf_session', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}
