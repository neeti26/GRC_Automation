import { useState, useMemo } from "react";
import Btn from "../components/Btn";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";

const MODULES = ["All","Controls","Evidence","Vendors","Audit","Risk","Policies"];

const INITIAL_TASKS = [
  { id:1, name:"Review ISO 27001 Controls", module:"Controls", dueDate:"2025-05-10", priority:"high", status:"pending", assignee:"Balaji Kapsikar" },
  { id:2, name:"Upload Firewall Rule Review Evidence", module:"Evidence", dueDate:"2025-05-05", priority:"high", status:"overdue", assignee:"Balaji Kapsikar" },
  { id:3, name:"Complete Vendor Risk Assessment - DataSafe Ltd", module:"Vendors", dueDate:"2025-05-15", priority:"medium", status:"in-progress", assignee:"Balaji Kapsikar" },
  { id:4, name:"Schedule SOC 2 Type II Audit", module:"Audit", dueDate:"2025-05-01", priority:"high", status:"completed", assignee:"Balaji Kapsikar" },
  { id:5, name:"Update Incident Response Policy", module:"Policies", dueDate:"2025-05-20", priority:"medium", status:"pending", assignee:"Balaji Kapsikar" },
  { id:6, name:"Run MFA Compliance Test", module:"Controls", dueDate:"2025-04-30", priority:"high", status:"overdue", assignee:"Balaji Kapsikar" },
  { id:7, name:"Review Vendor Audit Reports", module:"Vendors", dueDate:"2025-05-25", priority:"low", status:"pending", assignee:"Balaji Kapsikar" },
  { id:8, name:"Conduct Risk Assessment Q2", module:"Risk", dueDate:"2025-06-01", priority:"medium", status:"pending", assignee:"Balaji Kapsikar" },
];

const priorityColor = { high:"#dc2626", medium:"#d97706", low:"#16a34a" };
const priorityBg = { high:"#fee2e2", medium:"#fef3c7", low:"#dcfce7" };
const statusMap = { completed:"completed", "in-progress":"in-progress", overdue:"needs-attention", pending:"not-applicable" };

export default function TaskCenter({ showToast }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [form, setForm] = useState({ name:"", module:"Controls", dueDate:"", priority:"medium" });

  const filtered = useMemo(() => tasks.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) &&
    (moduleFilter==="All" || t.module===moduleFilter) &&
    (statusFilter==="All" || t.status===statusFilter)
  ), [tasks, search, moduleFilter, statusFilter]);

  const completed = tasks.filter(t => t.status==="completed").length;
  const pending = tasks.filter(t => t.status!=="completed").length;

  function handleAdd(e) {
    e.preventDefault();
    setTasks(prev => [...prev, { ...form, id:Date.now(), status:"pending", assignee:"Balaji Kapsikar" }]);
    setAddOpen(false); setForm({ name:"", module:"Controls", dueDate:"", priority:"medium" });
    showToast("Task created");
  }

  function markDone(id) {
    setTasks(prev => prev.map(t => t.id===id ? { ...t, status:"completed" } : t));
    setDetail(null); showToast("Task marked as completed");
  }

  const th = { textAlign:"left", padding:"10px 12px", fontSize:12, fontWeight:600, color:"var(--gray-400)", borderBottom:"1px solid var(--gray-200)", background:"var(--gray-50)", whiteSpace:"nowrap" };

  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Task Center
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => setAddOpen(true)}>+ New Task</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
        <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, padding:18, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:44, height:44, background:"#fef3c7", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>📋</div>
          <div><div style={{ fontSize:24, fontWeight:700 }}>{pending}</div><div style={{ fontSize:13, color:"var(--gray-400)" }}>tasks left to complete</div></div>
        </div>
        <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, padding:18, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:44, height:44, background:"#dcfce7", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>✅</div>
          <div><div style={{ fontSize:24, fontWeight:700 }}>{completed}</div><div style={{ fontSize:13, color:"var(--gray-400)" }}>tasks completed</div></div>
        </div>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by task name..."
          style={{ flex:1, minWidth:200, padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
        <select value={moduleFilter} onChange={e => setModuleFilter(e.target.value)}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          {MODULES.map(m => <option key={m}>{m}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{ padding:"7px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:12, background:"#fff", cursor:"pointer" }}>
          <option value="All">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="overdue">Overdue</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, textAlign:"center", padding:"60px 24px", color:"var(--gray-400)" }}>
          <div style={{ fontSize:44, marginBottom:10 }}>📦</div>
          <h3 style={{ fontSize:15, fontWeight:600, color:"var(--gray-600)", marginBottom:5 }}>No tasks found</h3>
          <p style={{ fontSize:13 }}>Try adjusting your filters or create a new task.</p>
        </div>
      ) : (
        <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, overflow:"hidden" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>
              <th style={th}>Task Name</th><th style={th}>Module</th><th style={th}>Due Date</th>
              <th style={th}>Priority</th><th style={th}>Assignee</th><th style={th}>Status</th><th style={th}>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} style={{ cursor:"pointer" }} onClick={() => setDetail(t)}
                  onMouseEnter={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="var(--gray-50)")}
                  onMouseLeave={e => e.currentTarget.querySelectorAll("td").forEach(td => td.style.background="")}>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontWeight:500, color:"var(--teal)" }}>{t.name}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12 }}>{t.module}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:12, color:t.status==="overdue"?"var(--red)":"var(--gray-400)" }}>{t.dueDate}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}>
                    <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:600, background:priorityBg[t.priority], color:priorityColor[t.priority] }}>{t.priority}</span>
                  </td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)", fontSize:13 }}>{t.assignee}</td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }}><StatusBadge status={statusMap[t.status]||"not-applicable"}>{t.status}</StatusBadge></td>
                  <td style={{ padding:"10px 12px", borderBottom:"1px solid var(--gray-100)" }} onClick={e => e.stopPropagation()}>
                    {t.status !== "completed" && <Btn small onClick={() => markDone(t.id)}>Done</Btn>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Create Task"
        footer={<><Btn onClick={() => setAddOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={handleAdd}>Create</Btn></>}>
        <form onSubmit={handleAdd}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Task Name</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>Due Date</label>
            <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
          {[["Module","module",["Controls","Evidence","Vendors","Audit","Risk","Policies"]],["Priority","priority",["high","medium","low"]]].map(([label,key,opts]) => (
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

      <Modal open={!!detail} onClose={() => setDetail(null)} title="Task Details"
        footer={<>{detail?.status!=="completed" && <Btn variant="teal" onClick={() => markDone(detail.id)}>Mark Complete</Btn>}<Btn onClick={() => setDetail(null)}>Close</Btn></>}>
        {detail && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[["Task",detail.name],["Module",detail.module],["Due Date",detail.dueDate],["Assignee",detail.assignee]].map(([k,v]) => (
            <div key={k}><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div><div style={{ fontSize:14 }}>{v}</div></div>
          ))}
          <div style={{ display:"flex", gap:12 }}>
            <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Priority</div>
              <span style={{ display:"inline-flex", alignItems:"center", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:600, background:priorityBg[detail.priority], color:priorityColor[detail.priority] }}>{detail.priority}</span></div>
            <div><div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>Status</div><StatusBadge status={statusMap[detail.status]||"not-applicable"}>{detail.status}</StatusBadge></div>
          </div>
        </div>}
      </Modal>
    </div>
  );
}
