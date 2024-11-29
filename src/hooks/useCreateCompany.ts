import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { CreateCompany } from '@/interfaces/createCompany';

export const useCreateCompany = () => {
  const { user } = useAuth();

  const createCompany = async (data: CreateCompany) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.post(`http://localhost:3000/company/${user?.id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Empresa criada com sucesso:', response.data); 
      return response.data;
    } catch (error) {
      console.error('Erro ao criar empresa:', error); 
      throw error;
    }
  };

  return createCompany;
};