import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"

export default function Dashboard({ theme, toggleTheme, user, setUser }) {
  const navigate = useNavigate()

  // state for current active tab
  const [activeTab, setActiveTab] = useState("home")

  // state for search and category filters
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // state for selected event in detail modal
  const [selectedEvent, setSelectedEvent] = useState(null)

  // state for qr ticket modal
  const [selectedTicket, setSelectedTicket] = useState(null)

  // mobile sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // user profile state
  const [profile, setProfile] = useState(() => {
    const savedUser = localStorage.getItem("user")
    try {
      return savedUser ? JSON.parse(savedUser) : { name: "Student", email: "", studentId: "" }
    } catch (e) {
      return { name: "Student", email: "", studentId: "" }
    }
  })

  // password state
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  })

  // list of events in app
  const [events, setEvents] = useState([])

  // user registered event ids state
  const [registeredIds, setRegisteredIds] = useState([])

  // loading state
  const [loading, setLoading] = useState(true)

  // state for notifications list
  const [notifications, setNotifications] = useState([
    {
      id: 101,
      type: "info",
      text: "welcome to your new student dashboard",
      time: "just now",
    }
  ])

  // Fetch initial data from backend
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/signin")
      return
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // 1. Fetch user profile populated with registeredEvents
        const profileRes = await fetch("http://localhost:5000/api/users/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const profileData = await profileRes.json()

        if (profileData.success) {
          const userObj = profileData.user;
          setProfile({
            name: userObj.name,
            email: userObj.email,
            studentId: userObj.studentId
          })
          
          // Map mongoose ObjectIds to local state registeredIds
          const regIds = userObj.registeredEvents.map(e => e._id || e)
          setRegisteredIds(regIds)

          // Seed user registered notifications
          const formattedNotifs = [
            {
              id: 101,
              type: "info",
              text: "Welcome to your student event dashboard!",
              time: "just now",
            }
          ]
          userObj.registeredEvents.forEach((evt, idx) => {
            formattedNotifs.unshift({
              id: Date.now() + idx,
              type: "success",
              text: `Registered for ${evt.title} successfully`,
              time: "active schedule",
            })
          })
          setNotifications(formattedNotifs)
        } else {
          // session expired
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          if (setUser) setUser(null)
          navigate("/signin")
          return
        }

        // 2. Fetch all events
        const eventsRes = await fetch("http://localhost:5000/api/events")
        const eventsData = await eventsRes.json()

        if (eventsData.success) {
          // Map _id to id to preserve frontend structure compatibility
          const formattedEvents = eventsData.events.map(e => ({
            ...e,
            id: e._id
          }))
          setEvents(formattedEvents)
        }

      } catch (err) {
        console.error("Error loading dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [navigate, setUser])

  // handle event registration
  const handleRegister = async (eventId) => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in to register for events")
      navigate("/signin")
      return
    }

    // check if already registered
    if (registeredIds.includes(eventId)) {
      return
    }

    const targetEvent = events.find((e) => e.id === eventId)
    if (!targetEvent) return

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()

      if (data.success) {
        // decrease seat count in UI
        setEvents(
          events.map((e) => (e.id === eventId ? { ...e, seats: e.seats - 1 } : e))
        )
        // add to registered ids
        setRegisteredIds([...registeredIds, eventId])
        // add success notification
        const newNotif = {
          id: Date.now(),
          type: "success",
          text: `registered for ${targetEvent.title.toLowerCase()} successfully`,
          time: "just now",
        }
        setNotifications([newNotif, ...notifications])
        alert("Registration successful!")
      } else {
        alert(data.message || "Registration failed")
      }
    } catch (err) {
      console.error("Registration error:", err)
      alert("Unable to connect to the server. Event registration failed.")
    }
  }

  // handle event cancellation
  const handleCancelRegistration = async (eventId) => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please log in first")
      navigate("/signin")
      return
    }

    // check if registered
    if (!registeredIds.includes(eventId)) {
      return
    }

    const targetEvent = events.find((e) => e.id === eventId)
    if (!targetEvent) return

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/cancel`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()

      if (data.success) {
        // increase seat count in UI
        setEvents(
          events.map((e) => (e.id === eventId ? { ...e, seats: e.seats + 1 } : e))
        )
        // remove from registered ids
        setRegisteredIds(registeredIds.filter((id) => id !== eventId))
        // add cancel notification
        const newNotif = {
          id: Date.now(),
          type: "warning",
          text: `cancelled registration for ${targetEvent.title.toLowerCase()}`,
          time: "just now",
        }
        setNotifications([newNotif, ...notifications])
        alert("Registration cancelled successfully")
      } else {
        alert(data.message || "Cancellation failed")
      }
    } catch (err) {
      console.error("Cancellation error:", err)
      alert("Unable to connect to the server. Cancellation failed.")
    }
  }

  // update user details
  const handleSaveProfile = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Session expired. Please log in again.")
      navigate("/signin")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email
        })
      })
      const data = await response.json()

      if (data.success) {
        // update local storage user details
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}")
        savedUser.name = data.user.name
        savedUser.email = data.user.email
        localStorage.setItem("user", JSON.stringify(savedUser))
        
        // update local state user if needed
        if (setUser) setUser(savedUser)

        const newNotif = {
          id: Date.now(),
          type: "success",
          text: "profile details updated successfully",
          time: "just now",
        }
        setNotifications([newNotif, ...notifications])
        alert("Profile updated successfully!")
      } else {
        alert(data.message || "Failed to update profile")
      }
    } catch (err) {
      console.error("Profile update error:", err)
      alert("Unable to connect to the server. Profile update failed.")
    }
  }

  // update user password
  const handleSavePassword = async (e) => {
    e.preventDefault()
    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match")
      return
    }

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Session expired. Please log in again.")
      navigate("/signin")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.newPass
        })
      })
      const data = await response.json()

      if (data.success) {
        setPasswords({ current: "", newPass: "", confirm: "" })
        const newNotif = {
          id: Date.now(),
          type: "success",
          text: "password updated successfully",
          time: "just now",
        }
        setNotifications([newNotif, ...notifications])
        alert("Password updated successfully!")
      } else {
        alert(data.message || "Failed to update password")
      }
    } catch (err) {
      console.error("Password update error:", err)
      alert("Unable to connect to the server. Password update failed.")
    }
  }

  // clear notification list
  const handleClearNotifications = () => {
    setNotifications([])
  }

  // logout session
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      if (setUser) {
        setUser(null)
      }
      navigate("/")
    }
  }

  // filter events logic
  const filteredEvents = events.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // count upcoming registered events
  const registeredEvents = events.filter((e) => registeredIds.includes(e.id))

  // get category styling colors
  const getCategoryColor = () => {
    return "#3b82f6"
  }

  // trigger ticket text download
  const handleDownloadTicket = (ticket) => {
    const ticketData = `--- EVENT TICKET ---
