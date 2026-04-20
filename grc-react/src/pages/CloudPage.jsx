import { useState } from "react";
import Btn from "../components/Btn";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";

const SERVICES = [
  { name:"IAM", ok:28, issues:12, region:"global" },
  { name:"EC2", ok:25, issues:10, region:"ap-southeast-1" },
  { name:"S3", ok:8, issues:4, region:"ap-southeast-1" },
  { name:"RDS", ok:5, issues:3, region:"ap-southeast-1" },
  { name:"CloudTrail", ok:3, issues:2, region:"us-east-1" },
  { name:"Lambda", ok:6, issues:1, region:"ap-southeast-1" },
  { name:"VPC", ok:4, issues:0, region:"ap-southeast-1" },
  { name:"KMS", ok:2, issues:1, region:"ap-southeast-1" },
];

export default function CloudPage({ showToast }) {
  const [detail, setDetail] = useState(null);
  const totalOk = SERVICES.reduce((s,i) => s+i.ok, 0);
  const totalIssues = SERVICES.reduce((s,i) => s+i.issues, 0);

  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Cloud Security
        <StatusBadge status="compliant" style={{ marginLeft:8 }}>AWS Connected</StatusBadge>
        <Btn style={{ marginLeft:"auto" }} onClick={() => showToast("Refreshing cloud data...")}>Refresh</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[["Total Resources",totalOk+totalIssues,"var(--teal)"],["Compliant",totalOk,"var(--green)"],["Needs Attention",totalIssues,"var(--red)"],["Services Scanned",SERVICES.length,"var(--purple)"]].map(([label,val,color]) => (
          <div key={label} style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:700, color }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--gray-200)", fontWeight:600, fontSize:14 }}>Cloud Security Posture — AWS Account 304789072698</div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              {["Service","Region","Compliant","Issues","Score","Status","Actions"].map(h => (
                <th key={h} style={{ textAlign:"left", padding:"10px 16px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICES.map(s => {
              const score = Math.round((s.ok/(s.ok+s.issues))*100);
              return (
                <tr key={s.name} style={{ cursor:"pointer" }} onClick={() => setDetail(s)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"12px 16px", borderBottom:"1px solid var(--gray-100)", fontWeight:600 }}>{s.name}</td>
                  <td style={{ padding:"12px 16px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:"var(--gray-400)" }}>{s.region}</td>
                  <td style={{ padding:"12px 16px", borderBottom:"1px solid var(--gray-100)", color:"var(--green)", fontWeight:600 }}>{s.ok}</td>
                  <td style={{ padding:"12px 16px", borderBottom:"1px solid var(--gray-100)", color:s.issues>0?"var(--red)":"var(--green)", fontWeight:600 }}>{s.issues}</td>
                  <td style={{ padding:"12px 16px", borderBottom:"1px solid var(--gray-100)" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ flex:1, height:6, background:"var(--gray-200)", borderRadius:3, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:score+"%", background:score>=80?"var(--green)":score>=60?"var(--yellow)":"var(--red)", borderRadius:3 }} />
                      </div>
                      <span style={{ fontSize:12, fontWeight:600, minWidth:32 }}>{score}%</span>
                    </div>
                  </td>
                  <td style={{ padding:"12px 16px", borderBottom:"1px solid var(--gray-100)" }}>
                    <StatusBadge status={s.issues===0?"compliant":s.issues<=3?"in-progress":"needs-attention"}>{s.issues===0?"OK":s.issues<=3?"Warning":"Issues"}</StatusBadge>
                  </td>
                  <td style={{ padding:"12px 16px", borderBottom:"1px solid var(--gray-100)" }} onClick={e => e.stopPropagation()}>
                    <Btn small onClick={() => showToast("Scanning " + s.name + "...")}>Scan</Btn>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail ? "AWS " + detail.name + " Details" : ""} footer={<><Btn variant="teal" onClick={() => { showToast("Scanning " + detail?.name); setDetail(null); }}>Run Scan</Btn><Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
            {[["Compliant",detail.ok,"var(--green)"],["Issues",detail.issues,"var(--red)"],["Score",Math.round((detail.ok/(detail.ok+detail.issues))*100)+"%","var(--teal)"]].map(([k,v,c]) => (
              <div key={k} style={{ textAlign:"center", padding:14, background:"var(--gray-50)", borderRadius:10 }}>
                <div style={{ fontSize:24, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:12, color:"var(--gray-400)", marginTop:4 }}>{k}</div>
              </div>
            ))}
          </div>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>Region</div><div style={{ fontSize:14 }}>{detail.region}</div></div>
          <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>AWS Account</div><div style={{ fontSize:14 }}>304789072698</div></div>
        </div>}
      </Modal>
    </div>
  );
}
