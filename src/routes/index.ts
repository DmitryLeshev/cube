import { Activation, Auth, Error, Main } from '../layouts';
import activation from './activation';
import auth from './auth';
import database from './database';
import devices from './devices';
import dictionaries from './dictionaries';
import { error401, error404, error500, redirect404 } from './errors';
import events from './events';
import home from './home';
import reports from './reports';
import settings from './settings';
import support from './support';
import users from './users';

const routes: any = [
  {
    path: '/errors',
    component: Error,
    routes: [error401, error404, error500, redirect404],
  },
  {
    path: '/activation',
    component: Activation,
    routes: [activation, redirect404],
  },
  {
    path: '/auth',
    component: Auth,
    routes: [auth, redirect404],
  },
  {
    route: '/',
    component: Main,
    routes: [
      database,
      devices,
      dictionaries,
      home,
      reports,
      settings,
      support,
      events,
      users,
      redirect404,
    ],
  },
];

export { routes };
