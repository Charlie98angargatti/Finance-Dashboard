import { useState } from "react";
import SummaryCard from "./components/SummaryCard";
import Charts from "./components/Charts";
import TransactionTable from "./components/TransactionTable";
import Insights from "./components/Insights";
import RoleSelector from "./components/RoleSelector";
import AddTransactionModal from "./components/AddTransactionModal";
import { transactionsData, getChartData, calculateSummary, getInsights } from "./data";
import "./index.css";

const S = {
  page:    { minHeight: "100vh", background: "#f8fafc", fontFamily: "'DM Sans', sans-serif" },
  header:  { position: "sticky", top: 0, zIndex: 40, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" },
  hInner:  { maxWidth: 1280, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 },
  logo:    { display: "flex", alignItems: "center", gap: 12 },
  logoBox: { width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg,#3b82f6,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.35)", flexShrink: 0 },
  logoTxt: { color: "#fff", fontWeight: 900, fontSize: 17, fontFamily: "'Sora',sans-serif" },
  h1:      { fontSize: 20, fontWeight: 900, color: "#0f172a", margin: 0, fontFamily: "'Sora',sans-serif" },
  h1sub:   { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  hRight:  { display: "flex", alignItems: "center", gap: 16 },
  addBtn:  { display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", background: "linear-gradient(135deg,#3b82f6,#7c3aed)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: "0 4px 14px rgba(99,102,241,0.4)" },
  main:    { maxWidth: 1280, margin: "0 auto", padding: "36px 24px" },
  section: { marginBottom: 48 },
  secHead: { marginBottom: 20 },
  secH2:   { fontSize: 22, fontWeight: 900, color: "#0f172a", margin: 0, fontFamily: "'Sora',sans-serif" },
  secSub:  { fontSize: 13, color: "#94a3b8", marginTop: 4 },
  grid3:   { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  banner:  (isAdmin) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 20px", borderRadius: 12, marginBottom: 32,
    fontSize: 13, fontWeight: 600,
    background: isAdmin ? "#f5f3ff" : "#eff6ff",
    border: `1px solid ${isAdmin ? "#ddd6fe" : "#bfdbfe"}`,
    color: isAdmin ? "#6d28d9" : "#1d4ed8",
  }),
  footer:  { background: "#0f172a", borderTop: "1px solid #1e293b", marginTop: 64 },
  fInner:  { maxWidth: 1280, margin: "0 auto", padding: "40px 24px" },
  fGrid:   { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 32 },
  fH:      { color: "#e2e8f0", fontWeight: 700, fontSize: 13, marginBottom: 8, fontFamily: "'Sora',sans-serif" },
  fP:      { color: "#64748b", fontSize: 12, lineHeight: 1.7 },
  fBot:    { borderTop: "1px solid #1e293b", paddingTop: 24, textAlign: "center", color: "#475569", fontSize: 12 },
};

function App() {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState(transactionsData);
  const [showModal, setShowModal] = useState(false);

  const summary = calculateSummary(transactions);
  const { balanceData, expensesByCategory, monthlyComparison } = getChartData(transactions);
  const insights = getInsights(transactions);

  return (
    <div style={S.page}>

      {/* ── Header ── */}
      <header style={S.header}>
        <div style={S.hInner}>
          <div style={S.logo}>
            <div style={S.logoBox}>
              <span style={S.logoTxt}>₹</span>
            </div>
            <div>
              <h1 style={S.h1}>FinTrack</h1>
              <p style={S.h1sub}>Smart financial dashboard</p>
            </div>
          </div>
          <div style={S.hRight}>
            {role === "admin" && (
              <button style={S.addBtn} onClick={() => setShowModal(true)}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
                Add Transaction
              </button>
            )}
            <RoleSelector role={role} onRoleChange={setRole} />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={S.main}>

        {/* Role banner */}
        <div style={S.banner(role === "admin")}>
          <span>{role === "admin" ? "⚙️" : "👁"}</span>
          {role === "admin"
            ? "Admin Mode — you can add and edit transactions."
            : "Viewer Mode — read-only. Switch to Admin to make changes."}
        </div>

        {/* Financial Overview */}
        <div style={S.section}>
          <div style={S.secHead}>
            <h2 style={S.secH2}>Financial Overview</h2>
            <p style={S.secSub}>Your key metrics at a glance</p>
          </div>
          <div style={S.grid3}>
            <SummaryCard title="Total Balance"  amount={summary.balance}  type="balance"  subtitle="Income minus expenses" delay="stagger-1" />
            <SummaryCard title="Total Income"   amount={summary.income}   type="income"   subtitle="All credited amounts"  delay="stagger-2" />
            <SummaryCard title="Total Expenses" amount={summary.expenses} type="expense"  subtitle="All debited amounts"   delay="stagger-3" />
          </div>
        </div>

        {/* Insights */}
        <div style={S.section}>
          <div style={S.secHead}>
            <h2 style={S.secH2}>Financial Insights</h2>
            <p style={S.secSub}>Key observations from your spending data</p>
          </div>
          <Insights insights={insights} />
        </div>

        {/* Charts */}
        <div style={S.section}>
          <div style={S.secHead}>
            <h2 style={S.secH2}>Financial Trends</h2>
            <p style={S.secSub}>Balance trends and spending breakdown</p>
          </div>
          <Charts
            balanceData={balanceData}
            expensesByCategory={expensesByCategory}
            monthlyComparison={monthlyComparison}
          />
        </div>

        {/* Transactions */}
        <div style={S.section}>
          <div style={S.secHead}>
            <h2 style={S.secH2}>Transactions</h2>
            <p style={S.secSub}>All your financial activity in one place</p>
          </div>
          <TransactionTable data={transactions} role={role} />
        </div>

      </main>

      {/* ── Footer ── */}
      <footer style={S.footer}>
        <div style={S.fInner}>
          <div style={S.fGrid}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#3b82f6,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ color:"#fff",fontWeight:900,fontSize:12 }}>₹</span>
                </div>
                <span style={{ color:"#e2e8f0",fontWeight:700,fontSize:13 }}>FinTrack</span>
              </div>
              <p style={S.fP}>Smart financial tracking for better money management.</p>
            </div>
            <div>
              <h3 style={S.fH}>Features</h3>
              <p style={S.fP}>Real-time insights · Smart categorization · Visual analytics · Role-based access</p>
            </div>
            <div>
              <h3 style={S.fH}>Built With</h3>
              <p style={S.fP}>React 19 · Tailwind CSS · Recharts · Vite</p>
            </div>
          </div>
          <div style={S.fBot}>FinTrack © 2026 — Finance Dashboard Assignment</div>
        </div>
      </footer>

      {showModal && (
        <AddTransactionModal onAdd={(tx) => setTransactions(p => [tx,...p])} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;
