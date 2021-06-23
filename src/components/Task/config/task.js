import dependencies from "../dependencies";

const {
  IconSwords,
  IconMessage,
  IconSettings,
  IconRadiation,
} = dependencies.icon;

export const TasksTypeImg = {
  ATTACK: IconSwords,
  MESSAGE: IconMessage,
  SETTINGS: IconSettings,
  WARNING: IconRadiation,
};

export const TasksType = {
  1: "ATTACK",
  2: "MESSAGE",
  3: "SETTINGS",
  4: "WARNING",
};

export const TasksStatus = {
  IN_WORK: "in-work",
  DEFERRED: "deferred",
  CANCELED: "canceled",
  COMPLETED: "completed",
};
