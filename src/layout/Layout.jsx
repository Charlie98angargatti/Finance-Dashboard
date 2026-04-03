// File NAme is Layout.jsx 

import Sidebar from "./Sidebar";
import Navbar  from "./Navbar";

const Layout = ({ children, role, onRoleChange, onAddTransaction, activePage, onNavigate }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ── Fixed Sidebar ── */}
      <Sidebar active={activePage} onNavigate={onNavigate} />

      {/* ── Main Area ── */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">

        {/* Top Navbar */}
        <Navbar
          role={role}
          onRoleChange={onRoleChange}
          onAddTransaction={onAddTransaction}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3">
          <p className="text-xs text-gray-400 text-center">
            FinTrack Finance Dashboard © 2026 — Built with React 19 · Tailwind CSS · Recharts · Vite
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;




