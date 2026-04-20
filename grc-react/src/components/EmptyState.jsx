export default function EmptyState({ icon, title, desc, action }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--gray-400)' }}>
      <div style={{ fontSize: 44, marginBottom: 10 }}>{icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>{title}</h3>
      {desc && <p style={{ fontSize: 13 }}>{desc}</p>}
      {action && <div style={{ marginTop: 12 }}>{action}</div>}
    </div>
  );
}
