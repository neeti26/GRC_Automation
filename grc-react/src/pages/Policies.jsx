import { useState, useMemo } from "react";
import { policies as initialPolicies } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";

const policyStatusColors = { active:"compliant", draft:"draft", "under-review":"in-progress" };

export default function Policies({ showToast }) {
  const [items, setItems] = useState(initialPolicies);
  const [search, setSearch] = useState("");
  const [fw, setFw] = useState("All");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ name:"", version:"v1.0", owner:"", framework:"ISO 27001:2022", status:"draft" });
  const PER = 8;
  const filtered = useMemo(() => items.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (fw === "All" || p.framework === fw)
  ), [items, search, fw]);
  const paged = filtered.slice((page-1)*PER, page*PER);
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id: Date.now(), lastReviewed: new Date().toISOString().slice(0,10) }]);
    setAddOpen(false); setForm({ name:"", version:"v1.0", owner:"", framework:"ISO 27001:2022", status:"draft" });
    showToast("Policy added");
  }
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Policies <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Policy</Btn>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search policies..."
          style={{ flex:1, minWidth:180, padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
        <select value={fw} onChange={e => { setFw(e.target.value); setPage(1); }}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          <option value="All">All Frameworks</option>
          <option>ISO 27001:2022</option><option>SOC 2</option><option>MAS TRM 2021</option>
        </select>
        <Btn onClick={() => showToast("Exported to CSV")}>Export</Btn>
      </div>
      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Policy Name</th><th style={th}>Version</th>
              <th style={th}>Framework</th><th style={th}>Owner</th>
              <th style={th}>Last Reviewed</th><th style={th}>Status</th>
            </tr></thead>
            <tbody>
              {paged.map(p => (
                <tr key={p.id} style={{ cursor:"pointer" }} onClick={() => setDetail(p)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{p.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{p.version}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{p.framework}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{p.owner || "—"}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{p.lastReviewed}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={policyStatusColors[p.status] || "not-applicable"}>{p.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Policy"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          {[["Policy Name","name"],["Version","version"],["Owner","owner"]].map(([label,key]) => (
            <div key={key} style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
              <input required={key!=="owner"} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
                style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
            </div>
          ))}
          {[["Framework","framework",["ISO 27001:2022","SOC 2","MAS TRM 2021"]],["Status","status",["draft","active","under-review"]]].map(([label,key,opts]) => (
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
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Policy Details"
        footer={<Btn onClick={() => setDetail(null)}>Close</Btn>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Name",detail.name],["Version",detail.version],["Framework",detail.framework],["Owner",detail.owner||"Unassigned"],["Last Reviewed",detail.lastReviewed]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div>
            <StatusBadge status={policyStatusColors[detail.status]||"not-applicable"}>{detail.status}</StatusBadge></div>
        </div>}
      </Modal>
    </div>
  );
}
