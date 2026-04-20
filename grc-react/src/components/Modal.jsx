import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 16, padding: 28,
          width: 480, maxWidth: '95vw', maxHeight: '90vh',
          overflowY: 'auto', position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', fontSize: 20,
            color: 'var(--gray-400)', cursor: 'pointer', lineHeight: 1,
          }}
        >×</button>
        {title && <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>{title}</h2>}
        {children}
        {footer && (
          <div style={{
            display: 'flex', gap: 10, justifyContent: 'flex-end',
            marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--gray-200)',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
