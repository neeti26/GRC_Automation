import { useState } from "react";
import Btn from "../components/Btn";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const INITIAL_SECRETS = [
  { id:1, name:"AWS Access Key - Production", type:"API Keys", created:"2025-01-10", expires:"2025-07-10", status:"active", owner:"Balaji Kapsikar" },
  { id:2, name:"AWS Access Key - Staging", type:"API Keys", created:"2025-02-01", expires:"2025-08-01", status:"active", owner:"Balaji Kapsikar" },
  { id:3, name:"GitHub Personal Access Token", type:"API Keys", created:"2025-03-01", expires:"2025-09-01", status:"active", owner:"Balaji Kapsikar" },
  { id:4, name:"SSL Certificate - prod.grcautomation.com", type:"Certificates", created:"2024-11-01", expires:"2025-11-01", status:"active", owner:"Balaji Kapsikar" },
  { id:5, name:"SSL Certificate - api.grcautomation.com", type:"Certificates", created:"2024-11-01", expires:"2025-05-01", status:"expiring", owner:"Balaji Kapsikar" },
  { id:6, name:"Database Password - prod-postgres", type:"Passwords", created:"2025-01-15", expires:"2025-07-15", status:"active", owner:"Balaji Kapsikar" },
  { id:7, name:"Database Password - staging-postgres", type:"Passwords", created:"2025-01-15", expires:"2025-07-15", status:"active", owner:"Balaji Kapsikar" },
  { id:8, name:"SMTP Password - notifications", type:"Passwords", created:"2025-02-10", expires:"2025-08-10", status:"active", owner:"Balaji Kapsikar" },
  { id:9, name:"Slack Webhook Token", type:"Tokens", created:"2025-03-01", expires:"Never", status:"active", owner:"Balaji Kapsikar" },
  { id:10, name:"Datadog API Token", type:"Tokens", created:"2025-02-15", expires:"Never", status:"active", owner:"Balaji Kapsikar" },
  { id:11, name:"PagerDuty Integration Key", type:"Tokens", created:"2025-01-20", expires:"Never", status:"active", owner:"Balaji Kapsikar" },
  { id:12, name:"KMS Master Key ARN", type:"Tokens", created:"2024-12-01", expires:"Never", status:"active", owner:"Balaji Kapsikar" },
];

const TYPES = ["All","API Keys","Certificates","Passwords","Tokens"];
const typeIcon = { "API Keys":"🔑", "Certificates":"📜", "Passwords":"🔒", "Tokens":"🎫" };

export default function VaultPage({ showToast }) {
  const [secrets, setSecrets] = useState(INITIAL_SECRETS);
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ name:"", type:"API Keys", expires:"" });

  const filtered = secrets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (typeFilter==="All" || s.type===typeFilter)
  );

  function handleAdd(e) {
    e.preventDefault();
    setSecrets(prev => [...prev, { ...form, id:Date.now(), created:new Date().toISOString().slice(0,10), status:"active", owner:"Balaji Kapsikar" }]);
    setAddOpen(false); setForm({ name:"", type:"API Keys", expires:"" });
    showToast("Secret added to vault");
  }

  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };

  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Vault <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{secrets.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ Add Secret</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        {TYPES.slice(1).map(t => (
          <div key={t} onClick={() => setTypeFilter(typeFilter===t?"All":t)}
            style={{ background:"#fff", border:`2px solid ${typeFilter===t?"var(--teal)":"var(--gray-200)"}`, borderRadius:10, padding:"14px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:24 }}>{typeIcon[t]}</span>
            <div>
              <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)" }}>{t}</div>
              <div style={{ fontSize:20, fontWeight:700 }}>{secrets.filter(s=>s.type===t).length}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search secrets..."
          style={{ flex:1, padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
      </div>

      <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>
            <th style={th}>Name</th><th style={th}>Type</th><th style={th}>Created</th>
            <th style={th}>Expires</th><th style={th}>Owner</th><th style={th}>Status</th><th style={th}>Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} style={{ cursor:"pointer" }} onClick={() => setDetail(s)}
                onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:500 }}>{typeIcon[s.type]} {s.name}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{s.type}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{s.created}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:s.status==="expiring"?"var(--red)":"var(--gray-400)" }}>{s.expires}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{s.owner}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}>
                  <StatusBadge status={s.status==="active"?"compliant":"needs-attention"}>{s.status}</StatusBadge>
                </td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }} onClick={e => e.stopPropagation()}>
                  <Btn small onClick={() => showToast("Copied to clipboard: " + s.name)}>Copy</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Secret"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Add</Btn></>}>
        <form onSubmit={handleAdd}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Secret Name</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Type</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, background:"#fff" }}>
              {TYPES.slice(1).map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Expiry Date</label>
            <input type="date" value={form.expires} onChange={e => setForm(f => ({ ...f, expires:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
        </form>
      </Modal>

      <Modal open={!!detail} onClose={() => setDetail(null)} title="Secret Details"
        footer={<><Btn variant="danger" onClick={() => { setSecrets(prev => prev.filter(s => s.id!==detail.id)); setDetail(null); showToast("Secret deleted"); }}>Delete</Btn><Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Name",detail.name],["Type",detail.type],["Created",detail.created],["Expires",detail.expires],["Owner",detail.owner]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={detail.status==="active"?"compliant":"needs-attention"}>{detail.status}</StatusBadge></div>
        </div>}
      </Modal>
    </div>
  );
}
