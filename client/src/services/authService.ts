import axios from 'axios';
import { LoginFormDataType, RegisterFormDataType } from '../types/formData';
import { URL } from './apiUrl';

class AuthService {
  login(loginData: LoginFormDataType) {
    return axios.post(`${URL}/auth/login`, loginData);
  }

  register(registerData: RegisterFormDataType) {
    return axios.post(`${URL}/auth/register`, registerData);
  }
}

const authService = new AuthService();
export default authService;
