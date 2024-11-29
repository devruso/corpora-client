import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';


export const App = () => {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

  );
};
