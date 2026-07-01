import React, { useState } from "react"

export default function Landing() {
  const [activeTab, setActiveTab] = useState("admin")

  const features = [
    {
      id: "create",
      title: "Event Creation",
      desc: "Create and publish campus events with custom dates venues and registration limits in seconds",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="12" y1="14" x2="12" y2="20" />
          <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
      ),
    },
    {
      id: "register",
      title: "Student Registrations",
      desc: "Fast online signups for students with instant seat booking and automated email alerts",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v-2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="17" y1="11" x2="23" y2="11" />
        </svg>
      ),
    },
    {
      id: "tickets",
      title: "QR Code Tickets",
      desc: "Unique QR tickets issued instantly upon registration for swift and secure entry checks",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <rect x="7" y="7" width="3" height="3" />
          <rect x="14" y="7" width="3" height="3" />
          <rect x="7" y="14" width="3" height="3" />
          <path d="M14 14h3v3h-3z" />
        </svg>
      ),
    },
    {
      id: "admin",
      title: "Admin Panel",
      desc: "Unified control room to approve events check attendees list and manage user access roles",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 17v-5" />
          <path d="M12 17V9" />
          <path d="M15 17v-3" />
        </svg>
      ),
    },
    {
      id: "analytics",
      title: "Event Analytics",
      desc: "Track total ticket sales registration statistics and live attendee rates with clean charts",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ]

  return (
    <main className="container" style={{ flexGrow: 1 }}>
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="developer-badge">
          Created by <span>Macha Rishi</span> &amp; <span>Sai Vijay</span>
        </div>
        <h1>
          Shnoor Internatinal LLC
          <br />
          Event Management Sytem
        </h1>
        <p>
          Simple college event registration portal to join events and get your digital QR ticket fast
        </p>
        <div className="hero-btns">
          <a href="#preview" className="btn btn-primary">
            Explore Dashboard
          </a>
          <a href="#features" className="btn btn-outline">
            View Features
          </a>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Platform Features</h2>
          <p>Everything you need to host successful events on campus</p>
        </div>
        <div className="features-grid">
          {features.map((item) => (
            <div key={item.id} className="feature-card">
              <div className="feature-icon-wrapper">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="preview-section" id="preview">
        <div className="section-header">
          <h2>Interactive Live Preview</h2>
          <p>Experience the event system tools directly from your browser</p>
        </div>

        <div className="preview-box">
          <div className="preview-sidebar">
            <div
              className={`preview-menu-item ${
                activeTab === "admin" ? "active" : ""
              }`}
              onClick={() => setActiveTab("admin")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 17v-5" />
                <path d="M12 17V9" />
                <path d="M15 17v-3" />
              </svg>
              <span>Admin Panel</span>
            </div>

            <div
              className={`preview-menu-item ${
                activeTab === "ticket" ? "active" : ""
              }`}
              onClick={() => setActiveTab("ticket")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="7" y="14" width="3" height="3" />
                <path d="M14 14h3v3h-3z" />
              </svg>
              <span>Student QR Ticket</span>
            </div>

            <div
              className={`preview-menu-item ${
                activeTab === "analytics" ? "active" : ""
              }`}
              onClick={() => setActiveTab("analytics")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span>Event Analytics</span>
            </div>
          </div>

          <div className="preview-content">
            {activeTab === "admin" && (
              <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <h3 style={{ marginBottom: "12px", color: "var(--primary-hover)" }}>
                    Admin Dashboard Overview
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "8px" }}>
                    <div style={{ backgroundColor: "#181a24", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Registered Students</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", marginTop: "4px" }}>342</div>
                    </div>
                    <div style={{ backgroundColor: "#181a24", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Ticket Sales</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", marginTop: "4px" }}>342 / 500</div>
                    </div>
                    <div style={{ backgroundColor: "#181a24", padding: "12px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Active Events</div>
                      <div style={{ fontSize: "18px", fontWeight: "700", marginTop: "4px" }}>4</div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                  <h4 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "600" }}>Quick Create Event</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      maxWidth: "400px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          color: "var(--text-muted)",
                          marginBottom: "4px",
                        }}
                      >
                        Event Title
                      </label>
                      <input
                        type="text"
                        value="Annual Tech Symposium 2026"
                        disabled
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          backgroundColor: "#181a24",
                          border: "1px solid var(--border)",
                          borderRadius: "6px",
                          color: "#fff",
                        }}
                      />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                            marginBottom: "4px",
                          }}
                        >
                          Event Date
                        </label>
                        <input
                          type="text"
                          value="Oct 12 2026"
                          disabled
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            backgroundColor: "#181a24",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            color: "#fff",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                            marginBottom: "4px",
                          }}
                        >
                          Capacity
                        </label>
                        <input
                          type="text"
                          value="500 Seats"
                          disabled
                          style={{
                            width: "100%",
                            padding: "8px 12px",
                            backgroundColor: "#181a24",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            color: "#fff",
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ alignSelf: "flex-start", marginTop: "8px" }}
                    >
                      Publish Event
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ticket" && (
              <div style={{ display: "flex", alignItems: "center", gap: "32px", textAlign: "left" }}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "16px",
                    borderRadius: "12px",
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                  }}
                >
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=TXN-89027419"
                    alt="QR Code"
                    style={{ width: "110px", height: "110px" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      backgroundColor: "var(--secondary-glow)",
                      color: "var(--secondary)",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    CONFIRMED TICKET
                  </div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>
                    Rishi Macha
                  </h4>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "4px" }}>
                    Event: Annual Tech Symposium 2026
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    Ticket ID: TXN-89027419
                  </p>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div style={{ textAlign: "left", width: "100%" }}>
                <h3 style={{ marginBottom: "16px", color: "var(--secondary)" }}>
                  Registration Attendance Stats
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div
                      style={{
                        backgroundColor: "#181a24",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Total Tickets Sold
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "700" }}>342 / 500</div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#181a24",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Attendance Rate
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "700" }}>86.4%</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "140px" }}>
                    <div style={{ display: "flex", gap: "16px", height: "100px", alignItems: "flex-end" }}>
                      <div
                        style={{
                          height: "80px",
                          width: "32px",
                          backgroundColor: "var(--primary)",
                          borderRadius: "4px 4px 0 0",
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", top: "-20px", left: "4px", fontSize: "10px" }}>80</span>
                      </div>
                      <div
                        style={{
                          height: "95px",
                          width: "32px",
                          backgroundColor: "var(--secondary)",
                          borderRadius: "4px 4px 0 0",
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", top: "-20px", left: "4px", fontSize: "10px" }}>95</span>
                      </div>
                      <div
                        style={{
                          height: "60px",
                          width: "32px",
                          backgroundColor: "var(--primary)",
                          borderRadius: "4px 4px 0 0",
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", top: "-20px", left: "4px", fontSize: "10px" }}>60</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px", marginTop: "8px", fontSize: "10px", color: "var(--text-muted)" }}>
                      <span style={{ width: "32px", textAlign: "center" }}>CSE</span>
                      <span style={{ width: "32px", textAlign: "center" }}>ECE</span>
                      <span style={{ width: "32px", textAlign: "center" }}>MECH</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="about-section" id="about" style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
        <div className="section-header">
          <h2>About CampusEvents</h2>
          <p>A unified system built to handle all events in our college</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div style={{ fontSize: "36px", fontWeight: "800", color: "var(--primary-hover)", marginBottom: "12px" }}>342</div>
            <h3>Registered Students</h3>
            <p>active student profiles registered inside this platform</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: "36px", fontWeight: "800", color: "var(--secondary)", marginBottom: "12px" }}>342 / 500</div>
            <h3>Ticket Sales</h3>
            <p>total seats reserved for upcoming events this semester</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: "36px", fontWeight: "800", color: "var(--primary-hover)", marginBottom: "12px" }}>4</div>
            <h3>Active Events</h3>
            <p>running events organized by various departments</p>
          </div>
        </div>
      </section>
    </main>
  )
}
