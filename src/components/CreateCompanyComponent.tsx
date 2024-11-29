import { useRef } from 'react';
import { Button } from "@/components/ui/button";
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
import { useCreateCompany } from '@/hooks/useCreateCompany';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório' }),
  phoneNumber: z.string().min(8, { message: 'O número de telefone deve ter no mínimo 8 caracteres' }),
  cnpj: z.string().length(14, { message: 'O CNPJ deve ter 14 caracteres' }),
});

type FormData = z.infer<typeof formSchema>;

interface CreateCompanyComponentProps {
  onAddCompany: () => void;
}

export function CreateCompanyComponent({ onAddCompany }: CreateCompanyComponentProps) {
  const createCompany = useCreateCompany();
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
      await createCompany(data);
      onAddCompany();
      toast({
        title: 'Empresa criada',
        description: 'A empresa foi criada com sucesso',
      });
      form.reset();
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click(); // Fechar o modal
      }
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      toast({
        title: 'Erro ao criar empresa',
        description: 'Ocorreu um erro ao criar a empresa',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'lg'} variant={'ghost'}
        className="mb-6 bg-green-700 text-white font-medium hover:bg-green-900 hover:text-white">Criar Empresa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Empresa</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar uma nova empresa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" {...form.register('name')} className="col-span-3" />
            {form.formState.errors.name && <p className="text-red-600">{form.formState.errors.name.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Telefone
            </Label>
            <Input id="phoneNumber" {...form.register('phoneNumber')} className="col-span-3" />
            {form.formState.errors.phoneNumber && <p className="text-red-600">{form.formState.errors.phoneNumber.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cnpj" className="text-right">
              CNPJ
            </Label>
            <Input id="cnpj" {...form.register('cnpj')} className="col-span-3" />
            {form.formState.errors.cnpj && <p className="text-red-600">{form.formState.errors.cnpj.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">Criar Empresa</Button>
            <DialogClose asChild>
              <button ref={dialogCloseRef} style={{ display: 'none' }}></button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}