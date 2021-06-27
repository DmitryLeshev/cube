import { createStyles, makeStyles } from '@material-ui/core';
import React, { memo } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { Topbar, Settingbar } from '@/components';
import { ITheme } from '@/types/theme';

interface Props {
  route: RouteConfig;
}

export default memo(function Auth({ route }: Props) {
  const classes = useStyles();

  return (
    <>
      <Topbar />
      <Settingbar />
      <main className={classes.main}>{renderRoutes(route.routes)}</main>
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    main: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
  }),
);
