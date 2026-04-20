import { useState } from "react";
import { questionnaires as initialQ } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";
import ProgressBar from "../components/ProgressBar";

export default function Questionnaire({ showToast }) {
  const [items, setItems] = useState(initialQ);
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ vendor:"", name:"", dueDate:"" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"not-sent", sent:"", responses:0, total:20 }]);
    setAddOpen(false); setForm({ vendor:"", name:"", dueDate:"" });
    showToast("Questionnaire created");
  }
  const statusMap = { "in-progress":"in-progress", overdue:"needs-attention", "not-sent":"not-applicable", completed:"completed" };
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Questionnaires <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ New Questionnaire</Btn>
      </div>
      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Questionnaire</th><th style={th}>Vendor</th><th style={th}>Sent</th>
              <th style={th}>Due Date</th><th style={th}>Progress</th><th style={th}>Status</th><th style={th}>Actions</th>
            </tr></thead>
            <tbody>
              {items.map(q => (
                <tr key={q.id} style={{ cursor:"pointer" }} onClick={() => setDetail(q)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{q.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{q.vendor}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{q.sent||"—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{q.dueDate||"—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", minWidth:120 }}>
                    <div style={{ fontSize:11, marginBottom:4 }}>{q.responses}/{q.total}</div>
                    <ProgressBar value={q.total>0?(q.responses/q.total)*100:0} color="var(--teal)" style={{ marginTop:0 }} />
                  </td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={statusMap[q.status]||"not-applicable"}>{q.status}</StatusBadge></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }} onClick={e => e.stopPropagation()}>
                    <Btn small onClick={() => { setItems(prev => prev.map(i => i.id===q.id?{...i,status:"in-progress",sent:new Date().toISOString().slice(0,10)}:i)); showToast("Questionnaire sent to " + q.vendor); }}>Send</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="New Questionnaire"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Create</Btn></>}>
        <form onSubmit={handleAdd}>
          {[["Questionnaire Name","name"],["Vendor","vendor"]].map(([label,key]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <input required value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
            </div>
          ))}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Questionnaire Details"
        footer={<Btn onClick={() => setDetail(null)}>Close</Btn>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Name",detail.name],["Vendor",detail.vendor],["Sent",detail.sent||"Not sent"],["Due Date",detail.dueDate||"—"]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div>
            <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:6 }}>Responses: {detail.responses}/{detail.total}</div>
            <ProgressBar value={detail.total>0?(detail.responses/detail.total)*100:0} color="var(--teal)" style={{ marginTop:0 }} />
          </div>
        </div>}
      </Modal>
    </div>
  );
}
