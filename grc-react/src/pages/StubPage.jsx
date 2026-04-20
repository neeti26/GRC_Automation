import Btn from '../components/Btn';

const stubs = {
  tests:         { icon: '🧪', title: 'Tests', desc: 'Automated compliance tests will appear here.' },
  policies:      { icon: '📄', title: 'Policies', desc: 'Your compliance policies will appear here.' },
  cloud:         { icon: '☁️', title: 'Cloud', desc: 'Cloud compliance data will appear here.' },
  vault:         { icon: '🔒', title: 'Vault', desc: 'Secure vault items will appear here.' },
  risk:          { icon: '⚠️', title: 'Risk Management', desc: 'Risk register and assessments will appear here.' },
  findings:      { icon: '🔍', title: 'Findings', desc: 'Vulnerability findings will appear here.' },
  targets:       { icon: '🎯', title: 'Targets', desc: 'Scan targets will appear here.' },
  scans:         { icon: '🔬', title: 'Third Party Scans', desc: 'Third party scan results will appear here.' },
  trustvault:    { icon: '🛡️', title: 'Trust Vault', desc: 'Trust documents will appear here.' },
  questionnaire: { icon: '📝', title: 'Questionnaire', desc: 'Security questionnaires will appear here.' },
  audit:         { icon: '📊', title: 'Audit Center', desc: 'Audit management will appear here.' },
  corrective:    { icon: '🔧', title: 'Corrective Action', desc: 'Corrective actions will appear here.' },
  employees:     { icon: '👥', title: 'Employees', desc: 'Employee directory will appear here.' },
  training:      { icon: '🎓', title: 'Training Campaigns', desc: 'Security training campaigns will appear here.' },
  access:        { icon: '🔑', title: 'Access Reviews', desc: 'Access review cycles will appear here.' },
};

export default function StubPage({ page, showToast }) {
  const s = stubs[page] || { icon: '📁', title: page, desc: 'Content coming soon.' };
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        {s.title}
        <Btn variant="primary" style={{ marginLeft: 'auto' }} onClick={() => showToast(`Add ${s.title} clicked`)}>+ Add</Btn>
      </div>
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, textAlign: 'center', padding: '80px 24px', color: 'var(--gray-400)' }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>{s.icon}</div>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{s.title}</h3>
        <p style={{ fontSize: 13 }}>{s.desc}</p>
      </div>
    </div>
  );
}
