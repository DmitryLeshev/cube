import { Events } from '../pages';
import Incidents from '../pages/events/components/Incidents';
import Tasks from '../pages/events/components/Tasks';
import { redirect404 } from './errors';

export default {
  path: '/events/:type',
  component: Events,
  routes: [
    {
      path: '/events/incidents/:eventId?',
      component: Incidents,
      routes: [
        {
          path: '/events/incidents',
          component: () => null,
          exact: true,
        },
        {
          path: '/events/incidents/:eventId',
          component: ({ eventId }: any) => `[events] eventId ${eventId}`,
          exact: true,
        },
        redirect404,
      ],
    },
    {
      path: '/events/tasks/:status/:eventId?',
      component: Tasks,
      routes: [
        {
          path: '/events/tasks/:status',
          component: () => null,
          exact: true,
        },
        {
          path: '/events/tasks/:status/:eventId',
          component: ({ eventId }: { eventId: string }) => `[events] eventId ${eventId}`,
          exact: true,
        },
        redirect404,
      ],
    },
  ],
};
