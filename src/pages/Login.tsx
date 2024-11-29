import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';

const Login = () => {
  const { loginWithGoogle } = useGoogleLogin();
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <div className='flex w-full h-screen flex-col justify-center items-center'>
      <h1 className='text-5xl text-primary2'>Corpora!</h1>
      <h3 className='text-xl mt-4 text-primary'>A company manegement system</h3>
      <section id='formulary-section' className='p-6 w-full flex justify-center items-center bg-background'>
        <div className='p-4 w-full max-w-[1016px] bg-primary-foreground rounded-md border border-border'>
          {isRegister ? <RegisterForm /> : <LoginForm />}
          <div className='flex justify-end mt-4'>
            <Button variant={'secondary'} className='hover:bg-muted transition-all duration-150' type='button' onClick={loginWithGoogle}>
              Entrar com Google
            </Button>
            <Button className='bg-amber-400 hover:bg-amber-300 font-medium text-gray-900 ml-4' type='button' onClick={toggleForm}>
              {isRegister ? 'Voltar para Login' : 'Cadastrar'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;