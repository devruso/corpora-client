import axios from 'axios';

export const useDeleteCompany = () => {
  const deleteCompany = async (companyId: string) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`http://localhost:3000/company/${companyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Empresa deletada com sucesso');
    } catch (error) {
      console.error('Erro ao deletar empresa:', error);
    }
  };

  return deleteCompany;
};