import { ITab } from '@/types/tab';

const tabsConfig: ITab[] = [
  {
    id: 0,
    i18next: 'tasks_tabs.in-work',
    url: '/events/tasks/in-work',
  },
  {
    id: 1,
    i18next: 'tasks_tabs.completed',
    url: '/events/tasks/completed',
  },
];

export default tabsConfig;
