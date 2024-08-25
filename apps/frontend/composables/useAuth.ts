import { useAsyncData } from '#app';

export const useAuth = () => {

const runtimeConfig = useRuntimeConfig();

  const login = (email: string, password: string) => {
    return useAsyncData('login', () =>
      $fetch(`${runtimeConfig.public.api}/user/login`, {
        method: 'POST',
        body: { email, password },
      })
    );
  };

  const register = (username: string, email: string, password: string) => {
    return useAsyncData('register', () =>
      $fetch(`${runtimeConfig.public.api}/user/register`, {
        method: 'POST',
        body: { name: username, email, password },
      })
    );
  };

  return {
    login,
    register,
  };
}
