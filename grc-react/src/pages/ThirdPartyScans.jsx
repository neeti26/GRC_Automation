import { useState } from "react";
import { thirdPartyScans as initialScans } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

export default function ThirdPartyScans({ showToast }) {
  const [items, setItems] = useState(initialScans);
  const [detail, setDetail] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name:"", tool:"Qualys", date:"" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"in-progress", critical:0, high:0, medium:0, low:0 }]);
    setAddOpen(false); setForm({ name:"", tool:"Qualys", date:"" });
    showToast("Scan added");
  }
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Third Party Scans <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Scan</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        {[["Critical",items.reduce((s,i)=>s+i.critical,0),"#991b1b","#fecaca"],["High",items.reduce((s,i)=>s+i.high,0),"#dc2626","#fee2e2"],["Medium",items.reduce((s,i)=>s+i.medium,0),"#d97706","#fef3c7"],["Low",items.reduce((s,i)=>s+i.low,0),"#16a34a","#dcfce7"]].map(([label,val,color,bg]) => (
          <div key={label} style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, fontWeight:600, color, marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:700 }}>{val}</div>
          </div>
        ))}
      </div>
      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Scan Name</th><th style={th}>Tool</th><th style={th}>Date</th>
              <th style={th}>Critical</th><th style={th}>High</th><th style={th}>Medium</th><th style={th}>Low</th><th style={th}>Status</th>
            </tr></thead>
            <tbody>
              {items.map(s => (
                <tr key={s.id} style={{ cursor:"pointer" }} onClick={() => setDetail(s)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{s.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{s.tool}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{s.date}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:700, color:"#991b1b" }}>{s.critical}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:700, color:"#dc2626" }}>{s.high}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:700, color:"#d97706" }}>{s.medium}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:700, color:"#16a34a" }}>{s.low}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={s.status==="completed"?"completed":"in-progress"}>{s.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Scan"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Scan Name</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Tool</label>
            <select value={form.tool} onChange={e => setForm(f => ({ ...f, tool:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, background:"#fff" }}>
              <option>Qualys</option><option>Nessus</option><option>Burp Suite</option><option>AWS Inspector</option><option>Other</option>
            </select>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Date</label>
            <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Scan Details"
        footer={<Btn onClick={() => setDetail(null)}>Close</Btn>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Scan Name",detail.name],["Tool",detail.tool],["Date",detail.date]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
            {[["Critical",detail.critical,"#991b1b","#fecaca"],["High",detail.high,"#dc2626","#fee2e2"],["Medium",detail.medium,"#d97706","#fef3c7"],["Low",detail.low,"#16a34a","#dcfce7"]].map(([k,v,c,bg]) => (
              <div key={k} style={{ textAlign:"center", padding:10, background:bg, borderRadius:8 }}>
                <div style={{ fontSize:20, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:11, color:c, marginTop:2 }}>{k}</div>
              </div>
            ))}
          </div>
        </div>}
      </Modal>
    </div>
  );
}
