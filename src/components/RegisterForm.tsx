import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '@/hooks/userRegisterForm';
import { authenticateUser, fetchUserProfile } from '@/hooks/useLoginForm';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  username: z.string().min(3, {
    message: 'O nome deve ter no mínimo 3 caracteres',
  }),
  email: z.string().min(5, {
    message: 'O email deve ter no mínimo 5 caracteres',
  }).email({
    message: 'Insira um email válido',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  }),
  confirmPassword: z.string().min(6, {
    message: 'A confirmação da senha deve ter no mínimo 6 caracteres',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const { login: loginUserContext } = useAuth();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { confirmPassword, ...registerData } = data; // Remover confirmPassword antes de enviar
      await registerUser(registerData);
      const loginData = { email: registerData.email, password: registerData.password };
      const authResponse = await authenticateUser(loginData);
      localStorage.setItem('accessToken', authResponse.accessToken);
      localStorage.setItem('refreshToken', authResponse.refreshToken);
      const userProfile = await fetchUserProfile(authResponse.accessToken);
      loginUserContext({ ...userProfile, accessToken: authResponse.accessToken, refreshToken: authResponse.refreshToken });
      setIsError(false);
      setError(null);
      toast({
        title: 'Registro efetuado',
        description: 'Você foi registrado com sucesso',
      });
      navigate('/home');
    } catch (error: any) {
      setIsError(true);
      if (error.response && error.response.status === 400 && error.response.data.message.includes('Duplicate entry')) {
        setError('Este email já está registrado.');
        toast({
          title: 'Registro falhou',
          description: 'Este email já está registrado.',
        });
      } else if (error.response && error.response.status === 401) {
        setError('Não autorizado. Verifique suas credenciais.');
        toast({
          title: 'Erro ao buscar perfil',
          description: 'Não autorizado. Verifique suas credenciais.',
        });
      } else {
        setError(error.message || 'O registro falhou');
        toast({
          title: 'Registro falhou',
          description: error.message || 'O registro falhou',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bem-vindo à Corpora!</h1>
          <p className="text-gray-600">Estamos felizes em tê-lo conosco. Por favor, preencha os dados abaixo para criar sua conta.</p>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormDescription>
                Insira seu nome.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormDescription>
                Insira seu email de registro.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>
                Insira sua senha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>
                Confirme sua senha.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-center gap-6'>
          <Button className='bg-green-700 hover:bg-green-800' type="submit">Cadastrar</Button>
          {isError && <p className=" text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;