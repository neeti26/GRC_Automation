import { useState } from "react";
import Btn from "../components/Btn";
import Card from "../components/Card";

export default function Controls({ showToast }) {
  const [tab, setTab] = useState("Dashboard");

  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10, color: "var(--gray-800)" }}>
        Controls <span style={{ background: "var(--gray-200)", color: "var(--gray-600)", borderRadius: 6, padding: "2px 6px", fontSize: 13, fontWeight: 600 }}>299</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Btn variant="primary" onClick={() => showToast("Add Custom Control clicked")}>Add Custom Control</Btn>
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>⚙️</button>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Dashboard', 'All Controls'].map(t => (
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
          {["Assignee", "Framework", "Entities", "Domain", "Function Grouping", "Control Scope"].map(filter => (
            <select key={filter} style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none", color: "var(--gray-600)" }}>
              <option>{filter} ▾</option>
            </select>
          ))}
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🔄</button>
        </div>
      </div>

      {tab === "Dashboard" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--teal)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                Compliant ⓘ
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: "var(--gray-800)" }}>131</span>
                <span style={{ fontSize: 16, color: "var(--gray-500)", fontWeight: 600 }}>/295</span>
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#ef4444", background: "#fee2e2", padding: "4px 8px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                Non Compliant ⓘ
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--gray-800)" }}>164</div>
            </Card>

            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-600)", background: "var(--gray-100)", padding: "4px 8px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                Not Applicable ⓘ
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--gray-800)" }}>4</div>
            </Card>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card style={{ position: "relative" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--gray-800)", marginBottom: 20 }}>Function Grouping</div>
              <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 220, height: 220, borderRadius: "50%", border: "30px solid var(--gray-200)", borderTopColor: "var(--teal)", borderRightColor: "var(--gray-100)", borderBottomColor: "var(--gray-300)" }}></div>
                <div style={{ position: "absolute", textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "var(--gray-800)" }}>Total</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "var(--gray-800)" }}>299</div>
                </div>
                {/* Labels around the donut */}
                <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Recover: 7</div>
                <div style={{ position: "absolute", top: 40, right: 30, fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Govern: 13</div>
                <div style={{ position: "absolute", bottom: 80, right: 10, fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Identify: 62</div>
                <div style={{ position: "absolute", bottom: 40, left: 20, fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Detect: 42</div>
                <div style={{ position: "absolute", top: 80, left: 10, fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Respond: 10</div>
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--gray-800)", marginBottom: 20 }}>By Framework</div>
              <div style={{ position: "relative", height: 260, display: "flex", alignItems: "flex-end", paddingBottom: 30, paddingLeft: 40 }}>
                <div style={{ position: "absolute", left: -30, top: "40%", transform: "rotate(-90deg)", transformOrigin: "0 0", fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Values</div>
                
                <div style={{ position: "absolute", left: 0, bottom: 30, top: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8, fontSize: 11, color: "var(--gray-500)" }}>
                  <span>250</span><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span>
                </div>
                
                <div style={{ position: "absolute", bottom: 30, left: 40, right: 0, display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: "100%" }}>
                  <div style={{ width: "20%", height: "60%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ flex: 1, background: "#ef4444" }} />
                    <div style={{ flex: 1, background: "#10b981" }} />
                  </div>
                  <div style={{ width: "20%", height: "85%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ flex: 0.8, background: "#ef4444" }} />
                    <div style={{ flex: 1.5, background: "#10b981" }} />
                  </div>
                  <div style={{ width: "20%", height: "45%", display: "flex", flexDirection: "column", gap: 2 }}>
                    <div style={{ flex: 1.2, background: "#ef4444" }} />
                    <div style={{ flex: 0.8, background: "#10b981" }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {tab !== "Dashboard" && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--gray-400)' }}>
          Select the Dashboard tab to view Controls overview.
        </div>
      )}
    </div>
  );
}
