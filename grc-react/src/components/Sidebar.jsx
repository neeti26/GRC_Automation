const navItems = [
  { id:"tasks",        label:"Task Center",       icon:"task" },
  { id:"dashboard",    label:"Dashboard",          icon:"home" },
  { id:"tests",        label:"Tests",              icon:"check" },
  { section:"Compliance" },
  { id:"frameworks",   label:"Frameworks",         sub:true },
  { id:"controls",     label:"Controls",           sub:true },
  { id:"policies",     label:"Policies",           sub:true },
  { id:"evidence",     label:"Evidence Tasks",     sub:true },
  { id:"cloud",        label:"Cloud",              sub:true },
  { id:"vault",        label:"Vault",              sub:true },
  { section:"Risk" },
  { id:"vendors",      label:"Vendors",            sub:true },
  { id:"risk",         label:"Risk Management",    sub:true },
  { section:"Vulnerabilities" },
  { id:"findings",     label:"Findings",           sub:true },
  { id:"targets",      label:"Targets",            sub:true },
  { id:"scans",        label:"Third Party Scans",  sub:true },
  { section:"Trust" },
  { id:"trustvault",   label:"Trust Vault",        sub:true },
  { id:"questionnaire",label:"Questionnaire",      sub:true },
  { section:"Audit" },
  { id:"audit",        label:"Audit Center",       sub:true },
  { id:"corrective",   label:"Corrective Action",  sub:true },
  { section:"People" },
  { id:"employees",    label:"Employees",          sub:true },
  { id:"training",     label:"Training Campaigns", sub:true },
  { id:"access",       label:"Access Reviews",     sub:true },
  { id:"assets",       label:"Asset Management",   icon:"server" },
  { id:"settings",     label:"Settings",           icon:"settings" },
  { id:"integrations", label:"Integrations",       icon:"link" },
  { id:"reports",      label:"Reports",            icon:"chart" },
];

const icons = {
  task:<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  home:<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  check:<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  server:<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>,
  settings:<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>,
  link:<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>,
  chart:<svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
};

export default function Sidebar({ active, onNav }) {
  return (
    <nav style={{ width:220, background:"#fff", borderRight:"1px solid var(--gray-200)", display:"flex", flexDirection:"column", overflowY:"auto", flexShrink:0, height:"100vh" }}>
      <div onClick={() => onNav("dashboard")} style={{ padding:"14px 16px", display:"flex", alignItems:"center", gap:8, borderBottom:"1px solid var(--gray-200)", cursor:"pointer" }}>
        <div style={{ width:32, height:32, background:"var(--teal)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:9, textAlign:"center", lineHeight:1.2 }}>GRC<br/>AUTO</div>
        <span style={{ fontWeight:700, fontSize:13, color:"var(--gray-800)" }}>GRC Automation</span>
      </div>
      <div style={{ flex:1, padding:"6px 0" }}>
        {navItems.map((item, i) => {
          if (item.section) return (
            <div key={i} style={{ padding:"10px 16px 2px", fontSize:10, fontWeight:700, color:"var(--gray-400)", textTransform:"uppercase", letterSpacing:"0.06em" }}>{item.section}</div>
          );
          const isActive = active === item.id;
          return (
            <div key={item.id} onClick={() => onNav(item.id)}
              style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 16px", paddingLeft:item.sub?36:16, cursor:"pointer", fontSize:13, color:isActive?"#fff":"var(--gray-600)", background:isActive?"var(--gray-800)":"transparent", transition:"background 0.12s", userSelect:"none" }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background="var(--gray-100)"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background="transparent"; }}>
              {item.icon && icons[item.icon]}
              {item.label}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
