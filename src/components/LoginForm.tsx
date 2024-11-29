import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, fetchUserProfile } from '@/hooks/useLoginForm';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().min(5, {
    message: 'O email deve ter no mínimo 10 caracteres',
  }),
  password: z.string().min(6, {
    message: 'A senha deve ter no mínimo 6 caracteres',
  }),
});

type FormData = z.infer<typeof formSchema>;

const LoginForm = () => {
  const { login: loginUser } = useAuth();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const loginData = await authenticateUser(data);
      const userProfile = await fetchUserProfile(loginData.accessToken);
      loginUser({ ...userProfile, accessToken: loginData.accessToken, refreshToken: loginData.refreshToken });
      localStorage.setItem('accessToken', loginData.accessToken);
      localStorage.setItem('refreshToken', loginData.refreshToken);
      setIsError(false);
      setError(null);
      toast({
        title: 'Login efetuado',
        description: 'Você foi logado com sucesso',
      });
      navigate('/home');
    } catch (error: any) {
      setIsError(true);
      setError(error.message || 'O login falhou');
      toast({
        title: 'Login falhou',
        description: error.message || 'O login falhou',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                Insira seu email de login.
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
        <div className='flex justify-center gap-6'>
          <Button className='bg-green-700 hover:bg-green-800' type="submit">Entrar</Button>
          {isError && <p className=" text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;