Student Name: ${profile.name}
Student ID: ${profile.studentId}
Event Name: ${ticket.title}
Date: ${ticket.date}
Time: ${ticket.time}
Venue: ${ticket.venue}
Ticket ID: T-${ticket.id}-${profile.studentId}
--------------------`
    const blob = new Blob([ticketData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `Ticket_${ticket.title.replace(/\s+/g, "_")}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0f172a",
        color: "#f8fafc",
        fontSize: "20px",
        fontWeight: "600",
        fontFamily: "inherit"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #3b82f6",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px auto"
          }}></div>
          Loading your Dashboard...
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  return (
    <div className="db-layout">
      {/* sidebar constant component */}
      <aside className={`db-sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="db-logo">
          <div className="db-logo-badge">CE</div>
          <div className="db-logo-text">
            <span className="db-logo-title">CampusEvents</span>
            <span className="db-logo-subtitle">Student Dashboard</span>
          </div>
        </div>
        <div className="db-menu-section">
          <span className="db-menu-label">MENU</span>
          <nav className="db-nav">
            <button
              className={`db-nav-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("home")
                setSidebarOpen(false)
              }}
            >
              <span className="db-icon-badge">HM</span> Home
            </button>
            <button
              className={`db-nav-item ${activeTab === "browse" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("browse")
                setSidebarOpen(false)
              }}
            >
              <span className="db-icon-badge">BE</span> Browse Events
            </button>
            <button
              className={`db-nav-item ${activeTab === "my-events" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("my-events")
                setSidebarOpen(false)
              }}
            >
              <span className="db-icon-badge">MT</span> My tickets
            </button>
            <button
              className={`db-nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("profile")
                setSidebarOpen(false)
              }}
            >
              <span className="db-icon-badge">PR</span> Profile
            </button>
            <button
              className={`db-nav-item ${activeTab === "notifications" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("notifications")
                setSidebarOpen(false)
              }}
            >
              <span className="db-icon-badge">NT</span> Notifications
            </button>
          </nav>
        </div>
        <div className="db-sidebar-footer">
          <div className="db-user-profile">
            <div className="db-user-avatar">
              {profile.name ? profile.name.charAt(0).toUpperCase() : "M"}
            </div>
            <div className="db-user-info">
              <div className="db-user-name">{profile.name}</div>
              <div className="db-user-email">{profile.email}</div>
            </div>
          </div>
          <button className="db-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* main content area */}
      <div className="db-main">
        {/* mobile top header */}
        <header className="db-mobile-header">
          <button className="db-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <div className="db-logo">
            <div className="db-logo-badge">CE</div>
            <span className="db-logo-title">CampusEvents</span>
          </div>
          <button className="db-mobile-theme" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </header>

        {/* desktop main header */}
        <header className="db-main-header">
          <div className="db-header-left">
            <span className="db-header-category">STUDENT DASHBOARD</span>
            <h2 className="db-header-title">
              {activeTab === "home" && "Overview"}
              {activeTab === "browse" && "Browse Events"}
              {activeTab === "my-events" && "My tickets"}
              {activeTab === "profile" && "Profile"}
              {activeTab === "notifications" && "Notifications"}
            </h2>
          </div>
          <div className="db-header-right">
            <span className="db-role-badge">Student</span>
            <button className="db-header-theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        {/* tab contents wrapper */}
        <div className="db-content">
          {activeTab === "home" && (
            <div className="db-tab-view animate-fade">
              {/* welcome and info header */}
              <div className="db-welcome">
                <h1>Hello, {profile.name.split(" ")[0]}</h1>
                <p>keep track of your registered campus events and schedules here</p>
              </div>

              {/* quick dashboard metrics */}
              <div className="db-metrics">
                <div className="db-card">
                  <div className="metric-label">My registered events</div>
                  <div className="metric-val">{registeredIds.length}</div>
                  <div className="metric-desc">Events you are signed up for</div>
                </div>
                <div className="db-card">
                  <div className="metric-label">Total Events</div>
                  <div className="metric-val">{events.length}</div>
                  <div className="metric-desc">Total active campus events</div>
                </div>
                <div className="db-card">
                  <div className="metric-label">Unread Notices</div>
                  <div className="metric-val">{notifications.length}</div>
                  <div className="metric-desc">Latest updates in your inbox</div>
                </div>
              </div>

              {/* split view home panel */}
              <div className="db-home-grid">
                {/* upcoming registrations column */}
                <div className="db-card home-events">
                  <h2>upcoming schedules</h2>
                  {registeredEvents.length === 0 ? (
                    <div className="db-empty">
                      <p>you have not registered for any events yet</p>
                      <button className="btn btn-primary btn-sm" onClick={() => setActiveTab("browse")}>
                        browse events
                      </button>
                    </div>
                  ) : (
                    <div className="upcoming-list">
                      {registeredEvents.slice(0, 3).map((item) => (
                        <div key={item.id} className="upcoming-item">
                          <div
                            className="upcoming-indicator"
                            style={{ backgroundColor: getCategoryColor(item.category) }}
                          ></div>
                          <div className="upcoming-info">
                            <h3>{item.title}</h3>
                            <p>{item.date} at {item.time} | {item.venue}</p>
                          </div>
                          <button
                            className="btn-text"
                            onClick={() => {
                              setSelectedEvent(item)
                            }}
                          >
                            details
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* short notifications side list */}
                <div className="db-card home-notif">
                  <div className="card-header-row">
                    <h2>recent updates</h2>
                    {notifications.length > 0 && (
                      <button className="btn-text-sm" onClick={() => setActiveTab("notifications")}>
                        view all
                      </button>
                    )}
                  </div>
                  {notifications.length === 0 ? (
                    <div className="db-empty">
                      <p>no notifications available</p>
                    </div>
                  ) : (
                    <div className="notif-mini-list">
                      {notifications.slice(0, 3).map((notif) => (
                        <div key={notif.id} className={`notif-mini-item ${notif.type}`}>
                          <p>{notif.text}</p>
                          <span>{notif.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "browse" && (
            <div className="db-tab-view animate-fade">
              <div className="db-welcome">
                <h1>browse campus events</h1>
                <p>find and register for tech talks cultural fests workshops and sports</p>
              </div>

              {/* filter bar searching */}
              <div className="db-search-bar">
                <input
                  type="text"
                  placeholder="search by title or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <div className="category-filters">
                  {["All", "Technical", "Cultural", "Sports", "Workshops"].map((cat) => (
                    <button
                      key={cat}
                      className={`filter-tab ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* events search results grid */}
              {filteredEvents.length === 0 ? (
                <div className="db-card db-empty-box">
                  <p>no events found matching your current filter criteria</p>
                </div>
              ) : (
                <div className="events-grid">
                  {filteredEvents.map((item) => {
                    const isRegistered = registeredIds.includes(item.id)
                    return (
                      <div
                        key={item.id}
                        className="event-card"
                        style={{ borderTop: `3px solid ${getCategoryColor(item.category)}` }}
                      >
                        <div className="event-card-header">
                          <span
                            className="event-category-badge"
                            style={{
                              backgroundColor: `${getCategoryColor(item.category)}20`,
                              color: getCategoryColor(item.category),
                            }}
                          >
                            {item.category}
                          </span>
                          <span className="event-seats">
                            {item.seats} seats left
                          </span>
                        </div>
                        <h3>{item.title}</h3>
                        <p className="event-desc">{item.desc}</p>
                        <div className="event-card-meta">
                          <span>{item.date}</span>
                          <span>{item.venue}</span>
                        </div>
                        <div className="event-card-actions">
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => setSelectedEvent(item)}
                          >
                            view details
                          </button>
                          {isRegistered ? (
                            <button
                              className="btn btn-registered btn-sm"
                              onClick={() => handleCancelRegistration(item.id)}
                            >
                              registered
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary btn-sm"
                              disabled={item.seats <= 0}
                              onClick={() => handleRegister(item.id)}
                            >
                              {item.seats <= 0 ? "filled" : "register"}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "my-events" && (
            <div className="db-tab-view animate-fade">
              <div className="db-welcome">
                <h1>My registered events</h1>
                <p>track your registrations and download tickets for event entries</p>
              </div>

              {/* student events list */}
              {registeredEvents.length === 0 ? (
                <div className="db-card db-empty-box">
                  <p>you have not registered for any events yet</p>
                  <button className="btn btn-primary" onClick={() => setActiveTab("browse")}>
                    browse events now
                  </button>
                </div>
              ) : (
                <div className="my-events-grid">
                  {registeredEvents.map((item) => (
                    <div key={item.id} className="my-event-card">
                      <div className="my-event-header">
                        <h3>{item.title}</h3>
                        <span
                          className="event-category-badge"
                          style={{
                            backgroundColor: `${getCategoryColor(item.category)}20`,
                            color: getCategoryColor(item.category),
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div className="my-event-details">
                        <p><strong>date and time:</strong> {item.date} at {item.time}</p>
                        <p><strong>venue details:</strong> {item.venue}</p>
                        <p><strong>club organizer:</strong> {item.organizer}</p>
                        <p><strong>ticket id:</strong> T-{item.id}-{profile.studentId}</p>
                      </div>
                      <div className="my-event-actions">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setSelectedTicket(item)}
                        >
                          view qr ticket
                        </button>
                        <button
                          className="btn btn-outline btn-sm text-danger"
                          onClick={() => handleCancelRegistration(item.id)}
                        >
                          cancel seat
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="db-tab-view animate-fade">
              <div className="db-welcome">
                <h1>manage user profile</h1>
                <p>view or modify your student details and security credentials</p>
              </div>

              <div className="profile-container">
                {/* profile edit card */}
                <div className="db-card profile-form-card">
                  <h2>student credentials</h2>
                  <form onSubmit={handleSaveProfile} className="db-form">
                    <div className="form-group">
                      <label>full name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        required
                        className="db-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>campus email address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        required
                        className="db-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>student registration roll number</label>
                      <input
                        type="text"
                        value={profile.studentId}
                        disabled
                        className="db-input disabled-input"
                        title="roll number cannot be modified"
                      />
                      <span className="input-tip">roll number cannot be modified</span>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      save profile changes
                    </button>
                  </form>
                </div>

                {/* change password card */}
                <div className="db-card profile-form-card">
                  <h2>update password</h2>
                  <form onSubmit={handleSavePassword} className="db-form">
                    <div className="form-group">
                      <label>current password</label>
                      <input
                        type="password"
                        placeholder="current password"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        required
                        className="db-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>new password</label>
                      <input
                        type="password"
                        placeholder="new password"
                        value={passwords.newPass}
                        onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                        required
                        className="db-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>confirm new password</label>
                      <input
                        type="password"
                        placeholder="confirm new password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                        required
                        className="db-input"
                      />
                    </div>
                    <button type="submit" className="btn btn-outline">
                      change password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="db-tab-view animate-fade">
              <div className="card-header-row db-welcome">
                <div>
                  <h1>system notifications</h1>
                  <p>check important registration alerts and reminders</p>
                </div>
                {notifications.length > 0 && (
                  <button className="btn btn-outline btn-sm" onClick={handleClearNotifications}>
                    clear all alerts
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="db-card db-empty-box">
                  <p>your notification inbox is empty</p>
                </div>
              ) : (
                <div className="notifications-list">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`notification-item ${notif.type}`}>
                      <div className="notif-body">
                        <p>{notif.text}</p>
                        <span className="notif-time">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <footer className="db-main-footer">
          <p>© 2026 CampusEvents — Built for learning and event management</p>
          <div className="db-footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Support</a>
          </div>
        </footer>
      </div>

      {/* detailed event popup overlay */}
      {selectedEvent && (
        <div className="db-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="db-modal-card animate-scale" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header">
              <h2>{selectedEvent.title}</h2>
              <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>
                ×
              </button>
            </div>
            <div className="db-modal-body">
              <span
                className="event-category-badge modal-badge"
                style={{
                  backgroundColor: `${getCategoryColor(selectedEvent.category)}20`,
                  color: getCategoryColor(selectedEvent.category),
                }}
              >
                {selectedEvent.category}
              </span>
              <p className="modal-desc">{selectedEvent.desc}</p>
              
              <div className="modal-specs-grid">
                <div className="spec-item">
                  <strong>date &amp; time:</strong>
                  <span>{selectedEvent.date} at {selectedEvent.time}</span>
                </div>
                <div className="spec-item">
                  <strong>venue space:</strong>
                  <span>{selectedEvent.venue}</span>
                </div>
                <div className="spec-item">
                  <strong>club organizer:</strong>
                  <span>{selectedEvent.organizer}</span>
                </div>
                <div className="spec-item">
                  <strong>deadline date:</strong>
                  <span>{selectedEvent.deadline}</span>
                </div>
                <div className="spec-item">
                  <strong>seats left:</strong>
                  <span>{selectedEvent.seats} of {selectedEvent.maxSeats} slots</span>
                </div>
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="btn btn-outline" onClick={() => setSelectedEvent(null)}>
                close window
              </button>
              {registeredIds.includes(selectedEvent.id) ? (
                <button
                  className="btn btn-registered"
                  onClick={() => {
                    handleCancelRegistration(selectedEvent.id)
                    setSelectedEvent(null)
                  }}
                >
                  cancel registration
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={selectedEvent.seats <= 0}
                  onClick={() => {
                    handleRegister(selectedEvent.id)
                    setSelectedEvent(null)
                  }}
                >
                  {selectedEvent.seats <= 0 ? "event is filled" : "register seat"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* qr code ticket popup overlay */}
      {selectedTicket && (
        <div className="db-modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="db-modal-card qr-modal-card animate-scale" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header">
              <h2>your entry ticket</h2>
              <button className="modal-close-btn" onClick={() => setSelectedTicket(null)}>
                ×
              </button>
            </div>
            <div className="db-modal-body text-center">
              <div className="qr-wrapper">
                {/* load qr code image from free public google charts / qr server api */}
                <img
                  className="qr-image"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=Student:${profile.studentId}|Event:${selectedTicket.id}`}
                  alt="entry qr code ticket"
                />
              </div>
              <div className="ticket-meta-info">
                <h3>{selectedTicket.title}</h3>
                <p className="ticket-student-info">
                  <strong>student:</strong> {profile.name} ({profile.studentId})
                </p>
                <div className="ticket-time-venue">
                  <p>{selectedTicket.venue}</p>
                  <p>{selectedTicket.date} at {selectedTicket.time}</p>
                </div>
                <span className="scan-note">please show this qr code at entry gates for scanner check</span>
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="btn btn-outline" onClick={() => setSelectedTicket(null)}>
                close
              </button>
              <button className="btn btn-primary" onClick={() => handleDownloadTicket(selectedTicket)}>
                download ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
