import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Company } from '@/interfaces/company';

export const useFetchCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (user) {
        const token = localStorage.getItem('accessToken');
        try {
          const response = await axios.get(`http://localhost:3000/company/user/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          setCompanies(response.data);
        } catch (error) {
          console.error('Erro ao buscar empresas:', error);
        }
      }
    };

    fetchCompanies();
  }, [user]);

  return companies;
};