import { useState, useMemo } from "react";
import { findings as initialFindings } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

const sevColor = { critical:"#991b1b", high:"#dc2626", medium:"#d97706", low:"#16a34a" };
const sevBg = { critical:"#fecaca", high:"#fee2e2", medium:"#fef3c7", low:"#dcfce7" };

function SevBadge({ sev }) {
  return <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:600, background:sevBg[sev]||"#f3f4f6", color:sevColor[sev]||"#6b7280" }}>{sev}</span>;
}

export default function Findings({ showToast }) {
  const [items, setItems] = useState(initialFindings);
  const [search, setSearch] = useState("");
  const [sevFilter, setSevFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ title:"", severity:"medium", asset:"", source:"Manual", assignee:"" });
  const PER = 8;
  const filtered = useMemo(() => items.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) &&
    (sevFilter==="All" || f.severity===sevFilter) &&
    (statusFilter==="All" || f.status===statusFilter)
  ), [items, search, sevFilter, statusFilter]);
  const paged = filtered.slice((page-1)*PER, page*PER);
  const counts = { critical:items.filter(f=>f.severity==="critical").length, high:items.filter(f=>f.severity==="high").length, medium:items.filter(f=>f.severity==="medium").length, low:items.filter(f=>f.severity==="low").length };
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"open", discovered:new Date().toISOString().slice(0,10) }]);
    setAddOpen(false); setForm({ title:"", severity:"medium", asset:"", source:"Manual", assignee:"" });
    showToast("Finding added");
  }
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Findings <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Finding</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        {[["critical","Critical",sevBg.critical,sevColor.critical],["high","High",sevBg.high,sevColor.high],["medium","Medium",sevBg.medium,sevColor.medium],["low","Low",sevBg.low,sevColor.low]].map(([key,label,bg,color]) => (
          <div key={key} onClick={() => { setSevFilter(sevFilter===key?"All":key); setPage(1); }}
            style={{ background:"#fff", border:`2px solid ${sevFilter===key?color:"var(--gray-200)"}`, borderRadius:10, padding:"14px 16px", cursor:"pointer" }}>
            <div style={{ fontSize:11, fontWeight:600, color, marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:700 }}>{counts[key]}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search findings..."
          style={{ flex:1, minWidth:180, padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          <option value="All">All Statuses</option><option value="open">Open</option><option value="in-progress">In Progress</option><option value="resolved">Resolved</option>
        </select>
        <Btn onClick={() => showToast("Exported")}>Export</Btn>
      </div>
      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Title</th><th style={th}>Severity</th><th style={th}>Status</th>
              <th style={th}>Asset</th><th style={th}>Source</th><th style={th}>Discovered</th><th style={th}>Assignee</th>
            </tr></thead>
            <tbody>
              {paged.map(f => (
                <tr key={f.id} style={{ cursor:"pointer" }} onClick={() => setDetail(f)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{f.title}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><SevBadge sev={f.severity} /></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={f.status==="resolved"?"completed":f.status==="in-progress"?"in-progress":"needs-attention"}>{f.status}</StatusBadge></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{f.asset}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{f.source}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{f.discovered}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{f.assignee||"—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Finding"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          {[["Title","title"],["Asset","asset"],["Source","source"],["Assignee","assignee"]].map(([label,key]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <input required={key!=="assignee"} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
            </div>
          ))}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Severity</label>
            <select value={form.severity} onChange={e => setForm(f => ({ ...f, severity:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, background:"#fff" }}>
              <option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
            </select>
          </div>
        </form>
      </Modal>
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Finding Details"
        footer={<><Btn variant="teal" onClick={() => { setItems(prev => prev.map(f => f.id===detail.id?{...f,status:"resolved"}:f)); setDetail(null); showToast("Marked as resolved"); }}>Mark Resolved</Btn><Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>Title</div><div style={{ fontSize:14 }}>{detail.title}</div></div>
          <div style={{ display:"flex", gap:12 }}><div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Severity</div><SevBadge sev={detail.severity} /></div>
            <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={detail.status==="resolved"?"completed":"needs-attention"}>{detail.status}</StatusBadge></div></div>
          {[["Asset",detail.asset],["Source",detail.source],["Discovered",detail.discovered],["Assignee",detail.assignee||"Unassigned"]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
        </div>}
      </Modal>
    </div>
  );
}
