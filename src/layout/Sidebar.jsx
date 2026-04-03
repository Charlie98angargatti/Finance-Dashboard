// File Name is Sidebar.jsx

const navItems = [
  { icon: "📊", label: "Dashboard",    id: "dashboard" },
  { icon: "💳", label: "Transactions", id: "transactions" },
  { icon: "📈", label: "Analytics",    id: "analytics" },
  { icon: "💡", label: "Insights",     id: "insights" },
];

const settingsItems = [
  { icon: "⚙️", label: "Settings", id: "settings" },
];

const Sidebar = ({ active = "dashboard", onNavigate }) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 flex flex-col z-50 select-none">

      {/* ── Logo ─────────────────────────────────── */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shrink-0">
          <span className="text-white font-black text-sm">₹</span>
        </div>
        <span className="text-white font-black text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          FinTrack
        </span>
        <span className="ml-auto text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">
          NEW
        </span>
      </div>

      {/* ── Nav ──────────────────────────────────── */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Menu</p>

        <div className="space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active === item.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                  : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <span className="text-base leading-none w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
              {active === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3 mt-6">Settings</p>

        <div className="space-y-0.5">
          {settingsItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-all duration-150"
            >
              <span className="text-base leading-none w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ── Footer ───────────────────────────────── */}
      <div className="px-5 py-4 border-t border-gray-800">
        <p className="text-gray-600 text-[10px] text-center">FinTrack © 2026</p>
      </div>
    </aside>
  );
};

export default Sidebar;

