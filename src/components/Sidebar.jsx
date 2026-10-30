
import { NavLink, useNavigate } from "react-router-dom";
import "../css/sidebar.css";
import { logout } from "../utils/auth";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });

    if (setSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`sidebar-wrapper ${
        sidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <div className="nav-header">
        <NavLink to="/dashboard" className="brand-logo">
          <span className="logo-abbr">BR</span>
          <span className="brand-title">Academy</span>
        </NavLink>
      </div>

      <div className="dlabnav">
        <div className="dlabnav-scroll">
          <ul className="metismenu">
            <li>
              <NavLink to="/dashboard" onClick={handleNavClick}>
                <span className="material-icons">home</span>
                <span className="nav-text">Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" onClick={handleNavClick}>
                <span className="material-icons">person</span>
                <span className="nav-text">Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/course" onClick={handleNavClick}>
                <span className="material-icons">menu_book</span>
                <span className="nav-text">Course</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/mcq" onClick={handleNavClick}>
                <span className="material-icons">quiz</span>
                <span className="nav-text">MCQ Test</span>
              </NavLink>
            </li>
          </ul>

          {/* Logout button */}
          <div className="copyright">
            <button
              type="button"
              className="sidebar-logout-btn"
              onClick={handleLogout}
            >
              <span className="material-icons">logout</span>
              <span className="nav-text">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
