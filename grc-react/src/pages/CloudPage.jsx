import { useState } from "react";
import Btn from "../components/Btn";
import Card from "../components/Card";

export default function CloudPage({ showToast }) {
  const [tab, setTab] = useState("Dashboard");
  const [provider, setProvider] = useState("AWS");

  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10, color: "var(--gray-800)" }}>
        Cloud Tests
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24, gap: 4 }}>
        {['Dashboard', 'Tests', 'Resources', 'Audit Log'].map(t => (
          <div key={t} onClick={() => setTab(t)} 
            style={{ 
              padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              color: tab === t ? '#fff' : 'var(--gray-600)', 
              background: tab === t ? '#314158' : 'transparent', 
              borderRadius: tab === t ? '8px 8px 0 0' : 8,
            }}>
            {t}
          </div>
        ))}
      </div>

      {tab === "Dashboard" && (
        <>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {['AWS', 'Azure', 'GCP'].map(p => (
              <button key={p} onClick={() => setProvider(p)} style={{ 
                background: provider === p ? 'var(--gray-100)' : '#fff', 
                border: '1px solid var(--gray-200)', 
                borderRadius: 8, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                fontSize: 18
              }}>
                {p === 'AWS' ? '☁️' : p === 'Azure' ? '🔷' : '🌐'}
              </button>
            ))}
            <select style={{ padding: "8px 16px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", color: "var(--gray-800)", fontWeight: 600, cursor: "pointer", outline: "none", marginLeft: 8 }}>
              <option>Account ID</option>
            </select>
            <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              🔄
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Total Tests Performed", val: 110 },
              { label: "Non-Compliant Tests", val: 41 },
              { label: "Total Resources Scanned", val: 30394 },
              { label: "Non-Compliant Resources", val: 1070 }
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-800)", marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
                  {s.label} <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>ⓘ</span>
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: "var(--gray-800)" }}>{s.val}</div>
              </div>
            ))}
          </div>

          <Card style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--gray-800)", marginBottom: 16 }}>Resources Summary</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--teal)", marginBottom: 32 }}>Cloud Providers / AWS</div>
            
            <div style={{ position: "relative", height: 260, display: "flex", alignItems: "flex-end", paddingBottom: 24, paddingLeft: 60 }}>
              <div style={{ position: "absolute", left: -30, top: "40%", transform: "rotate(-90deg)", transformOrigin: "0 0", fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Needs Attention Count</div>
              <div style={{ position: "absolute", bottom: 24, left: 60, right: 0, height: 1, background: "var(--gray-200)" }} />
              
              <div style={{ position: "absolute", left: 0, bottom: 24, top: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8, fontSize: 11, color: "var(--gray-500)" }}>
                <span>700</span><span>600</span><span>500</span><span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
              </div>
              
              <div style={{ position: "absolute", bottom: 24, left: 60, right: 0, display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: "100%" }}>
                {[
                  { name: "AWS IAM", val: 580 },
                  { name: "S3", val: 340 },
                  { name: "EC2", val: 180 },
                  { name: "Virtual Private Clou...", val: 40 },
                  { name: "ELBv2", val: 20 },
                  { name: "CloudTrail", val: 10 },
                  { name: "RDS", val: 15 },
                  { name: "KMS", val: 5 }
                ].map(bar => (
                  <div key={bar.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "10%" }}>
                    <div style={{ width: "100%", background: "#f97316", height: `${(bar.val/700)*100}%`, borderRadius: "4px 4px 0 0", border: "1px solid #c2410c" }} />
                    <div style={{ position: "absolute", bottom: -20, fontSize: 10, color: "var(--gray-500)", textAlign: "center", whiteSpace: "nowrap" }}>{bar.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--gray-800)" }}>Resources Flagged</div>
              <select style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 6, fontSize: 12, background: "#fff" }}>
                <option>Last 30 Days ▾</option>
              </select>
            </div>
            <div style={{ fontSize: 11, color: "var(--gray-400)", textAlign: "center", marginBottom: 20 }}>Click and drag in the plot area to zoom in</div>
            
            <div style={{ position: "relative", height: 260, display: "flex", alignItems: "flex-end", paddingBottom: 30, paddingLeft: 60 }}>
              <div style={{ position: "absolute", left: -40, top: "40%", transform: "rotate(-90deg)", transformOrigin: "0 0", fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Number of Flagged Resources</div>
              <div style={{ position: "absolute", bottom: 30, left: 60, right: 0, height: 1, background: "var(--gray-200)" }} />
              
              <div style={{ position: "absolute", left: 0, bottom: 30, top: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8, fontSize: 11, color: "var(--gray-500)" }}>
                <span>1250</span><span>1000</span><span>750</span><span>500</span><span>250</span><span>0</span>
              </div>
              
              <div style={{ position: "absolute", bottom: 30, left: 60, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {[...Array(11)].map((_,i) => (
                  <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#c2410c", position: "relative", zIndex: 2 }} />
                ))}
                <div style={{ position: "absolute", top: 1, left: 0, right: 0, height: 2, background: "#c2410c", zIndex: 1, transform: "rotate(-2deg)", transformOrigin: "left" }} />
              </div>

              <div style={{ position: "absolute", bottom: 0, left: 60, right: 0, display: "flex", justifyContent: "space-between" }}>
                {["Apr 10", "Apr 11", "Apr 12", "Apr 13", "Apr 14", "Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20"].map(d => (
                  <div key={d} style={{ fontSize: 10, color: "var(--gray-500)" }}>{d}</div>
                ))}
              </div>
            </div>
          </Card>
        </>
      )}

      {tab !== "Dashboard" && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)' }}>
          Select the Dashboard tab to view Cloud Tests overview.
        </div>
      )}
    </div>
  );
}
