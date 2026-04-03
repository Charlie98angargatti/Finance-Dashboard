// File NAme is TransactionTable.jsx 

import { useState } from "react";

const fmt = (n) => Number(n).toLocaleString("en-IN");
const PER_PAGE = 8;

const CAT_COLORS = {
  Salary:         { bg:"#d1fae5", color:"#065f46" },
  Freelance:      { bg:"#ccfbf1", color:"#0f766e" },
  Investment:     { bg:"#cffafe", color:"#0e7490" },
  Groceries:      { bg:"#fef9c3", color:"#854d0e" },
  Utilities:      { bg:"#ffedd5", color:"#9a3412" },
  Entertainment:  { bg:"#fce7f3", color:"#9d174d" },
  Transport:      { bg:"#dbeafe", color:"#1e40af" },
  "Food & Dining":{ bg:"#fee2e2", color:"#991b1b" },
  Shopping:       { bg:"#ede9fe", color:"#5b21b6" },
  Health:         { bg:"#dcfce7", color:"#166534" },
};

const inp = {
  padding: "9px 12px", borderRadius: 12, border: "1px solid #e2e8f0",
  fontSize: 13, outline: "none", background: "#fff", color: "#374151",
  fontFamily: "'DM Sans', sans-serif",
};

const TransactionTable = ({ data, role }) => {
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [catFilter,  setCatFilter]  = useState("all");
  const [sortBy,     setSortBy]     = useState("date");
  const [sortOrder,  setSortOrder]  = useState("desc");
  const [page,       setPage]       = useState(1);

  const categories = ["all", ...Array.from(new Set(data.map(t => t.category))).sort()];

  const filtered = data.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = t.category.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.type.toLowerCase().includes(q);
    return matchSearch && (typeFilter === "all" || t.type === typeFilter) && (catFilter === "all" || t.category === catFilter);
  });

  const sorted = [...filtered].sort((a, b) => {
    let v = 0;
    if (sortBy === "date")     v = new Date(a.date) - new Date(b.date);
    if (sortBy === "amount")   v = a.amount - b.amount;
    if (sortBy === "category") v = a.category.localeCompare(b.category);
    return sortOrder === "desc" ? -v : v;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated  = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder(o => o === "asc" ? "desc" : "asc");
    else { setSortBy(field); setSortOrder("desc"); }
    setPage(1);
  };

  const SortArrow = ({ field }) => (
    <span style={{ marginLeft:4, color: sortBy === field ? "#3b82f6" : "#cbd5e1" }}>
      {sortBy === field ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  const exportCSV = () => {
    const rows = [["Date","Description","Category","Type","Amount"],
      ...sorted.map(t => [t.date, `"${t.description}"`, t.category, t.type, t.amount])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([csv],{type:"text/csv"})), download:"transactions.csv" });
    a.click();
  };

  const thStyle = { padding:"12px 16px", textAlign:"left", fontSize:11, fontWeight:700, color:"#64748b", textTransform:"uppercase", letterSpacing:"0.08em", cursor:"pointer", userSelect:"none", whiteSpace:"nowrap", background:"#f8fafc" };
  const tdStyle = { padding:"13px 16px", fontSize:13, color:"#374151", borderBottom:"1px solid #f1f5f9" };

  return (
    <div className="animate-fade-up stagger-1">
      {/* Controls */}
      <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <div style={{ position:"relative", flex:1, minWidth:160 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"#94a3b8", fontSize:14 }}>🔍</span>
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search transactions…"
            style={{ ...inp, paddingLeft:36, width:"100%", boxSizing:"border-box" }} />
        </div>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }} style={inp}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1); }} style={inp}>
          {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
        </select>
        <button onClick={exportCSV}
          style={{ padding:"9px 18px", background:"#0f172a", color:"#fff", border:"none", borderRadius:12, fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", gap:6, whiteSpace:"nowrap" }}>
          ⬇ Export CSV
        </button>
      </div>

      {/* Table */}
      <div style={{ background:"#fff", borderRadius:20, boxShadow:"0 2px 16px rgba(0,0,0,0.06)", border:"1px solid #f1f5f9", overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr>
                <th style={thStyle} onClick={() => handleSort("date")}>Date <SortArrow field="date" /></th>
                <th style={{ ...thStyle, cursor:"default" }}>Description</th>
                <th style={thStyle} onClick={() => handleSort("category")}>Category <SortArrow field="category" /></th>
                <th style={{ ...thStyle, textAlign:"center" }}>Type</th>
                <th style={{ ...thStyle, textAlign:"right" }} onClick={() => handleSort("amount")}>Amount <SortArrow field="amount" /></th>
                {role === "admin" && <th style={{ ...thStyle, textAlign:"center" }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={role === "admin" ? 6 : 5} style={{ ...tdStyle, textAlign:"center", padding:"40px 16px" }}>
                    <p style={{ margin:0, color:"#94a3b8", fontWeight:600 }}>No transactions found</p>
                    <p style={{ margin:"4px 0 0", color:"#cbd5e1", fontSize:12 }}>Try changing your search or filters</p>
                  </td>
                </tr>
              ) : paginated.map((t, idx) => {
                const catStyle = CAT_COLORS[t.category] || { bg:"#f1f5f9", color:"#475569" };
                return (
                  <tr key={t.id} className="tx-row" style={{ background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ ...tdStyle, color:"#64748b", fontSize:12, whiteSpace:"nowrap" }}>{t.date}</td>
                    <td style={{ ...tdStyle, maxWidth:240 }}>
                      <p style={{ margin:0, fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.description}</p>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ background:catStyle.bg, color:catStyle.color, padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:600 }}>
                        {t.category}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign:"center" }}>
                      <span style={{
                        background: t.type === "income" ? "#d1fae5" : "#fee2e2",
                        color:      t.type === "income" ? "#065f46" : "#991b1b",
                        padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:700,
                      }}>
                        {t.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, textAlign:"right", fontWeight:700, color: t.type === "income" ? "#059669" : "#e11d48" }}>
                      {t.type === "income" ? "+" : "−"}₹{fmt(t.amount)}
                    </td>
                    {role === "admin" && (
                      <td style={{ ...tdStyle, textAlign:"center" }}>
                        <button style={{ padding:"4px 14px", background:"#eff6ff", color:"#2563eb", border:"1px solid #bfdbfe", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>
                          Edit
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding:"12px 16px", borderTop:"1px solid #f1f5f9", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#fafafa" }}>
          <p style={{ margin:0, fontSize:12, color:"#94a3b8" }}>
            Showing {Math.min((page-1)*PER_PAGE+1, sorted.length)}–{Math.min(page*PER_PAGE, sorted.length)} of {sorted.length}
          </p>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            {[["← Prev", page <= 1, () => setPage(p => p-1)], ...Array.from({length:totalPages},(_,i)=>[i+1,false,()=>setPage(i+1)]), ["Next →", page >= totalPages, () => setPage(p => p+1)]].map((item, i) => {
              const [label, disabled, action] = item;
              const isNum = typeof label === "number";
              const isActive = isNum && label === page;
              return (
                <button key={i} onClick={action} disabled={disabled}
                  style={{
                    padding: isNum ? "4px 0" : "4px 10px",
                    width: isNum ? 28 : "auto",
                    height: 28,
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    background: isActive ? "#3b82f6" : "#fff",
                    color: isActive ? "#fff" : disabled ? "#cbd5e1" : "#374151",
                    fontSize: 12, fontWeight: 600, cursor: disabled ? "default" : "pointer",
                    opacity: disabled ? 0.4 : 1,
                  }}>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;

