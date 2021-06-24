import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles } from '@material-ui/core';

import { Page } from '@/components';
import { ITheme } from '@/types/theme';

import { Tasks, TopTasks, Internet, Network, Ports } from './components';

interface Props {
  route: any;
}

export default memo(function Home({ route }: Props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Page title={t('home:page')}>
      <div className={classes.temlate}>
        <Tasks data={{}} />
        <TopTasks isIncident={false} tasks={[]} />
        <TopTasks isIncident={true} tasks={[]} />
        <Internet />
        <Network />
        <Ports />
      </div>
      {renderRoutes(route.routes)}
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    temlate: {
      flexGrow: 1,
      display: 'grid',
      gridGap: theme.spacing(3),
      padding: theme.spacing(1.5, 5),
      gridTemplateColumns: '1fr 1fr',
      gridAutoRows: 'min-content',
    },
  }),
);
