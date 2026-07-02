import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        alert("Registration successful! You can now log in.")
        navigate("/signin")
      } else {
        setError(data.message || "Registration failed. Please try again.")
      }
    } catch (err) {
      setError("Unable to connect to the registration server. Please verify the backend is running.")
      console.error("Registration error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-background-glow"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join CampusEvents to reserve your digital QR tickets</p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              required
              placeholder="Enter Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Campus Email</label>
            <input
              type="email"
              required
              placeholder="Enter College Mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Student ID / Roll Number</label>
            <input
              type="text"
              required
              placeholder="Enter Student ID"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="auth-input"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              required
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="auth-input"
            />
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link to="/signin" className="auth-register-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
