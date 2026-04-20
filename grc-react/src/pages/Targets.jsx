import { useState } from "react";
import { targets as initialTargets } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

export default function Targets({ showToast }) {
  const [items, setItems] = useState(initialTargets);
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ name:"", type:"Cloud", assignee:"" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"active", lastScan:"Never", findings:0 }]);
    setAddOpen(false); setForm({ name:"", type:"Cloud", assignee:"" });
    showToast("Target added");
  }
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Targets <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Target</Btn>
      </div>
      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Target Name</th><th style={th}>Type</th><th style={th}>Last Scan</th>
              <th style={th}>Findings</th><th style={th}>Assignee</th><th style={th}>Status</th><th style={th}>Actions</th>
            </tr></thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id} style={{ cursor:"pointer" }} onClick={() => setDetail(t)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{t.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{t.type}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{t.lastScan}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:700, color:t.findings>0?"var(--red)":"var(--green)" }}>{t.findings}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{t.assignee||"—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={t.status==="active"?"compliant":"not-applicable"}>{t.status}</StatusBadge></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }} onClick={e => e.stopPropagation()}>
                    <Btn small onClick={() => showToast("Scan initiated for " + t.name)}>Scan Now</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Target"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Target Name</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Type</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, background:"#fff" }}>
              <option>Cloud</option><option>Network</option><option>Application</option><option>Database</option>
            </select>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Assignee</label>
            <input value={form.assignee} onChange={e => setForm(f => ({ ...f, assignee:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Target Details"
        footer={<><Btn variant="teal" onClick={() => { showToast("Scan initiated for " + detail.name); setDetail(null); }}>Scan Now</Btn><Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Name",detail.name],["Type",detail.type],["Last Scan",detail.lastScan],["Findings",detail.findings],["Assignee",detail.assignee||"Unassigned"]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
        </div>}
      </Modal>
    </div>
  );
}
