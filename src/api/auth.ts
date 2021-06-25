import { fetchData } from '@/common/http-client';

interface LoginDTO {
  login: string;
  password: string;
}

interface IApiAuth {
  login: ({ login, password }: LoginDTO) => any;
  logout: () => any;
  status: () => any;
}

const auth: IApiAuth = {
  login: async ({ login, password }) =>
    await fetchData({ 'auth/login': { login, password } }),
  logout: async () => await fetchData({ 'auth/logout': {} }),
  status: async () => await fetchData({ 'auth/status': {} }),
};

export { auth };
