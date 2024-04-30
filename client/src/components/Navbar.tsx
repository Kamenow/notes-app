import { Box, Button, Typography } from '@mui/material';

function Navbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem'
      }}
    >
      <Typography>Username</Typography>
      <Box>
        <Typography>DevTeam </Typography>
        <Typography>Notes</Typography>
      </Box>
      <Button>Logout</Button>
    </Box>
  );
}

export default Navbar;
