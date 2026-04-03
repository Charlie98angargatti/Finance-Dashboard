// File Name is Navbar.jsx

import RoleSelector from "./RoleSelector";

const Navbar = ({ role, onRoleChange, onAddTransaction }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between gap-4">

      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-semibold">Dashboard</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">

        {/* Add Transaction — Admin only */}
        {role === "admin" && (
          <button
            onClick={onAddTransaction}
            className="no-print flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm shadow-blue-600/30"
          >
            <span className="text-base leading-none">+</span>
            <span className="hidden sm:inline">Add Transaction</span>
          </button>
        )}

        {/* Role Selector */}
        <RoleSelector role={role} onRoleChange={onRoleChange} />

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 hidden sm:block" />

        {/* Icons */}
        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-base">
          🔔
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-base">
          🌙
        </button>

        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="User"
          className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-colors"
        />
      </div>
    </header>
  );
};

export default Navbar;




