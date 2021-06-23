import { Database } from '../pages';
import { redirect404 } from './errors';

export default {
  path: '/database',
  component: Database,
  routes: [
    {
      path: '/database/softs',
      exact: true,
      component: () => 'softs',
    },
    {
      path: '/database/softs/:softId',
      exact: true,
      component: () => 'soft versions',
    },
    {
      path: '/database/softs/:softId/:version',
      exact: true,
      component: () => 'soft version cves',
    },
    redirect404,
  ],
};
