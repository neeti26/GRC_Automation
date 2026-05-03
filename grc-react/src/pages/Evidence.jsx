import { useState } from "react";
import Btn from "../components/Btn";
import Card from "../components/Card";

export default function Evidence({ showToast }) {
  const [tab, setTab] = useState("Dashboard");

  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10, color: "var(--gray-800)" }}>
        Evidence Tasks <span style={{ background: "var(--gray-200)", color: "var(--gray-600)", borderRadius: 6, padding: "2px 6px", fontSize: 13, fontWeight: 600 }}>141</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Btn variant="primary" onClick={() => showToast("Add Evidence clicked")}>Add Evidence</Btn>
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>⚙️</button>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Dashboard', 'All Evidences'].map(t => (
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
        <div style={{ display: "flex", gap: 8, paddingBottom: 8 }}>
          {["Assignee", "Department", "Framework", "Entities"].map(filter => (
            <select key={filter} style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none", color: "var(--gray-600)" }}>
              <option>{filter} ▾</option>
            </select>
          ))}
          <select style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "var(--gray-50)", cursor: "pointer", outline: "none", color: "var(--gray-600)" }}>
            <option>Relevance 1 ▾</option>
          </select>
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🔄</button>
        </div>
      </div>

      {tab === "Dashboard" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-600)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                Evidence Status ⓘ
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "var(--gray-800)" }}>10/141</span>
                <span style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Evidence Uploaded</span>
              </div>
              <div style={{ height: 8, background: "var(--gray-200)", borderRadius: 4, overflow: "hidden", marginBottom: 16, display: "flex" }}>
                <div style={{ height: "100%", width: "7%", background: "#10b981" }} />
                <div style={{ height: "100%", width: "1%", background: "#ef4444" }} />
                <div style={{ height: "100%", width: "92%", background: "var(--gray-200)" }} />
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 10, color: "var(--gray-500)" }}>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#10b981", marginRight:4 }}/>Uploaded - 10</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#f59e0b", marginRight:4 }}/>Draft - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#ef4444", marginRight:4 }}/>Needs Attention - 1</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"var(--gray-400)", marginRight:4 }}/>Not Uploaded - 130</span>
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-600)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                Evidence Gaps ⓘ
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "var(--gray-800)" }}>0/141</span>
                <span style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Evidence items have gaps</span>
              </div>
              <div style={{ height: 8, background: "var(--gray-200)", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ height: "100%", width: "100%", background: "#f59e0b", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 10, color: "var(--gray-500)" }}>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#10b981", marginRight:4 }}/>No Gaps - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#ef4444", marginRight:4 }}/>Gaps Detected - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#f59e0b", marginRight:4 }}/>Not Evaluated - 141</span>
              </div>
            </Card>

            <Card style={{ padding: "24px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-800)", marginBottom: 16 }}>Upcoming Evidence for Review ⓘ</div>
              <div style={{ borderBottom: "1px solid var(--gray-100)", paddingBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-800)" }}>Security Notifications and Alerts</span>
                  <span style={{ fontSize: 11, color: "#ef4444", background: "#fee2e2", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>Overdue by 30 days</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--gray-500)" }}>IT</div>
              </div>
            </Card>

            <Card style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-800)", textAlign: "left", marginBottom: 16 }}>AI-Detected Evidence Gaps ⓘ</div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>☕</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)", marginBottom: 4 }}>You're all caught up!</div>
              <div style={{ fontSize: 12, color: "var(--gray-500)" }}>No gaps detected in your evidences</div>
            </Card>
          </div>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--gray-800)" }}>Evidences by Assignee</div>
              <select style={{ padding: "4px 10px", border: "1px solid var(--gray-200)", borderRadius: 6, fontSize: 12, background: "#fff" }}>
                <option>Assignee ▾</option>
              </select>
            </div>
            
            <div style={{ position: "relative", height: 260, display: "flex", alignItems: "flex-end", paddingBottom: 40, paddingLeft: 40 }}>
              <div style={{ position: "absolute", left: -30, top: "40%", transform: "rotate(-90deg)", transformOrigin: "0 0", fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Number of Evidences</div>
              <div style={{ position: "absolute", bottom: 40, left: 40, right: 0, height: 1, background: "var(--gray-200)" }} />
              
              <div style={{ position: "absolute", left: 0, bottom: 40, top: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8, fontSize: 11, color: "var(--gray-500)" }}>
                <span>150</span><span>125</span><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
              </div>
              
              <div style={{ position: "absolute", bottom: 40, left: 40, right: 0, display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40%", height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ width: "100%", height: "2%", background: "#ef4444" }} />
                  <div style={{ width: "100%", height: "3%", background: "#f59e0b" }} />
                  <div style={{ width: "100%", height: "5%", background: "#10b981" }} />
                  <div style={{ width: "100%", height: "85%", background: "#9ca3af", borderRadius: "4px 4px 0 0" }} />
                  <div style={{ position: "absolute", bottom: -20, fontSize: 10, color: "var(--gray-500)", textAlign: "center", whiteSpace: "nowrap" }}>No Assignee</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "40%", height: "100%", justifyContent: "flex-end" }}>
                  <div style={{ width: "100%", height: "1%", background: "#10b981", borderRadius: "4px 4px 0 0" }} />
                  <div style={{ position: "absolute", bottom: -20, fontSize: 10, color: "var(--gray-500)", textAlign: "center", whiteSpace: "nowrap" }}>Balaji</div>
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-start", gap: 16, marginTop: 20 }}>
              {[
                { label: "Not Uploaded", color: "#9ca3af" },
                { label: "Draft", color: "#f59e0b" },
                { label: "Needs Attention", color: "#ef4444" },
                { label: "Uploaded", color: "#10b981" }
              ].map(leg => (
                <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray-600)", fontWeight: 600 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: leg.color }} /> {leg.label}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {tab !== "Dashboard" && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)' }}>
          Select the Dashboard tab to view Evidence overview.
        </div>
      )}
    </div>
  );
}
