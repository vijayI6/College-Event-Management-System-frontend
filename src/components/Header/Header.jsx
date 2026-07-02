import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

export default function Navbar({ theme, toggleTheme, user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <header className="navbar">
      <div className="navbar-container navbar-content">
        <Link to="/" className="logo">
          <div className="logo-dot"></div>
          <span><span className="logo-campus">Campus</span>Events</span>
        </Link>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/#features" className="nav-link">
                Features
              </Link>
            </li>
            <li>
              <Link to="/#about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <svg className="theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="M4.93 4.93l1.41 1.41"></path>
                    <path d="M17.66 17.66l1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="M6.34 17.66l-1.41 1.41"></path>
                    <path d="M19.07 4.93l-1.41 1.41"></path>
                  </svg>
                ) : (
                  <svg className="theme-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                )}
              </button>
            </li>
            {user ? (
              <>
                <li>
                  <button onClick={handleLogout} className="btn btn-outline" style={{ cursor: "pointer" }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/signin" className="btn btn-outline">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

