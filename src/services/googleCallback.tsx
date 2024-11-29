import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('token');
      if (accessToken) {
        try {
          localStorage.setItem('accessToken', accessToken);

          const response = await axios.get('http://localhost:3000/users/profile', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          const userProfile = response.data;
          loginUser({ ...userProfile, accessToken });
          navigate('/home');
        } catch (error) {
          console.error('Erro ao buscar perfil do usuário:', error);
        }
      } else {
        navigate('/login');
      }
    };

    handleGoogleLogin();
  }, [navigate, loginUser]);

  return <div>Redirecionando...</div>;
};

export default GoogleCallback;