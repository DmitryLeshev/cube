import React, { memo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { createStyles, makeStyles } from '@material-ui/core';

import { DeviceIcon, Tabs } from '@/components';
import { Typography } from '@/ui/components';
import { useTabs } from '@/hooks';
import { ITheme } from '@/types/theme';

import tabsConfig from './tabs.config';

interface Props {
  route: any;
}

export default memo(function Details({ route }: Props) {
  const { t } = useTranslation();
  const match = useRouteMatch<{ id: string }>();
  const usetabs = useTabs();
  const classes = useStyles();
  return (
    <>
      <div className={classes.detail}>
        <DeviceIcon className={classes.icon} type={1} />
        <div className={classes.names}>
          <Typography variant="h5">{'name'}</Typography>
          <Typography variant="body1">{'last name'}</Typography>
        </div>
        <Typography className={classes.status}>
          {t('devices:header.agentIsRunning')}
        </Typography>
        <Tabs
          className={classes.tabs}
          {...usetabs}
          match={match}
          tabsConfig={tabsConfig(match.params.id)}
        />
      </div>
      <div className={classes.tab}>{renderRoutes(route.routes)}</div>
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    detail: {
      display: 'grid',
      gridTemplateColumns: 'max-content 1fr max-content',
      gridAutoRows: 'max-content',
      margin: theme.spacing(0, 2, 1),
      padding: theme.spacing(1, 0, 0),
      boxShadow: theme.shadows[3],
      backgroundColor: theme.palette.background.paper,
      alignItems: 'center',
    },
    tabs: { boxShadow: 'none', gridColumn: '1/5' },
    icon: { margin: theme.spacing(0, 2), width: 64, height: 64 },
    status: { margin: theme.spacing(0, 2), placeItems: 'center' },
    names: {},
    tab: { margin: theme.spacing(0, 2), flexGrow: 2 },
  }),
);
