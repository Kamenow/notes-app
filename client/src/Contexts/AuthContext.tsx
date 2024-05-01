import { ReactNode, createContext } from 'react';
import { User } from '../types/User';

type AuthContextType = User;
export const AuthContext = createContext<AuthContextType>({
  email: null,
  token: null,
  id: null
});
type AuthContextProviderProps = { children: ReactNode };

function AuthContextProvider(props: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{ email: null, token: null, id: null }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
