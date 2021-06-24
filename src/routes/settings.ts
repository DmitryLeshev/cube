import { Settings } from '../pages';
// import { redirect404 } from './errors';

export default {
  path: '/settings',
  component: Settings,
  exact: true,
};

// export default {
//   path: '/settings/:tab',
//   component: Settings,
//   routes: [
//     {
//       path: '/settings/system',
//       component: () => '[settings] system',
//       exact: true,
//     },
//     {
//       path: '/settings/devices',
//       component: () => '[settings] devices',
//       exact: true,
//     },
//     {
//       path: '/settings/white-list',
//       component: () => '[settings] white-list',
//       exact: true,
//     },
//     redirect404,
//   ],
// };
