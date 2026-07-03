import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"

export default function SignIn({ setUser }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // perform sign in auth request
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // save user credentials on success
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        setUser(data.user)
        // navigate to student dashboard view
        navigate("/dashboard")
      } else {
        setError(data.message || "Invalid credentials. Please try again.")
      }
    } catch (err) {
      // handle server connection failure
      setError("Unable to connect to the authentication server. Please verify the backend is running.")
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background-glow"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Enter your campus credentials to access your account</p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}

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
              <Link to="/forgot-password" className="auth-forgot-link">
                Forgot?
              </Link>
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
