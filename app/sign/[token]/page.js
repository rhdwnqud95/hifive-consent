'use client';
import { useEffect, useState } from 'react';
import SignaturePad from '../../../components/SignaturePad';
import { Center, PAGE_STYLE } from '../../../components/formUI';
import DocumentContent from '../../../components/DocumentContent';
import SectionNav from '../../../components/SectionNav';

export default function SignPage({ params }) {
  const { token } = params;
  const [status, setStatus] = useState('loading');
  const [link, setLink] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [locked, setLocked] = useState(false);
  const [studentSig, setStudentSig] = useState('');
  const [parentSig, setParentSig] = useState('');
  const [validationError, setValidationError] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState('');

  const [f, setF] = useState({
    school: '', grade: '', studentNameConfirm: '', parentName: '',
    ruleAgree: false, privacyAgree: false, witzenTermsAgree: false,
    witzenRequired: '', witzenOptional: '', witzenBiometric: '',
    providerAge: '', providerGender: '', providerAddress: '', providerPhone: '',
    guardianRelation: '', guardianAddress: '', guardianPhone: '',
  });

  useEffect(() => {
    fetch(`/api/sign/${token}`)
      .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (!ok) { setStatus('notfound'); return; }
        setLink(d.link);
        setF((prev) => ({ ...prev, school: d.link.school || '', grade: d.link.grade || '', studentNameConfirm: d.link.student_name || '' }));
        setStatus(d.link.already_signed ? 'already' : 'ready');
      })
      .catch(() => setStatus('notfound'));
  }, [token]);

  function set(key, value) {
    setF((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    if (!f.school.trim() || !f.grade.trim()) return '학교와 학년을 입력해주세요.';
    if (!f.studentNameConfirm.trim() || !f.parentName.trim()) return '학생 성명과 학부모 성명을 입력해주세요.';
    if (!f.ruleAgree) return '수업규정 동의서에 동의해주세요.';
    if (!f.privacyAgree) return '개인정보 및 초상권 동의서에 동의해주세요.';
    if (!f.witzenTermsAgree) return '위트젠 출결관리 서비스 관련 조항에 동의해주세요.';
    if (!f.witzenRequired || !f.witzenOptional || !f.witzenBiometric) return '위트젠 출결정보 동의 항목을 모두 선택해주세요.';
    if (!f.providerAge.trim() || !f.providerGender || !f.providerAddress.trim() || !f.providerPhone.trim()) return '제공자(학생) 인적사항을 모두 입력해주세요.';
    if (!f.guardianRelation || !f.guardianAddress.trim() || !f.guardianPhone.trim()) return '법정대리인 인적사항을 모두 입력해주세요.';
    if (!studentSig) return '학생 서명을 해주세요.';
    if (!parentSig) return '학부모 서명을 해주세요.';
    return '';
  }

  function handleSubmitClick() {
    const err = validate();
    if (err) { setValidationError(err); return; }
    setValidationError('');
    setConfirmOpen(true);
  }

  async function doSubmit() {
    setConfirmOpen(false);
    setLocked(true);
    setStatus('submitting');

    try {
      const res = await fetch(`/api/sign/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: { ...f, submittedAt: new Date().toISOString() },
          studentSig,
          parentSig,
        }),
      });

      if (res.ok) {
        setStatus('done');
      } else {
        const d = await res.json().catch(() => ({}));
        if (d.error === 'already_signed') setStatus('already');
        else { setStatus('error'); setErrorMsg(d.error || '제출 중 오류가 발생했습니다.'); setLocked(false); }
      }
    } catch (e) {
      setStatus('error');
      setErrorMsg('제출 중 오류가 발생했습니다. 네트워크 상태를 확인 후 다시 시도해주세요.');
      setLocked(false);
    }
  }

  if (status === 'loading') return <Center>불러오는 중...</Center>;
  if (status === 'notfound') return <Center>유효하지 않은 링크입니다. 학원에 문의해주세요.</Center>;
  if (status === 'already') {
    return (
      <Center>
        ✅ 이미 서명이 완료된 서류입니다.
        <br />수정 및 재제출은 불가합니다. 문의사항은 학원(02-877-0717)으로 연락해주세요.
        <br />
        <button
          onClick={async () => {
            setPdfError('');
            setPdfLoading(true);
            try {
              const res = await fetch(`/api/sign/${token}/pdf-url`);
              const d = await res.json();
              if (res.ok && d.url) window.open(d.url, '_blank');
              else setPdfError(d.error === 'not_submitted' ? 'PDF를 아직 준비 중입니다. 잠시 후 다시 시도해주세요.' : 'PDF를 불러오지 못했습니다.');
            } catch (e) {
              setPdfError('PDF를 불러오지 못했습니다.');
            }
            setPdfLoading(false);
          }}
          disabled={pdfLoading}
          style={{ marginTop: 16, padding: '10px 24px', fontSize: 14, fontWeight: 700, color: '#fff', background: pdfLoading ? '#999' : '#18264A', border: 'none', borderRadius: 8, cursor: pdfLoading ? 'default' : 'pointer' }}
        >
          {pdfLoading ? '불러오는 중...' : '제출한 내용 보기 (PDF)'}
        </button>
        {pdfError && <div style={{ marginTop: 10, color: 'crimson', fontSize: 13 }}>{pdfError}</div>}
      </Center>
    );
  }
  if (status === 'done') {
    return (
      <Center>
        ✅ 서명이 완료되었습니다. 감사합니다.
        <br /><span style={{ fontSize: 13, color: '#888' }}>제출하신 서류는 학원에서 PDF로 보관 및 출력됩니다.</span>
      </Center>
    );
  }
  if (status === 'error') {
    return (
      <Center>
        ⚠️ {errorMsg || '오류가 발생했습니다.'}
        <br /><button onClick={() => setStatus('ready')} style={{ marginTop: 16, padding: '10px 20px', fontSize: 14, borderRadius: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>다시 시도하기</button>
      </Center>
    );
  }

  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  const disabled = locked;

  return (
    <div style={{ padding: '28px 12px 80px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: 4 }}>{link?.program === 'ani' ? 'AniHi만화학원' : '서울대Hi5미술학원'} 신입생 서류</h2>
        <p style={{ color: '#888', fontSize: 13.5 }}>
          아래 학원 생활 안내와 4개 동의서를 확인하시고, 각 항목에 동의 및 서명해주세요. <b>제출 후에는 수정·삭제가 불가합니다.</b>
        </p>
      </div>

      <SectionNav />

      <DocumentContent link={link} f={f} set={set} disabled={disabled} dateStr={dateStr} studentSig={studentSig} parentSig={parentSig} />

      <div style={{ ...PAGE_STYLE, textAlign: 'center' }}>
        <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
          아래에 학생·학부모 서명을 한 번만 입력하시면 위 4개 서류 모두에 자동으로 반영됩니다.
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <SignaturePad label="학생 서명" disabled={disabled} onChange={setStudentSig} />
          <SignaturePad label="학부모 서명" disabled={disabled} onChange={setParentSig} />
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
        {validationError && (
          <div style={{ color: 'crimson', marginBottom: 12, fontSize: 14, fontWeight: 600 }}>{validationError}</div>
        )}
        {!confirmOpen && (
          <button onClick={handleSubmitClick} disabled={locked}
            style={{ padding: '14px 36px', fontSize: 16, fontWeight: 700, color: '#fff', background: locked ? '#999' : '#18264A', border: 'none', borderRadius: 10, cursor: locked ? 'default' : 'pointer' }}>
            {status === 'submitting' ? '제출 중...' : '동의하고 제출하기'}
          </button>
        )}
        {confirmOpen && (
          <div style={{ background: '#fff8f0', border: '1px solid #f0c987', borderRadius: 10, padding: 20, marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>제출 후에는 내용을 수정하거나 삭제할 수 없습니다.</div>
            <div style={{ fontSize: 13.5, color: '#666', marginBottom: 14 }}>모든 내용을 확인하셨나요? 정말 제출하시겠습니까?</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => setConfirmOpen(false)} style={{ padding: '10px 24px', fontSize: 14, background: '#fff', color: '#333', border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer' }}>
                취소
              </button>
              <button onClick={doSubmit} style={{ padding: '10px 24px', fontSize: 14, fontWeight: 700, background: '#18264A', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                예, 제출합니다
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
