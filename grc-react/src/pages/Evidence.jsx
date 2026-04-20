import { useState, useMemo, useEffect, useRef } from 'react';
import { evidences as initialEvidences } from '../data';
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import StatusBadge from '../components/StatusBadge';
import Btn from '../components/Btn';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip, Legend);

function EvidenceByAssigneeChart({ evidences }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const noAssignee = evidences.filter(e => !e.assignee);
    const balaji = evidences.filter(e => e.assignee === 'Balaji');
    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: ['No Assignee', 'Balaji'],
        datasets: [
          { label: 'Not Uploaded', data: [noAssignee.filter(e=>e.status==='not-uploaded').length, balaji.filter(e=>e.status==='not-uploaded').length], backgroundColor: '#9ca3af' },
          { label: 'Draft',        data: [0, 0], backgroundColor: '#f59e0b' },
          { label: 'Needs Attention', data: [noAssignee.filter(e=>e.status==='needs-attention').length, 0], backgroundColor: '#ef4444' },
          { label: 'Uploaded',     data: [0, balaji.filter(e=>e.status==='uploaded').length], backgroundColor: '#22c55e' },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom' } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } },
        responsive: true, maintainAspectRatio: false,
      },
    });
    return () => chartRef.current?.destroy();
  }, [evidences]);
  return <canvas ref={ref} />;
}

