import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Login from './views/Login'
import Home from './views/Home'
import Perfil from './views/Perfil'
import Navbar from './components/Nav'
const API_URL = 'http://localhost:5001'
function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState({})
  const login = async (user) => {
    const res = await fetch(API_URL + '/login', {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
    })
    const data = await res.json()
    setIsLogin(data.isLogin)
  }
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (username, password) => {
    if (username.trim() !== '' && password.trim() !== '') {
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/" />
          }
        />

        <Route
          path="/perfil"
          element={
            isAuthenticated ? <Perfil /> : <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App