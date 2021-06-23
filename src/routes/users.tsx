import { Users } from '../pages';
import Details from '../pages/users/components/Details';
import Placeholder from '../pages/users/components/Placeholder';
import { redirect404 } from './errors';

export default {
  path: '/users',
  component: Users,
  routes: [
    {
      path: '/users',
      component: Placeholder,
      exact: true,
    },
    {
      path: '/users/:id/:tab',
      component: Details,
      routes: [
        {
          path: '/users/:id/info',
          component: () => '[users] info',
          exact: true,
        },
        {
          path: '/users/:id/protected-devices',
          component: () => '[users] protected-devices',
          exact: true,
        },
      ],
    },
    redirect404,
  ],
};
