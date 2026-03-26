import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Navbar({ onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Mi App React</Typography>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/perfil">
            Perfil
          </Button>
          <Button color="inherit" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar