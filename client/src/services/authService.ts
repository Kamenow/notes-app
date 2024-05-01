import { LoginFormDataType, RegisterFormDataType } from '../types/formData';
import { HttpMethods, URL } from './apiUrl';
import { apiCall } from '../helpers/apiCall';

class AuthService {
  login(loginData: LoginFormDataType) {
    return apiCall({
      url: `${URL}/auth/login`,
      data: loginData,
      method: HttpMethods.post
    });
  }

  register(registerData: RegisterFormDataType) {
    return apiCall({
      url: `${URL}/auth/register`,
      data: registerData,
      method: HttpMethods.post
    });
  }
}

const authService = new AuthService();
export default authService;
