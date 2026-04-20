import { useState } from "react";
import { trainingCampaigns as initialCampaigns } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";
import ProgressBar from "../components/ProgressBar";

export default function Training({ showToast }) {
  const [items, setItems] = useState(initialCampaigns);
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ name:"", type:"Mandatory", dueDate:"" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"draft", enrolled:0, completed:0 }]);
    setAddOpen(false); setForm({ name:"", type:"Mandatory", dueDate:"" });
    showToast("Campaign created");
  }
  const statusMap = { active:"in-progress", completed:"completed", draft:"not-applicable" };
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Training Campaigns <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ New Campaign</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:16 }}>
        {[["Active",items.filter(c=>c.status==="active").length,"var(--teal)"],["Completed",items.filter(c=>c.status==="completed").length,"var(--green)"],["Draft",items.filter(c=>c.status==="draft").length,"var(--gray-400)"]].map(([label,val,color]) => (
          <div key={label} style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:700, color }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
        {items.map(c => (
          <Card key={c.id} style={{ cursor:"pointer" }} onClick={() => setDetail(c)}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div>
                <div style={{ fontWeight:600, fontSize:14, marginBottom:4 }}>{c.name}</div>
                <div style={{ fontSize:12, color:"var(--gray-400)" }}>{c.type} · Due {c.dueDate}</div>
              </div>
              <StatusBadge status={statusMap[c.status]||"not-applicable"}>{c.status}</StatusBadge>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
              <span>Completion</span><span style={{ fontWeight:600 }}>{c.enrolled>0?Math.round((c.completed/c.enrolled)*100):0}%</span>
            </div>
            <ProgressBar value={c.enrolled>0?(c.completed/c.enrolled)*100:0} color="var(--teal)" />
            <div style={{ display:"flex", gap:16, marginTop:10, fontSize:12, color:"var(--gray-400)" }}>
              <span>Enrolled: {c.enrolled}</span><span>Completed: {c.completed}</span>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="New Training Campaign"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Create</Btn></>}>
        <form onSubmit={handleAdd}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Campaign Name</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Type</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, background:"#fff" }}>
              <option>Mandatory</option><option>Optional</option><option>Simulation</option>
            </select>
          </div>
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.name}
        footer={<Btn onClick={() => setDetail(null)}>Close</Btn>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", gap:12 }}>
            <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={statusMap[detail.status]||"not-applicable"}>{detail.status}</StatusBadge></div>
            <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>Type</div><div style={{ fontSize:14 }}>{detail.type}</div></div>
          </div>
          {[["Due Date",detail.dueDate],["Enrolled",detail.enrolled],["Completed",detail.completed]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div>
            <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:6 }}>Completion Rate</div>
            <ProgressBar value={detail.enrolled>0?(detail.completed/detail.enrolled)*100:0} color="var(--teal)" />
            <div style={{ fontSize:12, color:"var(--gray-400)", marginTop:4 }}>{detail.enrolled>0?Math.round((detail.completed/detail.enrolled)*100):0}%</div>
          </div>
        </div>}
      </Modal>
    </div>
  );
}