export default function Evidence({ showToast }) {
  const [tab, setTab] = useState('All Evidences');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [evidences, setEvidences] = useState(initialEvidences);
  const [addOpen, setAddOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [form, setForm] = useState({ name: '', assignee: '', estimate: '' });
  const PER_PAGE = 10;

  const filtered = useMemo(() =>
    evidences.filter(e => e.name.toLowerCase().includes(search.toLowerCase())),
    [evidences, search]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const uploaded = evidences.filter(e => e.status === 'uploaded').length;

  function handleAdd(e) {
    e.preventDefault();
    setEvidences(prev => [...prev, { ...form, id: Date.now(), status: 'not-uploaded', gaps: 'Not Evaluated' }]);
    setAddOpen(false);
    setForm({ name: '', assignee: '', estimate: '' });
    showToast('Evidence task added');
  }

  const thStyle = { textAlign: 'left', padding: '10px 12px', fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', borderBottom: '1px solid var(--gray-200)', whiteSpace: 'nowrap', background: 'var(--gray-50)' };

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        Evidence Tasks <span style={{ background: 'var(--gray-200)', color: 'var(--gray-600)', borderRadius: 12, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>{evidences.length}</span>
        <Btn variant="primary" style={{ marginLeft: 'auto' }} onClick={() => setAddOpen(true)}>Add Evidence</Btn>
        <Btn onClick={() => showToast('Settings opened')}>⚙</Btn>
      </div>

      <Tabs tabs={['Dashboard', 'All Evidences']} active={tab} onChange={t => { setTab(t); setPage(1); }} />

      {tab === 'All Evidences' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Evidence Status</div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{uploaded}/{evidences.length} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--gray-400)' }}>Evidence Uploaded</span></div>
              <ProgressBar value={(uploaded / evidences.length) * 100} color="var(--green)" />
              <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11, flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--green)' }}>● Uploaded: {uploaded}</span>
                <span style={{ color: 'var(--yellow)' }}>● Draft: 0</span>
                <span style={{ color: 'var(--red)' }}>● Needs Attention: 1</span>
                <span style={{ color: 'var(--gray-400)' }}>● Not Uploaded: {evidences.length - uploaded}</span>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Evidence Gaps</div>
              <div style={{ fontSize: 26, fontWeight: 700 }}>0/{evidences.length} <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--gray-400)' }}>Evidence items have gaps</span></div>
              <ProgressBar value={100} color="var(--yellow)" />
              <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 11, flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--green)' }}>● No Gaps: 0</span>
                <span style={{ color: 'var(--red)' }}>● Gaps Detected: 0</span>
                <span style={{ color: 'var(--gray-400)' }}>● Not Evaluated: {evidences.length}</span>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by evidence name or assignee"
              style={{ flex: 1, minWidth: 180, padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Assignee</option><option>Balaji</option><option>Unassigned</option>
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Department</option>
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Framework</option><option>ISO 27001:2022</option><option>SOC 2</option><option>MAS TRM 2021</option>
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Entities</option>
            </select>
            <select style={{ padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
              <option>Relevance 1</option>
            </select>
            <Btn onClick={() => showToast('More filters')}>More Filters</Btn>
            <Btn onClick={() => showToast('Columns customized')}>Columns 4 ▾</Btn>
            <Btn onClick={() => showToast('Exported to CSV')}>Export</Btn>
          </div>

          <Card noPad>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, width: 32 }}><input type="checkbox" /></th>
                    <th style={thStyle}>Evidence Name ↕</th>
                    <th style={thStyle}>Status ↕</th>
                    <th style={thStyle}>Client Estimate ↕</th>
                    <th style={thStyle}>Assignee ↕</th>
                    <th style={thStyle}>Gaps Found ↕</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(e => (
                    <tr key={e.id} style={{ cursor: 'pointer' }} onClick={() => setDetailItem(e)}
                      onMouseEnter={ev => ev.currentTarget.querySelectorAll('td').forEach(td => td.style.background = 'var(--gray-50)')}
                      onMouseLeave={ev => ev.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '')}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }} onClick={ev => ev.stopPropagation()}><input type="checkbox" /></td>
                      <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)', color: 'var(--teal)', fontWeight: 500 }}>{e.name}</td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--gray-100)' }}><StatusBadge status={e.status} /></td>
                      <td style={{ padding: '10px 12px', fontSize: 12, borderBottom: '1px solid var(--gray-100)', color: e.estimate ? 'var(--red)' : 'var(--gray-400)' }}>{e.estimate ? `+ ${e.estimate}` : '—'}</td>
                      <td style={{ padding: '10px 12px', fontSize: 13, borderBottom: '1px solid var(--gray-100)' }}>{e.assignee || '—'}</td>
                      <td style={{ padding: '10px 12px', fontSize: 12, borderBottom: '1px solid var(--gray-100)', color: 'var(--gray-400)' }}>{e.gaps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
          </Card>
        </>
      )}

      {tab === 'Dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>Upcoming Evidence for Review</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'var(--gray-50)', borderRadius: 8, gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 13 }}>Security Notifications and Alerts</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>IT</div>
                </div>
                <StatusBadge status="needs-attention">Overdue by 19 days</StatusBadge>
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14 }}>AI-Detected Evidence Gaps</div>
              <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--gray-400)' }}>
                <div style={{ fontSize: 44, marginBottom: 10 }}>☕</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>You're all caught up!</h3>
                <p style={{ fontSize: 13 }}>No gaps detected in your evidences</p>
              </div>
            </Card>
          </div>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 14, display: 'flex', alignItems: 'center' }}>
              Evidences by Assignee
              <select style={{ marginLeft: 'auto', padding: '4px 8px', border: '1px solid var(--gray-200)', borderRadius: 6, fontSize: 12, background: '#fff', cursor: 'pointer' }}>
                <option>Assignee</option>
              </select>
            </div>
            <div style={{ height: 200 }}><EvidenceByAssigneeChart evidences={evidences} /></div>
          </Card>
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Evidence"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          {[['Evidence Name', 'name'], ['Assignee', 'assignee'], ['Client Estimate', 'estimate']].map(([label, key]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{label}</label>
              <input required={key === 'name'} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            </div>
          ))}
        </form>
      </Modal>

      <Modal open={!!detailItem} onClose={() => setDetailItem(null)} title="Evidence Details"
        footer={<><Btn variant="teal" onClick={() => { setEvidences(prev => prev.map(e => e.id === detailItem.id ? { ...e, status: 'uploaded' } : e)); setDetailItem(null); showToast('Evidence marked as uploaded'); }}>Mark as Uploaded</Btn><Btn onClick={() => setDetailItem(null)}>Close</Btn></>}>
        {detailItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 2 }}>Evidence Name</div><div style={{ fontSize: 14 }}>{detailItem.name}</div></div>
            <div><div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 4 }}>Status</div><StatusBadge status={detailItem.status} /></div>
            <div><div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 2 }}>Assignee</div><div style={{ fontSize: 14 }}>{detailItem.assignee || 'Unassigned'}</div></div>
            <div><div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 2 }}>Gaps Found</div><div style={{ fontSize: 14 }}>{detailItem.gaps}</div></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
