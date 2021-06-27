import dependencies from '../dependencies';

const { IconSwords, IconMessage, IconSettings, IconRadiation } = dependencies.icon;

export const TasksTypeImg: any = {
  ATTACK: IconSwords,
  MESSAGE: IconMessage,
  SETTINGS: IconSettings,
  WARNING: IconRadiation,
};

export const TasksType: any = {
  1: 'ATTACK',
  2: 'MESSAGE',
  3: 'SETTINGS',
  4: 'WARNING',
};

export const TasksStatus: any = {
  IN_WORK: 'in-work',
  DEFERRED: 'deferred',
  CANCELED: 'canceled',
  COMPLETED: 'completed',
};
