import axios from 'axios';

interface UpdateCompanyDto {
  name?: string;
  phoneNumber?: string;
  cnpj?: string;
}

export const useUpdateCompany = () => {
  const updateCompany = async (companyId: string, data: UpdateCompanyDto) => {
    const token = localStorage.getItem('accessToken');
    try {
      await axios.patch(`http://localhost:3000/company/${companyId}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Empresa atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
    }
  };

  return updateCompany;
};