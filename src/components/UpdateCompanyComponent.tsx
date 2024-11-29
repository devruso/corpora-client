import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { GrConfigure } from "react-icons/gr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCompany } from '@/hooks/useUpdateCompany';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  cnpj: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface UpdateCompanyComponentProps {
  companyId: string;
  onUpdateCompany: () => void;
}

export function UpdateCompanyComponent({ companyId, onUpdateCompany }: UpdateCompanyComponentProps) {
  const updateCompany = useUpdateCompany();
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      cnpj: '',
    },
  });

  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const updateData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ''));
      await updateCompany(companyId, updateData);
      onUpdateCompany();
      toast({
        title: 'Empresa atualizada',
        description: 'A empresa foi atualizada com sucesso',
      });
      form.reset();
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click(); // Fechar o modal
      }
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
      toast({
        title: 'Erro ao atualizar empresa',
        description: 'Ocorreu um erro ao atualizar a empresa',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-yellow-500 hover:bg-yellow-600' size={'icon'} ><GrConfigure /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar Empresa</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para atualizar a empresa. Campos vazios não serão atualizados.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" {...form.register('name')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Telefone
            </Label>
            <Input id="phoneNumber" {...form.register('phoneNumber')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cnpj" className="text-right">
              CNPJ
            </Label>
            <Input id="cnpj" {...form.register('cnpj')} className="col-span-3" />
          </div>
          <DialogFooter>
            <Button type="submit">Atualizar Empresa</Button>
            <DialogClose asChild>
              <button ref={dialogCloseRef} style={{ display: 'none' }}></button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}