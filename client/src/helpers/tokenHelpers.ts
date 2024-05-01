import { jwtDecode } from 'jwt-decode';
import { JwtDecodeInterface } from '../types/JwtDecodeInterface';
import { User } from '../types/User';

enum TokenEnum {
  token = 'token'
}

export function getCurrentUserToken() {
  return localStorage.getItem(TokenEnum.token);
}

export function setToken(token: string) {
  return localStorage.setItem(TokenEnum.token, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenEnum.token);
}

export function tokenExpired(token: string) {
  const decodedToken = jwtDecode<JwtDecodeInterface>(token);
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedToken.exp < currentTime) {
    return true;
  }

  return false;
}

export function getUserFromToken(token: string): User {
  const res = jwtDecode<JwtDecodeInterface>(token);

  const userCredentials: User = {
    email: res.email,
    id: res.id,
    token: token
  };

  return userCredentials;
}
