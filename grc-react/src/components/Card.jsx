export default function Card({ children, style, noPad }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12,
      border: '1px solid var(--gray-200)',
      padding: noPad ? 0 : 20,
      ...style,
    }}>
      {children}
    </div>
  );
}

export function CardTitle({ children, action }) {
  return (
    <div style={{
      fontSize: 13, fontWeight: 600, color: 'var(--gray-600)',
      marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6,
    }}>
      {children}
      {action && <span style={{ marginLeft: 'auto' }}>{action}</span>}
    </div>
  );
}
