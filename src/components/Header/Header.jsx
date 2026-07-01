import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container navbar-content">
        <Link to="/" className="logo">
          <div className="logo-dot"></div>
          <span>CampusEvents</span>
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
              <Link to="/signin" className="btn btn-outline">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

