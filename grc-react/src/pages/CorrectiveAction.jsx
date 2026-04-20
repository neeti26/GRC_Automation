import { useState } from "react";
import { correctiveActions as initialActions } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

const priorityColor = { high:"#dc2626", medium:"#d97706", low:"#16a34a" };
const priorityBg = { high:"#fee2e2", medium:"#fef3c7", low:"#dcfce7" };

export default function CorrectiveAction({ showToast }) {
  const [items, setItems] = useState(initialActions);
  const [detail, setDetail] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ title:"", source:"Audit Finding", priority:"medium", dueDate:"", assignee:"", relatedControl:"" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"open" }]);
    setAddOpen(false); setForm({ title:"", source:"Audit Finding", priority:"medium", dueDate:"", assignee:"", relatedControl:"" });
    showToast("Corrective action added");
  }
  const statusMap = { open:"needs-attention", "in-progress":"in-progress", completed:"completed" };
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Corrective Actions <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Action</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
        {[["Open",items.filter(a=>a.status==="open").length,"var(--red)"],["In Progress",items.filter(a=>a.status==="in-progress").length,"var(--yellow)"],["Completed",items.filter(a=>a.status==="completed").length,"var(--green)"]].map(([label,val,color]) => (
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
              <th style={th}>Title</th><th style={th}>Source</th><th style={th}>Priority</th>
              <th style={th}>Due Date</th><th style={th}>Assignee</th><th style={th}>Control</th><th style={th}>Status</th>
            </tr></thead>
            <tbody>
              {items.map(a => (
                <tr key={a.id} style={{ cursor:"pointer" }} onClick={() => setDetail(a)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{a.title}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{a.source}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}>
                    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:600, background:priorityBg[a.priority]||"#f3f4f6", color:priorityColor[a.priority]||"#6b7280" }}>{a.priority}</span>
                  </td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{a.dueDate}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{a.assignee||"—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{a.relatedControl}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={statusMap[a.status]||"not-applicable"}>{a.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Corrective Action"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          {[["Title","title"],["Assignee","assignee"],["Related Control","relatedControl"]].map(([label,key]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <input required={key==="title"} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
            </div>
          ))}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          {[["Source","source",["Audit Finding","Risk Assessment","Policy Review","Vulnerability Scan"]],["Priority","priority",["high","medium","low"]]].map(([label,key,opts]) => (
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
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Action Details"
        footer={<><Btn variant="teal" onClick={() => { setItems(prev => prev.map(a => a.id===detail.id?{...a,status:"completed"}:a)); setDetail(null); showToast("Marked as completed"); }}>Mark Complete</Btn><Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Title",detail.title],["Source",detail.source],["Due Date",detail.dueDate],["Assignee",detail.assignee||"Unassigned"],["Related Control",detail.relatedControl]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={statusMap[detail.status]||"not-applicable"}>{detail.status}</StatusBadge></div>
        </div>}
      </Modal>
    </div>
  );
}
