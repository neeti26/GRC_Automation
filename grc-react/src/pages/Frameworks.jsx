import { useState } from 'react';
import { frameworks as initialFrameworks, libraryFrameworks, soc2Details, soc2Requirements, controls } from '../data';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import Btn from '../components/Btn';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';
import StatusBadge from '../components/StatusBadge';

function HalfDonut({ pct, color, label }) {
  const rotation = -135 + (pct / 100) * 180;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: 60, height: 30, overflow: 'hidden' }}>
        <div style={{ 
          width: 60, height: 60, borderRadius: '50%', border: '6px solid var(--gray-100)', 
          borderTopColor: color, borderRightColor: color, 
          transform: `rotate(${rotation}deg)`, transition: 'transform 1s',
          boxSizing: 'border-box'
        }} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-800)', marginTop: 4 }}>{pct}%</div>
      <div style={{ fontSize: 9, color: 'var(--gray-500)', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function FwCard({ fw, onClick }) {
  const barColor = fw.pct >= 50 ? 'var(--teal)' : 'var(--teal)';
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 12, border: '1px solid var(--gray-200)',
      padding: 20, cursor: 'pointer', transition: 'box-shadow 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--gray-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{fw.abbr}</div>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--gray-800)' }}>{fw.name}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>Compliant</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{fw.pct}%</div>
      </div>
      <ProgressBar value={fw.pct} color={barColor} style={{ margin: '0 0 24px', height: 8 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
        <HalfDonut pct={fw.policies} color="#10b981" label="Policies" />
        <HalfDonut pct={fw.evidence} color="#ef4444" label="Evidence Tasks" />
        <HalfDonut pct={fw.tests} color="#f59e0b" label="Automated Tests" />
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
  const [detailTab, setDetailTab] = useState('Overview');

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
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
        Frameworks <span style={{ background: 'var(--gray-200)', color: 'var(--gray-600)', borderRadius: 6, padding: '2px 8px', fontSize: 13, fontWeight: 600 }}>{frameworks.length}</span>
        <Btn variant="primary" style={{ marginLeft: 'auto' }} onClick={() => setAddOpen(true)}>Add Custom Framework</Btn>
      </div>

      <Tabs tabs={['My Frameworks', 'Frameworks Library']} active={tab} onChange={setTab} />

      {tab === 'My Frameworks' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '6px 12px', width: 260 }}>
              <span style={{ color: 'var(--gray-400)', marginRight: 8 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name"
                style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%' }} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select style={{ padding: "8px 12px", border: "none", fontSize: 13, background: "transparent", color: "var(--gray-600)", fontWeight: 600, cursor: "pointer", outline: "none" }}>
                <option>Sort by: Highest Compliance</option>
              </select>
              <button style={{ background: '#fff', border: 'none', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>⊞</button>
              <button style={{ background: 'transparent', border: 'none', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>☰</button>
            </div>
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

      {/* Full Screen Framework Detail */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 100, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '24px 40px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div>
              <div onClick={() => setSelected(null)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 24, fontWeight: 700, color: 'var(--gray-800)' }}>
                <span style={{ fontSize: 20 }}>←</span> {selected.name}
              </div>
              <div style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', borderRadius: 12, padding: '2px 10px', fontSize: 12, fontWeight: 600, display: 'inline-block', marginTop: 8 }}>Organization Wide</div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gray-50)', padding: '12px 16px', borderRadius: 8 }}>
                <span style={{ fontSize: 16 }}>💡</span>
                <div style={{ fontSize: 12, color: 'var(--gray-600)', maxWidth: 400 }}>
                  <div style={{ fontWeight: 600, color: 'var(--gray-800)', marginBottom: 2 }}>Take the weight off SOC 2 compliance</div>
                  Scrut Automation enforces device security, access controls, and endpoint protection - tracking compliance in real time so your team doesn't have to chase it.
                </div>
                <Btn>Talk To An Expert</Btn>
              </div>
              <Btn>Add Audit</Btn>
              <Btn variant="primary">Add Requirement ▾</Btn>
              <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>⋮</button>
            </div>
          </div>
          
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden', background: '#f9fafb' }}>
            <div style={{ flex: 1, padding: 40, overflowY: 'auto' }}>
              <Tabs tabs={['All Requirements', 'Audit Logs']} active={detailTab === 'Overview' ? 'All Requirements' : detailTab} onChange={setDetailTab} />
              
              <div style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--gray-800)' }}>Total Requirements <span style={{ background: 'var(--gray-800)', color: '#fff', borderRadius: 12, padding: '2px 8px', fontSize: 13, marginLeft: 8 }}>38</span></div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '6px 12px', width: 240 }}>
                      <span style={{ color: 'var(--gray-400)', marginRight: 8 }}>🔍</span>
                      <input placeholder="Search by name, code, category" style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%' }} />
                    </div>
                    <select style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none", color: "var(--gray-600)" }}>
                      <option>Scope ▾</option>
                    </select>
                    <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>⊚</button>
                  </div>
                </div>
                
                {soc2Requirements.map(reqGrp => (
                  <details key={reqGrp.id} open style={{ marginBottom: 12, background: 'transparent' }}>
                    <summary style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 700, listStyle: 'none', userSelect: 'none', border: '1px solid var(--gray-300)', borderRadius: 8, background: '#f3f4f6', color: 'var(--gray-800)' }}>
                      <svg className="details-arrow" style={{ width: 16, height: 16, transition: 'transform 0.2s', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      {reqGrp.title}
                      <span style={{ marginLeft: 'auto', background: 'var(--gray-800)', color: '#fff', borderRadius: 12, padding: '2px 8px', fontSize: 12 }}>{reqGrp.count}</span>
                    </summary>
                    <div style={{ padding: '0', marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {reqGrp.items.map(item => (
                        <div key={item.id} onClick={() => setDetailTab(item.id)} style={{ padding: 20, border: '1px solid var(--gray-200)', borderRadius: 8, background: '#fff', cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-800)', paddingRight: 20, lineHeight: 1.5 }}>{item.id} - {item.title}</div>
                            <span style={{ fontSize: 11, color: '#059669', background: '#dcfce7', padding: '4px 8px', borderRadius: 4, fontWeight: 600, whiteSpace: 'nowrap' }}>In Scope</span>
                          </div>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {item.controls.map(ctrl => (
                              <span key={ctrl} style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', background: 'var(--gray-100)', padding: '4px 10px', borderRadius: 6 }}>{ctrl}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
                <style>{`
                  details > summary { list-style: none; }
                  details > summary::-webkit-details-marker { display: none; }
                  details[open] summary .details-arrow { transform: rotate(180deg) !important; }
                  details:not([open]) summary .details-arrow { transform: rotate(270deg) !important; }
                `}</style>
              </div>
            </div>
            
            {/* Slide-out Panel for Requirement Details */}
            {detailTab !== 'Overview' && detailTab !== 'All Requirements' && detailTab !== 'Audit Logs' && (
              <div style={{ width: 450, background: '#fff', borderLeft: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.05)', flexShrink: 0, zIndex: 10 }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--gray-600)' }}>
                    <span>⊚ Requirements</span> <span style={{ color: 'var(--gray-400)' }}>|</span> <span>{detailTab}</span>
                  </div>
                  <button onClick={() => setDetailTab('Overview')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray-500)' }}>×</button>
                </div>
                
                <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-800)', lineHeight: 1.4, marginBottom: 24 }}>
                    {soc2Requirements.flatMap(g => g.items).find(i => i.id === detailTab)?.title || "The entity demonstrates a commitment to integrity and ethical values."}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, marginBottom: 24 }}>
                    <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>Framework</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--gray-800)' }}>
                      <div style={{ width: 16, height: 16, background: 'var(--gray-800)', borderRadius: '50%' }} /> SOC 2
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>Scope</div>
                    <div style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>In Scope</div>
                  </div>
                  
                  <div style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 8 }}>Requirement Description</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6 }}>
                      {soc2Requirements.flatMap(g => g.items).find(i => i.id === detailTab)?.description || "Requirement details and points of focus specified in the applicable framework for this control."}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)', marginTop: 8, cursor: 'pointer' }}>View More ▾</div>
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)' }}>Linked Controls <span style={{ background: 'var(--gray-800)', color: '#fff', borderRadius: 12, padding: '2px 8px', fontSize: 11, marginLeft: 8 }}>{soc2Requirements.flatMap(g => g.items).find(i => i.id === detailTab)?.controls?.length || 0}</span></div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)' }}>+ Link / Unlink Controls</div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {soc2Requirements.flatMap(g => g.items).find(i => i.id === detailTab)?.controls?.map((ctrlCode) => {
                        const controlData = controls.find(c => c.code === ctrlCode) || { name: 'Control details pending', status: 'non-compliant' };
                        const isCompliant = controlData.status === 'compliant';
                        return (
                          <div key={ctrlCode} style={{ padding: '12px 16px', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' }}>{ctrlCode}: {controlData.name}</span>
                            <span style={{ color: isCompliant ? '#10b981' : '#ef4444', fontSize: 14 }}>{isCompliant ? '⊙' : '⊗'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
