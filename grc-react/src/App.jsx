import { useState, useCallback, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import Modal from "./components/Modal";
import Btn from "./components/Btn";

import Dashboard from "./pages/Dashboard";
import Controls from "./pages/Controls";
import Frameworks from "./pages/Frameworks";
import Evidence from "./pages/Evidence";
import Vendors from "./pages/Vendors";
import Assets from "./pages/Assets";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import TaskCenter from "./pages/TaskCenter";
import Policies from "./pages/Policies";
import Findings from "./pages/Findings";
import Targets from "./pages/Targets";
import ThirdPartyScans from "./pages/ThirdPartyScans";
import RiskManagement from "./pages/RiskManagement";
import Employees from "./pages/Employees";
import Training from "./pages/Training";
import AccessReviews from "./pages/AccessReviews";
import AuditCenter from "./pages/AuditCenter";
import CorrectiveAction from "./pages/CorrectiveAction";
import TrustVault from "./pages/TrustVault";
import Questionnaire from "./pages/Questionnaire";
import CloudPage from "./pages/CloudPage";
import VaultPage from "./pages/VaultPage";
import TestsPage from "./pages/TestsPage";

const ALL_PAGES = [
  { label:"Dashboard", page:"dashboard", keywords:["home","overview","compliance progress","cloud security"] },
  { label:"Task Center", page:"tasks", keywords:["tasks","todo","pending","overdue"] },
  { label:"Tests", page:"tests", keywords:["automated tests","mfa","s3","cloudtrail","iam"] },
  { label:"Frameworks", page:"frameworks", keywords:["iso 27001","soc 2","mas trm","pci","nist","hipaa"] },
  { label:"Controls", page:"controls", keywords:["control","cap","bcd","gov","ast","cov"] },
  { label:"Policies", page:"policies", keywords:["policy","acceptable use","incident response","access control"] },
  { label:"Evidence Tasks", page:"evidence", keywords:["evidence","upload","audit trail","mfa","firewall"] },
  { label:"Cloud", page:"cloud", keywords:["aws","ec2","s3","iam","rds","cloudtrail","vpc"] },
  { label:"Vault", page:"vault", keywords:["secrets","api keys","certificates","passwords","tokens"] },
  { label:"Vendors", page:"vendors", keywords:["vendor","third party","acme","datasafe","securenet"] },
  { label:"Risk Management", page:"risk", keywords:["risk","heat map","likelihood","impact","mitigate"] },
  { label:"Findings", page:"findings", keywords:["finding","vulnerability","critical","high","medium","low"] },
  { label:"Targets", page:"targets", keywords:["target","scan target","production","staging","network"] },
  { label:"Third Party Scans", page:"scans", keywords:["scan","qualys","nessus","burp suite","aws inspector"] },
  { label:"Trust Vault", page:"trustvault", keywords:["trust","soc 2 report","iso certificate","privacy policy"] },
  { label:"Questionnaire", page:"questionnaire", keywords:["questionnaire","vendor assessment","security questionnaire"] },
  { label:"Audit Center", page:"audit", keywords:["audit","kpmg","deloitte","pwc","scheduled","in progress"] },
  { label:"Corrective Action", page:"corrective", keywords:["corrective","action","mfa","encrypt","dlp"] },
  { label:"Employees", page:"employees", keywords:["employee","balaji","kapsikar","user","profile"] },
  { label:"Training Campaigns", page:"training", keywords:["training","phishing","gdpr","security awareness"] },
  { label:"Access Reviews", page:"access", keywords:["access review","q1","admin privileges","third party"] },
  { label:"Asset Management", page:"assets", keywords:["asset","ec2","s3","rds","lambda","iam","eks"] },
  { label:"Settings", page:"settings", keywords:["settings","users","notifications","billing","sso"] },
  { label:"Integrations", page:"integrations", keywords:["integration","aws","confluence","knowbe4","okta","jira"] },
  { label:"Reports", page:"reports", keywords:["report","export","compliance summary","risk report","audit readiness"] },
];

export default function App() {
  console.log("App Rendering");
  console.error("Rendering Error check - if you see this, JS is executing!");

  const [page, setPage] = useState("dashboard");
  const [toast, setToast] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = useCallback((msg) => setToast(msg), []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const pageMap = {
    dashboard: <Dashboard onNav={setPage} showToast={showToast} />,
    controls: <Controls showToast={showToast} />,
    frameworks: <Frameworks showToast={showToast} />,
    evidence: <Evidence showToast={showToast} />,
    vendors: <Vendors showToast={showToast} />,
    assets: <Assets showToast={showToast} />,
    reports: <Reports showToast={showToast} />,
    settings: <Settings showToast={showToast} />,
    integrations: <Integrations showToast={showToast} />,
    tasks: <TaskCenter showToast={showToast} />,
    policies: <Policies showToast={showToast} />,
    findings: <Findings showToast={showToast} />,
    targets: <Targets showToast={showToast} />,
    scans: <ThirdPartyScans showToast={showToast} />,
    risk: <RiskManagement showToast={showToast} />,
    employees: <Employees showToast={showToast} />,
    training: <Training showToast={showToast} />,
    access: <AccessReviews showToast={showToast} />,
    audit: <AuditCenter showToast={showToast} />,
    corrective: <CorrectiveAction showToast={showToast} />,
    trustvault: <TrustVault showToast={showToast} />,
    questionnaire: <Questionnaire showToast={showToast} />,
    cloud: <CloudPage showToast={showToast} />,
    vault: <VaultPage showToast={showToast} />,
    tests: <TestsPage showToast={showToast} />,
  };

  const searchResults = searchQuery.trim().length > 0
    ? ALL_PAGES.filter(r => {
        const q = searchQuery.toLowerCase();
        return r.label.toLowerCase().includes(q) || r.keywords.some(k => k.includes(q));
      })
    : ALL_PAGES;

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
      <Sidebar active={page} onNav={setPage} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ background:"rgba(255, 255, 255, 0.8)", backdropFilter:"blur(12px)", borderBottom:"1px solid var(--gray-200)", padding:"0 24px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, zIndex:10 }}>
          <div onClick={() => setSearchOpen(true)}
            style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid var(--gray-200)", boxShadow:"var(--shadow-sm)", borderRadius:8, padding:"8px 12px", width:300, color:"var(--gray-400)", fontSize:13, cursor:"text", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="var(--gray-300)"}
            onMouseLeave={e => e.currentTarget.style.borderColor="var(--gray-200)"}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
            Search pages, controls, evidence...
            <span style={{ fontSize:11, opacity:0.5, marginLeft:"auto" }}>Ctrl+K</span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div onClick={() => setNotifOpen(true)} style={{ position:"relative", cursor:"pointer", fontSize:18 }}>
              🔔<div style={{ position:"absolute", top:-2, right:-2, width:8, height:8, background:"var(--red)", borderRadius:"50%", border:"2px solid #fff" }} />
            </div>
            <div onClick={() => setProfileOpen(true)} style={{ width:30, height:30, background:"var(--purple)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer" }}>B</div>
            <span onClick={() => setProfileOpen(true)} style={{ fontSize:13, fontWeight:500, cursor:"pointer" }}>Balaji Kapsikar ▾</span>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:24 }}>
          {pageMap[page] || <div style={{ textAlign:"center", padding:80, color:"var(--gray-400)" }}>Page not found</div>}
        </div>
      </div>

      <Toast message={toast} onDone={() => setToast("")} />

      {searchOpen && (
        <div onClick={() => { setSearchOpen(false); setSearchQuery(""); }} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:1000, display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:80 }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#fff", borderRadius:16, width:560, maxWidth:"95vw", maxHeight:"70vh", display:"flex", flexDirection:"column", boxShadow:"0 20px 60px rgba(0,0,0,.25)", overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--gray-200)", display:"flex", alignItems:"center", gap:10 }}>
              <svg width="16" height="16" fill="none" stroke="var(--gray-400)" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>
              <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search pages, controls, evidence, vendors..."
                style={{ flex:1, border:"none", outline:"none", fontSize:15, color:"var(--gray-800)" }} />
              {searchQuery && <button onClick={() => setSearchQuery("")} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--gray-400)", fontSize:18, lineHeight:1 }}>x</button>}
              <kbd style={{ background:"var(--gray-100)", border:"1px solid var(--gray-200)", borderRadius:4, padding:"2px 6px", fontSize:11, color:"var(--gray-400)" }}>Esc</kbd>
            </div>
            <div style={{ overflowY:"auto", padding:8 }}>
              {searchQuery.trim() && <div style={{ padding:"4px 12px 8px", fontSize:11, fontWeight:600, color:"var(--gray-400)", textTransform:"uppercase", letterSpacing:"0.05em" }}>Results</div>}
              {!searchQuery.trim() && <div style={{ padding:"4px 12px 8px", fontSize:11, fontWeight:600, color:"var(--gray-400)", textTransform:"uppercase", letterSpacing:"0.05em" }}>All Pages</div>}
              {searchResults.length === 0 && (
                <div style={{ textAlign:"center", padding:"32px 0", color:"var(--gray-400)", fontSize:13 }}>No results for "{searchQuery}"</div>
              )}
              {searchResults.map(r => (
                <div key={r.page} onClick={() => { setPage(r.page); setSearchOpen(false); setSearchQuery(""); }}
                  style={{ padding:"10px 14px", borderRadius:8, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", gap:12 }}
                  onMouseEnter={e => e.currentTarget.style.background="var(--gray-100)"}
                  onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                  <div style={{ width:28, height:28, background:"var(--gray-100)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="13" height="13" fill="none" stroke="var(--gray-400)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontWeight:500 }}>{r.label}</div>
                    <div style={{ fontSize:11, color:"var(--gray-400)", marginTop:1 }}>{r.keywords.slice(0,3).join(" · ")}</div>
                  </div>
                  <div style={{ marginLeft:"auto", fontSize:11, color:"var(--gray-400)" }}>↵</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={profileOpen} onClose={() => setProfileOpen(false)} title="My Profile"
        footer={<><Btn variant="danger" onClick={() => { setProfileOpen(false); showToast("Logged out"); }}>Log Out</Btn><Btn onClick={() => setProfileOpen(false)}>Close</Btn></>}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20, padding:16, background:"var(--gray-50)", borderRadius:10 }}>
          <div style={{ width:56, height:56, background:"var(--purple)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:22, fontWeight:700 }}>B</div>
          <div>
            <div style={{ fontWeight:700, fontSize:16 }}>Balaji Kapsikar</div>
            <div style={{ fontSize:13, color:"var(--gray-400)" }}>balaji.kapsikar@gmail.com</div>
            <div style={{ fontSize:12, color:"var(--teal)", marginTop:2, fontWeight:600 }}>Administrator</div>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
          {[["⚙️  Settings","settings"],["📊  Dashboard","dashboard"],["📋  Task Center","tasks"],["👤  My Profile","employees"]].map(([label,pg]) => (
            <div key={label} onClick={() => { setPage(pg); setProfileOpen(false); }}
              style={{ padding:"10px 14px", borderRadius:8, cursor:"pointer", fontSize:13 }}
              onMouseEnter={e => e.currentTarget.style.background="var(--gray-100)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}>
              {label}
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={notifOpen} onClose={() => setNotifOpen(false)} title="Notifications"
        footer={<><Btn onClick={() => { showToast("All notifications cleared"); setNotifOpen(false); }}>Clear All</Btn><Btn onClick={() => setNotifOpen(false)}>Close</Btn></>}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {[
            { icon:"🔴", text:"S3 Bucket Public Access Enabled — Critical finding", time:"2h ago", color:"#fecaca", page:"findings" },
            { icon:"⚠️", text:"Security Notifications evidence overdue by 19 days", time:"4h ago", color:"#fee2e2", page:"evidence" },
            { icon:"📋", text:"132 evidence tasks pending upload", time:"1d ago", color:"#fef3c7", page:"evidence" },
            { icon:"📅", text:"SOC 2 Type II Audit in progress — Deloitte", time:"2d ago", color:"#ede9fe", page:"audit" },
            { icon:"✅", text:"ISO 27001:2022 compliance improved to 59.7%", time:"3d ago", color:"#dcfce7", page:"frameworks" },
            { icon:"🎯", text:"Run MFA Compliance Test task is overdue", time:"5d ago", color:"#fef3c7", page:"tasks" },
          ].map((n, i) => (
            <div key={i} onClick={() => { setPage(n.page); setNotifOpen(false); }}
              style={{ display:"flex", gap:12, padding:12, background:n.color, borderRadius:10, cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              <span style={{ fontSize:18, flexShrink:0 }}>{n.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13 }}>{n.text}</div>
                <div style={{ fontSize:11, color:"var(--gray-500)", marginTop:3 }}>{n.time}</div>
              </div>
              <span style={{ fontSize:11, color:"var(--gray-400)", alignSelf:"center" }}>→</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
