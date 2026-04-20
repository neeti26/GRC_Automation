export default function Btn({ children, variant = 'default', onClick, style, small }) {
  const base = {
    padding: small ? '4px 10px' : '7px 13px',
    borderRadius: 8, fontSize: small ? 11 : 12, fontWeight: 500,
    cursor: 'pointer', border: '1px solid var(--gray-200)',
    background: '#fff', color: 'var(--gray-800)',
    transition: 'background 0.12s', whiteSpace: 'nowrap',
    fontFamily: 'inherit',
  };
  const variants = {
    primary: { background: 'var(--purple)', color: '#fff', border: '1px solid var(--purple)' },
    teal:    { background: 'var(--teal)',   color: '#fff', border: '1px solid var(--teal)' },
    danger:  { background: 'var(--red)',    color: '#fff', border: '1px solid var(--red)' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...(variants[variant] || {}), ...style }}>
      {children}
    </button>
  );
}
