import { PAGE_STYLE, H1, SEC_TITLE, SUB_TITLE, P, LI, TABLE, TH, TD, InfoTable, InfoFooter } from './formUI';
import { getProgramInfo } from '../lib/programs';

export default function DocInfo({ link }) {
  const program = getProgramInfo(link?.program);
  const isAni = program.key === 'ani';

  return (
    <>
      {/* ---- 학원 생활 안내 (정보성 콘텐츠, 원본 1~5페이지) ---- */}
      <div style={PAGE_STYLE}>
        <div style={H1}>{program.academyName} 학원 생활 안내</div>
        <p style={P}>저희 {program.academyName}에 보내주신 관심과 성원에 감사드리며, 귀댁의 자녀를 안심하고 맡기실 수 있도록 항상 노력하겠습니다. 또한 자녀의 학원생활에 도움을 주고자 학원 생활 안내문을 보내드리니 참고하시고 많은 관심과 지도 부탁드립니다.</p>

        <div style={SEC_TITLE}>1. 학생 수강안내</div>
        <InfoTable header={['학생 이름', '수강 반', '교육비', '수강 시간']} rows={[[link?.student_name || '-', link?.class_name || '-', link?.tuition || '-', link?.schedule || '-']]} />
        <p style={{ ...P, fontSize: 12.5, color: '#666' }}>· 계좌번호: {program.bank}</p>
        <p style={{ ...P, fontSize: 12.5, color: '#666' }}>· 교육비 납부는 현금, 카드, 계좌이체 모두 가능합니다.</p>
        <p style={{ ...P, fontSize: 12.5, color: '#666' }}>· 비대면 카드결제 희망 시 원내 대표번호 02-877-0717로 전화연락 주시면 상세히 안내 도와드리겠습니다.</p>
        {isAni && <p style={{ ...P, fontSize: 12.5, color: '#c11' }}>· {program.cashReceiptNote}</p>}

        <div style={SEC_TITLE}>2. 학원 수업시간 및 교육상담</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>국경일(명절포함), 공휴일, 법정 임시휴일(선거,천재지변)에는 수업을 하지 않습니다. (단, 입시중이거나 실기대회 및 중요한 행사 기간 또는 담당선생님 요청에 의한 보강수업이 이루어지는 경우에는 수업이 진행될 수 있습니다.)</li>
          <li style={LI}>수업중에는 원칙적으로 학생 및 담당 선생님과의 전화연결 및 상담이 불가합니다. 단, 진로 및 진학정보 관련 상담일 경우 원장 또는 부원장과의 상담은 가능합니다.</li>
          <li style={LI}>학원 개방 시간 안내</li>
        </ul>
        <InfoTable header={['요일', '개원시간', '폐원시간']} rows={[['평일', '13:00', '22:00'], ['토요일', '10:00', '19:00']]} />

        <div style={SEC_TITLE}>3. 출결관리</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>학생의 등·하원 및 조퇴 시 지문인식기를 통하여 문자 전송됩니다.</li>
          <li style={{ ...LI, color: '#666', fontSize: 12.5 }}>예) "사랑하는 OOO 학생이 OO:OO에 출석하였습니다. - {program.academyName}"</li>
          <li style={LI}>수업 시작 후 30분 경과까지 등원하지 않으면 학생에게 먼저 연락하며, 연락이 되지 않을 경우 학부모님께 연락을 드립니다.</li>
          <li style={LI}>부득이한 사정으로 결석할 경우에는 사전에 학원으로 연락주시기 바랍니다.</li>
        </ul>

        <div style={SEC_TITLE}>4. 학원내규</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>무단결석이 잦은 학생의 경우 학원 내규에 따라 퇴원 조치할 수 있습니다.</li>
          <li style={LI}>학원 내 폭력, 욕설 등 비인격적 행위를 행한 자는 상담 후 퇴원 조치할 수 있습니다.</li>
          <li style={LI}>담당선생님의 개인적인 사유로 인한 결강 시 보충 수업을 실시합니다.</li>
          <li style={LI}>수업 중 무단 외출 시 무단 결석으로 처리합니다.</li>
          <li style={LI}>담당선생님의 판단 하에 수업분위기를 흐리거나 수업이 불가한 학생은 수업에서 제외할 수 있습니다.</li>
          <li style={LI}>본 학원에서 이루어지는 모든 수업에 대한 자료 및 그림은 외부로 반출할 수 없습니다.</li>
          <li style={LI}>수업 중에는 휴대폰 사용을 금합니다. (급한 용무로 학생과 통화를 원하실 때에는 학원으로 연락주시면 곧바로 연결 해드리겠습니다.)</li>
        </ul>
        <InfoFooter />
      </div>

      <div style={PAGE_STYLE}>
        <div style={SEC_TITLE}>5. 학생관리시스템</div>

        <p style={SUB_TITLE}>▶ 수업 및 실기 관리 시스템</p>
        <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: '12px 16px', marginBottom: 14, background: '#fafafa' }}>
          <p style={P}>매월 실기향상도 Test</p>
          <p style={{ ...P, textAlign: 'center', color: '#004B83', fontWeight: 700 }}>+</p>
          <p style={P}>그림문자 진도상황 Check</p>
          <p style={{ ...P, textAlign: 'center', color: '#004B83', fontWeight: 700 }}>+</p>
          <p style={P}>입시반 연합 모의고사 실시</p>
          <p style={{ ...P, textAlign: 'center', color: '#004B83', fontWeight: 700 }}>+</p>
          <p style={P}>실전능력 배양 실기대회 참가</p>
        </div>

        <p style={SUB_TITLE}>▶ 학과관리</p>
        <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: '12px 16px', marginBottom: 14, background: '#fafafa' }}>
          <p style={P}>Hi5 학생이 되면 본 학원에서 제공, 관리하는 자율학습 참여, 내신/모의고사 성적 체크 및 진학상담, 학생부 상황·실기능력 기반 목표 및 전략설정, 학습 방법과 시간 관리에 대한 컨설팅(원장/부원장/선배의 사례)까지 체계적으로 관리합니다.</p>
          <p style={{ ...P, fontSize: 12.5, color: '#666' }}>흐름: 학생부 상황 → 내신·실기능력 → 목표 및 전략설정</p>
        </div>

        <p style={SUB_TITLE}>▶ 생활관리</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>상담을 통해 주기적으로 학생 상황을 체크합니다.</li>
          <li style={LI}>학부모님과 상담을 통해 학생에 대한 다각적인 정보 교육에 힘씁니다.</li>
          <li style={LI}>출결, 수업태도, 교우관계 등을 입체적으로 관리합니다.</li>
        </ul>

        <div style={SEC_TITLE}>6. 학원 운영 및 수업 규정 안내</div>
        <p style={P}>올바른 수업 환경 조성을 위해, 학생들에게 다시 한번 수업 규칙에 대해 교육할 예정입니다. 아래의 내용은 학원 내 기본 사항으로, 학생과 적극적인 협조와 학부모님의 지도 부탁드립니다.</p>

        <p style={SUB_TITLE}>(1) 전자기기 사용 규정</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>수업 중 휴대폰을 포함한 모든 전자기기의 사용은 원칙적으로 금지합니다.</li>
          <li style={LI}>긴급 상황 시 학원으로 연락주시면 전달 가능합니다.</li>
          <li style={LI}>반복적으로 수업 집중도 저해 시 지도 및 제한 조치가 이루어질 수 있습니다.</li>
        </ul>

        <p style={SUB_TITLE}>(2) 출결 및 보강 규정</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>무단결석 및 잦은 지각은 수업 참여 제한사유가 될 수 있습니다.</li>
          <li style={LI}>보강은 사전 연락시에만 가능하며, 무단결석은 보강이 불가합니다.</li>
          <li style={LI}>병결 등 증빙 가능한 경우에 한해 예외 적용됩니다.</li>
        </ul>

        <p style={SUB_TITLE}>(3) 수업 운영 규정</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>수업시작 5~10분 전 도착을 권장합니다.</li>
          <li style={LI}>수업 중 무단이탈, 음식섭취, 이어폰 등 전자기기 사용은 금지됩니다.</li>
          <li style={LI}>선생님의 지도에 따라 수업이 진행되며, 규정 위반 시 제재될 수 있습니다.</li>
        </ul>

        <p style={SUB_TITLE}>(4) 그림 반출 및 성적표 제출</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>재원 기간 동안 수업자료 및 작품은 외부 반출이 불가합니다.</li>
          <li style={LI}>입시대비 및 컨설팅을 위해 성적표 제출이 요구될 수 있습니다.</li>
          <li style={LI}>학생 그림 및 실기 진행 사항은 아이소식 어플을 통해 확인하실 수 있습니다.</li>
        </ul>

        <p style={SUB_TITLE}>(5) 재료 관리 규정</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>학생 편의를 위해 원내에서 구매대행을 진행하고 있으며, 필요 시 본인이 직접 구매해도 무방합니다.</li>
          <li style={LI}>미술재료의 판매금은 학원의 이익과는 무관합니다.</li>
          <li style={LI}>재료는 학생 개인이 관리하는 것을 원칙으로 합니다.</li>
          <li style={LI}>모든 재료에 이름표를 부착해 전달하고 있으며, 본인의 실수로 인한 분실 및 훼손에 대해 학원은 책임지지 않습니다.</li>
          <li style={LI}>재료 사용 및 관리 방법은 수업시간에 교육이 진행됩니다.</li>
          <li style={LI}>휴퇴원 시 재료보관은 1개월이며 별도의 연락이 없을 시 학원으로 귀속 또는 폐기됩니다.</li>
        </ul>

        <p style={SUB_TITLE}>(6) 생활 및 안전 규정</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>학원 내·외부 흡연은 모두 금지되며, 위반 시 학부모님께 통보 및 퇴원 조치될 수 있습니다.</li>
          <li style={LI}>쉬는 시간은 하루 10분 내외이며 수업 내용 상 쉬는 시간이 별도로 없을 수 있습니다.</li>
          <li style={LI}>안전사고 예방을 위해 기본 생활 수칙을 준수해야 합니다.</li>
        </ul>

        <p style={SUB_TITLE}>(7) 강사진 운영 및 상담 안내</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>모든 강사진은 수업 중 교실에 상주하며 학생을 지도합니다.</li>
          <li style={LI}>모든 강사진은 소방시설점검, 금연캠페인, 성범죄예방교육, 아동·청소년 성폭력경력조회 등을 주기적으로 점검 및 실시하고 있습니다.</li>
          <li style={LI}>학생 및 학부모 상담은 원장 및 부원장 체제로 진행되며, 입시컨설팅과 멘탈케어 시스템으로 구분됩니다.</li>
          <li style={LI}>수업 일 수에 따라 상담 횟수가 상이할 수 있습니다.</li>
          <li style={LI}>상담은 사전 예약제로 운영됩니다.</li>
        </ul>

        <p style={SUB_TITLE}>(8) 책임 및 이용 안내</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>학원은 교육 및 관리 의무를 다하되, 개인 부주의로 인한 사고 및 분실에 대해서는 책임지지 않습니다.</li>
          <li style={LI}>규정 위반 시 수업제한 또는 퇴원 조치가 이루어질 수 있습니다.</li>
          <li style={LI}>학부모(보호자)는 본 규정을 숙지하고 학생이 준수하도록 지도해야 합니다.</li>
        </ul>

        <p style={SUB_TITLE}>(9) 규정 적용 및 동의 안내</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>본 규정은 학원 운영을 위한 기본 기준으로 적용됩니다.</li>
          <li style={LI}>첨부된 별도의 동의서를 통해 관련 사항에 대한 동의가 이루어집니다.</li>
        </ul>
        <InfoFooter />
      </div>

      <div style={PAGE_STYLE}>
        <div style={SEC_TITLE}>7. 수강료 납부 및 관련 규정</div>
        <table style={TABLE}>
          <thead><tr><th colSpan={2} style={{ ...TH, background: '#004B83' }}>정규수업료 납부 안내 (필수)</th></tr></thead>
          <tbody>
            <tr><td style={{ ...TD, fontWeight: 700, width: '38%' }}>수강료 납부일</td><td style={TD}>매월 1일 (등록 시 첫 수업일 전날까지 필히 납부)</td></tr>
            <tr><td style={{ ...TD, fontWeight: 700 }}>수강료 계좌번호</td><td style={TD}>{program.bank}</td></tr>
          </tbody>
        </table>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>교육비 납부는 선납으로 하며 여행, 가족행사, 시험공부 등 개인적 사정에 의한 결강은 인정하지 않으며, 수강기간에 포함됩니다. (본인 희망 시 시험에 의한 결강은 보충수업 가능)</li>
          <li style={{ ...LI, color: '#c11' }}>교육비 납부일은 매월 1일이며, 납부일 기준으로 미납 10일 경과 시 수업을 받을 수 없습니다. (20일 이내 수강료 납부일자를 확정 받을 시 수업 재개)</li>
          <li style={LI}>개인소득공제 및 지출증빙(현금영수증)은 교육비 납부 전 발급받으실 핸드폰번호 혹은 사업자등록번호를 미리 말씀해주셔야 가능합니다.</li>
          {isAni && <li style={{ ...LI, color: '#c11' }}>{program.cashReceiptNote}</li>}
          <li style={LI}>교육청에서 인가되지 않은 여행, 가족행사, 시험공부 등의 개인적 사유는 이월 및 환불이 불가합니다. (교육비 반환기준에 의거)</li>
          <li style={LI}>교육비 반환 기준은 「학원의 설립·운영 및 과외교습에 관한 법률 시행령」 제18조 제3항의 교습비등 반환기준에 의거합니다.</li>
        </ul>

        <table style={TABLE}>
          <thead>
            <tr>
              <th style={TH}>구분</th>
              <th style={TH}>반환사유 발생일</th>
              <th style={TH}>반 환 금 액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={TD}>반환의 사유가 설립·운영자에게 있는 경우</td>
              <td style={TD}>교습을 할 수 없거나 교습 장소를 제공할 수 없게 된 날</td>
              <td style={TD}>이미 납부한 교습비등을 일할(日割) 계산한 금액</td>
            </tr>
            <tr>
              <td style={{ ...TD, fontWeight: 700 }} rowSpan={4}>반환의 사유가<br />학습자에게<br />있는 경우<br /><span style={{ fontWeight: 400, fontSize: 11 }}>(교습기간 1개월 이내)</span></td>
              <td style={TD}>교습 시작 전</td>
              <td style={TD}>이미 납부한 교습비등의 전액</td>
            </tr>
            <tr>
              <td style={TD}>총 교습시간의 1/3 경과 전</td>
              <td style={TD}>이미 납부한 교습비등의 2/3 해당액</td>
            </tr>
            <tr>
              <td style={TD}>총 교습시간의 1/2 경과 전</td>
              <td style={TD}>이미 납부한 교습비등의 1/2 해당액</td>
            </tr>
            <tr>
              <td style={{ ...TD, fontWeight: 700, border: '2px solid #18264A' }}>총 교습시간의 1/2 경과 후</td>
              <td style={{ ...TD, fontWeight: 700, border: '2px solid #18264A' }}>반환하지 아니함</td>
            </tr>
            <tr>
              <td style={{ ...TD, fontWeight: 700 }} rowSpan={2}>반환의 사유가<br />학습자에게<br />있는 경우<br /><span style={{ fontWeight: 400, fontSize: 11 }}>(교습기간 1개월 초과)</span></td>
              <td style={TD}>교습 시작 전</td>
              <td style={TD}>이미 납부한 교습비등의 전액</td>
            </tr>
            <tr>
              <td style={TD}>교습 시작 후</td>
              <td style={TD}>반환사유가 발생한 해당 월의 반환대상 교습비등(교습기간이 1개월 이내인 경우의 기준에 따라 산출한 금액)과 나머지 월의 교습비등의 전액을 합산한 금액</td>
            </tr>
            <tr>
              <td style={{ ...TD, fontWeight: 700 }}>비고</td>
              <td colSpan={2} style={TD}>총 교습시간은 교습기간 중의 총 교습시간을 말하며, 반환금액의 산정은 반환사유가 발생한 날까지 경과된 교습시간을 기준으로 한다.</td>
            </tr>
          </tbody>
        </table>
        <InfoFooter />
      </div>

      <div style={PAGE_STYLE}>
        <div style={H1}>서울대캠퍼스 연간 학사일정 안내</div>
        <p style={{ ...P, color: '#666' }}>연간 주요 학사일정</p>

        <p style={SUB_TITLE}>학생, 학부모님 입시관련 / 정보 / 진학상담 컨설팅</p>
        <table style={TABLE}>
          <thead><tr><th style={TH}>학사일정</th><th style={TH}>일정</th><th style={TH}>상세내용</th></tr></thead>
          <tbody>
            <tr><td style={TD}>학부모님 입시설명회</td><td style={TD}>상반기</td><td style={{ ...TD, textAlign: 'left' }}>전체 규모의 간담회 형식으로 진행되며 연간 중요한 학사일정에 대한 안내와 학생, 학부모님께서 미리 대응해야 하는 입시의 중요 정보를 설명 드리는 전략 입시설명회</td></tr>
            <tr><td style={TD}>학부모님 개별 간담회</td><td style={TD}>&lt;1차&gt; 6월~7월<br />&lt;2차&gt; 12월</td><td style={{ ...TD, textAlign: 'left' }}>1:1 형식으로 진행되며 학생 개개인의 실기력, 역량, 성적대 등을 토대로 한 개별 학부모 간담회</td></tr>
            <tr><td style={TD}>학생대상 OT 및 입시진학 개별면담</td><td style={TD}>3월/6월/12월</td><td style={{ ...TD, textAlign: 'left' }}>학생대상/ 예고, 미대입시진학에 대한 학생 개인별 상담 및 방향성 제시</td></tr>
            <tr><td style={TD}>학생부+모의고사 성적관리 및 체계적 성적관리상담</td><td style={TD}>3월/6월/9월/12월</td><td style={{ ...TD, textAlign: 'left' }}>학생부, 모의고사 성적에 따른 유불리 대학상담 및 클래스 변동, 체계적이며 지속적인 성적 데이터 관리</td></tr>
            <tr><td style={TD}>[고3 대상] 입시(대학)사정/ 원서접수 컨설팅</td><td style={TD}>&lt;수시상담&gt; 9월<br />&lt;정시상담&gt; 12월</td><td style={{ ...TD, textAlign: 'left' }}>실질적인 성적 데이터와 실기상태를 분석하여 가장 유리한 진학 대학에 대한 제시와 전략컨설팅 진행</td></tr>
          </tbody>
        </table>

        <p style={SUB_TITLE}>실기력 평가와 분석, 연합 실기대전/대학 실기대회 일정</p>
        <table style={TABLE}>
          <thead><tr><th style={TH}>학사일정</th><th style={TH}>일정</th><th style={TH}>상세내용</th></tr></thead>
          <tbody>
            <tr><td style={TD}>전국연합 실기대전</td><td style={TD}>&lt;1차&gt; 4월<br />&lt;2~3차&gt; 8월<br />&lt;4차&gt; 12월</td><td style={{ ...TD, textAlign: 'left' }}>중요시기별 전국규모의 실기평가를 통해 개인 실기력에 대한 정확한 분석과 방향성 제시</td></tr>
            <tr><td style={TD}>공모전 및 실기대회 출전</td><td style={TD}>3월~8월</td><td style={{ ...TD, textAlign: 'left' }}>각 대회와 학교(예고,대학)가 선호하는 유형의 방향을 준비하고 테스트해 볼 수 있는 중요한 실기일정</td></tr>
            <tr><td style={TD}>실기력 평가 및 개별 분석</td><td style={TD}>4월/8월/12월</td><td style={{ ...TD, textAlign: 'left' }}>전국 실기대전과 학교(예고,대학) 실기대회를 통해 학생 개인의 방향 분석과 경쟁력 향상</td></tr>
          </tbody>
        </table>

        <p style={SUB_TITLE}>실기력 역량 강화를 위한 특강수업 시스템 및 일정</p>
        <table style={TABLE}>
          <thead><tr><th style={TH}>학사일정</th><th style={TH}>일정</th><th style={TH}>상세내용</th></tr></thead>
          <tbody>
            <tr><td style={TD}>수시대비 특별반</td><td style={TD}>7월~11월</td><td style={{ ...TD, textAlign: 'left' }}>학생 개인별 실기단점을 보완하여, 수시 실기전형의 합격률을 최대로 끌어올리기 위한 체계적인 주말 수업 프로그램</td></tr>
            <tr><td style={TD}>실기역량 강화 특별반 수업</td><td style={TD}>3월~6월</td><td style={{ ...TD, textAlign: 'left' }}>실기대회 및 공모전을 출전하기 위한 반이며, 각 대회와 학교가 선호하는 유형으로 실기대회 및 공모전 준비를 진행</td></tr>
            <tr><td style={TD}>하계연장수업/ 동계연장수업</td><td style={TD}>여름방학(1개월)<br />겨울방학(2개월)</td><td style={{ ...TD, textAlign: 'left' }}>입시반 학생에게는 합격의 당락을 좌우하고 예비반 학생에게는 실기력을 최대로 끌어올릴 수 있는 "파이널 특강수업" 프로그램 (실기유형과 기출주제를 집중적으로 다루게됨)</td></tr>
            <tr><td style={TD}>예술고 추계연장수업</td><td style={TD}>9월~10월</td><td style={{ ...TD, textAlign: 'left' }}>2학기를 맞이해 예술고 실기시험을 위한 예고반만의 집중수업 프로그램</td></tr>
          </tbody>
        </table>
        <p style={{ ...P, fontSize: 12, color: '#c11', textAlign: 'right' }}>*모든 학사일정은 상황에 따라 횟수와 일정이 변동될 수 있습니다.</p>
        <InfoFooter />
      </div>
    </>
  );
}
