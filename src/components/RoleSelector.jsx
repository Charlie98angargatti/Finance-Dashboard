// File Name is RoleSelector.jsx 

const RoleSelector = ({ role, onRoleChange }) => {
  const base = { padding:"8px 18px", borderRadius:99, fontWeight:700, fontSize:13, cursor:"pointer", border:"none", transition:"all 0.2s" };
  const active = (color) => ({ ...base, background:`linear-gradient(135deg,${color})`, color:"#fff", boxShadow:`0 4px 12px rgba(0,0,0,0.2)` });
  const inactive = { ...base, background:"transparent", color:"#64748b" };

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
      <div style={{ display:"flex", alignItems:"center", gap:4, background:"#fff", border:"1px solid #e2e8f0", borderRadius:99, padding:"4px 4px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
        <span style={{ fontSize:10, fontWeight:700, color:"#94a3b8", padding:"0 10px", letterSpacing:"0.1em" }}>ROLE</span>
        <button onClick={() => onRoleChange("viewer")} style={role === "viewer" ? active("#3b82f6,#2563eb") : inactive}>
          👁 Viewer
        </button>
        <button onClick={() => onRoleChange("admin")} style={role === "admin" ? active("#8b5cf6,#6d28d9") : inactive}>
          ⚙️ Admin
        </button>
      </div>
      <p style={{ margin:0, fontSize:10, color:"#94a3b8", fontWeight:500 }}>
        {role === "admin" ? "✅ Full access — can add & edit transactions" : "🔒 Read-only access"}
      </p>
    </div>
  );
};

export default RoleSelector;

