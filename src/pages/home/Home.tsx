import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles } from '@material-ui/core';

import { Page } from '@/components';
import { ITheme } from '@/types/theme';

import { Tasks, TopTasks, Internet, Network, Ports } from './components';
import { ScrollableContentiner } from '@/ui/components';

interface Props {
  route: any;
}

export default memo(function Home({ route }: Props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Page title={t('home:page')}>
      <ScrollableContentiner>
        <div className={classes.temlate}>
          <Internet />
          <Network />
          {/* <Tasks data={{}} /> */}
          <TopTasks isIncident={false} tasks={[]} />
          <TopTasks isIncident={true} tasks={[]} />
          <Ports />
        </div>
      </ScrollableContentiner>
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
      gridTemplateAreas: `
        "int int net"
        "task task prots"
        "top top top"
      `,
      gridTemplateColumns: '1fr 1fr',
      gridAutoRows: 'min-content',
    },
  }),
);
