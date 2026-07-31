import DocInfo from './DocInfo';
import DocForms from './DocForms';

export default function DocumentContent({ link, f, set, disabled, dateStr, studentSig, parentSig }) {
  return (
    <>
      <DocInfo link={link} />
      <DocForms link={link} f={f} set={set} disabled={disabled} dateStr={dateStr} studentSig={studentSig} parentSig={parentSig} />
    </>
  );
}
