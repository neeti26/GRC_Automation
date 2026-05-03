import { useState, useMemo } from "react";
import { risks as initialRisks } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

const riskColor = { Critical:"#991b1b", High:"#dc2626", Medium:"#d97706", Low:"#16a34a" };
const riskBg = { Critical:"#fecaca", High:"#fee2e2", Medium:"#fef3c7", Low:"#dcfce7" };
function RiskBadge({ level }) {
  return <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:600, background:riskBg[level]||"#f3f4f6", color:riskColor[level]||"#6b7280" }}>{level}</span>;
}

export default function RiskManagement({ showToast }) {
  const [items, setItems] = useState(initialRisks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detail, setDetail] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ title:"", category:"Cloud Security", likelihood:3, impact:3, treatment:"Mitigate", owner:"" });
  const filtered = useMemo(() => items.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter==="All" || r.status===statusFilter)
  ), [items, search, statusFilter]);
  function handleAdd(e) {
    e.preventDefault();
    const l = Number(form.likelihood), i = Number(form.impact), score = l*i;
    const level = score>=16?"Critical":score>=9?"High":score>=4?"Medium":"Low";
    setItems(prev => [...prev, { ...form, id:Date.now(), inherent:level, residual:level, status:"open", likelihood:l, impact:i }]);
    setAddOpen(false); setForm({ title:"", category:"Cloud Security", likelihood:3, impact:3, treatment:"Mitigate", owner:"" });
    showToast("Risk added");
  }
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  const matrix = [[1,2,3,4,5],[2,4,6,8,10],[3,6,9,12,15],[4,8,12,16,20],[5,10,15,20,25]];
  const cellColor = v => v>=16?"#fecaca":v>=9?"#fee2e2":v>=4?"#fef3c7":"#dcfce7";
  const [tab, setTab] = useState("Dashboard");
  
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Risk Management
        <div style={{ marginLeft:"auto", display:"flex", gap:12 }}>
          <Btn variant="primary" onClick={() => setAddOpen(true)}>Add Risk ▾</Btn>
          <Btn>Export Risk Report</Btn>
          <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>⚙️</button>
        </div>
      </div>
      
      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24, gap: 4 }}>
        {['Dashboard', 'Risk Register', 'Mitigation Task', 'Risk Discovery'].map(t => (
          <div key={t} onClick={() => setTab(t)} 
            style={{ 
              padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', 
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
          <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "flex-end" }}>
            {["Assignee", "Department", "Category", "Entities"].map(filter => (
              <select key={filter} style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none" }}>
                <option>{filter} ▾</option>
              </select>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Open", val: 0, color: "#9ca3af" },
              { label: "Assessed", val: 0, color: "#60a5fa" },
              { label: "Treatment in Progress", val: 0, color: "#fb923c" },
              { label: "Monitor", val: 0, color: "#fca5a5" },
              { label: "Treated", val: 0, color: "#34d399" },
              { label: "Closed", val: 0, color: "#f87171" }
            ].map(s => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid var(--gray-200)", borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: s.color, marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
                  {s.label} <span>ⓘ</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "var(--gray-800)" }}>{s.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)" }}>Risk Heat Map</div>
                <select style={{ padding: "4px 10px", border: "1px solid var(--gray-200)", borderRadius: 6, fontSize: 12, background: "#fff" }}>
                  <option>Treatment Strategy ▾</option>
                </select>
              </div>
              
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                <select style={{ flex: 1, padding: "8px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 12, background: "var(--gray-50)", color: "var(--gray-600)", fontWeight: 600 }}>
                  <option>Risk Score: Inherent Risk ▾</option>
                </select>
                <select style={{ flex: 1, padding: "8px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 12, background: "var(--gray-50)", color: "var(--gray-600)", fontWeight: 600 }}>
                  <option>X-Axis: Likelihood ▾</option>
                </select>
                <select style={{ flex: 1, padding: "8px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 12, background: "var(--gray-50)", color: "var(--gray-600)", fontWeight: 600 }}>
                  <option>Y-Axis: Impact ▾</option>
                </select>
              </div>

              <div style={{ position: "relative", paddingLeft: 40, paddingBottom: 30 }}>
                <div style={{ position: "absolute", left: 0, top: "40%", transform: "rotate(-90deg)", transformOrigin: "0 0", fontSize: 11, fontWeight: 600, color: "var(--gray-400)" }}>Impact</div>
                <div style={{ position: "absolute", bottom: 0, left: "45%", fontSize: 11, fontWeight: 600, color: "var(--gray-400)" }}>Likelihood</div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--gray-500)", width: 40, textAlign: "right", paddingRight: 8 }}>High</span>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--gray-500)", width: 40, textAlign: "right", paddingRight: 8 }}>Medium</span>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--gray-500)", width: 40, textAlign: "right", paddingRight: 8 }}>Low</span>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                    <div style={{ flex: 1, height: 48, background: "#9ca3af", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>0</div>
                  </div>
                </div>
                <div style={{ display: "flex", marginLeft: 48, marginTop: 8, paddingRight: 8 }}>
                  <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--gray-500)" }}>Low</div>
                  <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--gray-500)" }}>Medium<br/>Likelihood</div>
                  <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--gray-500)" }}>High</div>
                </div>
              </div>
            </Card>

            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)" }}>Risk Trend</div>
                <select style={{ padding: "4px 10px", border: "1px solid var(--gray-200)", borderRadius: 6, fontSize: 12, background: "#fff" }}>
                  <option>Last 7 Days ▾</option>
                </select>
              </div>
              <div style={{ fontSize: 11, color: "var(--gray-400)", textAlign: "center", marginBottom: 20 }}>Click and drag in the plot area to zoom in</div>
              
              <div style={{ position: "relative", height: 200, display: "flex", alignItems: "flex-end", paddingBottom: 24, paddingLeft: 40 }}>
                <div style={{ position: "absolute", left: 0, top: "40%", transform: "rotate(-90deg)", transformOrigin: "0 0", fontSize: 11, color: "var(--gray-500)" }}>Number of Risks</div>
                <div style={{ position: "absolute", bottom: 40, left: 40, right: 0, height: 1, background: "var(--gray-200)" }} />
                
                <div style={{ position: "absolute", bottom: 40, left: 40, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {[...Array(7)].map((_,i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", position: "relative", zIndex: 2 }} />
                  ))}
                  <div style={{ position: "absolute", top: 4, left: 0, right: 0, height: 2, background: "#10b981", zIndex: 1 }} />
                </div>

                <div style={{ position: "absolute", bottom: 0, left: 40, right: 0, display: "flex", justifyContent: "space-between" }}>
                  {["Apr 25", "Apr 26", "Apr 27", "Apr 28", "Apr 29", "Apr 30", "May 1"].map(d => (
                    <div key={d} style={{ fontSize: 10, color: "var(--gray-500)" }}>{d}</div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {tab === "Risk Register" && (
        <>
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search risks..."
          style={{ flex:1, minWidth:180, padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          <option value="All">All Statuses</option><option value="open">Open</option><option value="in-progress">In Progress</option><option value="mitigated">Mitigated</option>
        </select>
        <Btn onClick={() => showToast("Exported")}>Export</Btn>
      </div>
      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Risk Title</th><th style={th}>Category</th><th style={th}>Inherent</th>
              <th style={th}>Residual</th><th style={th}>Treatment</th><th style={th}>Owner</th><th style={th}>Status</th>
            </tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ cursor:"pointer" }} onClick={() => setDetail(r)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{r.title}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{r.category}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><RiskBadge level={r.inherent} /></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><RiskBadge level={r.residual} /></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{r.treatment}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{r.owner||"—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={r.status==="mitigated"?"completed":r.status==="in-progress"?"in-progress":"needs-attention"}>{r.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Risk"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add Risk</Btn></>}>
        <form onSubmit={handleAdd}>
          {[["Risk Title","title"],["Owner","owner"]].map(([label,key]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <input required={key!=="owner"} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
            </div>
          ))}
          {[["Category","category",["Cloud Security","Endpoint Security","Vendor Risk","Access Control","Network Security","Compliance","Human Factor"]],["Treatment","treatment",["Mitigate","Transfer","Accept","Avoid"]]].map(([label,key,opts]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, background:"#fff" }}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["Likelihood (1-5)","likelihood"],["Impact (1-5)","impact"]].map(([label,key]) => (
              <div key={key} style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
                <input type="number" min="1" max="5" value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                  style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
              </div>
            ))}
          </div>
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Risk Details"
        footer={<Btn onClick={() => setDetail(null)}>Close</Btn>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>Title</div><div style={{ fontSize:14 }}>{detail.title}</div></div>
          <div style={{ display:"flex", gap:16 }}>
            <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Inherent Risk</div><RiskBadge level={detail.inherent} /></div>
            <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Residual Risk</div><RiskBadge level={detail.residual} /></div>
          </div>
          {[["Category",detail.category],["Likelihood",detail.likelihood],["Impact",detail.impact],["Treatment",detail.treatment],["Owner",detail.owner||"Unassigned"]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
        </div>}
      </Modal>
        </>
      )}
    </div>
  );
}
