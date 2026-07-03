import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("A password reset link has been sent to your email address.")
      } else {
        setError(data.message || "Failed to process request. Please try again.")
      }
    } catch (err) {
      setError("Unable to connect to the server. Please verify the backend is running.")
      console.error("Forgot password error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background-glow"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Forgot Password</h2>
          <p className="auth-subtitle">Enter your campus email to receive a password reset link</p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}
        {success && <div className="auth-success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">Campus Email</label>
            <input
              type="email"
              required
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/signin" className="auth-back-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
