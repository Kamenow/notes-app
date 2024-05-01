import AppRouter from './AppRouter';
import useAuth from './hooks/auth';

function App() {
  useAuth();

  return <AppRouter />;
}

export default App;
