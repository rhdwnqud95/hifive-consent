import { MARGIN, CONTENT_W, GRAY_TEXT, BLACK } from './pdfCore.js';

export function drawPage10(c, { form = {}, dateStr = '', studentSigImg, parentSigImg } = {}) {
  // ================= PAGE 10 : 위트젠 관련 조항 (1/2) =================
  c.newPage();
  c.title('위트젠 출결관리 서비스 관련 조항', { size: 15 });

  c.subTitle('제1조 (개인정보의 처리 목적)');
  c.paragraph(
    '① 학원관리프로그램의 운영 ② 학생 출석, 귀가, 결석, 수납안내, 공지 메시지 전송 ③ 홈페이지 콘텐츠 제공 ④ 회원제 서비스에 따른 본인확인, 개인식별, 고지사항 전달 ⑤ 회원과의 커뮤니티 구성(학습지도, Q&A 등)',
    { size: 9, lineHeight: 13 }
  );
  c.space(6);

  c.subTitle('제2조 (개인정보의 처리 및 보유기간)');
  c.paragraph(
    '학원가입 후 해지(해지·탈퇴)시 까지 이며 이 기간 이내에서 개인정보를 처리·보유합니다. 단 ① 채권·채무 관계 잔존시 해당 채권·채무관계 정산시까지 ② 관계 법령에 따라 보관이 필요한 경우 해당 사유 종료시까지',
    { size: 9, lineHeight: 13 }
  );
  c.space(6);

  c.subTitle('제3조 (개인정보의 제3자 제공)');
  c.paragraph(
    '학원은 본 서비스 제공을 위하여 사용하는 "학원관리프로그램" 제공업체인 ㈜위트젠(이하 "위트젠")에 정보주체의 개인정보를 정보주체의 동의를 받아 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 제공합니다.',
    { size: 9, lineHeight: 13 }
  );
  c.space(6);

  c.subTitle('제4조 (개인정보처리의 위탁)');
  c.paragraph('① 학원은 "학원관리프로그램"의 운영을 위하여 제1조의 목적으로 위트젠에 개인정보처리를 위탁합니다.', { size: 9, lineHeight: 13 });
  c.paragraph('② 위탁하는 개인정보 항목', { size: 9, lineHeight: 13 });
  c.paragraph('1) 필수항목 : 학생이름, 학부모휴대번호', { size: 9, lineHeight: 13, x: MARGIN + 14, maxWidth: CONTENT_W - 14 });
  c.paragraph('2) 선택항목 : 학교이름, 학년, 반, 진학희망학교, 생일(음/양력), 집전화번호, 학생휴대번호, 학부모이름, 주소, 학생사진, 학생지문정보', { size: 9, lineHeight: 13, x: MARGIN + 14, maxWidth: CONTENT_W - 14 });
  c.paragraph('③ 개인정보의 보유 및 이용기간 : 제2조(개인정보의 처리 및 보유기간)과 동일', { size: 9, lineHeight: 13 });
  c.paragraph('④ 위트젠은 학원이 위탁한 정보주체의 개인정보에 대해 재위탁 하지 않으며 『개인정보보호법』에 따라 아래의 안전성을 확보 조치를 취하고 있습니다.', { size: 9, lineHeight: 13 });
  c.space(2);
  c.bullets([
    '위트젠 개인정보 보호책임자 : 총괄이사 변인호 02-429-0911 hakwon@hakwon.in',
    '개인정보보호 추진계획의 수립 및 시행',
    '년 1회 "개인정보보호 교육" 실시',
    '비밀번호, 바이오정보, 고유식별번호 암호화',
  ], { size: 8.6, lineHeight: 12, gap: 2 });

  // ================= PAGE 11 : 위트젠 관련 조항 (2/2) =================
  c.newPage();
  c.title('위트젠 출결관리 서비스 관련 조항 (계속)', { size: 13.5 });
  c.bullets([
    '고유식별번호는 인터넷 구간, DMZ구간 저장 시 암호화하고 내부망 저장시 위험도 분석에 따라 암호화',
    '비밀번호 안전성 체크 및 유효기간 체크',
    '고유식별번호(ID, 비밀번호 등) 전송 시 암호화하여 전송',
    '방화벽 운영',
    '백신소프트웨어를 사용하여 자동 업데이트',
    '개인정보처리시스템에 무단접근 통제',
    '개인정보처리시스템의 접속기록은 최소 6개월간 보관',
    '개인정보처리시스템의 접근권한 변경내역 최소 3년간 보관',
    '실시간 보안관제 모니터링 및 이벤트 분석·대응',
    '문서양식의 개인정보는 잠금 장치가 된 보관장소에 보관',
    '보유기간이 경과한 개인정보 문서는 문서파쇄기로 파쇄',
  ], { size: 8.6, lineHeight: 12, gap: 2 });
  c.space(8);

  c.subTitle('제5조 (개인정보의 파기)');
  c.paragraph(
    '① 학원은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기하며 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.',
    { size: 9, lineHeight: 13 }
  );
  c.space(4);
  c.paragraph(
    '② 파기사유가 발생한 개인정보는 전자기적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하거나 제3자에게 위탁된 개인정보는 파기하도록 지시하고, 종이 문서에 기록·저장된 개인정보는 문서파쇄기로 파쇄하거나 소각하여 파기합니다.',
    { size: 9, lineHeight: 13 }
  );
  c.space(14);
  c.hr();
  c.paragraph(`본 문서는 ${c.program.academyName} 신입생 서류의 일부로, 온라인 동의 및 전자서명을 통해 제출되었습니다. 제출 이후 내용의 수정 및 삭제는 불가하며, 원본은 학원에서 보관합니다.`, { size: 8.8, color: GRAY_TEXT });

  // ================= PAGE 12 : 위트젠 조항 동의 및 서명 =================
  c.newPage();
  c.title('위트젠 출결관리 서비스 관련 조항 - 동의', { size: 13.5 });
  c.space(6);
  c.checkbox(MARGIN, c.y - 2, !!form.witzenTermsAgree);
  c.paragraph('위트젠 출결관리 서비스 관련 조항의 모든 내용을 확인하였으며 이에 동의합니다.', { size: 9.6, x: MARGIN + 14, maxWidth: CONTENT_W - 14 });
  c.space(10);
  c.field('날짜', dateStr);
  c.space(10);
  c.signatureBox(MARGIN, c.y - 78, 190, 70, '학생 서명(또는 인)', studentSigImg);
  c.signatureBox(MARGIN + 210, c.y - 78, 190, 70, '학부모 서명(또는 인)', parentSigImg);
}
