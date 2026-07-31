import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

async function requireSession(req) {
  const token = req.cookies.get('hf_session')?.value;
  if (!token) return null;
  return token;
}

export async function GET(req) {
  const token = await requireSession(req);
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { data, error } = await supabase.rpc('admin_list_links', { p_session_token: token });
  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json({ links: data });
}

export async function POST(req) {
  const token = await requireSession(req);
  if (!token) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  const program = body.program === 'ani' ? 'ani' : 'art';
  const { data, error } = await supabase.rpc('admin_create_link', {
    p_session_token: token,
    p_student_name: body.studentName || '',
    p_class_name: body.className || '',
    p_tuition: body.tuition || '',
    p_schedule: body.schedule || '',
    p_school: body.school || '',
    p_grade: body.grade || '',
    p_program: program,
  });
  if (error || !data || !data[0]) {
    return NextResponse.json({ error: error?.message || 'failed' }, { status: 400 });
  }
  return NextResponse.json({ token: data[0].token });
}
