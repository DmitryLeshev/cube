import { Reports } from '../pages';
import { redirect404 } from './errors';

export default {
  path: '/reports',
  component: Reports,
  routes: [
    {
      path: '/reports',
      component: () => null,
      exact: true,
    },
    {
      path: '/reports/add-template',
      component: () => '[add-template]',
      exact: true,
    },
    redirect404,
  ],
};
