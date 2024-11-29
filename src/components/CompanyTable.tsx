import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useDeleteCompany } from '@/hooks/useDeleteCompany';
import { UpdateCompanyComponent } from './UpdateCompanyComponent';
import { MdOutlineDelete } from "react-icons/md";
interface Company {
  id: string;
  name: string;
  phoneNumber: string;
  cnpj: string;
}

interface CompanyTableProps {
  companies: Company[];
  onCompanyDeleted: (companyId: string) => void;
  onUpdateCompany: () => void;
}

export function CompanyTable({ companies, onCompanyDeleted, onUpdateCompany }: CompanyTableProps) {
  const deleteCompany = useDeleteCompany();

  const handleDelete = async (companyId: string) => {
    try {
      await deleteCompany(companyId);
      onCompanyDeleted(companyId);
    } catch (error) {
      console.error('Erro ao deletar empresa:', error);
    }
  };

  return (
    <Table>
      <TableCaption>Lista de suas empresas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead>CNPJ</TableHead>
          <TableHead>Atualizar</TableHead>
          <TableHead>Deletar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company) => (
          <TableRow key={company.id}>
            <TableCell className="font-medium">{company.id}</TableCell>
            <TableCell>{company.name}</TableCell>
            <TableCell>{company.phoneNumber}</TableCell>
            <TableCell>{company.cnpj}</TableCell>
            <TableCell>
              <UpdateCompanyComponent companyId={company.id} onUpdateCompany={onUpdateCompany} />
            </TableCell>
            <TableCell>
              <Button size={'icon'} className='bg-red-600 hover:bg-red-700'  onClick={() => handleDelete(company.id)}><MdOutlineDelete/></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}