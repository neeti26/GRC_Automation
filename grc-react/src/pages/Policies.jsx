import { useState } from "react";
import Btn from "../components/Btn";
import Card from "../components/Card";

export default function Policies({ showToast }) {
  const [tab, setTab] = useState("Dashboard");

  const policies = [
    { name: "Physical Security Policy", status: "Published", gaps: "Not Evaluated", effort: "Medium", assignee: "BL" },
    { name: "Cloud Security Policy", status: "Published", gaps: "Not Evaluated", effort: "Low", assignee: "AD" },
    { name: "Information Security (IS) Policy", status: "Published", gaps: "Not Evaluated", effort: "Medium", assignee: "CM" },
    { name: "Personal Data Transfer, Retention and Erasure Policy", status: "Published", gaps: "Not Evaluated", effort: "Low", assignee: "BL" },
  ];

  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10, color: "var(--gray-800)" }}>
        Policies <span style={{ background: "var(--gray-200)", color: "var(--gray-600)", borderRadius: 6, padding: "2px 6px", fontSize: 13, fontWeight: 600 }}>49</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <Btn variant="primary" onClick={() => showToast("Add Policy clicked")}>Add Policy</Btn>
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>⚙️</button>
        </div>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Dashboard', 'All Policies'].map(t => (
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
            <Card style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)", marginBottom: 4 }}>You're all caught up!</div>
              <div style={{ fontSize: 12, color: "var(--gray-500)" }}>All policies are up to date.</div>
            </Card>
            <Card style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)", marginBottom: 4 }}>You're all caught up!</div>
              <div style={{ fontSize: 12, color: "var(--gray-500)" }}>No gaps detected in your policies</div>
            </Card>
          </div>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--gray-800)" }}>Policies by Assignee</div>
              <select style={{ padding: "4px 10px", border: "1px solid var(--gray-200)", borderRadius: 6, fontSize: 12, background: "#fff" }}>
                <option>Assignee ▾</option>
              </select>
            </div>
            
            <div style={{ position: "relative", height: 260, display: "flex", alignItems: "flex-end", paddingBottom: 40, paddingLeft: 40 }}>
              <div style={{ position: "absolute", left: -30, top: "40%", transform: "rotate(-90deg)", transformOrigin: "0 0", fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Number of Policies</div>
              <div style={{ position: "absolute", bottom: 40, left: 40, right: 0, height: 1, background: "var(--gray-200)" }} />
              
              <div style={{ position: "absolute", left: 0, bottom: 40, top: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", paddingRight: 8, fontSize: 11, color: "var(--gray-500)" }}>
                <span>30</span><span>25</span><span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
              </div>
              
              <div style={{ position: "absolute", bottom: 40, left: 40, right: 0, display: "flex", justifyContent: "space-around", alignItems: "flex-end", height: "100%" }}>
                {[
                  { name: "Balaji", val: 24 },
                  { name: "Blessing Lin", val: 10 },
                  { name: "Goutham Madhwaraj", val: 11 },
                  { name: "Juliani", val: 5 },
                  { name: "Sandeep", val: 5 },
                  { name: "Abir Datta", val: 4 },
                  { name: "Denise Wee", val: 4 }
                ].map(bar => (
                  <div key={bar.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "10%" }}>
                    <div style={{ width: "80%", background: "#10b981", height: `${(bar.val/30)*100}%`, borderRadius: "4px 4px 0 0" }} />
                    <div style={{ position: "absolute", bottom: -20, fontSize: 10, color: "var(--gray-500)", textAlign: "center", whiteSpace: "nowrap" }}>{bar.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
              {[
                { label: "Not Uploaded", color: "#9ca3af" },
                { label: "Draft", color: "#f59e0b" },
                { label: "Approved", color: "#3b82f6" },
                { label: "Needs Review", color: "#ef4444" },
                { label: "Published", color: "#10b981" }
              ].map(leg => (
                <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--gray-600)", fontWeight: 600 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: leg.color }} /> {leg.label}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {tab === "All Policies" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-600)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                Policy Status ⓘ
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "var(--gray-800)" }}>49/49</span>
                <span style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Policies Published</span>
              </div>
              <div style={{ height: 8, background: "var(--gray-200)", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ height: "100%", width: "100%", background: "#10b981", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 10, color: "var(--gray-500)" }}>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#10b981", marginRight:4 }}/>Published - 49</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#f59e0b", marginRight:4 }}/>Draft - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#ef4444", marginRight:4 }}/>Needs Review - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#3b82f6", marginRight:4 }}/>Approved - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#9ca3af", marginRight:4 }}/>Not Uploaded - 0</span>
              </div>
            </Card>

            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-600)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                Policy Gap Status ⓘ
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: "var(--gray-800)" }}>0/49</span>
                <span style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 600 }}>Policies have gaps</span>
              </div>
              <div style={{ height: 8, background: "var(--gray-200)", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                <div style={{ height: "100%", width: "100%", background: "#f59e0b", borderRadius: 4 }} />
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 10, color: "var(--gray-500)" }}>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#10b981", marginRight:4 }}/>No Gaps - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#ef4444", marginRight:4 }}/>Gaps Detected - 0</span>
                <span><span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#f59e0b", marginRight:4 }}/>Not Evaluated - 49</span>
              </div>
            </Card>

            <Card style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-600)", textAlign: "left", marginBottom: 16 }}>Upcoming Policies for Review ⓘ</div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>☕</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)", marginBottom: 4 }}>You're all caught up!</div>
              <div style={{ fontSize: 12, color: "var(--gray-500)" }}>All policies are up to date.</div>
            </Card>

            <Card style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-600)", textAlign: "left", marginBottom: 16 }}>AI-Detected Policy Gaps ⓘ</div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>☕</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)", marginBottom: 4 }}>You're all caught up!</div>
              <div style={{ fontSize: 12, color: "var(--gray-500)" }}>No gaps detected in your policies</div>
            </Card>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, padding: '6px 12px', flex: 1 }}>
              <span style={{ color: 'var(--gray-400)', marginRight: 8 }}>🔍</span>
              <input placeholder="Search by name, entities or approver" style={{ border: 'none', outline: 'none', fontSize: 13, width: '100%' }} />
            </div>
            <Btn>More Filters</Btn>
            <select style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none" }}>
              <option>Columns 5 ▾</option>
            </select>
            <Btn>Export</Btn>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff" }}>
              AI Readability <div style={{ width: 28, height: 16, background: "var(--teal)", borderRadius: 8, position: "relative" }}><div style={{ width: 12, height: 12, background: "#fff", borderRadius: "50%", position: "absolute", right: 2, top: 2 }} /></div>
            </div>
          </div>

          <Card noPad>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-200)", background: "var(--gray-50)", width: 32 }}><input type="checkbox" /></th>
                    {["Policy Name ↕", "Status ↕", "Gaps Detected ↕", "Effort Estimate ↕", "Assignee ↕"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "var(--gray-400)", borderBottom: "1px solid var(--gray-200)", background: "var(--gray-50)", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {policies.map((p, i) => (
                    <tr key={i}>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-100)" }}><input type="checkbox" /></td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, fontWeight: 500, color: "var(--gray-800)" }}>{p.name}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, color: "var(--teal)", fontWeight: 500 }}>{p.status}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, color: "var(--gray-600)" }}>{p.gaps}</td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 13, color: "var(--gray-600)" }}>
                        <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background: p.effort==="Medium" ? "#f59e0b" : "#10b981", marginRight:6 }}/>
                        {p.effort}
                      </td>
                      <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--gray-100)", fontSize: 12 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--gray-200)", color: "var(--gray-600)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{p.assignee}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
