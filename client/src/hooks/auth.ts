import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import axios from 'axios';
import {
  getCurrentUserToken,
  getUserFromToken,
  removeToken,
  setToken,
  tokenExpired
} from '../helpers/tokenHelpers';
import { LoginFormDataType, RegisterFormDataType } from '../types/formData';
import { URL } from '../services/apiUrl';

export default function useAuth() {
  const contextUser = useContext(AuthContext);
  const [user, setUser] = useState(contextUser);

  useEffect(() => {
    const currentToken = getCurrentUserToken();

    if (currentToken) {
      if (tokenExpired(currentToken)) {
        removeToken();
      } else {
        const extractedUser = getUserFromToken(currentToken);
        setUser(extractedUser);

        contextUser.token = extractedUser.token;
        contextUser.email = extractedUser.email;
      }
    }
  }, [contextUser.email, contextUser.token, user.email, user.token]);

  async function login(loginData: LoginFormDataType) {
    const res = await axios.post(`${URL}/auth/login`, loginData);
    const token = res.data;

    setToken(token);
    const extractedUser = getUserFromToken(token);
    setUser(extractedUser);

    contextUser.token = extractedUser.token;
    contextUser.email = extractedUser.email;
    contextUser.id = extractedUser.id;
  }

  async function register(registerData: RegisterFormDataType) {
    const res = await axios.post(`${URL}/auth/register`, registerData);
    const token = res.data;

    setToken(token);
    const extractedUser = getUserFromToken(token);
    setUser(extractedUser);

    contextUser.token = extractedUser.token;
    contextUser.email = extractedUser.email;
    contextUser.id = extractedUser.id;
  }

  function logout() {
    removeToken();

    contextUser.token = null;
    contextUser.email = null;
    contextUser.id = null;
    setUser({ email: null, id: null, token: null });
  }

  return { user, login, register, logout };
}
