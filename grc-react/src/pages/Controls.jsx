import { useState, useMemo } from 'react';
import { controls as initialControls } from '../data';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import StatusBadge from '../components/StatusBadge';
import Btn from '../components/Btn';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';

const DOMAINS = ['All Domains', 'Asset Management', 'Business Continuity and Disaster Recovery', 'Capacity and Performance Planning', 'Change Management', 'Cloud Security', 'Compliance', 'Incident Management', 'Security and Privacy Governance', 'Vulnerability Management'];

export default function Controls({ showToast }) {
  const [tab, setTab] = useState('All Controls');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('All Domains');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [controls, setControls] = useState(initialControls);
  const [form, setForm] = useState({ name: '', code: '', domain: '', assignee: '', status: 'non-compliant' });
  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    let d = controls.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.code.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || c.status === statusFilter;
      const matchDomain = domainFilter === 'All Domains' || c.domain === domainFilter;
      const matchAssignee = !assigneeFilter || c.assignee === assigneeFilter;
      return matchSearch && matchStatus && matchDomain && matchAssignee;
    });
    d.sort((a, b) => {
      const av = a[sortKey] || '', bv = b[sortKey] || '';
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return d;
  }, [controls, search, statusFilter, domainFilter, assigneeFilter, sortKey, sortDir]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  }

  function handleAdd(e) {
    e.preventDefault();
    setControls(prev => [...prev, { ...form, id: Date.now() }]);
    setAddOpen(false);
    setForm({ name: '', code: '', domain: '', assignee: '', status: 'non-compliant' });
    showToast('Control added successfully');
  }

  const compliant = controls.filter(c => c.status === 'compliant').length;
  const nonCompliant = controls.filter(c => c.status === 'non-compliant').length;
  const na = controls.filter(c => c.status === 'not-applicable').length;

  const thStyle = (key) => ({
    textAlign: 'left', padding: '10px 12px', fontSize: 12, fontWeight: 600,
    color: sortKey === key ? 'var(--gray-800)' : 'var(--gray-400)',
    borderBottom: '1px solid var(--gray-200)', whiteSpace: 'nowrap',
    background: 'var(--gray-50)', cursor: 'pointer', userSelect: 'none',
  });

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        Controls <span style={{ background: 'var(--gray-200)', color: 'var(--gray-600)', borderRadius: 12, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>{controls.length}</span>
        <Btn variant="primary" style={{ marginLeft: 'auto' }} onClick={() => setAddOpen(true)}>Add Custom Control</Btn>
      </div>

      <Tabs tabs={['Dashboard', 'All Controls']} active={tab} onChange={t => { setTab(t); setPage(1); }} />

      {tab === 'All Controls' && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Compliant', val: compliant, sub: `/121`, cls: '#16a34a', key: 'compliant' },
              { label: 'Non Compliant', val: nonCompliant, cls: '#dc2626', key: 'non-compliant' },
              { label: 'Not Applicable', val: na, cls: 'var(--gray-400)', key: 'not-applicable' },
            ].map(s => (
              <div
                key={s.key}
                onClick={() => { setStatusFilter(statusFilter === s.key ? '' : s.key); setPage(1); }}
                style={{
                  flex: 1, background: '#fff', border: `2px solid ${statusFilter === s.key ? s.cls : 'var(--gray-200)'}`,
                  borderRadius: 10, padding: '14px 20px', cursor: 'pointer', transition: 'border-color 0.15s',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: s.cls, marginBottom: 4 }}>{s.label} ⓘ</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{s.val}{s.sub && <span style={{ fontSize: 15, color: 'var(--gray-400)' }}>{s.sub}</span>}</div>
              </div>
            ))}
          </div>

          {statusFilter && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'var(--teal)', color: '#fff', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                {statusFilter} <button onClick={() => setStatusFilter('')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
              </span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <input
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by control name"
              style={{ flex: 1, minWidth: 180, padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }}
            />
            <select value={assigneeFilter} onChange={e => { setAssigneeFilter(e.target.value); setPage(1); }}
              style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option value="">Assignee</option>
              <option value="Balaji">Balaji</option>
              <option value="">Unassigned</option>
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Framework 1</option>
              <option>ISO 27001:2022</option>
              <option>SOC 2</option>
              <option>MAS TRM 2021</option>
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Entities</option>
            </select>
            <select value={domainFilter} onChange={e => { setDomainFilter(e.target.value); setPage(1); }}
              style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              {DOMAINS.map(d => <option key={d}>{d}</option>)}
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Function Grouping</option>
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Control Scope 1</option>
            </select>
            <Btn onClick={() => showToast('Columns customized')}>Columns 5 ▾</Btn>
            <Btn onClick={() => showToast('Exported to CSV')}>Export</Btn>
            <button onClick={() => { setSearch(''); setStatusFilter(''); setDomainFilter('All Domains'); setAssigneeFilter(''); setPage(1); }} style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid var(--gray-200)', background: '#fff', cursor: 'pointer', fontSize: 14 }} title="Reset filters">↻</button>
          </div>

          <Card noPad>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle(), width: 32 }}><input type="checkbox" /></th>
                    <th style={thStyle('name')} onClick={() => handleSort('name')}>Control Name {sortKey === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
                    <th style={thStyle('code')} onClick={() => handleSort('code')}>Control Code {sortKey === 'code' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
                    <th style={thStyle('domain')} onClick={() => handleSort('domain')}>Control Domain {sortKey === 'domain' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
                    <th style={thStyle('assignee')} onClick={() => handleSort('assignee')}>Assignee {sortKey === 'assignee' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
                    <th style={thStyle('status')} onClick={() => handleSort('status')}>Status {sortKey === 'status' ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(c => (
                    <tr key={c.id} style={{ cursor: 'pointer' }} onClick={() => setDetailItem(c)}
                      onMouseEnter={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'var(--gray-50)')}
                      onMouseLeave={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '')}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }} onClick={e => e.stopPropagation()}><input type="checkbox" /></td>
                      <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)', color: 'var(--teal)', fontWeight: 500 }}>{c.name}</td>
                      <td style={{ padding: '10px 12px', fontSize: 12, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-400)' }}>{c.code}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)' }}>{c.domain}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)' }}>{c.assignee || '—'}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }}><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--gray-400)' }}>No controls found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
          </Card>
        </>
      )}

      {tab === 'Dashboard' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Status Overview</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ label: 'Compliant', val: compliant, total: controls.length, color: '#22c55e' },
                { label: 'Non Compliant', val: nonCompliant, total: controls.length, color: '#ef4444' },
                { label: 'Not Applicable', val: na, total: controls.length, color: 'var(--gray-400)' }].map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span>{s.label}</span><span style={{ fontWeight: 600 }}>{s.val}</span>
                  </div>
                  <ProgressBar value={(s.val / s.total) * 100} color={s.color} />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Top Non-Compliant Domains</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ label: 'Business Continuity', val: 5, max: 5 },
                { label: 'Asset Management', val: 4, max: 5 },
                { label: 'Capacity Planning', val: 3, max: 5 },
                { label: 'Change Management', val: 1, max: 5 }].map(d => (
                <div key={d.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>{d.label}</span><span>{d.val}</span></div>
                  <ProgressBar value={(d.val / d.max) * 100} color="#ef4444" />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Compliance Rate</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--teal)', textAlign: 'center', marginTop: 20 }}>
              {Math.round((compliant / controls.length) * 100)}%
            </div>
            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-400)', marginTop: 8 }}>{compliant} of {controls.length} controls compliant</div>
          </Card>
        </div>
      )}

      {/* Add Control Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Custom Control"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add Control</Btn></>}>
        <form onSubmit={handleAdd}>
          {[['Control Name', 'name', 'text'], ['Control Code', 'code', 'text'], ['Assignee', 'assignee', 'text']].map(([label, key, type]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{label}</label>
              <input required={key !== 'assignee'} type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Domain</label>
            <select value={form.domain} onChange={e => setForm(f => ({ ...f, domain: e.target.value }))}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, background: '#fff' }}>
              {DOMAINS.slice(1).map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, background: '#fff' }}>
              <option value="compliant">Compliant</option>
              <option value="non-compliant">Non Compliant</option>
              <option value="not-applicable">Not Applicable</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal open={!!detailItem} onClose={() => setDetailItem(null)} title="Control Details"
        footer={<Btn onClick={() => setDetailItem(null)}>Close</Btn>}>
        {detailItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[['Control Name', detailItem.name], ['Control Code', detailItem.code], ['Domain', detailItem.domain], ['Assignee', detailItem.assignee || 'Unassigned']].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 14 }}>{v}</div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 4 }}>Status</div>
              <StatusBadge status={detailItem.status} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
