import React from "react"

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container navbar-content">
        <div className="logo">
          <div className="logo-dot"></div>
          <span>CampusEvents</span>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#features" className="nav-link">
                Features
              </a>
            </li>
            <li>
              <a href="#preview" className="nav-link">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
            <li>
              <button className="btn btn-outline">Sign In</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
