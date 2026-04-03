// File Name is SummaryCard.jsx 

const fmt = (n) => Number(n).toLocaleString("en-IN");

const GRADIENTS = {
  balance: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
  income:  "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  expense: "linear-gradient(135deg, #f43f5e 0%, #ea580c 100%)",
  default: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
};

const ICONS = { balance: "◈", income: "↑", expense: "↓", default: "●" };

const SummaryCard = ({ title, amount, type = "default", subtitle, delay = "" }) => {
  const grad = GRADIENTS[type] || GRADIENTS.default;
  const icon = ICONS[type] || ICONS.default;

  return (
    <div
      className={`summary-card animate-fade-up ${delay}`}
      style={{
        background: grad,
        borderRadius: 20,
        padding: "24px 24px 20px",
        color: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        border: "1px solid rgba(255,255,255,0.15)",
        position: "relative",
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      {/* Decorative circles */}
      <div style={{ position:"absolute", top:-20, right:-20, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.1)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-30, right:10,  width:60, height:60, borderRadius:"50%", background:"rgba(255,255,255,0.06)", pointerEvents:"none" }} />

      <div style={{ position:"relative" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <p style={{ margin:0, fontSize:11, fontWeight:700, opacity:0.75, textTransform:"uppercase", letterSpacing:"0.1em" }}>{title}</p>
          <span style={{ fontSize:18, opacity:0.6, fontWeight:900 }}>{icon}</span>
        </div>

        <p style={{ margin:0, fontSize:28, fontWeight:900, letterSpacing:"-0.02em", fontFamily:"'Sora',sans-serif" }}>
          ₹{fmt(amount)}
        </p>

        <div style={{ borderTop:"1px solid rgba(255,255,255,0.2)", marginTop:16, paddingTop:12, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <p style={{ margin:0, fontSize:11, opacity:0.6 }}>{subtitle || "Updated today"}</p>
          <div style={{ width:8, height:8, borderRadius:"50%", background:"rgba(255,255,255,0.5)", animation:"pulse 2s infinite" }} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

