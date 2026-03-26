import { Container, Paper, Typography } from '@mui/material'

function Perfil() {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Perfil
        </Typography>
        <Typography>
          Esta es una segunda vista de ejemplo.
        </Typography>
      </Paper>
    </Container>
  )
}

export default Perfil