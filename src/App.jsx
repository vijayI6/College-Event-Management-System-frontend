import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Header/Header"
import Landing from "./pages/Home"
import SignIn from "./pages/Login"
import Register from "./pages/Register"
import Footer from "./components/Footer/Footer"
import Dashboard from "./pages/Dashboard"

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const timeoutId = setTimeout(() => {
        const id = hash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
      return () => clearTimeout(timeoutId)
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [hash, pathname])

  return null
}

// subcomponent to handle conditional rendering
function AppContent({ theme, toggleTheme, user, setUser }) {
  const location = useLocation()
  
  // check if current path is dashboard
  const isDashboard = location.pathname.startsWith("/dashboard")

  return (
    <>
      <ScrollToHash />
      {!isDashboard && <Navbar theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    try {
      return savedUser ? JSON.parse(savedUser) : null
    } catch (e) {
      console.error("Error parsing saved user from localStorage:", e)
      return null
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  // toggle app color theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <Router>
      <AppContent theme={theme} toggleTheme={toggleTheme} user={user} setUser={setUser} />
    </Router>
  )
}


