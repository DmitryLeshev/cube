import { Home } from '../pages';
import { redirect404 } from './errors';

export default {
  path: '/home',
  component: Home,
  routes: [
    {
      path: '/home',
      component: () => null,
      exact: true,
    },
    {
      path: '/home/:taskId',
      component: () => '[task]',
      exact: true,
    },
    redirect404,
  ],
};
