import React, { memo } from 'react';

import {
  createStyles,
  makeStyles,
  useTheme,
  useMediaQuery,
  Drawer,
} from '@material-ui/core';
import clsx from 'clsx';

import { useTypedSelector, useActions } from '@/hooks';
import { Divider, ScrollableContentiner } from '@/ui/components';
import { ITheme } from '@/types/theme';

import navigationConfig from './navigationConfig';
import Navigation from './Navigation';
import { withAppContext } from '@/hocs';
import { IAppContext } from '@/contexts/application';

interface Props extends IAppContext {}

export default withAppContext(
  memo(function Sidebar({ application }: Props) {
    const state = useTypedSelector((state) => state);
    const { appChangeNavbar } = useActions();

    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles();
    const content = (
      <div className={classes.navigation}>
        {navigationConfig(state).map((list: any) => (
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
    );

    const backdrop = (
      <div className={classes.backdrop} onClick={application?.bars?.changeNavbar} />
    );

    return (
      <>
        {mobileDevice && state.app.navbar && backdrop}
        <div
          className={clsx(classes.navbar, { [classes.navbarShift]: state.app.navbar })}>
          <Divider />
          <ScrollableContentiner>{content}</ScrollableContentiner>
        </div>
      </>
    );
  }),
);

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    backdrop: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1200,
      backgroundColor: `rgba(0, 0, 0, 0.2)`,
    },
    navbar: {
      position: 'absolute',
      zIndex: theme.zIndex.drawer,
      top: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(0),
      opacity: 0,
      width: theme.drawer.closeWidth,
      overflow: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      transition: `all ${theme.drawer.transition}`,
    },
    navbarShift: {
      width: theme.drawer.openWidth,
      padding: theme.spacing(0, 2),
      paddingTop: theme.header.height,
      opacity: 1,
      [theme.breakpoints.down('sm')]: {
        width: theme.drawer.openWidth + 50,
      },
    },
    link: {
      color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    navigation: { marginTop: theme.spacing(2) },
  }),
);
