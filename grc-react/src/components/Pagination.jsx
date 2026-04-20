export default function Pagination({ page, total, perPage, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  const btnStyle = (active) => ({
    padding: '4px 10px', border: '1px solid var(--gray-200)', borderRadius: 6,
    cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
    background: active ? 'var(--gray-800)' : '#fff',
    color: active ? '#fff' : 'var(--gray-800)',
    borderColor: active ? 'var(--gray-800)' : 'var(--gray-200)',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', fontSize: 13, color: 'var(--gray-600)' }}>
      <button style={btnStyle(false)} onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}>‹</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button key={p} style={btnStyle(p === page)} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button style={btnStyle(false)} onClick={() => onChange(Math.min(pages, page + 1))} disabled={page === pages}>›</button>
      <span style={{ marginLeft: 8 }}>{start}–{end} of {total}</span>
    </div>
  );
}
