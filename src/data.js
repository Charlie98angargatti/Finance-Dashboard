// export const transactionsData = [
//   { id: 1, date: "2026-01-05", amount: 5000, category: "Salary", type: "income" },
//   { id: 2, date: "2026-01-08", amount: 450, category: "Groceries", type: "expense" },
//   { id: 3, date: "2026-01-12", amount: 120, category: "Utilities", type: "expense" },
//   { id: 4, date: "2026-01-15", amount: 200, category: "Entertainment", type: "expense" },
//   { id: 5, date: "2026-01-18", amount: 1500, category: "Freelance", type: "income" },
//   { id: 6, date: "2026-02-01", amount: 5000, category: "Salary", type: "income" },
//   { id: 7, date: "2026-02-05", amount: 800, category: "Groceries", type: "expense" },
//   { id: 8, date: "2026-02-08", amount: 350, category: "Transport", type: "expense" },
//   { id: 9, date: "2026-02-12", amount: 500, category: "Entertainment", type: "expense" },
//   { id: 10, date: "2026-02-15", amount: 2000, category: "Freelance", type: "income" },
//   { id: 11, date: "2026-02-20", amount: 150, category: "Utilities", type: "expense" },
//   { id: 12, date: "2026-03-01", amount: 5000, category: "Salary", type: "income" },
//   { id: 13, date: "2026-03-05", amount: 600, category: "Groceries", type: "expense" },
//   { id: 14, date: "2026-03-10", amount: 1500, category: "Transport", type: "expense" },
//   { id: 15, date: "2026-03-12", amount: 300, category: "Entertainment", type: "expense" },
//   { id: 16, date: "2026-03-15", amount: 3000, category: "Freelance", type: "income" },
//   { id: 17, date: "2026-03-18", amount: 200, category: "Utilities", type: "expense" },
//   { id: 18, date: "2026-03-22", amount: 900, category: "Groceries", type: "expense" },
// ];

// export const getChartData = (transactions) => {
//   // Time-based data for line chart (by month)
//   const monthlyData = {};
//   transactions.forEach((t) => {
//     const date = new Date(t.date);
//     const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//     if (!monthlyData[monthKey]) {
//       monthlyData[monthKey] = 0;
//     }
//     if (t.type === "income") {
//       monthlyData[monthKey] += t.amount;
//     } else {
//       monthlyData[monthKey] -= t.amount;
//     }
//   });

//   const balanceData = Object.entries(monthlyData).map(([month, amount]) => ({
//     month,
//     balance: amount,
//   }));

//   // Categorical data for pie chart (by category)
//   const categoryData = {};
//   transactions.forEach((t) => {
//     if (t.type === "expense") {
//       if (!categoryData[t.category]) {
//         categoryData[t.category] = 0;
//       }
//       categoryData[t.category] += t.amount;
//     }
//   });

//   const expensesByCategory = Object.entries(categoryData).map(
//     ([category, value]) => ({
//       name: category,
//       value,
//     })
//   );

//   return {
//     balanceData,
//     expensesByCategory,
//   };
// };

// export const calculateSummary = (transactions) => {
//   const income = transactions
//     .filter((t) => t.type === "income")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const expenses = transactions
//     .filter((t) => t.type === "expense")
//     .reduce((sum, t) => sum + t.amount, 0);

//   const balance = income - expenses;

//   return {
//     balance,
//     income,
//     expenses,
//   };
// };

// export const getInsights = (transactions) => {
//   const categorySpending = {};
//   transactions.forEach((t) => {
//     if (t.type === "expense") {
//       categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
//     }
//   });

//   const highestCategory = Object.entries(categorySpending).reduce((a, b) =>
//     a[1] > b[1] ? a : b
//   );

//   // Monthly comparison
//   const monthlyStats = {};
//   transactions.forEach((t) => {
//     const date = new Date(t.date);
//     const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//     if (!monthlyStats[monthKey]) {
//       monthlyStats[monthKey] = { income: 0, expenses: 0 };
//     }
//     if (t.type === "income") {
//       monthlyStats[monthKey].income += t.amount;
//     } else {
//       monthlyStats[monthKey].expenses += t.amount;
//     }
//   });

//   const months = Object.keys(monthlyStats).sort();
//   const savingsRate =
//     months.length > 0
//       ? (
//           ((monthlyStats[months[months.length - 1]].income -
//             monthlyStats[months[months.length - 1]].expenses) /
//             monthlyStats[months[months.length - 1]].income) *
//           100
//         ).toFixed(1)
//       : 0;

//   return {
//     highestSpendingCategory: highestCategory?.[0] || "N/A",
//     highestSpendingAmount: highestCategory?.[1] || 0,
//     savingsRate,
//     totalTransactions: transactions.length,
//   };
// };


