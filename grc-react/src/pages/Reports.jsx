import { useState } from "react";
import Btn from "../components/Btn";

const REPORTS = [
  { id:"compliance-summary", title:"Compliance Summary", icon:"📊", desc:"Overall compliance status across all frameworks", data:"Compliance Summary Report\n\nISO 27001:2022: 59.7% Compliant\nSOC 2: 42.1% Compliant\nMAS TRM 2021: 31.1% Compliant\n\nTotal Controls: 23\nCompliant: 10 | Non-Compliant: 13\n\nGenerated: 2025-04-20" },
  { id:"framework-compliance", title:"Framework Compliance", icon:"📋", desc:"42% Compliance Progress across ISO, SOC 2, MAS TRM", data:"Framework Compliance Report\n\nISO 27001:2022\n  Policies: 100% | Evidence: 10.2% | Tests: 56.3%\n\nSOC 2\n  Policies: 100% | Evidence: 16% | Tests: 57.8%\n\nMAS TRM 2021\n  Policies: 100% | Evidence: 3% | Tests: 51.5%\n\nGenerated: 2025-04-20" },
  { id:"cloud-security", title:"Cloud Security", icon:"☁️", desc:"AWS cloud security posture and findings", data:"Cloud Security Report\n\nAWS Account: 304789072698\nRegion: ap-southeast-1\n\nIAM: 28 OK, 12 Issues\nEC2: 25 OK, 10 Issues\nS3: 8 OK, 4 Issues\nRDS: 5 OK, 3 Issues\nCloudTrail: 3 OK, 2 Issues\n\nCritical Findings: 2\nHigh Findings: 5\n\nGenerated: 2025-04-20" },
  { id:"vendor-risk", title:"Vendor Risk Assessment", icon:"🏢", desc:"Third-party vendor risk evaluation report", data:"Vendor Risk Assessment Report\n\nTotal Vendors: 5\nNot Assessed: 2 | In Progress: 1 | Needs Attention: 1 | Completed: 1\n\nHigh Risk: SecureNet\nMedium Risk: DataSafe Ltd\nLow Risk: TechVault\n\nGenerated: 2025-04-20" },
  { id:"audit-readiness", title:"Audit Readiness", icon:"✅", desc:"Readiness status for upcoming audits", data:"Audit Readiness Report\n\nScheduled Audits: 2\nIn Progress: 1\nCompleted: 1\n\nISO 27001:2022 Annual Audit - Scheduled 2025-06-15\nSOC 2 Type II Audit - In Progress (Deloitte)\n\nEvidence Uploaded: 9/141\nControls Compliant: 10/23\n\nGenerated: 2025-04-20" },
  { id:"risk-report", title:"Risk Report", icon:"⚠️", desc:"Risk heat map and risk register summary", data:"Risk Report\n\nTotal Risks: 7\nCritical: 1 | High: 3 | Medium: 2 | Low: 1\n\nTop Risks:\n1. Data Breach via Misconfigured S3 (Critical)\n2. Ransomware Attack on Endpoints (High)\n3. Third-Party Vendor Data Leak (High)\n4. Phishing Attack on Employees (High)\n\nGenerated: 2025-04-20" },
  { id:"app-security", title:"Application Security Assessment", icon:"🔐", desc:"8 findings across applications", data:"Application Security Assessment\n\nTotal Findings: 8\nCritical: 2 | High: 3 | Medium: 2 | Low: 1\n\nCritical:\n- S3 Bucket Public Access Enabled\n- Root Account Usage Detected\n\nHigh:\n- IAM User Without MFA\n- Unencrypted RDS Instance\n- CloudTrail Logging Disabled\n\nGenerated: 2025-04-20" },
];

function downloadTxt(filename, content) {
  const blob = new Blob([content], { type:"text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename + ".txt"; a.click();
  URL.revokeObjectURL(url);
}

function downloadCSV(filename, content) {
  const lines = content.split("\n");
  const csv = lines.map(l => `"${l.replace(/"/g,'""')}"`).join("\n");
  const blob = new Blob([csv], { type:"text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename + ".csv"; a.click();
  URL.revokeObjectURL(url);
}

export default function Reports({ showToast }) {
  const [preview, setPreview] = useState(null);

  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Reports
        <Btn style={{ marginLeft:"auto" }} onClick={() => { REPORTS.forEach(r => downloadTxt(r.id, r.data)); showToast("All reports downloaded"); }}>Download All</Btn>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
        {REPORTS.map(r => (
          <div key={r.id} style={{ background:"#fff", borderRadius:12, border:"1px solid var(--gray-200)", padding:18, display:"flex", flexDirection:"column", gap:10 }}>
            <div style={{ fontWeight:600, fontSize:14 }}>{r.title}</div>
            <div onClick={() => setPreview(r)}
              style={{ background:"var(--gray-50)", borderRadius:8, height:100, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:6, border:"1px dashed var(--gray-200)", color:"var(--gray-400)", fontSize:13, cursor:"pointer", transition:"background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background="#f0fdf4"}
              onMouseLeave={e => e.currentTarget.style.background="var(--gray-50)"}>
              <span style={{ fontSize:30 }}>{r.icon}</span>
              <span style={{ fontSize:11, textAlign:"center", padding:"0 8px" }}>{r.desc}</span>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <Btn style={{ flex:1 }} onClick={() => { downloadTxt(r.id, r.data); showToast(r.title + " downloaded"); }}>Export TXT</Btn>
              <Btn style={{ flex:1 }} onClick={() => { downloadCSV(r.id, r.data); showToast(r.title + " exported as CSV"); }}>Export CSV</Btn>
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <div onClick={() => setPreview(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:16, padding:28, width:560, maxWidth:"95vw", maxHeight:"80vh", overflowY:"auto", position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,.2)" }}>
            <button onClick={() => setPreview(null)} style={{ position:"absolute", top:16, right:16, background:"none", border:"none", fontSize:20, color:"var(--gray-400)", cursor:"pointer" }}>x</button>
            <div style={{ fontSize:18, fontWeight:700, marginBottom:16 }}>{preview.icon} {preview.title}</div>
            <pre style={{ fontSize:13, lineHeight:1.7, color:"var(--gray-700)", whiteSpace:"pre-wrap", background:"var(--gray-50)", padding:16, borderRadius:8, border:"1px solid var(--gray-200)" }}>{preview.data}</pre>
            <div style={{ display:"flex", gap:10, marginTop:16, justifyContent:"flex-end" }}>
              <Btn onClick={() => { downloadTxt(preview.id, preview.data); showToast("Downloaded"); }}>Download TXT</Btn>
              <Btn variant="primary" onClick={() => { downloadCSV(preview.id, preview.data); showToast("Exported CSV"); }}>Export CSV</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
