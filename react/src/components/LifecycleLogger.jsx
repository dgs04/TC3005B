import { useEffect, useState } from "react";
import { Paper, Typography, Button } from "@mui/material";

function LifecycleLogger() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log("LifecycleLogger se montó");

    return () => {
      console.log("LifecycleLogger se desmontó");
    };
  }, []);

  useEffect(() => {
    console.log("LifecycleLogger se actualizó. Contador:", contador);
  }, [contador]);

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6">
        Componente con ciclo de vida
      </Typography>

      <Typography sx={{ mt: 1 }}>
        Contador: {contador}
      </Typography>

      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => setContador(contador + 1)}
      >
        Actualizar componente
      </Button>
    </Paper>
  );
}

export default LifecycleLogger;