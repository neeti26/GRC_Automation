import { useState } from 'react';
import { assets as assetData } from '../data';
import Card from '../components/Card';
import Btn from '../components/Btn';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const ASSET_TYPES = Object.keys(assetData);

export default function Assets({ showToast }) {
  const [activeType, setActiveType] = useState(ASSET_TYPES[0]);
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [assets, setAssets] = useState(assetData);
  const [form, setForm] = useState({ id: '', name: '', source: 'AWS', region: 'ap-southeast-1' });

  const rows = (assets[activeType] || []).filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase())
  );

  function handleAdd(e) {
    e.preventDefault();
    setAssets(prev => ({ ...prev, [activeType]: [...(prev[activeType] || []), { ...form, risk: '—' }] }));
    setAddOpen(false);
    setForm({ id: '', name: '', source: 'AWS', region: 'ap-southeast-1' });
    showToast('Asset added');
  }

  const thStyle = { textAlign: 'left', padding: '10px 12px', fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', borderBottom: '1px solid var(--gray-200)', background: 'var(--gray-50)', whiteSpace: 'nowrap' };

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        Asset Management
        <Btn variant="primary" style={{ marginLeft: 'auto' }} onClick={() => setAddOpen(true)}>Add Asset ▾</Btn>
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        {/* Asset type sidebar */}
        <div style={{ width: 175, flexShrink: 0, background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: 8, height: 'fit-content' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', padding: '8px 12px 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Asset Types</div>
          {ASSET_TYPES.map(t => (
            <div key={t} onClick={() => { setActiveType(t); setSearch(''); }}
              style={{
                padding: '7px 12px', borderRadius: 7, fontSize: 12, cursor: 'pointer',
                color: activeType === t ? '#fff' : 'var(--gray-600)',
                background: activeType === t ? 'var(--gray-800)' : 'transparent',
              }}
              onMouseEnter={e => { if (activeType !== t) e.currentTarget.style.background = 'var(--gray-100)'; }}
              onMouseLeave={e => { if (activeType !== t) e.currentTarget.style.background = 'transparent'; }}>
              {t}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontWeight: 600 }}>{activeType}</span>
            <span style={{ background: 'var(--gray-200)', color: 'var(--gray-600)', borderRadius: 12, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>{rows.length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name"
              style={{ flex: 1, padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            <Btn onClick={() => showToast('Exported to CSV')}>Export</Btn>
          </div>
          <Card noPad>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: 32 }}><input type="checkbox" /></th>
                    <th style={thStyle}>Resource ID ↕</th>
                    <th style={thStyle}>Resource Name ↕</th>
                    <th style={thStyle}>Source ↕</th>
                    <th style={thStyle}>Risk Associated ↕</th>
                    <th style={thStyle}>Region</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((a, i) => (
                    <tr key={i}
                      onMouseEnter={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'var(--gray-50)')}
                      onMouseLeave={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '')}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }}><input type="checkbox" /></td>
                      <td style={{ padding: '10px 12px', fontSize: 11, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-400)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.id}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)', fontWeight: 500 }}>{a.name}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }}><StatusBadge status="compliant">{a.source}</StatusBadge></td>
                      <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-400)' }}>{a.risk}</td>
                      <td style={{ padding: '10px 12px', fontSize: 12, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-400)' }}>{a.region}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }}>
                        <span style={{ cursor: 'pointer', marginRight: 8 }} onClick={() => showToast('Edit asset')}>✏️</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => showToast('Copied to clipboard')}>📋</span>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--gray-400)' }}>No assets found for {activeType}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title={`Add Asset — ${activeType}`}
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add Asset</Btn></>}>
        <form onSubmit={handleAdd}>
          {[['Resource ID / ARN', 'id'], ['Resource Name', 'name'], ['Region', 'region']].map(([label, key]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{label}</label>
              <input required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Source</label>
            <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, background: '#fff' }}>
              <option>AWS</option><option>Azure</option><option>GCP</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
