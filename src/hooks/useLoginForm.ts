import axios from 'axios';
import { LoginResponse } from '@/interfaces/loginResponse';
import { LoginRequisition } from '@/interfaces/loginRequisition';
import { UserProfile } from '@/interfaces/userProfile';

export const authenticateUser = async (credentials: LoginRequisition): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Falha na autenticação');
    } else {
      throw new Error('Falha na autenticação');
    }
  }
};

export const fetchUserProfile = async (accessToken: string): Promise<UserProfile> => {
  try {
    const response = await axios.get<UserProfile>('http://localhost:3000/users/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Falha ao buscar perfil do usuário');
    } else {
      throw new Error('Falha ao buscar perfil do usuário');
    }
  }
};