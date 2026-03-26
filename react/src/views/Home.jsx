import { Container, Paper, Typography } from '@mui/material'

function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Home
        </Typography>
        <Typography>
          Esta es la vista principal después de iniciar sesión.
        </Typography>
      </Paper>
    </Container>
  )
}

export default Home