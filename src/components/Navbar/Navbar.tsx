import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { useTypedSelector } from '../../hooks';
import { ITheme } from '../../types/theme/theme';
import navigationConfig from './navigationConfig';
import Navigation from './Navigation';
interface Props {}

export default memo(function Sidebar({}: Props) {
  const { navbar } = useTypedSelector((state) => state.app);
  const classes = useStyles();
  return (
    <div className={clsx(classes.navbar, { [classes.navbarShift]: navbar })}>
      <div className={classes.navigation}>
        {navigationConfig.map((list: any) => (
          <Navigation
            taskCounter={{
              countAttacks: 1,
              countTasks: 1,
            }}
            component="nav"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </div>
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    navbar: {
      position: 'absolute',
      zIndex: theme.zIndex.drawer,
      top: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      width: theme.drawer.closeWidth,

      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      transition: 'all 0.3s',
    },
    navbarShift: {
      width: theme.drawer.openWidth,
    },
    link: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    navigation: { marginTop: theme.spacing(2) },
  }),
);
