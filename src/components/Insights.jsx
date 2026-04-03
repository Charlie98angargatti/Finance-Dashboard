// File Name is Insights.jsx 

const fmt = (n) => Number(n).toLocaleString("en-IN");

const CARDS = [
  { key: "top",     label: "Top Expense",   icon: "🏷️", grad: "linear-gradient(135deg,#3b82f6,#1d4ed8)", delay: "stagger-1" },
  { key: "savings", label: "Savings Rate",  icon: "💹", grad: "linear-gradient(135deg,#10b981,#059669)", delay: "stagger-2" },
  { key: "best",    label: "Best Month",    icon: "🏆", grad: "linear-gradient(135deg,#8b5cf6,#6d28d9)", delay: "stagger-3" },
  { key: "txns",    label: "Activity",      icon: "📋", grad: "linear-gradient(135deg,#f43f5e,#ea580c)", delay: "stagger-4" },
];

const Insights = ({ insights }) => {
  const values = {
    top:     { value: insights.highestSpendingCategory, sub: `₹${fmt(insights.highestSpendingAmount)} total spent` },
    savings: { value: `${insights.savingsRate}%`,       sub: "of last month's income saved" },
    best:    { value: insights.bestMonth,               sub: `₹${fmt(insights.bestMonthSavings)} net savings` },
    txns:    { value: String(insights.totalTransactions), sub: "total transactions recorded" },
  };

  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
      {CARDS.map(({ key, label, icon, grad, delay }) => (
        <div
          key={key}
          className={`animate-fade-up ${delay}`}
          style={{
            background: grad,
            borderRadius: 18,
            padding: "22px 20px",
            color: "#fff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            border: "1px solid rgba(255,255,255,0.12)",
            position: "relative",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <div style={{ position:"absolute", top:-16, right:-16, width:70, height:70, borderRadius:"50%", background:"rgba(255,255,255,0.1)" }} />
          <div style={{ position:"relative" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <p style={{ margin:0, fontSize:10, fontWeight:700, opacity:0.7, textTransform:"uppercase", letterSpacing:"0.1em" }}>{label}</p>
              <span style={{ fontSize:20 }}>{icon}</span>
            </div>
            <p style={{ margin:0, fontSize:22, fontWeight:900, fontFamily:"'Sora',sans-serif" }}>{values[key].value}</p>
            <p style={{ margin:"8px 0 0", fontSize:11, opacity:0.65 }}>{values[key].sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Insights;

