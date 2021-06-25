import { Devices } from '../pages';

import {
  Details,
  Placeholder,
  TabEvents,
  TabInfo,
  TabPrograms,
} from '../pages/devices/components';

import { redirect404 } from './errors';

export default {
  path: '/devices/:type/:id?',
  component: Devices,
  routes: [
    {
      path: '/devices/:type',
      component: Placeholder,
      exact: true,
    },
    {
      path: '/devices/:type/:id/:tab',
      component: Details,
      routes: [
        {
          path: '/devices/:type/:id/checks',
          component: () => '[tab] checks',
          exact: true,
        },
        {
          path: '/devices/:type/:id/browser',
          component: () => '[tab] browser',
          exact: true,
        },
        {
          path: '/devices/:type/:id/entry',
          component: () => '[tab] entry',
          exact: true,
        },
        {
          path: '/devices/:type/:id/info',
          component: TabInfo,
          exact: true,
        },
        {
          path: '/devices/:type/:id/logs',
          component: () => '[tab] logs',
          exact: true,
        },
        {
          path: '/devices/:type/:id/ports',
          component: () => '[tab] ports',
          exact: true,
        },
        {
          path: '/devices/:type/:id/processes',
          component: () => '[tab] processes',
          exact: true,
        },
        {
          path: '/devices/:type/:id/programs',
          component: TabPrograms,
          exact: true,
        },
        {
          path: '/devices/:type/:id/responsible',
          component: () => '[tab] responsible',
          exact: true,
        },
        {
          path: '/devices/:type/:id/screens',
          component: () => '[tab] screens',
          exact: true,
        },
        {
          path: '/devices/:type/:id/settings',
          component: () => '[tab] settings',
          exact: true,
        },
        {
          path: '/devices/:type/:id/tasks',
          component: TabEvents,
          exact: true,
        },
        {
          path: '/devices/:type/:id/incidents',
          component: TabEvents,
          exact: true,
        },
        {
          path: '/devices/:type/:id/web',
          component: () => '[tab] web',
          exact: true,
        },
        redirect404,
      ],
    },
  ],
};
