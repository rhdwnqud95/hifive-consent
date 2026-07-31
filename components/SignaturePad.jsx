'use client';
import { useRef, useEffect, useState } from 'react';

export default function SignaturePad({ label, disabled, onChange }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    const ctx = canvas.getContext('2d');
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1a1a1a';
  }, []);

  function getPos(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  function start(e) {
    if (disabled) return;
    e.preventDefault();
    drawingRef.current = true;
    lastRef.current = getPos(e);
  }
  function move(e) {
    if (disabled || !drawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastRef.current.x, lastRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastRef.current = pos;
    if (empty) setEmpty(false);
  }
  function end() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (onChange) onChange(canvas.toDataURL('image/png'));
  }
  function handleClear() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setEmpty(true);
    if (onChange) onChange('');
  }

  return (
    <div style={{ display: 'inline-block' }}>
      {label && <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{label}</div>}
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 6,
          background: disabled ? '#f5f5f5' : '#fff',
          width: 260,
          height: 110,
          touchAction: 'none',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block', cursor: disabled ? 'default' : 'crosshair' }}
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
      </div>
      {!disabled && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            marginTop: 4,
            fontSize: 12,
            color: '#888',
            background: 'none',
            border: '1px solid #ddd',
            borderRadius: 4,
            padding: '2px 8px',
            cursor: 'pointer',
          }}
        >
          다시 서명
        </button>
      )}
    </div>
  );
}
