import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userImage from "../assets/images/user.jpg";
import "../css/header.css";
import "../css/theme.css";

function Header({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function toggleTheme() {
    setDarkMode((previous) => {
      const newTheme = !previous;

      localStorage.setItem("theme", newTheme ? "dark" : "light");

      return newTheme;
    });
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute(
      "data-theme-version",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);
  /* =========================================================
     PAGE TITLE
     ========================================================= */

  let pageTitle = "DASHBOARD";

  if (location.pathname === "/profile") {
    pageTitle = "PROFILE";
  } else if (location.pathname === "/course") {
    pageTitle = "COURSE";
  } else if (location.pathname === "/mcq") {
    pageTitle = "MCQ TEST";
  } else if (location.pathname.startsWith("/admin/sub-course")) {
    pageTitle = "SUB COURSE";
  } else if (location.pathname.startsWith("/admin/course")) {
    pageTitle = "COURSE";
  } else if (location.pathname.startsWith("/admin/trainer-report")) {
    pageTitle = "TRAINER REPORT";
  } else if (location.pathname.startsWith("/admin/trainer")) {
    pageTitle = "TRAINER";
  } else if (location.pathname.startsWith("/admin/student-report")) {
    pageTitle = "STUDENT REPORT";
  } else if (location.pathname.startsWith("/admin/student")) {
    pageTitle = "STUDENT";
  } else if (location.pathname.startsWith("/admin/allocate")) {
    pageTitle = "ALLOCATE";
  } else if (location.pathname.startsWith("/admin/mcq")) {
    pageTitle = "MCQ TEST";
  } else if (location.pathname.startsWith("/admin")) {
    pageTitle = "ADMIN DASHBOARD";
  }

  return (
    <>
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="navbar-collapse">
              {/* =================================================
                  HEADER LEFT
                  ================================================= */}

              <div className="header-left">
                {/* Hamburger */}

                <button
                  type="button"
                  className="mobile-menu-button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-label="Toggle navigation"
                >
                  <span className="material-icons">menu</span>
                </button>

                {/* Mobile / Tablet Logo */}

                <div className="mobile-header-logo">BR</div>

                {/* Page Title */}

                <div className="dashboard_bar">{pageTitle}</div>
              </div>

              {/* =================================================
                  DESKTOP HEADER FEATURES
                  ================================================= */}

              <ul className="navbar-nav header-right desktop-header-features">
                {/* Search */}

                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="material-icons">search</span>
                  </a>
                </li>

                {/* Grid */}

                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="material-icons">apps</span>
                  </a>
                </li>

                {/* Theme */}

                <li className="nav-item dropdown notification_dropdown">
                  <button
                    type="button"
                    className="nav-link bell dz-theme-mode"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                  >
                    <span className="material-icons">
                      {darkMode ? "dark_mode" : "light_mode"}
                    </span>
                  </button>
                </li>

                {/* Fullscreen */}
                <button
                  type="button"
                  className="nav-link dz-fullscreen"
                  onClick={toggleFullscreen}
                >
                  <span className="material-icons">
                    {isFullscreen ? "fullscreen_exit" : "fullscreen"}
                  </span>
                </button>

                {/* Messages */}

                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link bell-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="material-icons">chat_bubble_outline</span>
                  </a>
                </li>

                {/* Notifications */}

                <li className="nav-item bell-icon blink dropdown notification_dropdown">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="material-icons">notifications</span>
                  </a>
                </li>

                {/* Settings */}

                <li className="nav-item dropdown notification_dropdown">
                  <a
                    className="nav-link me-0"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="material-icons">settings</span>
                  </a>
                </li>

                {/* Profile */}

                {/* Profile */}

                <li className="nav-item">
                  <div className="dropdown header-profile2">
                    <button
                      type="button"
                      className="nav-link ms-0"
                      onClick={() => navigate("/profile")}
                      aria-label="Open student profile"
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <div className="header-info2 d-flex align-items-center">
                        <div className="d-flex align-items-center sidebar-info"></div>

                        <img src={userImage} alt="Student profile" />
                      </div>
                    </button>
                  </div>
                </li>
              </ul>

              {/* =================================================
                  TABLET / MOBILE PROFILE
                  ================================================= */}

              <div className="mobile-header-profile">
                <button
                  type="button"
                  className="mobile-profile-button"
                  onClick={() => setMobileFeaturesOpen(!mobileFeaturesOpen)}
                  aria-label="Open header features"
                >
                  <img src={userImage} alt="User" />
                </button>

                {/* =================================================
                    MOBILE FEATURES MENU
                    ================================================= */}

                {mobileFeaturesOpen && (
                  <div className="mobile-features-menu">
                    {/* Search */}

                    <button type="button">
                      <span className="material-icons">search</span>

                      <span>Search</span>
                    </button>

                    {/* Apps */}

                    <button type="button">
                      <span className="material-icons">apps</span>

                      <span>Apps</span>
                    </button>

                    {/* Theme */}

                    {/* Theme */}

                    <button type="button" onClick={toggleTheme}>
                      <span className="material-icons">
                        {darkMode ? "dark_mode" : "light_mode"}
                      </span>

                      <span>Theme</span>
                    </button>

                    {/* Fullscreen */}

                    <button type="button" onClick={toggleFullscreen}>
                      <span className="material-icons ">
                        {isFullscreen ? "fullscreen_exit" : "fullscreen"}
                      </span>

                      <span>
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      </span>
                    </button>

                    {/* Messages */}

                    <button type="button">
                      <span className="material-icons">
                        chat_bubble_outline
                      </span>

                      <span>Messages</span>
                    </button>

                    {/* Notifications */}

                    <button type="button">
                      <span className="material-icons">notifications</span>

                      <span>Notifications</span>
                    </button>

                    {/* Settings */}

                    <button type="button">
                      <span className="material-icons">settings</span>

                      <span>Settings</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
