import { useEffect, useState } from 'react';

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300); }, 2500);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24,
      background: 'var(--gray-800)', color: '#fff',
      padding: '12px 20px', borderRadius: 10, fontSize: 13,
      zIndex: 2000, pointerEvents: 'none',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(8px)',
      transition: 'all 0.25s',
    }}>
      {message}
    </div>
  );
}
