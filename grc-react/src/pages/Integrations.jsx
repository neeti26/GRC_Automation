import { useState } from 'react';
import Btn from '../components/Btn';
import Modal from '../components/Modal';

const categories = ['Cloud Providers', 'Identity Providers', 'Project Management Platforms', 'Policy Management', 'Campaigns & Trainings'];

const integrations = {
  'Cloud Providers': [
    { name: 'AWS', icon: '☁️', desc: 'Cloud Provider · Asset Discovery', connected: true },
    { name: 'Azure', icon: '🔷', desc: 'Cloud Provider · Asset Discovery', connected: false },
    { name: 'GCP', icon: '🌐', desc: 'Cloud Provider · Asset Discovery', connected: false },
  ],
  'Identity Providers': [
    { name: 'Okta', icon: '🔑', desc: 'Identity Provider · SSO', connected: false },
    { name: 'Azure AD', icon: '🔷', desc: 'Identity Provider · SSO', connected: false },
  ],
  'Project Management Platforms': [
    { name: 'Jira', icon: '📋', desc: 'Project Management · Issue Tracking', connected: false },
    { name: 'Linear', icon: '📐', desc: 'Project Management · Issue Tracking', connected: false },
  ],
  'Policy Management': [
    { name: 'Confluence', icon: '✖️', desc: 'Policy Management', connected: false },
  ],
  'Campaigns & Trainings': [
    { name: 'KnowBe4', icon: '🎯', desc: 'Automated Tests · Employee Training Campaigns', connected: false },
  ],
};

export default function Integrations({ showToast }) {
  const [activeCategory, setActiveCategory] = useState('Cloud Providers');
  const [configItem, setConfigItem] = useState(null);
  const [connected, setConnected] = useState({ AWS: true });
  const [tab, setTab] = useState('Connected Integrations');

  const items = integrations[activeCategory] || [];

  function handleConnect(name) {
    setConnected(prev => ({ ...prev, [name]: true }));
    setConfigItem(null);
    showToast(`${name} connected successfully`);
  }

  const allConnected = Object.values(integrations).flat().filter(i => connected[i.name]);

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Integrations</div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 20 }}>
        {['Connected Integrations', 'Integrations Library'].map(t => (
          <div key={t} onClick={() => setTab(t)} style={{ padding: '8px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer', color: tab === t ? 'var(--gray-800)' : 'var(--gray-400)', borderBottom: tab === t ? '2px solid var(--gray-800)' : '2px solid transparent', marginBottom: -1 }}>{t}</div>
        ))}
      </div>

      {tab === 'Connected Integrations' && (
        allConnected.length === 0
          ? <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--gray-400)' }}>
              <div style={{ fontSize: 44, marginBottom: 10 }}>🔌</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 5 }}>No integrations connected</h3>
              <p style={{ fontSize: 13 }}>Go to Integrations Library to connect your tools.</p>
            </div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {allConnected.map(i => (
                <div key={i.name} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center', gap: 14, maxWidth: 420 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 8, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{i.icon}</div>
                  <div><h4 style={{ fontSize: 14, fontWeight: 600 }}>{i.name}</h4><p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{i.desc}</p></div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Connected</span>
                  </div>
                </div>
              ))}
            </div>
      )}

      {tab === 'Integrations Library' && (
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ width: 200, flexShrink: 0, background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: 8, height: 'fit-content' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-400)', padding: '8px 12px 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Categories</div>
            {categories.map(c => (
              <div key={c} onClick={() => setActiveCategory(c)}
                style={{ padding: '7px 12px', borderRadius: 7, fontSize: 12, cursor: 'pointer', color: activeCategory === c ? '#fff' : 'var(--gray-600)', background: activeCategory === c ? 'var(--gray-800)' : 'transparent' }}
                onMouseEnter={e => { if (activeCategory !== c) e.currentTarget.style.background = 'var(--gray-100)'; }}
                onMouseLeave={e => { if (activeCategory !== c) e.currentTarget.style.background = 'transparent'; }}>
                {c}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{activeCategory}</div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)', marginBottom: 16 }}>Connect your {activeCategory.toLowerCase()} tools to automate data collection.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(i => (
                <div key={i.name} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: 18, display: 'flex', alignItems: 'center', gap: 14, maxWidth: 420 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 8, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{i.icon}</div>
                  <div><h4 style={{ fontSize: 14, fontWeight: 600 }}>{i.name}</h4><p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{i.desc}</p></div>
                  <div style={{ marginLeft: 'auto' }}>
                    {connected[i.name]
                      ? <span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Connected</span>
                      : <Btn onClick={() => setConfigItem(i)}>Configure</Btn>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={!!configItem} onClose={() => setConfigItem(null)} title={`Configure ${configItem?.name}`}
        footer={<><Btn onClick={() => setConfigItem(null)}>Cancel</Btn><Btn variant="teal" onClick={() => handleConnect(configItem?.name)}>Connect</Btn></>}>
        {configItem && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: 16, background: 'var(--gray-50)', borderRadius: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 8, background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{configItem.icon}</div>
              <div><div style={{ fontWeight: 600 }}>{configItem.name}</div><div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{configItem.desc}</div></div>
            </div>
            {[['API Key', 'password'], ['Workspace URL', 'text']].map(([label, type]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-600)', marginBottom: 6 }}>{label}</label>
                <input type={type} placeholder={label} style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--gray-200)', borderRadius: 8, fontSize: 13, outline: 'none' }} />
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
