export const useGoogleLogin = () => {
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:3000/auth/google/login';
  };

  return { loginWithGoogle };
};