import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles } from '@material-ui/core';

import { Page } from '@/components';
import { ScrollableContentiner } from '@/ui/components';
import { ITheme } from '@/types/theme';

import { Internet, Local, Wifi5, Wifi24 } from './components';

interface Props {
  route: any;
}

export default memo(function Settings({ route }: Props) {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Page title={t('settings:page')}>
      <ScrollableContentiner>
        <div className={classes.template}>
          <Internet />
          <Local />
          <Wifi5 />
          <Wifi24 />
        </div>
      </ScrollableContentiner>
      {renderRoutes(route.routes)}
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    template: {
      display: 'grid',
      padding: theme.spacing(1.5, 3),
      gridTemplateAreas: `
        "update update"
        "reboot reset"
      `,
      gap: theme.spacing(3),
      alignItems: 'baseline',
    },
  }),
);
