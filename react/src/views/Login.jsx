import {Button, TextField} from "@mui/material";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onsubmit = async (e) => {        
      e.preventDefault();
      if (!username || !password) {
        alert("Username and password are required");
        return;
      }
      const res = login({username:username, password:password});
      if (res.isLogin === true) {
        setUsername("");
        setPassword("");
        navigate("/perfil");
      }
    };

    return (
      <>
      <form onSubmit={onsubmit}>
        <TextField value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      </>
    );
}