import { Container, Link, SxProps, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const containerStyle: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};

function ErrorPage() {
  return (
    <Container sx={containerStyle}>
      <Typography>Route Doesn't exist</Typography>
      <Link component={RouterLink} to={'/'}>
        Go Back
      </Link>
    </Container>
  );
}

export default ErrorPage;
