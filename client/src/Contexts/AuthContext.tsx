import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from 'react';
import { User } from '../types/User';

type AuthContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>> | Function;
};
export const AuthContext = createContext<AuthContextType>({
  user: {
    email: null,
    id: null,
    token: null
  },
  setUser: Function
});
type AuthContextProviderProps = { children: ReactNode };

function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({
    email: null,
    token: null,
    id: null
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
