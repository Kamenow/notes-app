import { Box, Button, Typography } from '@mui/material';
import useAuth from '../hooks/auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useAuth();
  const navigation = useNavigate();

  const handleClick = () => {
    logout();
    navigation('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
        justifyContent: user.token ? 'space-between' : 'center'
      }}
    >
      {user.email != null && <Typography>{user.email}</Typography>}
      <Box>
        <Typography>DevTeam </Typography>
        <Typography>Notes</Typography>
      </Box>
      {user.token != null && <Button onClick={handleClick}>Logout</Button>}
    </Box>
  );
}

export default Navbar;
