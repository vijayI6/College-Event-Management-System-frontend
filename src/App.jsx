import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Header/Header"
import Landing from "./pages/Home"
import SignIn from "./pages/Login"
import Register from "./pages/Register"
import Footer from "./components/Footer/Footer"

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

export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  )
}

