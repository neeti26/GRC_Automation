import { useState } from 'react';
import { vendors as initialVendors } from '../data';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import StatusBadge from '../components/StatusBadge';
import Btn from '../components/Btn';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';

export default function Vendors({ showToast }) {
  const [tab, setTab] = useState('Dashboard');
  const [vendors, setVendors] = useState(initialVendors);
  const [addOpen, setAddOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [form, setForm] = useState({ name: '', category: '', assignee: '' });

  function handleAdd(e) {
    e.preventDefault();
    setVendors(prev => [...prev, { ...form, id: Date.now(), status: 'not-assessed', risk: 'Not Available' }]);
    setAddOpen(false);
    setForm({ name: '', category: '', assignee: '' });
    showToast('Vendor added');
  }

  const statCounts = {
    'not-assessed': vendors.filter(v => v.status === 'not-assessed').length,
    'in-progress': vendors.filter(v => v.status === 'in-progress').length,
    'needs-attention': vendors.filter(v => v.status === 'needs-attention').length,
    completed: vendors.filter(v => v.status === 'completed').length,
  };

  const thStyle = { textAlign: 'left', padding: '10px 12px', fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-50)' };

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        Vendor Management
        <Btn variant="primary" style={{ marginLeft: 'auto' }} onClick={() => setAddOpen(true)}>Add Vendor ▾</Btn>
      </div>

      <Tabs tabs={['Dashboard', 'Vendors', 'Questionnaires', 'Mitigation Tasks', 'Onboarding']} active={tab} onChange={setTab} />

      {tab === 'Dashboard' && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <select style={{ padding: '6px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Assignee</option>
            </select>
            <select style={{ padding: '6px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Category</option><option>Cloud Provider</option><option>Data Processing</option><option>Security</option><option>SaaS</option>
            </select>
            <select style={{ padding: '6px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Entities</option>
            </select>
            <select style={{ padding: '6px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Vendor Status 2</option><option>Not Assessed</option><option>In Progress</option><option>Completed</option>
            </select>
            <button onClick={() => showToast('Refreshed')} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--gray-200)', background: '#fff', cursor: 'pointer', fontSize: 14 }}>↻</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
            {[{ label: 'Not Assessed', key: 'not-assessed', color: 'var(--gray-400)' },
              { label: 'In Progress', key: 'in-progress', color: 'var(--yellow)' },
              { label: 'Needs Attention', key: 'needs-attention', color: 'var(--red)' },
              { label: 'Completed', key: 'completed', color: 'var(--green)' }].map(s => (
              <div key={s.key} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: s.color, marginBottom: 4 }}>{s.label} ⓘ</div>
                <div style={{ fontSize: 26, fontWeight: 700 }}>{statCounts[s.key]}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Card><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Questionnaire Status</div><EmptyState icon="📋" title="No data to display" /></Card>
            <Card><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Mitigation Task Status</div><EmptyState icon="🛡️" title="No data to display" /></Card>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14, display: 'flex', alignItems: 'center' }}>
                Vendors by Assignee
                <select style={{ marginLeft: 'auto', padding: '4px 8px', border: '1px solid var(--gray-200)', borderRadius: 6, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
                  <option>Assignee</option>
                </select>
              </div>
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3.8" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#9ca3af" strokeWidth="3.8" strokeDasharray="100 0" />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>Total</div>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{vendors.length}</div>
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--gray-400)' }}>Not Assessed: {statCounts['not-assessed']}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>In Progress: {statCounts['in-progress']}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Needs Attention: {statCounts['needs-attention']}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Completed: {statCounts['completed']}</div>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Vendor Risk Comparison</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120, padding: '0 16px' }}>
                {['Not Available', 'Low', 'Medium', 'High'].map((label, i) => (
                  <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', background: i === 0 ? '#f59e0b' : 'var(--gray-200)', height: i === 0 ? 80 : 8, borderRadius: 4 }} />
                    <div style={{ fontSize: 10, color: 'var(--gray-400)', textAlign: 'center' }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11 }}>
                <span><span style={{ display: 'inline-block', width: 8, height: 8, background: '#f59e0b', borderRadius: 2, marginRight: 4 }} />Inherent</span>
                <span><span style={{ display: 'inline-block', width: 8, height: 8, background: '#ef4444', borderRadius: 2, marginRight: 4 }} />Residual</span>
              </div>
            </Card>
          </div>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Upcoming Vendor for Review ⓘ</div>
            <EmptyState icon="🔍" title="No Data Found" />
          </Card>
        </>
      )}

      {tab === 'Vendors' && (
        <Card noPad>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 32 }}><input type="checkbox" /></th>
                  <th style={thStyle}>Vendor Name ↕</th>
                  <th style={thStyle}>Category ↕</th>
                  <th style={thStyle}>Status ↕</th>
                  <th style={thStyle}>Risk ↕</th>
                  <th style={thStyle}>Assignee ↕</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map(v => (
                  <tr key={v.id} style={{ cursor: 'pointer' }} onClick={() => setDetailItem(v)}
                    onMouseEnter={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'var(--gray-50)')}
                    onMouseLeave={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '')}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }} onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                    <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)', color: 'var(--teal)', fontWeight: 500 }}>{v.name}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)' }}>{v.category}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }}><StatusBadge status={v.status} /></td>
                    <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)' }}>{v.risk}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)' }}>{v.assignee || '—'}</td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }} onClick={e => e.stopPropagation()}>
                      <Btn small onClick={() => showToast(`Sending questionnaire to ${v.name}`)}>Send Questionnaire</Btn>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {(tab === 'Questionnaires' || tab === 'Mitigation Tasks' || tab === 'Onboarding') && (
        <EmptyState icon="📋" title={`No ${tab} yet`} desc="Data will appear here once vendors are assessed." />
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Vendor"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add Vendor</Btn></>}>
        <form onSubmit={handleAdd}>
          {[['Vendor Name', 'name'], ['Category', 'category'], ['Assignee', 'assignee']].map(([label, key]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{label}</label>
              <input required={key !== 'assignee'} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            </div>
          ))}
        </form>
      </Modal>

      <Modal open={!!detailItem} onClose={() => setDetailItem(null)} title="Vendor Details"
        footer={<Btn onClick={() => setDetailItem(null)}>Close</Btn>}>
        {detailItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Name', detailItem.name], ['Category', detailItem.category], ['Risk', detailItem.risk], ['Assignee', detailItem.assignee || 'Unassigned']].map(([k, v]) => (
              <div key={k}><div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 2 }}>{k}</div><div style={{ fontSize: 14 }}>{v}</div></div>
            ))}
            <div><div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 4 }}>Status</div><StatusBadge status={detailItem.status} /></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
