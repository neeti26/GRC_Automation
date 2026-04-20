export default function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 20 }}>
      {tabs.map(t => (
        <div
          key={t}
          onClick={() => onChange(t)}
          style={{
            padding: '8px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
            color: active === t ? 'var(--gray-800)' : 'var(--gray-400)',
            borderBottom: active === t ? '2px solid var(--gray-800)' : '2px solid transparent',
            marginBottom: -1, transition: 'color 0.12s',
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
