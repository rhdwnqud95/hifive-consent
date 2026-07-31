import { MARGIN, RED, BLACK, GRAY_TEXT } from './pdfCore.js';

export function drawPages7to9(c, { link, form, dateStr, studentSigImg, parentSigImg }) {
  c.resetPageNum(0);
  // ================= PAGE 7 : 수업규정 학생 동의서 =================
  c.newPage();
  c.image(c.assets.docLogo, { maxWidth: 300 });
  c.space(10);
  c.title('수업규정 학생 동의서', { size: 15.5 });
  c.hr();
  c.subTitle('1. 수업 참여 및 태도');
  c.bullets(['수업 시간에 성실히 참여하며 선생님의 지도를 따릅니다.', '수업 분위기를 저해하는 행동은 하지 않습니다.'], { size: 9.4 });
  c.subTitle('2. 전자기기 사용');
  c.bullets(['수업 중 이어폰, 휴대폰 등의 전자기기 사용은 금지됩니다.'], { size: 9.4 });
  c.subTitle('3. 출결 및 보강');
  c.bullets([
    '정당한 사유없는 지각 및 무단결석을 하지 않습니다.',
    '보강수업은 사전 연락 시에만 가능하며, 무단 지각 및 결석은 보강이 불가함을 인지합니다. (무단이란 사전 연락이 없는 경우, 늦잠, 깜빡해서, 학원 갈 기분이 아니라서 등이 해당되며 습관상의 문제는 무단지각·무단결석으로 간주하여 보강수업이 어렵습니다.)',
  ], { size: 9.4 });
  c.subTitle('4. 수업 운영 및 생활 규정');
  c.bullets(['수업 중 무단이탈, 음식섭취, 이어폰 사용을 하지 않습니다.', '수업 종료 시 선생님의 종례 후 귀가 가능합니다.', '규정 위반 시 제재가 있을 수 있음을 인지합니다.'], { size: 9.4 });
  c.subTitle('5. 작품 및 학습관리');
  c.bullets(['모든 수업에 대한 자료와 개인 작품은 외부 반출이 불가합니다.', '성적표 제출 및 학습관리 요청에 협조합니다. (성적표는 복사 후 상담에만 사용되며 개인신상은 외부로 누출하지 않습니다.)'], { size: 9.4 });
  c.subTitle('6. 안전 및 기타');
  c.bullets(['학원 내·외부에서 흡연하지 않습니다.', '안전 수칙을 준수하며 타인에게 피해를 주지 않습니다.'], { size: 9.4 });
  c.space(4);
  c.checkbox(MARGIN, c.y - 2, !!form.ruleAgree);
  c.page.drawText('위의 모든 사항에 동의합니다.', { x: MARGIN + 16, y: c.y - 2, size: 10.5, font: c.font, color: BLACK });
  c.space(24);
  c.field('날짜', dateStr);
  c.field('학교 / 학년', `${form.school || ''}  /  ${form.grade || ''}`);
  c.field('학생 이름', form.studentNameConfirm || link.student_name || '');
  c.space(8);
  c.signatureBox(MARGIN, c.y - 90, 200, 80, '학생 서명 (인)', studentSigImg);
  c.space(100);

  // ================= PAGE 8 : 개인정보 및 초상권 동의서 =================
  c.newPage();
  c.image(c.assets.docLogo, { maxWidth: 300 });
  c.space(10);
  c.title('개인정보 및 초상권 동의서', { size: 15.5 });
  c.paragraph('본 학원은 아래와 같이 개인정보 수집·이용 및 CCTV 이용에 대한 동의를 받고자 합니다.', { size: 9.6 });
  c.space(4);
  c.subTitle('▶ 개인정보 수집 및 이용');
  c.bullets(['수집항목: 학생이름, 생년월일, 학교/학년, 연락처, 주소, 성적표, 학부모님의 성명과 연락처 등', '이용목적: 교육청 기반 학원생 관리, 수업, 상담, 출결관리, 각종 공모전 및 실기대회 참가 시'], { size: 9.2 });
  c.subTitle('▶ 개인정보의 보유 및 이용 기간');
  c.bullets(['학원설립·운영 및 과외교습에 관한 법률에 의하여 등록일로부터 3년간 보관합니다. 단, 학원 수강기간이 등록일로부터 3년 이상일 시 퇴원 시까지 보관합니다.'], { size: 9.2 });
  c.paragraph('※ 개인정보는 「개인정보보호법」에 따라 보호됩니다.', { size: 8.6, color: GRAY_TEXT });
  c.paragraph('※ 정보주체 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체없이 파기합니다.', { size: 8.6, color: GRAY_TEXT });
  c.space(4);
  c.subTitle('▶ 초상권 및 작품·홍보 활용 동의');
  c.bullets([
    '학생사진, 영상, 수업장면 및 수업작품, 학업 성과는 학원 내부 게시·교육자료, 블로그·SNS·홈페이지 등 온라인 홍보, 노트·브로슈어·포스터 등 오프라인 광고 및 홍보물의 범위 내에서 활용될 수 있습니다.',
    '공모전·실기대회 수상 및 예고·미대 합격 시 해당 사실 및 결과가 홍보자료에 기재될 수 있습니다.',
    '학원 등록 기간 동안 진행된 모든 작품(그림, 디지털작업 포함)은 퇴원 이후에도 별도의 기한 없이 학원의 내·외부 및 온·오프라인 광고에 활용될 수 있습니다.',
    '학생의 실명은 공개되지 않으며 필요 시 일부 가공될 수 있고, 본 활용에 대해 별도의 보상은 제공되지 않습니다.',
  ], { size: 9.2 });
  c.subTitle('▶ CCTV 촬영 및 운영');
  c.bullets(['설치위치: 인포메이션, 강의실, 복도, 출입구 등 / 촬영목적: 시설 안전 및 사고 예방(도난, 범죄예방, 화재, 시설안전, 흡연 예방). 영상 확인은 관리 책임자 승인 하에 가능합니다.'], { size: 9.2 });
  c.subTitle('▶ 동의를 거부할 권리');
  c.bullets(['귀하는 위 개인정보 수집·이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부하는 경우 학원 등록에 제한이 있을 수 있습니다.'], { size: 9.2 });
  c.space(2);
  c.checkbox(MARGIN, c.y - 2, !!form.privacyAgree);
  c.page.drawText('본인은 상기의 모든 내용을 숙지 및 이해하였으며, 이에 동의합니다.', { x: MARGIN + 16, y: c.y - 2, size: 10.2, font: c.font, color: BLACK });
  c.space(22);
  c.field('날짜', dateStr);
  c.field('학생 성명', form.studentNameConfirm || link.student_name || '');
  c.field('학부모 성명', form.parentName || '');
  c.space(8);
  c.signatureBox(MARGIN, c.y - 90, 200, 80, '학생 서명(또는 인)', studentSigImg);
  c.signatureBox(MARGIN + 220, c.y - 90, 200, 80, '학부모 서명(또는 인)', parentSigImg);
  c.space(28);
  c.centeredText(`${c.program.academyName} 귀중`, { size: 13.5 });
  c.space(80);

  // ================= PAGE 9 : 위트젠 출결정보 개인정보 활용 동의서 =================
  c.newPage();
  c.title('출결정보 시스템 위트젠', { size: 15.5 });
  c.subTitle('개인정보 활용 동의서', { size: 12.5 });
  c.paragraph(`위트젠은 ${c.program.academyNameShort} 서울대캠퍼스 학생 등·하원 시 알림 문자를 전송하는 회사입니다. 당 회사에 정보제공을 위한 동의서입니다.`, { size: 9.4 });
  c.space(4);
  c.paragraph('본 학원(이하 "학원")은 학원관리프로그램의 운영과 출결문자메시지 전송 서비스를 제공하기 위하여 다음과 같은 개인정보를 수집 및 이용하며, 회원(이하 "회원" 또는 "정보주체")은 이에 대한 설명을 충분히 받았으며 이에 동의합니다.', { size: 9, lineHeight: 13 });
  c.space(4);
  c.subTitle('1. 필수항목 (학생 이름 / 학부모 휴대번호)', { size: 10.2 });
  c.bullets(['미동의 시 출결문자 메시지 전송 서비스를 받으실 수 없습니다.'], { size: 9 });
  { const y0 = c.y; let bx = MARGIN; bx += c.agreeBox('동의', bx, y0, form.witzenRequired === 'agree') + 8; c.agreeBox('미동의', bx, y0, form.witzenRequired === 'disagree'); c.space(28); }
  c.subTitle('2. 선택항목 (학교이름, 학년, 반, 생년월일, 학생휴대번호, 학부모성함, 주소)', { size: 10.2 });
  c.bullets(['미동의 시 진학상담 및 공지 관련 문자 전송 서비스를 받으실 수 없습니다.'], { size: 9 });
  { const y0 = c.y; let bx = MARGIN; bx += c.agreeBox('동의', bx, y0, form.witzenOptional === 'agree') + 8; c.agreeBox('미동의', bx, y0, form.witzenOptional === 'disagree'); c.space(28); }
  c.subTitle('3. 출결인증 수단 (지문 및 비밀번호)', { size: 10.2 });
  c.paragraph('본 학원은 지문인식 출결 단말기를 사용하며, "지문" 또는 "비밀번호"로 학생의 출결을 인증합니다. 동의하셔야 출결 문자메시지 전송 서비스를 받으실 수 있습니다.', { size: 9 });
  { const y0 = c.y; let bx = MARGIN; bx += c.agreeBox('동의', bx, y0, form.witzenBiometric === 'agree') + 8; c.agreeBox('미동의', bx, y0, form.witzenBiometric === 'disagree'); c.space(30); }

  c.subTitle('제공자(학생) 인적사항', { size: 10.5 });
  c.field('성명', form.studentNameConfirm || link.student_name || '');
  c.field('연령 / 성별', `${form.providerAge || ''}세  /  ${form.providerGender || ''}`);
  c.field('주소', form.providerAddress || '');
  c.field('연락처', form.providerPhone || '');
  c.space(6);
  c.subTitle('법정대리인 인적사항', { size: 10.5 });
  c.field('성명', form.parentName || '');
  c.field('관계', form.guardianRelation || '');
  c.field('주소', form.guardianAddress || '');
  c.field('연락처', form.guardianPhone || '');
  c.space(4);
  c.paragraph('학원은 개인정보의 보유기간 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기하며, 「개인정보보호법」에 따라 정보주체의 개인정보 보호를 위해 최선을 다합니다. (수탁업체: (주)위트젠, 개인정보보호책임자: 총괄이사 변인호 02-429-0911)', { size: 8.6, color: GRAY_TEXT, lineHeight: 12.5 });
  c.space(6);
  c.field('날짜', dateStr);
  c.space(6);
  c.signatureBox(MARGIN, c.y - 78, 190, 70, '제공자(학생) 서명', studentSigImg);
  c.signatureBox(MARGIN + 210, c.y - 78, 190, 70, '법정대리인(학부모) 서명', parentSigImg);
  c.space(90);

}
