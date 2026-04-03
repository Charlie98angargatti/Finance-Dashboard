 // /File Name is AddTransactionModal

import { useState } from "react";

const CATEGORIES = ["Salary","Freelance","Investment","Groceries","Utilities","Entertainment","Transport","Food & Dining","Shopping","Health","Other"];
const defaultForm = { date: new Date().toISOString().split("T")[0], description:"", category:"Groceries", type:"expense", amount:"" };

const inp = { width:"100%", padding:"10px 14px", borderRadius:12, border:"1px solid #e2e8f0", fontSize:13, outline:"none", background:"#fff", boxSizing:"border-box", fontFamily:"'DM Sans',sans-serif", color:"#374151" };
const lbl = { display:"block", fontSize:11, fontWeight:700, color:"#64748b", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" };

const AddTransactionModal = ({ onAdd, onClose }) => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");
  const change = (e) => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(""); };

  const submit = () => {
    if (!form.description.trim()) return setError("Description is required.");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) return setError("Enter a valid positive amount.");
    onAdd({ id: Date.now(), date: form.date, description: form.description.trim(), category: form.category, type: form.type, amount: Number(form.amount) });
    onClose();
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.45)", backdropFilter:"blur(4px)" }}
      className="animate-fade-in">
      <div style={{ background:"#fff", borderRadius:24, boxShadow:"0 24px 64px rgba(0,0,0,0.18)", width:"100%", maxWidth:440, margin:"0 16px" }} className="animate-fade-up">

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 24px", borderBottom:"1px solid #f1f5f9" }}>
          <div>
            <h2 style={{ margin:0, fontSize:17, fontWeight:900, color:"#0f172a", fontFamily:"'Sora',sans-serif" }}>Add Transaction</h2>
            <p style={{ margin:"2px 0 0", fontSize:11, color:"#94a3b8" }}>Admin only — new record</p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#94a3b8", lineHeight:1 }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", gap:16 }}>
          {/* Type toggle */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {["income","expense"].map(t => (
              <button key={t} onClick={() => setForm(f => ({ ...f, type:t }))}
                style={{
                  padding:"10px", borderRadius:12, border:"none", fontWeight:700, fontSize:13, cursor:"pointer",
                  background: form.type === t ? (t==="income" ? "linear-gradient(135deg,#10b981,#059669)" : "linear-gradient(135deg,#f43f5e,#dc2626)") : "#f8fafc",
                  color: form.type === t ? "#fff" : "#64748b",
                  textTransform:"capitalize",
                }}>
                {t === "income" ? "↑ Income" : "↓ Expense"}
              </button>
            ))}
          </div>

          <div>
            <label style={lbl}>Description</label>
            <input name="description" value={form.description} onChange={change} placeholder="e.g. BigBasket order" style={inp} />
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={lbl}>Category</label>
              <select name="category" value={form.category} onChange={change} style={inp}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Date</label>
              <input name="date" type="date" value={form.date} onChange={change} style={inp} />
            </div>
          </div>

          <div>
            <label style={lbl}>Amount (₹)</label>
            <input name="amount" type="number" min="1" value={form.amount} onChange={change} placeholder="e.g. 1500" style={inp} />
          </div>

          {error && <p style={{ margin:0, fontSize:12, color:"#e11d48", fontWeight:600 }}>{error}</p>}
        </div>

        {/* Footer */}
        <div style={{ padding:"0 24px 24px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <button onClick={onClose}
            style={{ padding:"11px", borderRadius:12, border:"1px solid #e2e8f0", background:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", color:"#374151" }}>
            Cancel
          </button>
          <button onClick={submit}
            style={{ padding:"11px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#3b82f6,#7c3aed)", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", boxShadow:"0 4px 14px rgba(99,102,241,0.4)" }}>
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;


