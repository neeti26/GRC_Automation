export default function ProgressBar({ value, color = 'var(--teal)', style }) {
  return (
    <div style={{ height: 7, background: 'var(--gray-200)', borderRadius: 4, overflow: 'hidden', marginTop: 6, ...style }}>
      <div style={{ height: '100%', width: `${Math.min(value, 100)}%`, background: color, borderRadius: 4, transition: 'width 0.4s' }} />
    </div>
  );
}
