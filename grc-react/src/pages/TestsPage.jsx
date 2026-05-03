import { useState } from "react";
import Btn from "../components/Btn";
import Card from "../components/Card";

export default function TestsPage({ showToast }) {
  const [tab, setTab] = useState("All");

  const tests = [
    { name: "AWS accounts associated with users", status: "Fix Required", type: "Automated Test", effort: "High", app: "Scrut", assignee: "-" },
    { name: "Jira accounts associated with users", status: "Fix Required", type: "Automated Test", effort: "High", app: "Scrut", assignee: "-" },
    { name: "Scrut accounts associated with users", status: "Fix Required", type: "Automated Test", effort: "High", app: "Scrut", assignee: "-" },
    { name: "Assets have owners assigned", status: "Passing", type: "Automated Test", effort: "High", app: "Scrut", assignee: "-" },
    { name: "Asset list tracks resources that contain critical data", status: "Fix Required", type: "Automated Test", effort: "Low", app: "Scrut", assignee: "-" },
  ];

  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10, color: "var(--gray-800)" }}>
        Tests <span style={{ background: "var(--gray-200)", color: "var(--gray-600)", borderRadius: 6, padding: "2px 6px", fontSize: 13, fontWeight: 600 }}>328</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Btn>View Test Library</Btn>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['All', 'Automated Tests', 'Policy', 'Evidence'].map(t => (
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
          {["Assignee", "Framework", "Application", "Effort Estimate"].map(filter => (
            <select key={filter} style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none", color: "var(--gray-600)" }}>
              <option>{filter} ▾</option>
            </select>
          ))}
          <select style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "var(--gray-50)", cursor: "pointer", outline: "none", color: "var(--gray-600)" }}>
            <option>Mapping 1 ▾</option>
          </select>
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>🔄</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--teal)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            Passing ⓘ
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 700, color: "var(--gray-800)" }}>128</span>
            <span style={{ fontSize: 16, color: "var(--gray-500)", fontWeight: 600 }}>/311</span>
          </div>
        </Card>

        <Card>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#ef4444", background: "#fee2e2", padding: "4px 8px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            Fix Required ⓘ
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "var(--gray-800)" }}>183</div>
        </Card>

        <Card>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-600)", background: "var(--gray-100)", padding: "4px 8px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            Ignored ⓘ
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: "var(--gray-800)" }}>0</div>
        </Card>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '6px 12px', flex: 1, maxWidth: 300 }}>
          <span style={{ color: 'var(--gray-400)', marginRight: 8 }}>🔍</span>
          <input placeholder="Search by name" style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%' }} />
        </div>
      </div>

      <Card noPad>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-200)", background: "var(--gray-50)", width: 32 }}><input type="checkbox" /></th>
                {["TestName ↕", "Status ↕", "Type ↕", "Effort Estimate ↕", "Applications ↕", "Assignees ↕"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "var(--gray-400)", borderBottom: "1px solid var(--gray-200)", background: "var(--gray-50)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests.map((t, i) => (
                <tr key={i}>
                  <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-100)" }}><input type="checkbox" /></td>
                  <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, fontWeight: 500, color: "var(--gray-800)" }}>{t.name}</td>
                  <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 12, fontWeight: 600 }}>
                    <span style={{ color: t.status === "Passing" ? "var(--teal)" : "#ef4444", background: t.status === "Passing" ? "#ccfbf1" : "#fee2e2", padding: "4px 8px", borderRadius: 4 }}>{t.status}</span>
                  </td>
                  <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, color: "var(--gray-600)" }}>{t.type}</td>
                  <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, color: "var(--gray-600)" }}>
                    <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background: t.effort==="High" ? "#ef4444" : "#f59e0b", marginRight:6 }}/>
                    {t.effort}
                  </td>
                  <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, color: "var(--gray-600)" }}>{t.app}</td>
                  <td style={{ padding: "14px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, color: "var(--gray-600)" }}>{t.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
