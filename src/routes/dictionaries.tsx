import { Dictionaries } from '../pages';
import { redirect404 } from './errors';

export default {
  path: '/dictionaries/:tab',
  component: Dictionaries,
  routes: [
    {
      path: '/dictionaries/protocols',
      component: () => '[tab] protocols',
      exact: true,
    },
    {
      path: '/dictionaries/dict',
      component: () => '[tab] dict',
      exact: true,
    },
    redirect404,
  ],
};
