import React, { memo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { AppBar, Toolbar, createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { withAppContext } from '@/hocs';
import { useActions, useTypedSelector } from '@/hooks';
import { Typography, IconButton } from '@/ui/components';
import { ExitToAppIcon, MenuIcon, SettingsIcon } from '@/assets/icons';
import { ITheme } from '@/types/theme';
import { IAppContext } from '@/contexts/application';

interface Props extends IAppContext {}

export default withAppContext(
  memo(function Topbar({ application }: Props) {
    const { navbar, name, settingbar } = useTypedSelector((state) => state.app);
    const { appChangeSettingbar, appChangeNavbar } = useActions();

    const classes = useStyles();
    const match = useRouteMatch();
    const history = useHistory();

    function changeNavbar() {
      application?.bars?.changeNavbar(navbar);
    }

    function changeSettingsbar() {
      application?.bars?.changeSettingsbar(settingbar);
    }

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
            <IconButton onClick={changeNavbar}>
              <MenuIcon className={classes.icon} />
            </IconButton>
          )}

          <Typography className={classes.brend} variant="h4" component={Link} to="/home">
            {name}
          </Typography>

          <IconButton className={classes.right} onClick={changeSettingsbar}>
            <SettingsIcon className={classes.icon} />
          </IconButton>
          {!isNotDashboard && (
            <IconButton
              onClick={async () => {
                await application?.auth?.logout();
                await application?.auth?.checkAuth();
              }}>
              <ExitToAppIcon className={classes.icon} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }),
);

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
