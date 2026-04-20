import { useState } from 'react';
import Modal from '../components/Modal';
import Btn from '../components/Btn';

const cards = [
  { icon: '👤', bg: '#ede9fe', title: 'Manage Users', desc: 'Save yourself from the tedious task of managing user details.' },
  { icon: '🏢', bg: '#fee2e2', title: 'Organization Info', desc: "Update your organization's info in the right places, quickly and easily." },
  { icon: '💳', bg: '#f0fdf4', title: 'Billing', desc: 'Access your invoice history and outstanding payments from one place.' },
  { icon: '🔔', bg: '#fef9c3', title: 'Notifications', desc: 'Simplified collaboration within organization in a streamlined fashion.' },
  { icon: '🤖', bg: '#ede9fe', title: 'AI Assistant', desc: 'Automated security audit agent that makes your compliance journey quick & painless.' },
  { icon: '📁', bg: '#fce7f3', title: 'Manage Departments', desc: 'Create different departments across the organization.' },
  { icon: '🏗️', bg: '#ecfdf5', title: 'Manage Entities', desc: 'Configure multi-products within organization based on requirement.' },
  { icon: '📎', bg: '#fef3c7', title: 'Manage Evidence Attachment', desc: 'Manage attachments across evidence tasks, including archiving and deletion.' },
  { icon: '🛡️', bg: '#ecfdf5', title: 'Administration', desc: 'Control how your team accesses the platform with SSO login options.' },
];

export default function Settings({ showToast }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Settings</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {cards.map(c => (
          <div key={c.title} onClick={() => setOpen(c)}
            style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--gray-200)', padding: 22, cursor: 'pointer', transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 12 }}>{c.icon}</div>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{c.title}</h3>
            <p style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title}
        footer={<><Btn onClick={() => setOpen(null)}>Cancel</Btn><Btn variant="primary" onClick={() => { showToast('Settings saved'); setOpen(null); }}>Save Changes</Btn></>}>
        {open && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: 16, background: 'var(--gray-50)', borderRadius: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: open.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{open.icon}</div>
              <p style={{ fontSize: 13, color: 'var(--gray-600)' }}>{open.desc}</p>
            </div>
            {open.title === 'Manage Users' && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Invite User by Email</label>
                  <input placeholder="user@company.com" style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Role</label>
                  <select style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, background: '#fff' }}>
                    <option>Admin</option><option>Editor</option><option>Viewer</option>
                  </select>
                </div>
              </div>
            )}
            {open.title === 'Notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Email notifications', 'In-app notifications', 'Weekly digest', 'Compliance alerts'].map(n => (
                  <label key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13 }}>
                    <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} /> {n}
                  </label>
                ))}
              </div>
            )}
            {!['Manage Users', 'Notifications'].includes(open.title) && (
              <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center', padding: '20px 0' }}>Configuration options for {open.title} will appear here.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
