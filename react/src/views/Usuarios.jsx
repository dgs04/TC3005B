import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;
function Usuarios() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: ""
  });

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUsers = async () => {
    const token = getToken();

    const res = await fetch(API_URL + "/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      alert(data.msg || "No se pudieron cargar los usuarios");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addUser = async (e) => {
    e.preventDefault();

    const token = getToken();

    await fetch(API_URL + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    setForm({
      name: "",
      username: "",
      password: ""
    });

    getUsers();
  };

  const deleteUser = async (id) => {
    const token = getToken();

    await fetch(API_URL + "/users/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    getUsers();
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Usuarios
        </Typography>

        <Box component="form" onSubmit={addUser} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">
            Agregar usuario
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Lista de usuarios
        </Typography>

        <List>
          {users.map((user) => (
            <ListItem
              key={user._id}
              secondaryAction={
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => deleteUser(user._id)}
                >
                  Eliminar
                </Button>
              }
            >
              <ListItemText primary={`${user.name} (${user.username})`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default Usuarios;