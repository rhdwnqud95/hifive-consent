export default function Home() {
  return (
    <div style={{ maxWidth: 480, margin: '80px auto', textAlign: 'center', padding: 24 }}>
      <h2>서울대 하이파이브 미술학원</h2>
      <p style={{ color: '#666' }}>신입생 전자 동의서 시스템</p>
      <a
        href="/admin"
        style={{
          display: 'inline-block',
          marginTop: 16,
          padding: '10px 20px',
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
        }}
      >
        관리자 페이지로 이동
      </a>
    </div>
  );
}
