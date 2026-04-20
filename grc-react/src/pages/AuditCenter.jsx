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
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Audit Center <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Schedule Audit</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
        {[["Scheduled",items.filter(a=>a.status==="scheduled").length,"var(--yellow)"],["In Progress",items.filter(a=>a.status==="in-progress").length,"var(--teal)"],["Completed",items.filter(a=>a.status==="completed").length,"var(--green)"]].map(([label,val,color]) => (
          <div key={label} style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:700, color }}>{val}</div>
          </div>
        ))}
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
