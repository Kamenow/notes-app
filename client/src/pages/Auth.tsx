import { Container } from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';
import { useState } from 'react';
import RegisterForm from '../components/Auth/RegisterForm';

function Auth() {
  const [loginFormLoaded, setLoginFormLoaded] = useState(true);

  function switchForm() {
    setLoginFormLoaded(!loginFormLoaded);
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      {loginFormLoaded ? (
        <LoginForm switchForm={switchForm} />
      ) : (
        <RegisterForm switchForm={switchForm} />
      )}
    </Container>
  );
}

export default Auth;
