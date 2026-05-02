import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { Home, Info, Mail, FileText, User, Settings, LogOut } from "lucide-react";

export default function MainLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Uğurla çıxış edildi!");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar">
        <span className="logo">My<span>App</span></span>
        <div className="nav-links">
          <Link to="/" className={isActive("/") ? "active" : ""}>
            <Home size={15} /> Home
          </Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>
            <Info size={15} /> About
          </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
            <Mail size={15} /> Contact
          </Link>
          <Link to="/posts" className={isActive("/posts") ? "active" : ""}>
            <FileText size={15} /> Posts
          </Link>
          <div className="nav-divider" />
          {user ? (
            <div className="nav-user">
              <Link to="/profile" className={isActive("/profile") ? "active" : ""}>
                <User size={15} /> Profile
              </Link>
              <Link to="/settings" className={isActive("/settings") ? "active" : ""}>
                <Settings size={15} /> Settings
              </Link>
              <div className="avatar">{user.username?.[0]?.toUpperCase() || "U"}</div>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={15} /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className={isActive("/login") ? "active" : ""}>
                <User size={15} /> Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}