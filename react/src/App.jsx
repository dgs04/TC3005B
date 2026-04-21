import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Usuarios from "./views/Usuarios";
import Login from "./views/Login";
import Home from "./views/Home";
import Perfil from "./views/Perfil";
import Navbar from "./components/Nav";

const API_URL = "http://localhost:5001";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (credentials) => {

    try {

      const res = await fetch(API_URL + "/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(credentials)

      });

      const data = await res.json();

      if (data.isLogin) {

        setIsAuthenticated(true);
        setUser(data.user);

        return { success: true };

      } else {

        return { success: false, msg: data.msg };

      }

    } catch (error) {

      console.log(error);

      return { success: false, msg: "error conectando con la API" };

    }

  };

  const logout = () => {

    setIsAuthenticated(false);
    setUser(null);

  };

  return (

    <BrowserRouter>

      {

        isAuthenticated && <Navbar onLogout={logout} />

      }

      <Routes>

        <Route

          path="/"

          element={

            isAuthenticated

              ? <Navigate to="/home" />

              : <Login onLogin={login} />

          }

        />

        <Route

          path="/home"

          element={

            isAuthenticated

              ? <Home user={user} />

              : <Navigate to="/" />

          }

        />

        <Route

          path="/perfil"

          element={

            isAuthenticated

              ? <Perfil user={user} />

              : <Navigate to="/" />

          }

        />
        <Route

          path="/usuarios"

          element={

            isAuthenticated

              ? <Usuarios />

              : <Navigate to="/" />

          }

/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;