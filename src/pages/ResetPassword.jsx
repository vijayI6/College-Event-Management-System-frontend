import React, { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import "./Auth.css"

export default function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.")
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long.")
    }

    setLoading(true)

    try {
      const response = await fetch(`http://localhost:5000/api/users/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: formData.password }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Password updated successfully! Redirecting you to login page...")
        setTimeout(() => {
          navigate("/signin")
        }, 3000)
      } else {
        setError(data.message || "Failed to reset password. The link may have expired.")
      }
    } catch (err) {
      setError("Unable to connect to the server. Please verify the backend is running.")
      console.error("Reset password error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background-glow"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">Create a secure new password for your account</p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}
        {success && <div className="auth-success-message">{success}</div>}

        {!success && (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label className="auth-label">New Password</label>
              <input
                type="password"
                required
                placeholder="Enter new password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="auth-input"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Confirm New Password</label>
              <input
                type="password"
                required
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="auth-input"
              />
            </div>

            <button type="submit" disabled={loading} className="auth-submit-btn">
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="auth-footer">
          <Link to="/signin" className="auth-back-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
