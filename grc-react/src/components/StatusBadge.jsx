const colors = {
  compliant:       { bg: '#dcfce7', color: '#16a34a' },
  'non-compliant': { bg: '#fee2e2', color: '#dc2626' },
  'not-applicable':{ bg: '#f3f4f6', color: '#6b7280' },
  'not-uploaded':  { bg: '#f3f4f6', color: '#6b7280' },
  uploaded:        { bg: '#dcfce7', color: '#16a34a' },
  draft:           { bg: '#fef9c3', color: '#ca8a04' },
  'needs-attention':{ bg: '#fee2e2', color: '#dc2626' },
  'in-progress':   { bg: '#fef3c7', color: '#d97706' },
  'not-assessed':  { bg: '#f3f4f6', color: '#6b7280' },
  completed:       { bg: '#dcfce7', color: '#16a34a' },
};

const labels = {
  compliant: 'Compliant',
  'non-compliant': 'Non Compliant',
  'not-applicable': 'Not Applicable',
  'not-uploaded': 'Not Uploaded',
  uploaded: 'Uploaded',
  draft: 'Draft',
  'needs-attention': 'Needs Attention',
  'in-progress': 'In Progress',
  'not-assessed': 'Not Assessed',
  completed: 'Completed',
};

export default function StatusBadge({ status, children, onClick, style }) {
  const c = colors[status] || { bg: '#f3f4f6', color: '#6b7280' };
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '2px 8px', borderRadius: 4,
        fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
        background: c.bg, color: c.color,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children || labels[status] || status}
    </span>
  );
}
