import axios from 'axios';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}



export const registerUser = async (data: RegisterData): Promise<any> => {
    try {
      const response = await axios.post('http://localhost:3000/users', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  };
