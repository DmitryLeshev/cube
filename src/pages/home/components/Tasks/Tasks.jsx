import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';

import { LoaderIndicator } from '../../../../components';
import { IconSwords, IconRadiation } from '../../../../assets/icons';

export default ({ data }) => {
  const { t } = useTranslation();
  if (!data) return <LoaderIndicator />;
  const { incident, vulner: vulnerable } = data;
  const classes = useStyles();

  const configItem = [
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
        const { image: Icon } = el;
        return (
          <li key={el.id} className={clsx(classes.item, classes[el.bgColor])}>
            <RouterLink className={classes.link} to={el.url}>
              <div className={classes.leftSideItem}>
                <Icon />
              </div>
              <div className={classes.rightSideItem}>
                <p className={classes.valueItem}>{el.value}</p>
                <p className={classes.textItem}>
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
  tasks: {
    display: 'flex',
    flexDirection: 'column',
    // margin: theme.spacing(3, 3, 0),
    flexGrow: 1,
    padding: theme.spacing(3, 3, 0),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  title: {
    marginBottom: theme.spacing(3),
  },
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
    height: 150,
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
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '130px',
    flexGrow: 1,
  },
  leftSideItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    // flexGrow: 1,
    // width: "46%",
    height: '100%',
  },
  rightSideItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // flexGrow: 1,
    // width: "54%",
    marginLeft: theme.spacing(3),
    height: '100%',
  },
  textItem: {
    ...theme.typography.h5,
    position: 'relative',
    top: 32,
    textAlign: 'center',
    color: theme.palette.getContrastText('#000000'),
  },
  valueItem: {
    position: 'absolute',
    top: -16,
    fontSize: '88px',
    margin: 0,
    color: theme.palette.getContrastText('#000000'),
  },
}));
