export const metadata = {
  title: '서울대 하이파이브 미술학원 - 신입생 서류',
  description: '신입생 전자 동의서',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "Apple SD Gothic Neo", sans-serif', background: '#f2f3f5', color: '#1a1a1a' }}>
        {children}
      </body>
    </html>
  );
}
