import { ITab } from '@/types/tab';

const tabsConfig = (id: string): ITab[] => [
  {
    i18next: 'devices:info.tab',
    url: `/devices/local/${id}/info`,
    id: 0,
  },
  {
    i18next: 'devices:programs.tab',
    url: `/devices/local/${id}/programs`,
    id: 1,
  },
  {
    i18next: 'devices:tasks.tab',
    url: `/devices/local/${id}/tasks`,
    id: 2,
  },
  {
    i18next: 'devices:incidents.tab',
    url: `/devices/local/${id}/incidents`,
    id: 3,
  },
];

export default tabsConfig;
