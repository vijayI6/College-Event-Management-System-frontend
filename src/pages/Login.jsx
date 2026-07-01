import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"

export default function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulating authentication
    setTimeout(() => {
      setLoading(false)
      alert("Successfully signed in (Demo)!")
      navigate("/")
    }, 1500)
  }

  return (
    <div className="auth-container">
      <div className="auth-background-glow"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Enter your campus credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">Campus Email</label>
            <input
              type="email"
              required
              placeholder="Enter your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <div className="auth-label-row">
              <label className="auth-label">Password</label>
              <a href="#" className="auth-forgot-link" onClick={(e) => e.preventDefault()}>
                Forgot?
              </a>
            </div>
            <input
              type="password"
              required
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="auth-input"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register" className="auth-register-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
