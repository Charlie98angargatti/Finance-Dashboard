// File NAmeis Charts.jsx

import {
  LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell,
  Tooltip, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444","#ec4899","#06b6d4"];
const fmt = (v) => `₹${Number(v).toLocaleString("en-IN")}`;

const card = {
  background: "#fff",
  borderRadius: 20,
  padding: "24px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
  border: "1px solid #f1f5f9",
};

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#fff", border:"1px solid #f1f5f9", borderRadius:12, padding:"10px 14px", boxShadow:"0 8px 24px rgba(0,0,0,0.1)", fontSize:12 }}>
      {label && <p style={{ fontWeight:700, color:"#374151", marginBottom:4 }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} style={{ color:p.color, fontWeight:600, margin:"2px 0" }}>{p.name}: {fmt(p.value)}</p>
      ))}
    </div>
  );
};

const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const R = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * R);
  const y = cy + r * Math.sin(-midAngle * R);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize:11, fontWeight:700 }}>
      {`${(percent*100).toFixed(0)}%`}
    </text>
  );
};

const cardTitle = (title, sub) => (
  <div style={{ marginBottom:16 }}>
    <h3 style={{ margin:0, fontSize:15, fontWeight:800, color:"#0f172a", fontFamily:"'Sora',sans-serif" }}>{title}</h3>
    <p style={{ margin:"3px 0 0", fontSize:12, color:"#94a3b8" }}>{sub}</p>
  </div>
);

const Charts = ({ balanceData, expensesByCategory, monthlyComparison }) => (
  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

    {/* Balance Trend */}
    <div style={card} className="animate-fade-up stagger-1">
      {cardTitle("Balance Trend", "Net balance by month")}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={balanceData} margin={{ top:4, right:8, left:0, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" vertical={false} />
          <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize:11 }} />
          <YAxis stroke="#9ca3af" tick={{ fontSize:11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<ChartTooltip />} />
          <Line type="monotone" dataKey="balance" name="Balance" stroke="#3b82f6" strokeWidth={2.5}
            dot={{ fill:"#3b82f6", r:5, strokeWidth:2, stroke:"#fff" }}
            activeDot={{ r:7, stroke:"#fff", strokeWidth:2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Spending Breakdown */}
    <div style={card} className="animate-fade-up stagger-2">
      {cardTitle("Spending Breakdown", "Expenses by category")}
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={expensesByCategory} cx="50%" cy="50%"
            innerRadius={55} outerRadius={85} paddingAngle={3}
            dataKey="value" labelLine={false} label={renderPieLabel}>
            {expensesByCategory.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => fmt(v)} />
          <Legend iconType="circle" iconSize={8}
            formatter={(v) => <span style={{ fontSize:11, color:"#6b7280" }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Monthly Comparison — full width */}
    <div style={{ ...card, gridColumn:"1 / -1" }} className="animate-fade-up stagger-3">
      {cardTitle("Monthly Comparison", "Income vs expenses month over month")}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={monthlyComparison} barCategoryGap="40%" margin={{ top:4, right:8, left:0, bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" vertical={false} />
          <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize:11 }} />
          <YAxis stroke="#9ca3af" tick={{ fontSize:11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<ChartTooltip />} />
          <Legend iconType="circle" iconSize={8}
            formatter={(v) => <span style={{ fontSize:11, color:"#6b7280", textTransform:"capitalize" }}>{v}</span>} />
          <Bar dataKey="income"  name="Income"  fill="#10b981" radius={[6,6,0,0]} />
          <Bar dataKey="expense" name="Expense" fill="#f43f5e" radius={[6,6,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

  </div>
);

export default Charts;
