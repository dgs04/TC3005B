import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Login from './views/Login'
import Home from './views/Home'
import Perfil from './views/Perfil'
import Navbar from './components/Nav'

function App() {
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