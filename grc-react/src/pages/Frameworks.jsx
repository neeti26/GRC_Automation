import { useState } from 'react';
import { frameworks as initialFrameworks, libraryFrameworks } from '../data';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Btn from '../components/Btn';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';

function FwCard({ fw, onClick }) {
  const barColor = fw.pct >= 50 ? 'var(--teal)' : 'var(--yellow)';
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 12, border: '1px solid var(--gray-200)',
      padding: 20, cursor: 'pointer', transition: 'box-shadow 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: fw.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{fw.abbr}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{fw.name}</div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Compliant</div>
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, margin: '4px 0' }}>{fw.pct}%</div>
      <ProgressBar value={fw.pct} color={barColor} style={{ margin: '6px 0 14px' }} />
      <div style={{ display: 'flex', gap: 12 }}>
        {[{ v: `${fw.policies}%`, l: 'Policies', c: '#22c55e' }, { v: `${fw.evidence}%`, l: 'Evidence Tasks', c: '#ef4444' }, { v: `${fw.tests}%`, l: 'Automated Tests', c: '#f59e0b' }].map(s => (
          <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Frameworks({ showToast }) {
  const [tab, setTab] = useState('My Frameworks');
  const [search, setSearch] = useState('');
  const [frameworks, setFrameworks] = useState(initialFrameworks);
  const [selected, setSelected] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: '', abbr: '', color: '#0d9488' });

  const filtered = frameworks.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  function handleAdd(e) {
    e.preventDefault();
    setFrameworks(prev => [...prev, { ...form, id: Date.now(), pct: 0, policies: 0, evidence: 0, tests: 0 }]);
    setAddOpen(false);
    setForm({ name: '', abbr: '', color: '#0d9488' });
    showToast('Framework added');
  }

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        Frameworks <span style={{ background: 'var(--gray-200)', color: 'var(--gray-600)', borderRadius: 12, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>{frameworks.length}</span>
        <Btn variant="primary" style={{ marginLeft: 'auto' }} onClick={() => setAddOpen(true)}>Add Custom Framework</Btn>
      </div>

      <Tabs tabs={['My Frameworks', 'Frameworks Library']} active={tab} onChange={setTab} />

      {tab === 'My Frameworks' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name"
              style={{ maxWidth: 220, padding: '7px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            <Btn>Sort by: Highest Compliance ▾</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {filtered.map(fw => <FwCard key={fw.id} fw={fw} onClick={() => setSelected(fw)} />)}
            {filtered.length === 0 && <div style={{ color: 'var(--gray-400)', padding: 20 }}>No frameworks found</div>}
          </div>
        </>
      )}

      {tab === 'Frameworks Library' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {libraryFrameworks.map(fw => (
            <div key={fw.name} style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--gray-200)', padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: fw.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>{fw.abbr}</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{fw.name}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 16 }}>{fw.desc}</div>
              <Btn variant="teal" style={{ width: '100%' }} onClick={() => { setFrameworks(prev => [...prev, { id: Date.now(), abbr: fw.abbr, name: fw.name, color: fw.color, pct: 0, policies: 0, evidence: 0, tests: 0 }]); showToast(`${fw.name} added to My Frameworks`); }}>Add Framework</Btn>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}
        footer={<Btn onClick={() => setSelected(null)}>Close</Btn>}>
        {selected && (
          <div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--teal)', marginBottom: 8 }}>{selected.pct}% Compliant</div>
            <ProgressBar value={selected.pct} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20 }}>
              {[{ label: 'Policies', val: selected.policies, color: '#22c55e' }, { label: 'Evidence Tasks', val: selected.evidence, color: '#ef4444' }, { label: 'Automated Tests', val: selected.tests, color: '#f59e0b' }].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: 16, background: 'var(--gray-50)', borderRadius: 10 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}%</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Add Framework Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Custom Framework"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          {[['Framework Name', 'name'], ['Abbreviation (e.g. ISO)', 'abbr']].map(([label, key]) => (
            <div key={key} style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{label}</label>
              <input required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>Color</label>
            <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
              style={{ width: '100%', height: 40, border: '1px solid var(--gray-200)', borderRadius: 8, cursor: 'pointer' }} />
          </div>
        </form>
      </Modal>
    </div>
  );
}
