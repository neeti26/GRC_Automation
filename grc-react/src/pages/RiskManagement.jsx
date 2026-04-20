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
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Risk Management <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Risk</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <Card>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--gray-600)", marginBottom:14 }}>Risk Heat Map</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:3 }}>
            {matrix.map((row,ri) => row.map((v,ci) => (
              <div key={ri+"-"+ci} style={{ height:40, borderRadius:4, background:cellColor(v), display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:600, color:"#374151" }}>{v}</div>
            )))}
          </div>
          <div style={{ display:"flex", gap:12, marginTop:10, fontSize:11 }}>
            {[["#fecaca","Critical"],["#fee2e2","High"],["#fef3c7","Medium"],["#dcfce7","Low"]].map(([bg,label]) => (
              <span key={label}><span style={{ display:"inline-block", width:10, height:10, background:bg, borderRadius:2, marginRight:4 }} />{label}</span>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ fontSize:13, fontWeight:600, color:"var(--gray-600)", marginBottom:14 }}>Risk Summary</div>
          {[["Critical",items.filter(r=>r.inherent==="Critical").length,"#991b1b"],["High",items.filter(r=>r.inherent==="High").length,"#dc2626"],["Medium",items.filter(r=>r.inherent==="Medium").length,"#d97706"],["Low",items.filter(r=>r.inherent==="Low").length,"#16a34a"]].map(([label,count,color]) => (
            <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:"1px solid var(--gray-100)" }}>
              <span style={{ fontSize:13 }}>{label}</span>
              <span style={{ fontWeight:700, color, fontSize:18 }}>{count}</span>
            </div>
          ))}
        </Card>
      </div>
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
    </div>
  );
}
