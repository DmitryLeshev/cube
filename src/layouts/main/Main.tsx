import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { memo } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { Topbar, Navbar, Settingbar } from '../../components';
import { useTypedSelector } from '../../hooks';
import { ITheme } from '../../types/theme/theme';

interface Props {
  route: RouteConfig;
}

export default memo(function Main({ route }: Props) {
  const classes = useStyles();
  const { navbar } = useTypedSelector((state) => state.app);

  return (
    <>
      <Topbar />
      <Navbar />
      <Settingbar />
      <main className={clsx(classes.main, { [classes.mainShift]: navbar })}>
        {renderRoutes(route.routes)}
      </main>
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    main: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      width: `calc(100% - ${theme.drawer.closeWidth}px)`,
      marginLeft: theme.drawer.closeWidth,
      background: theme.palette.background.default,
      transition: 'all 0.3s',
    },
    mainShift: {
      width: `calc(100% - ${theme.drawer.openWidth}px)`,
      marginLeft: theme.drawer.openWidth,
      transition: 'all 0.3s',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
      },
    },
  }),
);
