import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box
} from "@mui/material";

import { useUsers } from "../hooks/useUsers";

function UsuarioDetalle() {
  const { id } = useParams();
  const { getUserById } = useUsers();

  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("UsuarioDetalle se montó con id:", id);

    const loadUser = async () => {
      const data = await getUserById(id);
      setUser(data);
    };

    loadUser();

    return () => {
      console.log("UsuarioDetalle se desmontó");
    };
  }, [id]);

  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Cargando detalle del usuario...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Detalle del usuario
        </Typography>

        <Typography>
          <strong>ID:</strong> {user._id}
        </Typography>

        <Typography>
          <strong>Nombre:</strong> {user.name}
        </Typography>

        <Typography>
          <strong>Username:</strong> {user.username}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button component={Link} to="/usuarios" variant="contained">
            Volver a usuarios
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UsuarioDetalle;