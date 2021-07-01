import { fetchData } from '@/utils';

const fetchAuth = fetchData('auth');

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
  login: async ({ login, password }) => await fetchAuth({ login: { login, password } }),
  logout: async () => await fetchAuth({ logout: {} }),
  status: async () => await fetchAuth({ status: {} }),
};

export { auth };
