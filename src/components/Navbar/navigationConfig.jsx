import React from 'react'

import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DevicesIcon from '@material-ui/icons/Devices';
import SettingsIcon from '@material-ui/icons/Settings';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import { colors } from '@material-ui/core';

import Label from './Label';

const navigationConfig = [
  {
    title: 'Pages',
    pages: [
      {
        i18nkey: 'home',
        title: 'Главная',
        href: '/home',
        icon: HomeIcon,
      },
      {
        i18nkey: 'tasks',
        title: 'Задачи',
        href: '/events/tasks/in-work',
        icon: AssignmentIcon,
        label: ({
          count = {
            countTasks: 0,
          },
        }) =>
          count.countTasks > 0 && (
            <Label color={colors.indigo[500]} shape="rounded">
              {count && count.countTasks}
            </Label>
          ),
      },
      {
        i18nkey: 'incident',
        title: 'Инцидент',
        href: '/events/incidents',
        icon: FlashOnIcon,
        label: ({
          count = {
            countAttacks: 0,
          },
        }) =>
          count.countAttacks > 0 && (
            <Label color={colors.red[500]} shape="rounded">
              {count && count.countAttacks}
            </Label>
          ),
      },
      {
        i18nkey: 'devices',
        title: 'Устройства',
        href: '/devices/local',
        icon: DevicesIcon,
      },
    ],
  },
  {
    title: 'Support',
    pages: [
      {
        i18nkey: 'settings',
        title: 'Настройки',
        href: '/settings/system',
        icon: SettingsIcon,
      },
    ],
  },
];

export default navigationConfig;
