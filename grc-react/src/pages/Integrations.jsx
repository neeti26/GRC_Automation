import { useState } from 'react';

const categories = [
  'Cloud Providers', 'Identity Providers', 'Version Control', 
  'Project Management Platforms', 'Human Resource Information Systems', 
  'Background Check', 'Mobile Device Management Tools'
];

const integrations = {
  'Cloud Providers': [
    { name: 'Amazon Web Services', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', automates: ['Automated Tests', 'Scrut Monitor', 'User Access Data', 'Asset Management', 'Vulnerability Management'], action: 'Configure' },
    { name: 'Microsoft Azure', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg', automates: ['Automated Tests', 'Scrut Monitor', 'Asset Management'], action: 'Integrate' },
    { name: 'Google Cloud', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg', automates: ['Automated Tests', 'Scrut Monitor', 'Asset Management'], action: 'Integrate' },
    { name: 'Digital Ocean', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg', automates: ['Automated Tests', 'Scrut Monitor', 'Asset Management'], action: 'Integrate' },
    { name: 'Heroku', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Heroku_logo.svg', automates: ['Automated Tests', 'Asset Management', 'Scrut Monitor'], action: 'Integrate' },
    { name: 'Vercel', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg', automates: ['Automated Tests', 'User Access Data', 'Scrut Monitor'], action: 'Integrate' },
  ],
};

export default function Integrations({ showToast }) {
  const [activeCategory, setActiveCategory] = useState('Cloud Providers');
  const [tab, setTab] = useState('Integrations Library');

  const items = integrations[activeCategory] || [];

  return (
    <div style={{ background: 'var(--gray-50)', minHeight: '100%', padding: '0 20px', borderRadius: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0 16px' }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--gray-800)' }}>Integrations</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '6px 12px', width: 220 }}>
            <span style={{ color: 'var(--gray-400)', marginRight: 8 }}>🔍</span>
            <input placeholder="Search by name" style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '6px 12px', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            Integrations For <span style={{ background: 'var(--gray-200)', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 8, fontSize: 11 }}>1</span> <span style={{ marginLeft: 6 }}>▾</span>
          </div>
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            🔄
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24 }}>
        {['Connected Integrations', 'Integrations Library'].map(t => (
          <div key={t} onClick={() => setTab(t)} 
            style={{ 
              padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer', 
              color: tab === t ? '#fff' : 'var(--gray-600)', 
              background: tab === t ? '#314158' : 'transparent', 
              borderRadius: tab === t ? '8px 8px 0 0' : 0,
              borderBottom: tab === t ? 'none' : '2px solid transparent'
            }}>
            {t}
          </div>
        ))}
      </div>

      {tab === 'Integrations Library' && (
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ width: 240, flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', padding: '0 12px 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</div>
            {categories.map(c => (
              <div key={c} onClick={() => setActiveCategory(c)}
                style={{ 
                  padding: '10px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500,
                  color: activeCategory === c ? '#fff' : 'var(--gray-700)', 
                  background: activeCategory === c ? '#314158' : 'transparent',
                  marginBottom: 4
                }}
                onMouseEnter={e => { if (activeCategory !== c) e.currentTarget.style.background = 'var(--gray-200)'; }}
                onMouseLeave={e => { if (activeCategory !== c) e.currentTarget.style.background = 'transparent'; }}>
                {c}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--gray-800)', marginBottom: 6 }}>{activeCategory}</div>
            <div style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 24 }}>Integrate with your cloud instances to automatically scan for security misconfigurations and vulnerabilities.</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {items.map(i => (
                <div key={i.name} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {i.icon.startsWith('http') ? <img src={i.icon} alt={i.name} style={{ width: 28, height: 28, objectFit: 'contain' }} /> : <div style={{ fontSize: 24 }}>{i.icon}</div>}
                    <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-800)', margin: 0 }}>{i.name}</h4>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {i.automates.map(auto => (
                      <span key={auto} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500 }}>
                        {auto}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                    {i.action === 'Configure' ? (
                      <button onClick={() => showToast('Configuration opened')} style={{ background: '#fff', border: '1px solid var(--gray-300)', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', cursor: 'pointer' }}>
                        Configure
                      </button>
                    ) : (
                      <button onClick={() => showToast('Integration started')} style={{ background: '#6366f1', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                        Integrate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {items.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)', background: '#fff', borderRadius: 12, border: '1px dashed var(--gray-300)' }}>
                No integrations available for this category yet.
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'Connected Integrations' && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)' }}>
          No integrations connected.
        </div>
      )}
    </div>
  );
}
