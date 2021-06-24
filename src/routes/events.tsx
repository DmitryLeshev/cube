import { Events } from '@/pages';
import Template from '@/pages/events/components/Template';
import Task from '@/components/Task';

import { redirect404 } from './errors';

export default {
  path: '/events/:type',
  component: Events,
  routes: [
    {
      path: '/events/incidents/:eventId?',
      component: Template,
      routes: [
        {
          path: '/events/incidents',
          component: () => null,
          exact: true,
        },
        {
          path: '/events/incidents/:eventId',
          component: Task,
          exact: true,
        },
        redirect404,
      ],
    },
    {
      path: '/events/tasks/:status/:eventId?',
      component: Template,
      routes: [
        {
          path: '/events/tasks/:status',
          component: () => null,
          exact: true,
        },
        {
          path: '/events/tasks/:status/:eventId',
          component: Task,
          exact: true,
        },
        redirect404,
      ],
    },
  ],
};
