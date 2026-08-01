import { PAGE_W, PAGE_H, MARGIN, CONTENT_W, NAVY, NAVY_DARK, GRAY_BOX, BLACK, WHITE, RED, GRAY_LINE, GRAY_TEXT } from './pdfCore.js';

export function drawPages1to3(c, { link }) {
  // ---------- PAGE 1 : cover + 학생 수강안내 + 학원 수업시간 ----------
  c.newPage({ chrome: false });
  c.image(c.assets.coverLogo, { maxWidth: 420 });
  c.space(6);
  c.paragraph(
    `저희 ${c.program.academyName}에 보내주신 관심과 성원에 감사드리며, 귀댁의 자녀를 안심하고 맡기실 수 있도록 항상 노력하겠습니다.\n또한 자녀의 학원생활에 도움을 주고자 학원 생활 안내문을 보내드리니 참고하시고 많은 관심과 지도 부탁드립니다.`,
    { size: 9.6, lineHeight: 14 }
  );
  c.space(14);
  c.title('1. 학생 수강안내');
  const half = (CONTENT_W - 0) / 2;
  c.table({
    colWidths: [half * 0.42, half * 0.58, half * 0.42, half * 0.58],
    rowHeight: 30,
    rows: [
      [{ text: '학생 이름', head: true }, { text: link.student_name || '' }, { text: '수강 반', head: true }, { text: link.class_name || '' }],
      [{ text: '교육비', head: true }, { text: link.tuition || '' }, { text: '수강 시간', head: true }, { text: link.schedule || '' }],
    ],
  });
  c.y += 10;
  c.table({
    colWidths: [half * 0.42, half * 1.58],
    rowHeight: 30,
    rows: [[{ text: '계좌번호', head: true }, { text: c.program.bankLine }]],
  });
  {
    const payBullets = ['교육비 납부는 현금, 카드, 계좌이체 모두 가능합니다.', '비대면 카드결제 희망 시 원내 대표번호 02.877.0717로 전화연락 주시면 상세히 안내 도와드리겠습니다.'];
    const payColors = [null, null];
    if (c.program.cashReceiptNote) { payBullets.push(c.program.cashReceiptNote); payColors.push(RED); }
    c.bullets(payBullets, { size: 9, colors: payColors });
  }
  c.space(6);
  c.title('2. 학원 수업시간 및 교육상담');
  c.bullets([
    '국경일(명절포함), 공휴일, 법정 임시휴일(선거,천재지변)에는 수업을 하지 않습니다. (단, 입시중이거나 실기대회 및 중요한 행사 기간 또는 담당선생님 요청에 의한 보강수업이 이루어지는 경우에는 수업이 진행될 수 있습니다.)',
    '수업중에는 원칙적으로 학생 및 담당 선생님과의 전화연결 및 상담이 불가합니다. 단, 진로 및 진학정보 관련 상담일 경우 원장 또는 부원장과의 상담은 가능합니다.',
  ]);
  c.subTitle('▶ 학원 개방 시간 안내', { size: 10.5 });
  c.table({
    colWidths: [CONTENT_W * 0.25, CONTENT_W * 0.375, CONTENT_W * 0.375],
    rowHeight: 24,
    rows: [
      [{ text: '요일 \\ 시간', head: true }, { text: '개원시간', head: true }, { text: '폐원시간', head: true }],
      [{ text: '평일', head: true }, { text: '13:00' }, { text: '22:00' }],
      [{ text: '토요일', head: true }, { text: '10:00' }, { text: '19:00' }],
    ],
  });

  // ---------- 출결관리 + 학원내규 (continues on page 1, same chrome-less cover page) ----------
  c.space(10);
  c.title('3. 출결관리');
  c.bullets([
    `학생의 등·하원 및 조퇴 시 지문인식기를 통하여 문자 전송됩니다.\n예) "사랑하는 OOO 학생이 OO:OO에 출석하였습니다. - ${c.program.academyName}"`,
    '수업 시작 후 30분 경과까지 등원하지 않으면 학생에게 먼저 연락하며, 연락이 되지 않을 경우 학부모님께 연락을 드립니다.',
    '부득이한 사정으로 결석할 경우에는 사전에 학원으로 연락주시기 바랍니다.',
  ]);
  c.space(10);
  c.title('4. 학원내규');
  c.bullets([
    '무단결석이 잦은 학생의 경우 학원 내규에 따라 퇴원 조치할 수 있습니다.',
    '학원 내 폭력, 욕설 등 비인격적 행위를 행한 자는 상담 후 퇴원 조치할 수 있습니다.',
    '담당선생님의 개인적인 사유로 인한 결강 시 보충 수업을 실시합니다.',
    '수업 중 무단 외출 시 무단 결석으로 처리합니다.',
    '담당선생님의 판단 하에 수업분위기를 흐리거나 수업이 불가한 학생은 수업에서 제외할 수 있습니다.',
    '본 학원에서 이루어지는 모든 수업에 대한 자료 및 그림은 외부로 반출할 수 없습니다.',
    '수업 중에는 휴대폰 사용을 금합니다. (급한 용무로 학생과 통화를 원하실 때에는 학원으로 연락주시면 곧바로 연결 해드리겠습니다.)',
  ]);

  // ---------- PAGE 2 : 학생관리시스템 + 운영규정(1~4) ----------
  c.newPage({ chrome: 'plain' });
  c.title('5. 학생관리시스템');
  c.subTitle('▶ 수업 및 실기 관리 시스템');
  c.bullets(['매월 실기향상도 Test + 그림문자 진도상황 Check + 입시반 연합 모의고사 실시 + 실전능력 배양을 위한 실기대회 참가로 이어지는 관리 시스템을 운영합니다.'], { size: 9.4 });
  c.subTitle('▶ 학과관리');
  c.bullets(['Hi5 학생이 되면 자율학습 참여, 내신/모의고사 성적 체크 및 진학상담, 학생부 상황·실기능력 기반 목표 및 전략설정, 학습 방법과 시간 관리에 대한 컨설팅(원장/부원장/선배의 사례)까지 체계적으로 관리합니다.'], { size: 9.4 });
  c.subTitle('▶ 생활관리');
  c.bullets([
    '상담을 통해 주기적으로 학생 상황을 체크합니다.',
    '학부모님과 상담을 통해 학생에 대한 다각적인 정보 교육에 힘씁니다.',
    '출결, 수업태도, 교우관계 등을 입체적으로 관리합니다.',
  ], { size: 9.4 });
  c.space(8);
  c.title('6. 학원 운영 및 수업 규정 안내');
  c.paragraph('올바른 수업 환경 조성을 위해, 학생들에게 다시 한번 수업 규칙에 대해 교육할 예정입니다.\n아래의 내용은 학원 내 기본 사항으로, 학생과 적극적인 협조와 학부모님의 지도 부탁드립니다.', { size: 9.4 });
  c.space(6);
  c.subTitle('(1) 전자기기 사용 규정');
  c.bullets(['수업 중 휴대폰을 포함한 모든 전자기기의 사용은 원칙적으로 금지합니다.', '긴급 상황 시 학원으로 연락주시면 전달 가능합니다.', '반복적으로 수업 집중도 저해 시 지도 및 제한 조치가 이루어질 수 있습니다.'], { size: 9.2 });
  c.subTitle('(2) 출결 및 보강 규정');
  c.bullets(['무단결석 및 잦은 지각은 수업 참여 제한사유가 될 수 있습니다.', '보강은 사전 연락시에만 가능하며, 무단결석은 보강이 불가합니다.', '병결 등 증빙 가능한 경우에 한해 예외 적용됩니다.'], { size: 9.2 });
  c.subTitle('(3) 수업 운영 규정');
  c.bullets(['수업시작 5~10분 전 도착을 권장합니다.', '수업 중 무단이탈, 음식섭취, 이어폰 등 전자기기 사용은 금지됩니다.', '선생님의 지도에 따라 수업이 진행되며, 규정 위반 시 제재될 수 있습니다.'], { size: 9.2 });
  c.subTitle('(4) 그림 반출 및 성적표 제출');
  c.bullets(['재원 기간 동안 수업자료 및 작품은 외부 반출이 불가합니다.', '입시대비 및 컨설팅을 위해 성적표 제출이 요구될 수 있습니다.', '학생 그림 및 실기 진행 사항은 아이소식 어플을 통해 확인하실 수 있습니다.'], { size: 9.2 });

}
