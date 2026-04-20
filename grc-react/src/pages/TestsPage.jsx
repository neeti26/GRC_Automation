import { useState, useMemo } from "react";
import Btn from "../components/Btn";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const INITIAL_TESTS = [
  { id:1, name:"MFA Enabled for All IAM Users", framework:"ISO 27001:2022", category:"Identity", status:"pass", lastRun:"2025-04-01", duration:"1.2s", description:"Checks that all IAM users have MFA enabled." },
  { id:2, name:"S3 Bucket Encryption at Rest", framework:"SOC 2", category:"Storage", status:"fail", lastRun:"2025-04-01", duration:"0.8s", description:"Verifies all S3 buckets have server-side encryption enabled." },
  { id:3, name:"CloudTrail Logging Enabled", framework:"ISO 27001:2022", category:"Logging", status:"pass", lastRun:"2025-04-01", duration:"0.5s", description:"Ensures CloudTrail is enabled in all regions." },
  { id:4, name:"RDS Backup Retention >= 7 days", framework:"SOC 2", category:"Database", status:"pass", lastRun:"2025-04-01", duration:"1.1s", description:"Checks RDS automated backup retention period." },
  { id:5, name:"IAM Password Policy Enforced", framework:"MAS TRM 2021", category:"Identity", status:"fail", lastRun:"2025-04-01", duration:"0.6s", description:"Validates IAM password policy meets minimum requirements." },
  { id:6, name:"VPC Flow Logs Enabled", framework:"ISO 27001:2022", category:"Network", status:"pass", lastRun:"2025-04-01", duration:"0.9s", description:"Checks VPC flow logs are enabled for all VPCs." },
  { id:7, name:"S3 Bucket Public Access Blocked", framework:"SOC 2", category:"Storage", status:"fail", lastRun:"2025-04-01", duration:"0.7s", description:"Ensures S3 public access block is enabled at account level." },
  { id:8, name:"Root Account MFA Enabled", framework:"ISO 27001:2022", category:"Identity", status:"pass", lastRun:"2025-04-01", duration:"0.4s", description:"Verifies root account has MFA enabled." },
  { id:9, name:"Security Groups No Unrestricted SSH", framework:"MAS TRM 2021", category:"Network", status:"pass", lastRun:"2025-04-01", duration:"1.3s", description:"Checks no security groups allow unrestricted SSH (port 22)." },
  { id:10, name:"KMS Key Rotation Enabled", framework:"ISO 27001:2022", category:"Encryption", status:"pass", lastRun:"2025-04-01", duration:"0.6s", description:"Ensures KMS customer managed keys have rotation enabled." },
  { id:11, name:"RDS Encryption at Rest", framework:"SOC 2", category:"Database", status:"fail", lastRun:"2025-04-01", duration:"0.8s", description:"Verifies all RDS instances are encrypted at rest." },
  { id:12, name:"CloudWatch Alarms Configured", framework:"MAS TRM 2021", category:"Monitoring", status:"pass", lastRun:"2025-04-01", duration:"1.0s", description:"Checks CloudWatch alarms are configured for critical metrics." },
];

const CATEGORIES = ["All","Identity","Storage","Network","Database","Logging","Encryption","Monitoring"];
const FRAMEWORKS = ["All","ISO 27001:2022","SOC 2","MAS TRM 2021"];

export default function TestsPage({ showToast }) {
  const [tests, setTests] = useState(INITIAL_TESTS);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [fwFilter, setFwFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detail, setDetail] = useState(null);
  const [running, setRunning] = useState(false);

  const filtered = useMemo(() => tests.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) &&
    (catFilter==="All" || t.category===catFilter) &&
    (fwFilter==="All" || t.framework===fwFilter) &&
    (statusFilter==="All" || t.status===statusFilter)
  ), [tests, search, catFilter, fwFilter, statusFilter]);

  const passing = tests.filter(t => t.status==="pass").length;
  const failing = tests.filter(t => t.status==="fail").length;

  function runAll() {
    setRunning(true);
    showToast("Running all tests...");
    setTimeout(() => { setRunning(false); showToast("All tests completed"); }, 2000);
  }

  function runSingle(t) {
    showToast("Running: " + t.name);
    setTimeout(() => showToast(t.name + " — " + (t.status==="pass"?"PASS":"FAIL")), 1500);
  }

  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };

  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Tests <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>{tests.length}</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={runAll} disabled={running}>{running?"Running...":"Run All Tests"}</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
        {[["Passing",passing,"var(--green)"],["Failing",failing,"var(--red)"],["Total",tests.length,"var(--teal)"],["Pass Rate",Math.round((passing/tests.length)*100)+"%","var(--purple)"]].map(([label,val,color]) => (
          <div key={label} style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:700, color }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tests..."
          style={{ flex:1, minWidth:180, padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={fwFilter} onChange={e => setFwFilter(e.target.value)}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          {FRAMEWORKS.map(f => <option key={f}>{f}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          <option value="All">All Statuses</option>
          <option value="pass">Pass</option>
          <option value="fail">Fail</option>
        </select>
        <Btn onClick={() => showToast("Exported test results")}>Export</Btn>
      </div>

      <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>
            <th style={th}>Test Name</th><th style={th}>Framework</th><th style={th}>Category</th>
            <th style={th}>Last Run</th><th style={th}>Duration</th><th style={th}>Status</th><th style={th}>Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} style={{ cursor:"pointer" }} onClick={() => setDetail(t)}
                onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:500, color:"var(--teal)" }}>{t.name}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{t.framework}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{t.category}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{t.lastRun}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{t.duration}</td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}>
                  <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:600, background:t.status==="pass"?"#dcfce7":"#fee2e2", color:t.status==="pass"?"#16a34a":"#dc2626" }}>{t.status==="pass"?"Pass":"Fail"}</span>
                </td>
                <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }} onClick={e => e.stopPropagation()}>
                  <Btn small onClick={() => runSingle(t)}>Run</Btn>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} style={{ textAlign:"center", padding:32, color:"var(--gray-400)" }}>No tests match your filters</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title="Test Details"
        footer={<><Btn variant="teal" onClick={() => { runSingle(detail); setDetail(null); }}>Run Test</Btn><Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>Test Name</div><div style={{ fontSize:14, fontWeight:500 }}>{detail.name}</div></div>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:6 }}>Description</div><div style={{ fontSize:13, color:"var(--gray-600)", lineHeight:1.6, background:"var(--gray-50)", padding:12, borderRadius:8 }}>{detail.description}</div></div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["Framework",detail.framework],["Category",detail.category],["Last Run",detail.lastRun],["Duration",detail.duration]].map(([k,v]) => (
              <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:13 }}>{v}</div></div>
            ))}
          </div>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Result</div>
            <span style={{ display:"inline-flex", alignItems:"center", padding:"4px 12px", borderRadius:6, fontSize:13, fontWeight:600, background:detail.status==="pass"?"#dcfce7":"#fee2e2", color:detail.status==="pass"?"#16a34a":"#dc2626" }}>{detail.status==="pass"?"PASS":"FAIL"}</span>
          </div>
        </div>}
      </Modal>
    </div>
  );
}
