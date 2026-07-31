import { PAGE_STYLE, H1, SEC_TITLE, SUB_TITLE, P, LI, FIELD_ROW, LABEL, INPUT, AgreeToggle, ChoiceButtons, CheckRow, SignatureStamp, BarFooter } from './formUI';
import { getProgramInfo } from '../lib/programs';

export default function DocForms({ link, f, set, disabled, dateStr, studentSig, parentSig }) {
  const program = getProgramInfo(link?.program);

  return (
    <>

      <div style={PAGE_STYLE}>
        <div style={H1}>{program.academyName} 서울대캠퍼스</div>
        <div style={H1}>수업규정 학생 동의서</div>

        <div style={SEC_TITLE}>1. 수업 참여 및 태도</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>수업 시간에 성실히 참여하며 선생님의 지도를 따릅니다.</li>
          <li style={LI}>수업 분위기를 저해하는 행동은 하지 않습니다.</li>
        </ul>
        <div style={SEC_TITLE}>2. 전자기기 사용</div>
        <ul style={{ paddingLeft: 18 }}><li style={LI}>수업 중 이어폰, 휴대폰 등의 전자기기 사용은 금지됩니다.</li></ul>
        <div style={SEC_TITLE}>3. 출결 및 보강</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>정당한 사유없는 지각 및 무단결석을 하지 않습니다.</li>
          <li style={LI}>보강수업은 사전 연락 시에만 가능하며, 무단 지각 및 결석은 보강이 불가함을 인지합니다. (무단이란 사전 연락이 없는 경우, 늦잠, 깜빡해서, 학원 갈 기분이 아니라서 등이 해당되며 습관상의 문제는 무단지각·무단결석으로 간주하여 보강수업이 어렵습니다.)</li>
        </ul>
        <div style={SEC_TITLE}>4. 수업 운영 및 생활 규정</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>수업 중 무단이탈, 음식섭취, 이어폰 사용을 하지 않습니다.</li>
          <li style={LI}>수업 종료 시 선생님의 종례 후 귀가 가능합니다.</li>
          <li style={LI}>규정 위반 시 제재가 있을 수 있음을 인지합니다.</li>
        </ul>
        <div style={SEC_TITLE}>5. 작품 및 학습관리</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>모든 수업에 대한 자료와 개인 작품은 외부 반출이 불가합니다.</li>
          <li style={LI}>성적표 제출 및 학습관리 요청에 협조합니다. (성적표는 복사 후 상담에만 사용되며 개인신상은 외부로 누출하지 않습니다.)</li>
        </ul>
        <div style={SEC_TITLE}>6. 안전 및 기타</div>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>학원 내·외부에서 흡연하지 않습니다.</li>
          <li style={LI}>안전 수칙을 준수하며 타인에게 피해를 주지 않습니다.</li>
        </ul>

        <CheckRow checked={f.ruleAgree} disabled={disabled} onChange={(v) => set('ruleAgree', v)}>위의 모든 사항에 동의합니다.</CheckRow>

        <div style={FIELD_ROW}><span style={LABEL}>날짜</span><span style={{ ...INPUT, border: 'none', padding: '7px 0' }}>{dateStr}</span></div>
        <div style={FIELD_ROW}>
          <span style={LABEL}>학교·학년</span>
          <input style={INPUT} disabled={disabled} placeholder="학교명" value={f.school} onChange={(e) => set('school', e.target.value)} />
          <input style={{ ...INPUT, flex: 0.6 }} disabled={disabled} placeholder="학년" value={f.grade} onChange={(e) => set('grade', e.target.value)} />
        </div>
        <div style={FIELD_ROW}>
          <span style={LABEL}>학생이름</span>
          <input style={INPUT} disabled={disabled} value={f.studentNameConfirm} onChange={(e) => set('studentNameConfirm', e.target.value)} />
        </div>
        <div style={{ marginTop: 14 }}><SignatureStamp label="학생 서명 (인)" dataUrl={studentSig} /></div>
        <BarFooter program={program} />
      </div>

      <div style={PAGE_STYLE}>
        <div style={H1}>{program.academyName} 서울대캠퍼스</div>
        <div style={H1}>개인정보 및 초상권 동의서</div>
        <p style={P}>본 학원은 아래와 같이 개인정보 수집·이용 및 CCTV 이용에 대한 동의를 받고자 합니다.</p>

        <div style={SEC_TITLE}>▶ 개인정보 수집 및 이용</div>
        <p style={P}>· 수집항목: 학생이름, 생년월일, 학교/학년, 연락처, 주소, 성적표, 학부모님의 성명과 연락처 등</p>
        <p style={P}>· 이용목적: 교육청 기반 학원생 관리, 수업, 상담, 출결관리, 각종 공모전 및 실기대회 참가 시</p>

        <div style={SEC_TITLE}>▶ 개인정보의 보유 및 이용 기간</div>
        <p style={P}>· 학원설립·운영 및 과외교습에 관한 법률에 의하여 등록일로부터 3년간 보관합니다. 단, 학원 수강기간이 등록일로부터 3년 이상일 시 퇴원 시까지 보관합니다.</p>
        <p style={{ ...P, fontSize: 12.5, color: '#666' }}>※ 개인정보는 「개인정보보호법」에 따라 보호됩니다.</p>
        <p style={{ ...P, fontSize: 12.5, color: '#666' }}>※ 정보주체 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체없이 파기합니다.</p>

        <div style={SEC_TITLE}>▶ 초상권 및 작품·홍보 활용 동의</div>
        <p style={P}>· 학생사진, 영상, 수업장면 및 수업작품, 학업 성과는 학원 내부 게시·교육자료, 블로그·SNS·홈페이지 등 온라인 홍보, 노트·브로슈어·포스터 등 오프라인 광고 및 홍보물의 범위 내에서 활용될 수 있습니다.</p>
        <p style={P}>· 차후 공모전 및 실기대회 수상 및 예고와 미대 합격 시 해당 수상·합격 사실 및 결과가 홍보자료에 기재될 수 있습니다.</p>
        <p style={P}>· 학원 등록 기간동안 진행된 모든 작품(그림, 디지털작업 포함)은 퇴원 이후에도 별도의 기한없이 학원의 내·외부 및 온·오프라인 광고에 활용될 수 있습니다.</p>
        <p style={P}>· 학생의 실명은 공개되지 않으며 필요 시 일부 가공될 수 있습니다.</p>
        <p style={P}>· 본 활용에 대해 별도의 보상은 제공되지 않습니다.</p>

        <div style={SEC_TITLE}>▶ CCTV 촬영 및 운영</div>
        <p style={P}>· 설치위치: 인포메이션, 강의실, 복도, 출입구 등</p>
        <p style={P}>· 촬영목적: 시설 안전 및 사고 예방(도난, 범죄예방, 화재, 시설안전, 흡연 예방)</p>
        <p style={{ ...P, fontSize: 12.5, color: '#666' }}>※ 영상 확인은 관리 책임자 승인 하에 가능합니다.</p>

        <div style={SEC_TITLE}>▶ 동의를 거부할 권리</div>
        <p style={P}>귀하는 위와 같은 개인정보를 수집·이용에 대한 동의를 거부할 권리가 있습니다.</p>
        <p style={P}>· 동의를 거부하는 경우에는 학원 등록에 제한이 있습니다.</p>

        <CheckRow checked={f.privacyAgree} disabled={disabled} onChange={(v) => set('privacyAgree', v)}>본인은 상기의 모든 내용을 숙지 및 이해하였으며, 이에 동의합니다.</CheckRow>

        <div style={FIELD_ROW}><span style={LABEL}>날짜</span><span style={{ ...INPUT, border: 'none', padding: '7px 0' }}>{dateStr}</span></div>
        <div style={FIELD_ROW}>
          <span style={LABEL}>학생성명</span>
          <input style={INPUT} disabled={disabled} value={f.studentNameConfirm} onChange={(e) => set('studentNameConfirm', e.target.value)} />
        </div>
        <div style={FIELD_ROW}>
          <span style={LABEL}>학부모성명</span>
          <input style={INPUT} disabled={disabled} placeholder="학부모 성함" value={f.parentName} onChange={(e) => set('parentName', e.target.value)} />
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 20 }}>
          <SignatureStamp label="학생 서명(또는 인)" dataUrl={studentSig} />
          <SignatureStamp label="학부모 서명(또는 인)" dataUrl={parentSig} />
        </div>
        <p style={{ ...P, textAlign: 'center', fontWeight: 700, fontSize: 15, marginTop: 18 }}>{program.academyName} 귀중</p>
        <BarFooter program={program} />
      </div>

      <div style={PAGE_STYLE}>
        <div style={H1}>출결정보 시스템 위트젠</div>
        <div style={H1}>개인정보 활용 동의서</div>
        <p style={P}>위트젠은 {program.academyNameShort} 서울대캠퍼스 학생 등·하원 시 알림 문자를 전송하는 회사입니다. 당 회사에 정보제공을 위한 동의서입니다.</p>
        <p style={P}>본 학원(이하 "학원")은 학원관리프로그램의 운영과 출결문자메시지 전송 서비스를 제공하기 위하여 다음과 같은 개인정보를 수집 및 이용하며, 회원(이하 "회원" 또는 "정보주체")은 이에 대한 설명을 충분히 받았으며 이에 동의합니다.</p>

        <div style={SEC_TITLE}>1. 필수항목 (학생 이름 / 학부모 휴대번호)</div>
        <p style={P}>미동의 시 출결문자 메시지 전송 서비스를 받으실 수 없습니다.</p>
        <AgreeToggle name="witzenRequired" value={f.witzenRequired} disabled={disabled} onChange={(v) => set('witzenRequired', v)} />

        <div style={SEC_TITLE}>2. 선택항목 (학교이름, 학년, 반, 생년월일, 학생휴대번호, 학부모성함, 주소)</div>
        <p style={P}>미동의 시 진학상담 및 공지 관련 문자 전송 서비스를 받으실 수 없습니다.</p>
        <AgreeToggle name="witzenOptional" value={f.witzenOptional} disabled={disabled} onChange={(v) => set('witzenOptional', v)} />

        <div style={SEC_TITLE}>3. 출결인증 수단 (지문 및 비밀번호)</div>
        <p style={P}>본 학원은 지문인식 출결 단말기를 사용하며, "지문" 또는 "비밀번호"로 학생의 출결을 인증합니다. 동의하셔야 출결 문자메시지 전송 서비스를 받으실 수 있습니다.</p>
        <AgreeToggle name="witzenBiometric" value={f.witzenBiometric} disabled={disabled} onChange={(v) => set('witzenBiometric', v)} />

        <div style={SEC_TITLE}>제공자(학생) 인적사항</div>
        <div style={FIELD_ROW}>
          <span style={LABEL}>성명</span><input style={INPUT} disabled value={f.studentNameConfirm} />
          <span style={LABEL}>연령</span><input style={{ ...INPUT, flex: 0.5 }} disabled={disabled} placeholder="만 세" value={f.providerAge} onChange={(e) => set('providerAge', e.target.value)} />
        </div>
        <div style={FIELD_ROW}>
          <span style={LABEL}>성별</span>
          <ChoiceButtons value={f.providerGender} disabled={disabled} onChange={(v) => set('providerGender', v)} options={['남', '여']} />
        </div>
        <div style={FIELD_ROW}><span style={LABEL}>주소</span><input style={INPUT} disabled={disabled} value={f.providerAddress} onChange={(e) => set('providerAddress', e.target.value)} /></div>
        <div style={FIELD_ROW}><span style={LABEL}>연락처</span><input style={INPUT} disabled={disabled} value={f.providerPhone} onChange={(e) => set('providerPhone', e.target.value)} /></div>

        <div style={SEC_TITLE}>법정대리인 인적사항</div>
        <div style={FIELD_ROW}>
          <span style={LABEL}>성명</span><input style={INPUT} disabled={disabled} value={f.parentName} onChange={(e) => set('parentName', e.target.value)} />
          <span style={LABEL}>관계</span>
          <ChoiceButtons value={f.guardianRelation} disabled={disabled} onChange={(v) => set('guardianRelation', v)} options={['부', '모', '기타']} />
        </div>
        <div style={FIELD_ROW}><span style={LABEL}>주소</span><input style={INPUT} disabled={disabled} value={f.guardianAddress} onChange={(e) => set('guardianAddress', e.target.value)} /></div>
        <div style={FIELD_ROW}><span style={LABEL}>연락처</span><input style={INPUT} disabled={disabled} value={f.guardianPhone} onChange={(e) => set('guardianPhone', e.target.value)} /></div>

        <p style={{ ...P, marginTop: 16, color: '#666' }}>
          "학원"은 개인정보의 보유기간 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. "학원"은 『개인정보보호법』에 따라 정보주체의 개인정보보호를 위하여 최선을 다하고 있습니다. (수탁업체: ㈜위트젠, 개인정보보호책임자: 총괄이사 변인호 02-429-0911)
        </p>

        <div style={FIELD_ROW}><span style={LABEL}>날짜</span><span style={{ ...INPUT, border: 'none', padding: '7px 0' }}>{dateStr}</span></div>
        <div style={{ marginTop: 10, display: 'flex', gap: 24 }}>
          <SignatureStamp label="제공자(학생) 서명" dataUrl={studentSig} />
          <SignatureStamp label="법정대리인(학부모) 서명" dataUrl={parentSig} />
        </div>
        <BarFooter program={program} />
      </div>

      <div style={PAGE_STYLE}>
        <div style={H1}>위트젠 출결관리 서비스 관련 조항</div>

        <div style={SEC_TITLE}>제1조 (개인정보의 처리 목적)</div>
        <p style={P}>① 학원관리프로그램의 운영 ② 학생 출석, 귀가, 결석, 수납안내, 공지 메시지 전송 ③ 홈페이지 콘텐츠 제공 ④ 회원제 서비스에 따른 본인확인, 개인식별, 고지사항 전달 ⑤ 회원과의 커뮤니티 구성(학습지도, Q&amp;A 등)</p>

        <div style={SEC_TITLE}>제2조 (개인정보의 처리 및 보유기간)</div>
        <p style={P}>학원가입 후 해지(해지·탈퇴)시 까지 이며 이 기간 이내에서 개인정보를 처리·보유합니다. 단 ① 채권·채무 관계 잔존시 해당 채권·채무관계 정산시까지 ② 관계 법령에 따라 보관이 필요한 경우 해당 사유 종료시까지</p>

        <div style={SEC_TITLE}>제3조 (개인정보의 제3자 제공)</div>
        <p style={P}>학원은 본 서비스 제공을 위하여 사용하는 "학원관리프로그램" 제공업체인 ㈜위트젠(이하 "위트젠")에 정보주체의 개인정보를 정보주체의 동의를 받아 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 제공합니다.</p>

        <div style={SEC_TITLE}>제4조 (개인정보처리의 위탁)</div>
        <p style={P}>① 학원은 "학원관리프로그램"의 운영을 위하여 제1조의 목적으로 위트젠에 개인정보처리를 위탁합니다.</p>
        <p style={P}>② 위탁하는 개인정보 항목</p>
        <p style={{ ...P, paddingLeft: 16 }}>1) 필수항목 : 학생이름, 학부모휴대번호</p>
        <p style={{ ...P, paddingLeft: 16 }}>2) 선택항목 : 학교이름, 학년, 반, 진학희망학교, 생일(음/양력), 집전화번호, 학생휴대번호, 학부모이름, 주소, 학생사진, 학생지문정보</p>
        <p style={P}>③ 개인정보의 보유 및 이용기간 : 제2조(개인정보의 처리 및 보유기간)과 동일</p>
        <p style={P}>④ 위트젠은 학원이 위탁한 정보주체의 개인정보에 대해 재위탁 하지 않으며 『개인정보보호법』에 따라 아래의 안전성을 확보 조치를 취하고 있습니다.</p>
        <ul style={{ paddingLeft: 18 }}>
          <li style={LI}>위트젠 개인정보 보호책임자 : 총괄이사 변인호 02-429-0911 hakwon@hakwon.in</li>
          <li style={LI}>개인정보보호 추진계획의 수립 및 시행</li>
          <li style={LI}>년 1회 "개인정보보호 교육" 실시</li>
          <li style={LI}>비밀번호, 바이오정보, 고유식별번호 암호화</li>
          <li style={LI}>고유식별번호는 인터넷 구간, DMZ구간 저장 시 암호화하고 내부망 저장시 위험도 분석에 따라 암호화</li>
          <li style={LI}>비밀번호 안전성 체크 및 유효기간 체크</li>
          <li style={LI}>고유식별번호(ID, 비밀번호 등) 전송 시 암호화하여 전송</li>
          <li style={LI}>방화벽 운영</li>
          <li style={LI}>백신소프트웨어를 사용하여 자동 업데이트</li>
          <li style={LI}>개인정보처리시스템에 무단접근 통제</li>
          <li style={LI}>개인정보처리시스템의 접속기록은 최소 6개월간 보관</li>
          <li style={LI}>개인정보처리시스템의 접근권한 변경내역 최소 3년간 보관</li>
          <li style={LI}>실시간 보안관제 모니터링 및 이벤트 분석·대응</li>
          <li style={LI}>문서양식의 개인정보는 잠금 장치가 된 보관장소에 보관</li>
          <li style={LI}>보유기간이 경과한 개인정보 문서는 문서파쇄기로 파쇄</li>
        </ul>

        <div style={SEC_TITLE}>제5조 (개인정보의 파기)</div>
        <p style={P}>① 학원은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기하며 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</p>
        <p style={P}>② 파기사유가 발생한 개인정보는 전자기적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하거나 제3자에게 위탁된 개인정보는 파기하도록 지시하고, 종이 문서에 기록·저장된 개인정보는 문서파쇄기로 파쇄하거나 소각하여 파기합니다.</p>

        <p style={{ ...P, fontSize: 12, color: '#888', marginTop: 12 }}>본 문서는 {program.academyName} 신입생 서류의 일부로, 온라인 동의 및 전자서명을 통해 제출되었습니다. 제출 이후 내용의 수정 및 삭제는 불가하며, 원본은 학원에서 보관합니다.</p>

        <CheckRow checked={f.witzenTermsAgree} disabled={disabled} onChange={(v) => set('witzenTermsAgree', v)}>위트젠 출결관리 서비스 관련 조항의 모든 내용을 확인하였으며 이에 동의합니다.</CheckRow>

        <div style={FIELD_ROW}><span style={LABEL}>날짜</span><span style={{ ...INPUT, border: 'none', padding: '7px 0' }}>{dateStr}</span></div>
        <div style={{ marginTop: 10, display: 'flex', gap: 24 }}>
          <SignatureStamp label="학생 서명(또는 인)" dataUrl={studentSig} />
          <SignatureStamp label="학부모 서명(또는 인)" dataUrl={parentSig} />
        </div>
        <BarFooter program={program} />
      </div>
    </>
  );
}
