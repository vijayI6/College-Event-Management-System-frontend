import React from "react"
import { Link } from "react-router-dom"
import "./Home.css"

export default function Landing() {
  const features = [
    {
      id: "create",
      title: "Event Creation",
      desc: "Create and publish campus events with custom dates venues and registration limits in seconds",
      color: "#3b82f6",
    },
    {
      id: "register",
      title: "Student Registrations",
      desc: "Fast online signups for students with instant seat booking and automated email alerts",
      color: "#a855f7",
    },
    {
      id: "tickets",
      title: "QR Code Tickets",
      desc: "Unique QR tickets issued instantly upon registration for swift and secure entry checks",
      color: "#ec4899",
    },
    {
      id: "admin",
      title: "Admin Panel",
      desc: "Unified control room to approve events check attendees list and manage user access roles",
      color: "#10b981",
    },
    {
      id: "analytics",
      title: "Event Analytics",
      desc: "Track total ticket sales registration statistics and live attendee rates with clean charts",
      color: "#f59e0b",
    },
    {
      id: "certificates",
      title: "Digital Certificates",
      desc: "Generate and distribute verified digital participation certificates to students automatically",
      color: "#06b6d4",
    },
  ]

  return (
    <main style={{ flexGrow: 1 }}>
      <section className="hero">
        <div className="container">
          <div className="hero-glow"></div>
          <div className="developer-badge">
            Created by <span>Sai Vijay</span> &amp; <span>Macha Rishi</span>
          </div>
          <h1>
            Shnoor International LLC
            <br />
            Event Management System
          </h1>
          <p>
            Simple college event registration portal to join events and get your digital QR ticket fast
          </p>
          <div className="hero-btns">
            <Link to="/signin" className="btn btn-primary">
              Explore Dashboard
            </Link>
            <a href="#features" className="btn btn-outline">
              View Features
            </a>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Platform Features</h2>
            <p>Everything you need to host successful events on campus</p>
          </div>
          <div className="features-grid">
            {features.map((item) => (
              <div
                key={item.id}
                className="feature-card"
                style={{
                  borderTop: `4px solid ${item.color}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 30px ${item.color}15`
                  e.currentTarget.style.borderColor = item.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = "var(--border-color)"
                  e.currentTarget.style.borderTop = `4px solid ${item.color}`
                }}
              >
                <h3 style={{ color: item.color, fontSize: "20px", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="container">
          <div className="section-header" style={{ maxWidth: "100%", margin: "0 auto 48px auto" }}>
            <h2>About CampusEvents</h2>
            <p style={{ marginBottom: "20px" }}><strong>CampusEvents</strong> is a college event management system that helps students easily find and register for campus events. After registration, students receive a QR code ticket for quick and easy check-in at the event.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div style={{ fontSize: "36px", fontWeight: "800", color: "var(--primary-color)", marginBottom: "12px" }}>342</div>
              <h3>Registered Students</h3>
              <p>active student profiles registered inside this platform</p>
            </div>
            <div className="feature-card">
              <div style={{ fontSize: "36px", fontWeight: "800", color: "var(--badge-span-color)", marginBottom: "12px" }}>342 / 500</div>
              <h3>Ticket Sales</h3>
              <p>total seats reserved for upcoming events this semester</p>
            </div>
            <div className="feature-card">
              <div style={{ fontSize: "36px", fontWeight: "800", color: "var(--primary-color)", marginBottom: "12px" }}>4</div>
              <h3>Active Events</h3>
              <p>running events organized by various departments</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
