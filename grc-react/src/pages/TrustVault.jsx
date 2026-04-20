import { useState } from "react";
import { trustDocuments as initialDocs } from "../data";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

export default function TrustVault({ showToast }) {
  const [items, setItems] = useState(initialDocs);
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ name:"", type:"Policy", visibility:"Public" });
  function handleAdd(e) {
    e.preventDefault();
    setItems(prev => [...prev, { ...form, id:Date.now(), status:"published", date:new Date().toISOString().slice(0,10) }]);
    setAddOpen(false); setForm({ name:"", type:"Policy", visibility:"Public" });
    showToast("Document added to Trust Vault");
  }
  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };
  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Trust Vault <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{items.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Document</Btn>
      </div>
      <Card noPad>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Document Name</th><th style={th}>Type</th><th style={th}>Date</th>
              <th style={th}>Visibility</th><th style={th}>Status</th><th style={th}>Actions</th>
            </tr></thead>
            <tbody>
              {items.map(d => (
                <tr key={d.id} style={{ cursor:"pointer" }} onClick={() => setDetail(d)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", color:"var(--teal)", fontWeight:500 }}>{d.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{d.type}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{d.date}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{d.visibility}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={d.status==="published"?"compliant":d.status==="restricted"?"needs-attention":"not-applicable"}>{d.status}</StatusBadge></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }} onClick={e => e.stopPropagation()}>
                    <Btn small onClick={() => showToast("Downloading " + d.name)}>Download</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Document"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Document Name</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          {[["Type","type",["Audit Report","Certificate","Security Report","Policy","Legal"]],["Visibility","visibility",["Public","NDA Required","Customers Only","Internal"]]].map(([label,key,opts]) => (
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
      <Modal open={!!detail} onClose={() => setDetail(null)} title="Document Details"
        footer={<><Btn variant="teal" onClick={() => { showToast("Downloading " + detail.name); setDetail(null); }}>Download</Btn><Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Name",detail.name],["Type",detail.type],["Date",detail.date],["Visibility",detail.visibility]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={detail.status==="published"?"compliant":"needs-attention"}>{detail.status}</StatusBadge></div>
        </div>}
      </Modal>
    </div>
  );
}
