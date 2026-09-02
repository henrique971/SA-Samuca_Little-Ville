import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AppLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate("/login");
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-emoji">👣</span>
          <div>
            <h2>Little Ville</h2>
            <span>Avistamentos</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" end>
            <span className="nav-icon">🗺️</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/sightings">
            <span className="nav-icon">📋</span>
            <span>Avistamentos</span>
          </NavLink>

          <div style={{ flex: 1 }} />

          <button onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            <span>Sair</span>
          </button>
        </nav>

        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <div className="user-name">{user?.name || "Usuário"}</div>
              <div className="user-email">{user?.email || ""}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
