import { useState } from "react";
import { accessReviews as initialReviews } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";
import ProgressBar from "../components/ProgressBar";

export default function AccessReviews({ showToast }) {
  const [items, setItems] = useState(initialReviews);
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ name:"", reviewDate:"", reviewedBy:"" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"scheduled", totalAccess:0, revoked:0, approved:0 }]);
    setAddOpen(false); setForm({ name:"", reviewDate:"", reviewedBy:"" });
    showToast("Access review scheduled");
  }
  const statusMap = { completed:"completed", "in-progress":"in-progress", scheduled:"not-applicable" };
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Access Reviews <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ New Review</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
        {[["Scheduled",items.filter(r=>r.status==="scheduled").length,"var(--yellow)"],["In Progress",items.filter(r=>r.status==="in-progress").length,"var(--teal)"],["Completed",items.filter(r=>r.status==="completed").length,"var(--green)"]].map(([label,val,color]) => (
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
              <th style={th}>Review Name</th><th style={th}>Review Date</th><th style={th}>Reviewed By</th>
              <th style={th}>Total Access</th><th style={th}>Approved</th><th style={th}>Revoked</th><th style={th}>Status</th>
            </tr></thead>
            <tbody>
              {items.map(r => (
                <tr key={r.id} style={{ cursor:"pointer" }} onClick={() => setDetail(r)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{r.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{r.reviewDate}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{r.reviewedBy||"—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{r.totalAccess}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><span style={{ color:"var(--green)", fontWeight:600 }}>{r.approved}</span></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><span style={{ color:"var(--red)", fontWeight:600 }}>{r.revoked}</span></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={statusMap[r.status]||"not-applicable"}>{r.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Schedule Access Review"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Schedule</Btn></>}>
        <form onSubmit={handleAdd}>
          {[["Review Name","name"],["Reviewed By","reviewedBy"]].map(([label,key]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <input required={key==="name"} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
            </div>
          ))}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Review Date</label>
            <input type="date" required value={form.reviewDate} onChange={e => setForm(f => ({ ...f, reviewDate:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Review Details"
        footer={<Btn onClick={() => setDetail(null)}>Close</Btn>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Review Name",detail.name],["Review Date",detail.reviewDate],["Reviewed By",detail.reviewedBy||"Unassigned"]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[["Total",detail.totalAccess,"var(--gray-800)"],["Approved",detail.approved,"var(--green)"],["Revoked",detail.revoked,"var(--red)"]].map(([k,v,c]) => (
              <div key={k} style={{ textAlign:"center", padding:12, background:"var(--gray-50)", borderRadius:8 }}>
                <div style={{ fontSize:22, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:11, color:"var(--gray-400)", marginTop:4 }}>{k}</div>
              </div>
            ))}
          </div>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={statusMap[detail.status]||"not-applicable"}>{detail.status}</StatusBadge></div>
        </div>}
      </Modal>
    </div>
  );
}
