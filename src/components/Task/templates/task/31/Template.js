import React from 'react';

import { makeStyles } from '@material-ui/core';

import { Section, Text, Title, List, ListItem } from '../../components';
import { arrayItems, useTranslationTemplates } from '../../lib';

import clsx from 'clsx';
// import dependencies from "../../../dependencies";
// const { Tooltip } = dependencies.components;

export default ({ data, children }) => {
  const classes = useStyles();
  const {
    getText,
    getTitle,
    getListItem,
    getListItemSecondary,
    getTextSecondary,
  } = useTranslationTemplates({
    number: data.type,
  });

  const variables = {
    device: data.body.password,
    port: data.body.port,
    ssh: data.body.protocol,
  };

  const result = data.body.result;

  const text1 = `Пароль ${data.body.password} для логина ${data.body.login} был подобран на устройстве, ip-адрес ${data.body.ip}:${data.body.port}, протокол ${data.body.protocol}`;

  const list3 = (i) => (
    <List>
      {arrayItems(4).map((j) => (
        <ListItem key={j} className={classes.dots}>
          {getListItem(i, j)}
        </ListItem>
      ))}
    </List>
  );

  const listSecondary3 = (i) => (
    <List>
      {arrayItems(3).map((j) => (
        <ListItem key={j} className={classes.dots}>
          {getListItemSecondary(i, j)}
        </ListItem>
      ))}
    </List>
  );

  const renderSection = (i) => {
    return (
      <Section key={i}>
        <Title>{getTitle(i)}</Title>
        {i === 1 ? <Text>{text1}</Text> : <Text>{getText(i, variables)}</Text>}
        {i === 3 && (
          <>
            {list3(i)}
            <Text>{getTextSecondary(i)}</Text>
            {listSecondary3(i)}
          </>
        )}
      </Section>
    );
  };

  return (
    <>
      <ul className={classes.list}>
        <li className={classes.item}>
          <p className={clsx(classes.text, classes.login)}>Логины</p>
          <p className={clsx(classes.text, classes.password)}>Пароли</p>
        </li>
        {result.map((item, idx) => (
          <li key={idx} className={clsx(classes.item, { [classes.fixed]: item.fixed })}>
            <p className={clsx(classes.text, classes.login)}>{item.login}</p>
            <p className={clsx(classes.text, classes.password)}>{item.password}</p>
          </li>
        ))}
      </ul>
      {[1, 2, 3].map(renderSection)}
    </>
  );
};
// return [1, 2, 3].map(renderSection);

const useStyles = makeStyles((theme) => ({
  dots: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  list: {
    marginBottom: theme.spacing(3),
    listStyle: 'none',
    border: `1px solid ${theme.palette.divider}`,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  text: {
    width: '50%',
    padding: theme.spacing(2),
  },
  password: { borderLeft: `1px solid ${theme.palette.divider}` },
  fixed: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: '98%',
      transform: 'translateX(1%)',
      borderBottom: `1px solid black`,
    },
  },
}));
