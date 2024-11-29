import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { useAuth } from '../contexts/AuthContext';
import GoogleCallback from '@/services/googleCallback'; 
import { ToastProvider, ToastViewport } from '@/components/ui/toast';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/home" />;
};

export const AppRoutes = () => {
  return (
    <Router>
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <ToastViewport />
    </ToastProvider>
  </Router>
  );
};