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

const API_URL = "http://localhost:5001";

function Usuarios() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: ""
  });

  const getUsers = async () => {

    const res = await fetch(API_URL + "/users");

    const data = await res.json();

    setUsers(data);

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

    await fetch(API_URL + "/users", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
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

    await fetch(API_URL + "/users/" + id, {

      method: "DELETE"

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

          {

            users.map(user => (

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

                <ListItemText
                  primary={`${user.name} (${user.username})`}
                />

              </ListItem>

            ))

          }

        </List>

      </Paper>

    </Container>

  );

}

export default Usuarios;