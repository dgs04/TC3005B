import { useState } from "react";
import { Link } from "react-router-dom";
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

import { useUsers } from "../hooks/useUsers";
import LifecycleLogger from "../components/LifecycleLogger";

function Usuarios() {
  const { users, loading, addUser, deleteUser } = useUsers();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addUser(form);

    setForm({
      name: "",
      username: "",
      password: ""
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Usuarios
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
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
        <Typography variant="h5" gutterBottom align="center">
          Lista de usuarios
        </Typography>

        {loading ? (
          <Typography>Cargando usuarios...</Typography>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem
                key={user._id}
                secondaryAction={
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      component={Link}
                      to={`/usuarios/${user._id}`}
                      variant="outlined"
                    >
                      Ver detalle
                    </Button>

                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => deleteUser(user._id)}
                    >
                      Eliminar
                    </Button>
                  </Box>
                }
              >
                <ListItemText primary={`${user.name} (${user.username})`} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <LifecycleLogger />
    </Container>
  );
}

export default Usuarios;