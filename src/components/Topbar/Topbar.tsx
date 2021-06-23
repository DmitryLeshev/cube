import React, { memo, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { AppBar, Toolbar, createStyles, makeStyles } from '@material-ui/core';

import { Typography, IconButton } from '../../ui/components';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { ExitToAppIcon, MenuIcon, SettingsIcon } from '../../static/icons';
import { ITheme } from '../../types/theme/theme';
import clsx from 'clsx';
import { useActions, useTypedSelector } from '../../hooks';

interface Props {}

export default memo(function Topbar({}: Props) {
  const { navbar, name } = useTypedSelector((state) => state.app);
  const { appChangeSettingbar, appChangeNavbar } = useActions();

  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();

  const isNotDashboard = match.url === '/auth' || match.url === '/activation';
  return (
    <AppBar
      className={clsx(classes.header, {
        [classes.topBarShift]: !isNotDashboard && navbar,
      })}
      color="primary"
      position="relative">
      <Toolbar>
        {!isNotDashboard && (
          <IconButton onClick={appChangeNavbar}>
            <MenuIcon className={classes.icon} />
          </IconButton>
        )}

        <Typography className={classes.brend} variant="h4" component={Link} to="/home">
          {name}
        </Typography>

        <IconButton className={classes.right} onClick={appChangeSettingbar}>
          <SettingsIcon className={classes.icon} />
        </IconButton>
        {!isNotDashboard && (
          <IconButton
            onClick={() => {
              localStorage.setItem('app.status', 'auth');
              history.push('/auth');
            }}>
            <ExitToAppIcon className={classes.icon} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    header: {
      boxShadow: 'none',
      height: theme.header.height,
      transition: theme.drawer.transition,
      justifyContent: 'center',
    },
    topBarShift: {
      width: `calc(100% - ${theme.drawer.openWidth}px)`,
      marginLeft: theme.drawer.openWidth,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginLeft: 0,
      },
    },
    brend: {
      fontWeight: 700,
      marginLeft: theme.spacing(1),
      color: theme.palette.getContrastText(theme.palette.primary.main),
      textDecoration: 'none',
    },
    icon: {
      width: 30,
      height: 30,
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    right: {
      marginLeft: 'auto',
      marginRight: theme.spacing(1),
    },
  }),
);
