import { useState } from "react";
import Card from "../components/Card";
import StatusBadge from "../components/StatusBadge";
import Btn from "../components/Btn";
import Modal from "../components/Modal";

const BALAJI = { id:1, name:"Balaji Kapsikar", email:"balaji.kapsikar@gmail.com", role:"Admin", department:"IT Security", status:"active", trainingComplete:true, joined:"2023-01-15" };

export default function Employees({ showToast }) {
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name:BALAJI.name, email:BALAJI.email, department:BALAJI.department });

  return (
    <div>
      <div style={{ fontSize:22, fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        Employees <span style={{ background:"var(--gray-200)", color:"var(--gray-600)", borderRadius:12, padding:"2px 8px", fontSize:12, fontWeight:600 }}>1</span>
        <Btn variant="primary" style={{ marginLeft:"auto" }} onClick={() => showToast("Invite sent — feature coming soon")}>+ Invite Employee</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
        {[["Total Employees","1","var(--teal)"],["Active","1","var(--green)"],["Training Complete","1","var(--green)"]].map(([label,val,color]) => (
          <div key={label} style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:26, fontWeight:700, color }}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#fff", border:"1px solid var(--gray-200)", borderRadius:12, padding:24, display:"flex", alignItems:"flex-start", gap:24 }}>
        <div style={{ width:72, height:72, background:"var(--purple)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:28, fontWeight:700, flexShrink:0 }}>B</div>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <div style={{ fontSize:20, fontWeight:700 }}>{BALAJI.name}</div>
            <StatusBadge status="compliant">Active</StatusBadge>
            <span style={{ background:"#ede9fe", color:"#7c3aed", padding:"2px 8px", borderRadius:4, fontSize:11, fontWeight:600 }}>Admin</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[["Email",BALAJI.email],["Department",BALAJI.department],["Joined",BALAJI.joined],["Training","Complete"],["Role","Administrator"]].map(([k,v]) => (
              <div key={k}>
                <div style={{ fontSize:11, fontWeight:600, color:"var(--gray-400)", marginBottom:2 }}>{k}</div>
                <div style={{ fontSize:13 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:16 }}>
            <Btn onClick={() => setEditOpen(true)}>Edit Profile</Btn>
          </div>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile"
        footer={<><Btn onClick={() => setEditOpen(false)}>Cancel</Btn><Btn variant="primary" onClick={() => { setEditOpen(false); showToast("Profile updated"); }}>Save Changes</Btn></>}>
        {[["Full Name","name"],["Email","email"],["Department","department"]].map(([label,key]) => (
          <div key={key} style={{ marginBottom:16 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:"var(--gray-600)", marginBottom:6 }}>{label}</label>
            <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))}
              style={{ width:"100%", padding:"8px 12px", border:"1px solid var(--gray-200)", borderRadius:8, fontSize:13, outline:"none" }} />
          </div>
        ))}
      </Modal>
    </div>
  );
}
