import { useState, useRef, useEffect } from 'react';

export default function CmsColorPalette({ colors, onSelect, title, children }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="cms-colorpicker" ref={wrapRef}>
      <button
        type="button"
        className="cms-rte-btn cms-rte-btn--color"
        title={title}
        onMouseDown={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        {children}
      </button>
      {open && (
        <div className="cms-colorpicker__popup">
          <div className="cms-colorpicker__label">{title}</div>
          <div className="cms-colorpicker__grid">
            {colors.map((c) => (
              <button
                key={c.color}
                type="button"
                className="cms-colorpicker__swatch"
                title={c.label}
                style={{
                  background: c.color === 'transparent' ? 'repeating-linear-gradient(45deg,#e5e7eb 0,#e5e7eb 4px,#fff 4px,#fff 8px)' : c.color,
                  border: c.color === '#ffffff' || c.color === 'transparent' ? '1.5px solid #d1d5db' : '1.5px solid transparent',
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  onSelect(c.color);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