// ─── Mock Transactions ───────────────────────────────────────────────────────
export const transactionsData = [
  // January
  { id: 1,  date: "2026-01-05", amount: 52000, category: "Salary",        type: "income",  description: "January salary credit – TechCorp Pvt Ltd" },
  { id: 2,  date: "2026-01-08", amount: 2450,  category: "Groceries",     type: "expense", description: "BigBasket monthly order" },
  { id: 3,  date: "2026-01-10", amount: 899,   category: "Utilities",     type: "expense", description: "Electricity bill – BESCOM" },
  { id: 4,  date: "2026-01-14", amount: 1200,  category: "Entertainment", type: "expense", description: "Netflix + Spotify subscription" },
  { id: 5,  date: "2026-01-18", amount: 15000, category: "Freelance",     type: "income",  description: "UI Design project – Client A" },
  { id: 6,  date: "2026-01-22", amount: 3500,  category: "Transport",     type: "expense", description: "Ola cabs + fuel reimbursement" },
  { id: 7,  date: "2026-01-25", amount: 4200,  category: "Food & Dining", type: "expense", description: "Swiggy orders + team lunch" },
  { id: 8,  date: "2026-01-28", amount: 800,   category: "Health",        type: "expense", description: "Pharmacy – medicines" },

  // February
  { id: 9,  date: "2026-02-01", amount: 52000, category: "Salary",        type: "income",  description: "February salary credit – TechCorp Pvt Ltd" },
  { id: 10, date: "2026-02-04", amount: 2800,  category: "Groceries",     type: "expense", description: "DMart weekly groceries" },
  { id: 11, date: "2026-02-07", amount: 1100,  category: "Utilities",     type: "expense", description: "Internet + mobile recharge" },
  { id: 12, date: "2026-02-10", amount: 5500,  category: "Entertainment", type: "expense", description: "Weekend trip to Coorg" },
  { id: 13, date: "2026-02-14", amount: 18000, category: "Freelance",     type: "income",  description: "Dashboard project – Client B" },
  { id: 14, date: "2026-02-17", amount: 2200,  category: "Transport",     type: "expense", description: "Monthly metro + cab charges" },
  { id: 15, date: "2026-02-20", amount: 3800,  category: "Food & Dining", type: "expense", description: "Restaurant outings" },
  { id: 16, date: "2026-02-23", amount: 6000,  category: "Shopping",      type: "expense", description: "Amazon – clothes + gadgets" },
  { id: 17, date: "2026-02-26", amount: 1500,  category: "Health",        type: "expense", description: "Gym membership renewal" },

  // March
  { id: 18, date: "2026-03-01", amount: 52000, category: "Salary",        type: "income",  description: "March salary credit – TechCorp Pvt Ltd" },
  { id: 19, date: "2026-03-03", amount: 3100,  category: "Groceries",     type: "expense", description: "Zepto + BigBasket top-up" },
  { id: 20, date: "2026-03-06", amount: 950,   category: "Utilities",     type: "expense", description: "Water + gas cylinder" },
  { id: 21, date: "2026-03-09", amount: 2400,  category: "Entertainment", type: "expense", description: "Movie + events" },
  { id: 22, date: "2026-03-12", amount: 22000, category: "Freelance",     type: "income",  description: "Mobile app project – Client C" },
  { id: 23, date: "2026-03-15", amount: 4800,  category: "Transport",     type: "expense", description: "Flight ticket – Bangalore to Mumbai" },
  { id: 24, date: "2026-03-18", amount: 5200,  category: "Food & Dining", type: "expense", description: "Business trip meals + Zomato" },
  { id: 25, date: "2026-03-21", amount: 8500,  category: "Shopping",      type: "expense", description: "Flipkart sale – electronics" },
  { id: 26, date: "2026-03-24", amount: 2000,  category: "Health",        type: "expense", description: "Annual health check-up" },
  { id: 27, date: "2026-03-28", amount: 5000,  category: "Investment",    type: "income",  description: "Mutual fund returns – SIP" },
];

// ─── Chart Data ──────────────────────────────────────────────────────────────
export const getChartData = (transactions) => {
  const monthlyMap = {};
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = date.toLocaleString("default", { month: "short", year: "2-digit" });
    if (!monthlyMap[monthKey]) monthlyMap[monthKey] = { income: 0, expense: 0 };
    if (t.type === "income") monthlyMap[monthKey].income += t.amount;
    else monthlyMap[monthKey].expense += t.amount;
  });

  const balanceData = Object.entries(monthlyMap).map(([month, d]) => ({
    month,
    balance: d.income - d.expense,
    income: d.income,
    expense: d.expense,
  }));

  const monthlyComparison = balanceData; // reuse for bar chart

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });
  const expensesByCategory = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  return { balanceData, expensesByCategory, monthlyComparison };
};

// ─── Summary ──────────────────────────────────────────────────────────────────
export const calculateSummary = (transactions) => {
  const income   = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { balance: income - expenses, income, expenses };
};

// ─── Insights ─────────────────────────────────────────────────────────────────
export const getInsights = (transactions) => {
  // Highest spending category
  const catSpend = {};
  transactions.forEach(t => {
    if (t.type === "expense") catSpend[t.category] = (catSpend[t.category] || 0) + t.amount;
  });
  const [highestCat, highestAmt] = Object.entries(catSpend).reduce((a, b) => a[1] > b[1] ? a : b, ["N/A", 0]);

  // Monthly stats
  const monthlyStats = {};
  transactions.forEach(t => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!monthlyStats[key]) monthlyStats[key] = { income: 0, expenses: 0, label: date.toLocaleString("default", { month: "short" }) };
    if (t.type === "income") monthlyStats[key].income += t.amount;
    else monthlyStats[key].expenses += t.amount;
  });

  const months = Object.keys(monthlyStats).sort();
  const lastMonth = monthlyStats[months[months.length - 1]];
  const savingsRate = lastMonth
    ? (((lastMonth.income - lastMonth.expenses) / lastMonth.income) * 100).toFixed(1)
    : 0;

  // Best month (highest net savings)
  const bestMonthKey = months.reduce((best, m) =>
    (monthlyStats[m].income - monthlyStats[m].expenses) >
    (monthlyStats[best].income - monthlyStats[best].expenses) ? m : best
  , months[0]);
  const bestMonth = monthlyStats[bestMonthKey]?.label || "N/A";
  const bestMonthSavings = bestMonthKey
    ? monthlyStats[bestMonthKey].income - monthlyStats[bestMonthKey].expenses
    : 0;

  return {
    highestSpendingCategory: highestCat,
    highestSpendingAmount: highestAmt,
    savingsRate,
    totalTransactions: transactions.length,
    bestMonth,
    bestMonthSavings,
  };
};
