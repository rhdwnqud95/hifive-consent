'use client';
import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'sec-info', label: '1. 학원생활안내' },
  { id: 'sec-rules', label: '2. 수업규정 동의서' },
  { id: 'sec-privacy', label: '3. 개인정보 동의서' },
  { id: 'sec-witzen1', label: '4. 출결시스템 동의서1' },
  { id: 'sec-witzen2', label: '5. 출결시스템 동의서2' },
];

export default function SectionNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-88px 0px -70% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: '#fff',
        borderBottom: '1px solid #eee',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        whiteSpace: 'nowrap',
        padding: '10px 12px',
        marginBottom: 16,
      }}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.id)}
            style={{
              display: 'inline-block',
              marginRight: 8,
              padding: '7px 13px',
              fontSize: 12.5,
              borderRadius: 999,
              border: '1px solid ' + (isActive ? '#18264A' : '#ddd'),
              background: isActive ? '#18264A' : '#fff',
              color: isActive ? '#fff' : '#444',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
            }}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
