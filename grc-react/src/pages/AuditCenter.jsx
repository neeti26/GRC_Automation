import { useState } from "react";
import { auditItems as initialAudits } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

export default function AuditCenter({ showToast }) {
  const [items, setItems] = useState(initialAudits);
  const [detail, setDetail] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name:"", framework:"ISO 27001:2022", date:"", auditor:"", scope:"Full", assignee:"" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"scheduled" }]);
    setAddOpen(false); setForm({ name:"", framework:"ISO 27001:2022", date:"", auditor:"", scope:"Full", assignee:"" });
    showToast("Audit scheduled");
  }
  const statusMap = { scheduled:"in-progress", "in-progress":"in-progress", completed:"completed" };
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  const [tab, setTab] = useState("Audits");
  
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Audit Center
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>Add Audit ▾</Btn>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid var(--gray-200)', marginBottom: 24, gap: 4 }}>
        {['Audits', 'Requests', 'Findings', 'Corrective Actions'].map(t => (
          <div key={t} onClick={() => setTab(t)} 
            style={{ 
              padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              color: tab === t ? '#fff' : 'var(--gray-600)', 
              background: tab === t ? '#314158' : 'transparent', 
              borderRadius: tab === t ? '8px 8px 0 0' : 8,
            }}>
            {t}
            {t === 'Audits' && <span style={{ background: tab === t ? 'rgba(255,255,255,0.2)' : 'var(--gray-200)', color: tab === t ? '#fff' : 'var(--gray-600)', borderRadius: 12, padding: '2px 6px', fontSize: 11 }}>{items.length}</span>}
          </div>
        ))}
      </div>

      {tab === "Audits" && (
        <>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:20 }}>
            {[
              { label:"Upcoming", val:items.filter(a=>a.status==="scheduled").length, color:"var(--gray-800)" },
              { label:"In Progress", val:items.filter(a=>a.status==="in-progress").length, color:"#fb923c" },
              { label:"Completed", val:items.filter(a=>a.status==="completed").length, color:"#34d399" }
            ].map(s => (
              <div key={s.label} style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, padding:"16px 20px" }}>
                <div style={{ fontSize:12, fontWeight:600, color:s.color, marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:s.color }}/> {s.label} <span style={{ marginLeft:'auto', color:'var(--gray-400)' }}>ⓘ</span>
                </div>
                <div style={{ fontSize:32, fontWeight:700, color:"var(--gray-800)", textAlign:'center' }}>{s.val}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20, justifyContent: "flex-end" }}>
            {["Audit Type", "Entities", "More Filters"].map(filter => (
              <select key={filter} style={{ padding: "6px 12px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none" }}>
                <option>{filter} ▾</option>
              </select>
            ))}
            <button style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>⚙️</button>
          </div>

      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Audit Name</th><th style={th}>Framework</th><th style={th}>Date</th>
              <th style={th}>Auditor</th><th style={th}>Scope</th><th style={th}>Assignee</th><th style={th}>Status</th>
            </tr></thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id} style={{ cursor:"pointer" }} onClick={() => setDetail(a)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{a.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{a.framework}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{a.date}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{a.auditor}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{a.scope}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{a.assignee||"—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={statusMap[a.status]||"not-applicable"}>{a.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </>
      )}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Schedule Audit"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Schedule</Btn></>}>
        <form onSubmit={handleAdd}>
          {[["Audit Name","name"],["Auditor","auditor"],["Assignee","assignee"]].map(([label,key]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <input required={key!=="assignee"} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
            </div>
          ))}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Audit Date</label>
            <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          {[["Framework","framework",["ISO 27001:2022","SOC 2","MAS TRM 2021","PCI DSS 4.0"]],["Scope","scope",["Full","Partial"]]].map(([label,key,opts]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, background:"#fff" }}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Audit Details"
        footer={<Btn onClick={() => setDetail(null)}>Close</Btn>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Audit Name",detail.name],["Framework",detail.framework],["Date",detail.date],["Auditor",detail.auditor],["Scope",detail.scope],["Assignee",detail.assignee||"Unassigned"]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={statusMap[detail.status]||"not-applicable"}>{detail.status}</StatusBadge></div>
        </div>}
      </Modal>
    </div>
  );
}
