import { useContext, useEffect } from 'react';
import {
  getCurrentUserToken,
  getUserFromToken,
  removeToken,
  setToken,
  tokenExpired
} from '../helpers/tokenHelpers';
import { LoginFormDataType, RegisterFormDataType } from '../types/formData';
import { AuthContext } from '../Contexts/AuthContext';
import authService from '../services/authService';

export default function useAuth() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const currentToken = getCurrentUserToken();

    if (currentToken) {
      if (tokenExpired(currentToken)) {
        removeToken();
      } else {
        const extractedUser = getUserFromToken(currentToken);
        authContext.setUser(extractedUser);
      }
    }
  }, [authContext.user.email, authContext.user.token, authContext.user.id]);

  async function login(loginData: LoginFormDataType) {
    const res = await authService.login(loginData);
    const token = res.data;

    setToken(token);
    const extractedUser = getUserFromToken(token);
    authContext.setUser(extractedUser);
  }

  async function register(registerData: RegisterFormDataType) {
    const res = await authService.register(registerData);
    const token = res.data;

    setToken(token);
    const extractedUser = getUserFromToken(token);
    authContext.setUser(extractedUser);
  }

  function logout() {
    removeToken();
    authContext.setUser({ email: null, id: null, token: null });
  }

  return { user: authContext.user, login, register, logout };
}
