'use client';
import { useEffect, useState } from 'react';

const PROGRAM_LABEL = { art: '미술', ani: '애니메이션(AniHi)' };

export default function AdminPage() {
  const [authed, setAuthed] = useState(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('');

  const [form, setForm] = useState({
    studentName: '', className: '', tuition: '', schedule: '', school: '', grade: '', program: 'art',
  });
  const [creating, setCreating] = useState(false);
  const [createdUrl, setCreatedUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
    checkAuth();
  }, []);

  async function checkAuth() {
    const res = await fetch('/api/admin/me');
    const data = await res.json();
    setAuthed(data.authed);
    if (data.authed) loadLinks();
  }

  async function loadLinks() {
    setLoading(true);
    const res = await fetch('/api/admin/links');
    if (res.ok) {
      const data = await res.json();
      setLinks(data.links || []);
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      loadLinks();
    } else {
      const data = await res.json();
      setLoginError(data.error || '로그인 실패');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.studentName.trim()) return;
    setCreating(true);
    setCreatedUrl('');
    const res = await fetch('/api/admin/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      const url = `${origin}/sign/${data.token}`;
      setCreatedUrl(url);
      setForm({ studentName: '', className: '', tuition: '', schedule: '', school: '', grade: '', program: 'art' });
      loadLinks();
    }
    setCreating(false);
  }

  async function handleDelete(id, submitted) {
    const msg = submitted
      ? '이 링크를 삭제할까요? 서명 완료된 서류이며, 저장된 PDF도 함께 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.'
      : '이 링크를 삭제할까요?';
    if (!confirm(msg)) return;
    const res = await fetch(`/api/admin/links/${id}`, { method: 'DELETE' });
    if (res.ok) {
      loadLinks();
    } else {
      const data = await res.json();
      alert(data.error || '삭제 실패');
    }
  }

  async function openPdf(path) {
    const res = await fetch(`/api/admin/pdf-url?path=${encodeURIComponent(path)}`);
    if (res.ok) {
      const data = await res.json();
      window.open(data.url, '_blank');
    }
  }

  function copyLink(url) {
    navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다.');
  }

  if (authed === null) {
    return <div style={{ padding: 40 }}>확인 중...</div>;
  }

  if (!authed) {
    return (
      <div style={{ maxWidth: 360, margin: '100px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <h3 style={{ marginTop: 0 }}>관리자 로그인</h3>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: 10, boxSizing: 'border-box', borderRadius: 6, border: '1px solid #ccc', marginBottom: 10 }}
          />
          {loginError && <div style={{ color: 'crimson', fontSize: 13, marginBottom: 10 }}>{loginError}</div>}
          <button type="submit" style={{ width: '100%', padding: 10, background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>신입생 서류 관리</h2>
        <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #ccc', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>
          로그아웃
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>새 신입생 링크 만들기</h3>
        <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <select value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} style={inputStyle}>
            <option value="art">미술 (서울대Hi5미술학원)</option>
            <option value="ani">애니메이션 (AniHi만화학원)</option>
          </select>
          <input placeholder="학생 이름 *" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} style={inputStyle} required />
          <input placeholder="수강 반" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} style={inputStyle} />
          <input placeholder="교육비" value={form.tuition} onChange={(e) => setForm({ ...form, tuition: e.target.value })} style={inputStyle} />
          <input placeholder="수강 시간" value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} style={inputStyle} />
          <input placeholder="학교" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} style={inputStyle} />
          <input placeholder="학년" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} style={inputStyle} />
          <button type="submit" disabled={creating} style={{ gridColumn: '1 / -1', padding: 10, background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
            {creating ? '생성 중...' : '링크 생성'}
          </button>
        </form>
        {createdUrl && (
          <div style={{ marginTop: 14, padding: 12, background: '#f6f7f9', borderRadius: 8, fontSize: 14, wordBreak: 'break-all' }}>
            생성된 링크: <a href={createdUrl} target="_blank" rel="noreferrer">{createdUrl}</a>
            <button onClick={() => copyLink(createdUrl)} style={{ marginLeft: 10, fontSize: 12, padding: '4px 10px', cursor: 'pointer' }}>복사</button>
          </div>
        )}
      </div>

      <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>링크 목록 {loading && '(불러오는 중...)'}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #eee', color: '#888' }}>
              <th style={th}>학생</th>
              <th style={th}>반</th>
              <th style={th}>프로그램</th>
              <th style={th}>생성일</th>
              <th style={th}>상태</th>
              <th style={th}>동작</th>
            </tr>
          </thead>
          <tbody>
            {links.map((l) => (
              <tr key={l.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
                <td style={td}>{l.student_name}</td>
                <td style={td}>{l.class_name}</td>
                <td style={td}>{PROGRAM_LABEL[l.program] || '미술'}</td>
                <td style={td}>{new Date(l.created_at).toLocaleDateString('ko-KR')}</td>
                <td style={td}>
                  {l.submitted ? (
                    <span style={{ color: '#1a7f37', fontWeight: 600 }}>서명 완료</span>
                  ) : (
                    <span style={{ color: '#999' }}>미서명</span>
                  )}
                </td>
                <td style={td}>
                  {!l.submitted && (
                    <button onClick={() => copyLink(`${origin}/sign/${l.token}`)} style={linkBtn}>링크복사</button>
                  )}
                  {l.submitted && (
                    <button onClick={() => openPdf(l.pdf_path)} style={linkBtn}>PDF 보기/인쇄</button>
                  )}
                  <button onClick={() => handleDelete(l.id, l.submitted)} style={{ ...linkBtn, color: '#c0392b', borderColor: '#e0b4b4' }}>삭제</button>
                </td>
              </tr>
            ))}
            {links.length === 0 && !loading && (
              <tr><td style={td} colSpan={6}>아직 생성된 링크가 없습니다.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 14 };
const th = { padding: '8px 6px' };
const td = { padding: '10px 6px' };
const linkBtn = { marginRight: 6, fontSize: 12, padding: '4px 10px', border: '1px solid #ccc', background: '#fff', borderRadius: 4, cursor: 'pointer' };
