import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"

export default function Dashboard({ theme, toggleTheme, setUser }) {
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
  const [profile, setProfile] = useState({
    name: "Macha Rishi",
    email: "rishi@college.edu",
    studentId: "22CSE1045",
  })

  // password state
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  })

  // list of events in app
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Smart India Hackathon Prep",
      category: "Technical",
      desc: "Get ready for national hackathon with expert mentor support and coding tips",
      date: "2026-07-15",
      time: "10:00 AM",
      venue: "Seminar Hall 2 Block A",
      organizer: "Coding Club",
      deadline: "2026-07-12",
      seats: 45,
      maxSeats: 50,
    },
    {
      id: 2,
      title: "Annual Cultural Fest Spandan",
      category: "Cultural",
      desc: "Join the biggest cultural show with dance music and drama performances",
      date: "2026-08-20",
      time: "05:00 PM",
      venue: "Main Open Auditorium",
      organizer: "Student Council",
      deadline: "2026-08-15",
      seats: 198,
      maxSeats: 200,
    },
    {
      id: 3,
      title: "Inter-College Cricket Cup",
      category: "Sports",
      desc: "Come and support our college cricket team in final match of tournament",
      date: "2026-07-18",
      time: "09:00 AM",
      venue: "College Sports Ground",
      organizer: "Sports Committee",
      deadline: "2026-07-16",
      seats: 120,
      maxSeats: 150,
    },
    {
      id: 4,
      title: "AI and Deep Learning Workshop",
      category: "Workshops",
      desc: "Learn neural networks and deep learning models with live lab practice",
      date: "2026-07-25",
      time: "11:00 AM",
      venue: "Lab 4 Block B",
      organizer: "CSE Department",
      deadline: "2026-07-22",
      seats: 29,
      maxSeats: 30,
    },
    {
      id: 5,
      title: "Public Speaking Boot Camp",
      category: "Workshops",
      desc: "Improve your presentation and speaking skills with simple steps",
      date: "2026-07-30",
      time: "02:00 PM",
      venue: "Lounge Area Block C",
      organizer: "Toastmasters Club",
      deadline: "2026-07-28",
      seats: 15,
      maxSeats: 20,
    },
    {
      id: 6,
      title: "Campus Photography Contest",
      category: "Cultural",
      desc: "Submit your best shots of campus life to win amazing rewards",
      date: "2026-08-05",
      time: "12:00 PM",
      venue: "Online Submission Portal",
      organizer: "Media Club",
      deadline: "2026-08-03",
      seats: 80,
      maxSeats: 100,
    },
  ])

  // user registered event ids state
  const [registeredIds, setRegisteredIds] = useState([1, 3])

  // state for notifications list
  const [notifications, setNotifications] = useState([
    {
      id: 101,
      type: "info",
      text: "welcome to your new student dashboard",
      time: "just now",
    },
    {
      id: 102,
      type: "success",
      text: "registered for smart india hackathon prep successfully",
      time: "1 hour ago",
    },
    {
      id: 103,
      type: "success",
      text: "registered for inter-college cricket cup successfully",
      time: "2 hours ago",
    },
  ])

  // handle event registration
  const handleRegister = (eventId) => {
    // check if already registered
    if (registeredIds.includes(eventId)) {
      return
    }

    // find event and check seats
    const targetEvent = events.find((e) => e.id === eventId)
    if (targetEvent && targetEvent.seats > 0) {
      // decrease seat count
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
    }
  }

  // handle event cancellation
  const handleCancelRegistration = (eventId) => {
    // check if registered
    if (!registeredIds.includes(eventId)) {
      return
    }

    const targetEvent = events.find((e) => e.id === eventId)
    if (targetEvent) {
      // increase seat count
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
    }
  }

  // update user details
  const handleSaveProfile = (e) => {
    e.preventDefault()
    // save profile values
    const newNotif = {
      id: Date.now(),
      type: "success",
      text: "profile details updated successfully",
      time: "just now",
    }
    setNotifications([newNotif, ...notifications])
    alert("Profile updated!")
  }

  // update user password
  const handleSavePassword = (e) => {
    e.preventDefault()
    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match")
      return
    }
    setPasswords({ current: "", newPass: "", confirm: "" })
    const newNotif = {
      id: Date.now(),
      type: "success",
      text: "password updated successfully",
      time: "just now",
    }
    setNotifications([newNotif, ...notifications])
    alert("Password updated!")
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
  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Technical":
        return "#3b82f6"
      case "Cultural":
        return "#a855f7"
      case "Sports":
        return "#ec4899"
      case "Workshops":
        return "#10b981"
      default:
        return "#6b7280"
    }
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
