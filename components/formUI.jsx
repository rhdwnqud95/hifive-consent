export const PAGE_STYLE = {
  width: 760,
  maxWidth: '100%',
  margin: '0 auto 24px',
  background: '#fff',
  borderRadius: 10,
  padding: '36px 40px',
  boxShadow: '0 2px 14px rgba(0,0,0,0.06)',
  boxSizing: 'border-box',
  scrollMarginTop: 72,
};

export const H1 = { fontSize: 19, fontWeight: 700, textAlign: 'center', marginBottom: 4 };
export const SUB = { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 22 };
export const SEC_TITLE = { fontSize: 15, fontWeight: 700, marginTop: 18, marginBottom: 8, borderLeft: '4px solid #004B83', paddingLeft: 8, color: '#18264A' };
export const SUB_TITLE = { fontSize: 13, fontWeight: 700, marginTop: 12, marginBottom: 6, color: '#004B83' };
export const P = { fontSize: 13.5, lineHeight: 1.75, margin: '4px 0' };
export const LI = { fontSize: 13.5, lineHeight: 1.75 };
export const FIELD_ROW = { display: 'flex', alignItems: 'center', gap: 8, margin: '10px 0', flexWrap: 'wrap' };
export const LABEL = { fontSize: 13.5, color: '#333', minWidth: 92 };
export const INPUT = { flex: 1, minWidth: 140, padding: '7px 9px', fontSize: 13.5, border: '1px solid #ccc', borderRadius: 5, boxSizing: 'border-box' };
export const TABLE = { width: '100%', borderCollapse: 'collapse', margin: '8px 0 14px' };
export const TH = { background: '#004B83', color: '#fff', padding: '8px 10px', fontSize: 12.5, border: '1px solid #ccc', textAlign: 'center' };
export const TD = { padding: '8px 10px', fontSize: 12.5, border: '1px solid #ddd', textAlign: 'center' };
export function InfoTable({ header, rows }) {
  return (
    <table style={TABLE}>
      <thead><tr>{header.map((h, i) => <th key={i} style={TH}>{h}</th>)}</tr></thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j} style={TD}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
export function AgreeToggle({ value, onChange, disabled, name }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {['agree', 'disagree'].map((v) => (
        <label key={v} style={{
          display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, padding: '5px 10px',
          border: '1px solid ' + (value === v ? '#1a1a1a' : '#ddd'),
          background: value === v ? '#1a1a1a' : '#fff',
          color: value === v ? '#fff' : '#333',
          borderRadius: 6, cursor: disabled ? 'default' : 'pointer',
        }}>
          <input type="radio" name={name} checked={value === v} disabled={disabled} onChange={() => onChange(v)} style={{ display: 'none' }} />
          {v === 'agree' ? '동의' : '미동의'}
        </label>
      ))}
    </div>
  );
}
export function ChoiceButtons({ value, onChange, disabled, options }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {options.map((o) => (
        <button type="button" key={o} disabled={disabled} onClick={() => onChange(o)}
          style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid ' + (value === o ? '#1a1a1a' : '#ddd'), background: value === o ? '#1a1a1a' : '#fff', color: value === o ? '#fff' : '#333', cursor: disabled ? 'default' : 'pointer' }}>
          {o}
        </button>
      ))}
    </div>
  );
}
export function CheckRow({ checked, onChange, disabled, children }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13.5, lineHeight: 1.6, margin: '10px 0', cursor: disabled ? 'default' : 'pointer' }}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} style={{ marginTop: 3 }} />
      <span>{children}</span>
    </label>
  );
}
export function SignatureStamp({ label, dataUrl }) {
  return (
    <div style={{ display: 'inline-block', width: 'clamp(110px, 42vw, 220px)', maxWidth: '100%', boxSizing: 'border-box' }}>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{label}</div>
      <div style={{ border: '1px solid #ccc', borderRadius: 6, background: '#fbfbfb', width: '100%', height: 'clamp(50px, 17vw, 90px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxSizing: 'border-box' }}>
        {dataUrl ? (
          <img src={dataUrl} alt={label} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        ) : (
          <span style={{ fontSize: 12, color: '#bbb' }}>서명 전</span>
        )}
      </div>
    </div>
  );
}
export function Center({ children }) {
  return (
    <div style={{ maxWidth: 480, margin: '120px auto', textAlign: 'center', padding: 24, fontSize: 16, lineHeight: 1.8 }}>
      {children}
    </div>
  );
}
export const ADDRESS_TEXT = '서울시 관악구 남부순환로 1761 서원빌딩 4층';
export const PHONE_TEXT = '02-877-0717';

export function InfoFooter() {
  return (
    <div style={{ marginTop: 26, paddingTop: 14, borderTop: '1px solid #e5e5e5', fontSize: 11.5, color: '#888', textAlign: 'center' }}>
      <span style={{ fontWeight: 700, color: '#004B83' }}>A</span> {ADDRESS_TEXT} &nbsp;&nbsp;&nbsp;
      <span style={{ fontWeight: 700, color: '#004B83' }}>T</span> {PHONE_TEXT}
    </div>
  );
}

export function BarFooter({ program }) {
  const name = program?.academyNameShort || '하이파이브 미술학원';
  return (
    <div style={{
      marginTop: 26, marginLeft: -40, marginRight: -40, marginBottom: -36,
      background: '#18264A', color: '#fff', padding: '12px 40px',
      borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5,
    }}>
      <span style={{ fontWeight: 700 }}>{name}</span>
      <span>문의 {PHONE_TEXT}</span>
    </div>
  );
}
