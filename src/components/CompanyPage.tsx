import { useState, useEffect } from 'react';
import axios from 'axios';
import { CompanyTable } from './CompanyTable';
import { CreateCompanyComponent } from './CreateCompanyComponent';
import { useAuth } from '../contexts/AuthContext';
import { Company } from '@/interfaces/company';

const CompanyPage = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);

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

  useEffect(() => {
    fetchCompanies();
  }, [user]);

  const handleAddCompany = async () => {
    await fetchCompanies();
  };

  const handleCompanyDeleted = (companyId: string) => {
    setCompanies((prevCompanies) => prevCompanies.filter((company) => company.id !== companyId));
  };

  const handleUpdateCompany = async () => {
    await fetchCompanies();
  };

  return (
    <div>
      <CreateCompanyComponent onAddCompany={handleAddCompany} />
      <CompanyTable companies={companies} onCompanyDeleted={handleCompanyDeleted} onUpdateCompany={handleUpdateCompany} />
    </div>
  );
};

export default CompanyPage;