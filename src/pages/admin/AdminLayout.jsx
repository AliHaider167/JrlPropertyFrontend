import { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "../../components/Logo.jsx";

const links = [
  { to: "/admin/dashboard", label: "Properties" },
  { to: "/admin/inquiries/buyers", label: "Buyer Enquiries" },
  { to: "/admin/inquiries/owners", label: "Owner Submissions" },
  { to: "/admin/users", label: "Users" },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarNav = ({ onNavigate }) => (
    <>
      <div className="p-6 border-b border-ivory/10">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block px-4 py-3 text-sm rounded-sm ${
                isActive ? "bg-ivory/10 text-brass-400" : "text-ivory/70 hover:bg-ivory/5"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-ivory/10">
        <p className="text-xs text-ivory/50 mb-2 truncate">{user?.email}</p>
        <button onClick={handleLogout} className="text-sm text-brass-400 hover:text-brass-300">
          Log out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-navy-950/[0.02]">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-navy-900 text-ivory px-4 h-16 shrink-0">
        <Link to="/">
          <Logo />
        </Link>
        <button
          aria-label="Toggle admin menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-2"
        >
          <span className={`w-6 h-px bg-ivory transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`w-6 h-px bg-ivory transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-px bg-ivory transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-navy-900 text-ivory flex flex-col shrink-0">
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-navy-900 text-ivory flex-col shrink-0">
        <SidebarNav />
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
