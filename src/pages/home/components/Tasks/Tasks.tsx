import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';

import { LoaderIndicator } from '@/components';
import { IconSwords, IconRadiation } from '@/assets/icons';

type BgColor = 'warning' | 'error';

interface Item {
  id: number;
  label: string;
  value: number;
  image: any;
  bgColor: BgColor;
  url: string;
}

export default ({ data }: any) => {
  const { t } = useTranslation();
  if (!data) return <LoaderIndicator />;
  const { incident, vulner: vulnerable } = data;
  const classes = useStyles();

  const configItem: Item[] = [
    {
      id: 0,
      label: 'vulnerability',
      value: vulnerable?.[0]?.count || 0,
      image: IconRadiation,
      bgColor: 'warning',
      url: '/events/tasks/in-work?classesId=4',
    },
    {
      id: 1,
      label: 'incident',
      value: incident?.[0]?.count || 0,
      image: IconSwords,
      bgColor: 'error',
      url: '/events/incidents',
    },
  ];
  return (
    <ul className={classes.list}>
      {configItem.map((el) => {
        const { image: Icon, bgColor } = el;
        return (
          <li key={el.id} className={clsx(classes.item, classes[bgColor])}>
            <RouterLink className={classes.link} to={el.url}>
              <Icon />
              <div className={classes.wrapper}>
                <p className={classes.count}>{el.value}</p>
                <p className={classes.name}>
                  {t(`home:tasks.${el.label}`, { count: el.value })}
                </p>
              </div>
            </RouterLink>
          </li>
        );
      })}
    </ul>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: 'repeat(2, 1fr)',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gridColumn: '1 / 3',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    height: 200,
    boxShadow: theme.shadows[3],
    transition: '0.3s',
    cursor: 'pointer',

    '&:active': {
      opacity: 0.2,
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    height: '100%',
    textDecoration: 'none',
  },
  wrapper: { marginLeft: theme.spacing(2) },
  name: {
    ...theme.typography.h5,
    margin: 0,
    color: theme.palette.getContrastText('#000000'),
  },
  count: {
    textAlign: 'center',
    fontSize: theme.spacing(10),
    lineHeight: 1,
    margin: 0,
    color: theme.palette.getContrastText('#000000'),
  },
  error: {
    backgroundColor: theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      boxShadow: theme.shadows[6],
    },
  },
  warning: {
    backgroundColor: theme.palette.warning.light,
    '&:hover': {
      backgroundColor: theme.palette.warning.main,
      boxShadow: theme.shadows[6],
    },
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: theme.shadows[6],
    },
  },
  grey: {
    backgroundColor: theme.palette.grey[500],
    '&:hover': {
      backgroundColor: theme.palette.grey[600],
      boxShadow: theme.shadows[6],
    },
  },
}));
