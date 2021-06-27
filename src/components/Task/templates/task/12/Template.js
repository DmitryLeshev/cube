import React from 'react';

import { Typography } from '@material-ui/core';
import Table from '@src/components/Table/Table';
import whenWasOnline from '@src/assets/utils/whenWasOnline';

export default ({ data }) => {
  const cells = [
    {
      id: 'deviceInfo',
      label: 'Устройство',
      deviceInfo: true,
    },
    {
      id: 'userInfo',
      label: 'Пользователи',
      userInfo: true,
    },
    {
      id: 'didOpen',
      label: 'Открытие фишинг страницы',
    },
    {
      id: 'tryingEnter',
      label: 'Попытка ввода пароля',
    },
    {
      id: 'enteredPwds',
      label: 'Введенные пароли',
    },
  ];

  const list = data.body.devices.map((el) => {
    return {
      deviceInfo: el.deviceId
        ? {
            id: el.deviceId,
            type: el.deviceType,
            primary: el.name,
            secondary: el.ip,
            url: (id) => `/devices/local/${id}/information`,
          }
        : el.mac,
      userInfo: el.owner
        ? {
            id: el.owner.id,
            avatar: el.owner.avatar,
            primary:
              el.owner.firstname && el.owner.lastname
                ? `${el.owner.firstname} ${el.owner.lastname}`
                : el.owner.login,
            secondary:
              typeof el.owner.online === 'number'
                ? whenWasOnline(el.owner.online)
                : 'В сети',
            url: (id) => `/users/${id}/information`,
          }
        : '',
      didOpen: el.join_site ? 'Да' : 'Нет',
      tryingEnter: el.input_password ? 'Да' : 'Нет',
      enteredPwds: el.passwords.join(', '),
    };
  });

  return (
    <>
      <Typography variant="h5" paragraph>
        В результате проведения тестирование сотрудников компании, работающих через WI-FI,
        на реакцию на фишинг атаку, были выявлены следующие результаты:
      </Typography>
      <Table list={list} cellsName={cells} />
    </>
  );
};
