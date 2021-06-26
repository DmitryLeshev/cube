import React, { memo, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles } from '@material-ui/core';

import { Page } from '@/components';
import { Input } from '@/ui/components';
import { ITheme } from '@/types/theme';
import { useTypedSelector } from '@/hooks';
import List from './components/List';

interface Props {
  route: any;
}

export default memo(function Devices({ route }: Props) {
  const { list } = useTypedSelector((state) => state.device);
  const { t } = useTranslation();
  const [state, setState] = useState<{ search: string }>({ search: '' });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.currentTarget;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  }

  console.log('[render] Devices');

  const classes = useStyles();
  return (
    <Page title={t('devices:page')}>
      <div className={classes.temlate}>
        <div className={classes.leftbar}>
          <Input
            className={classes.input}
            placeholder={t('devices:list.search')}
            name="search"
            value={state.search}
            onChange={changeHandler}
            fullWidth
          />
          <List list={list} />
        </div>
        <div className={classes.content}>{renderRoutes(route.routes)}</div>
      </div>
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    temlate: {
      flexGrow: 1,
      display: 'grid',
      gridTemplateAreas: `
        "leftbar content"
      `,
      gridTemplateColumns: 'min-content 1fr',
    },
    leftbar: {
      display: 'flex',
      flexDirection: 'column',
      width: theme.drawer.openWidth + 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    input: { padding: theme.spacing(1.5, 1.5) },
    scroll: { flexGrow: 1 },
    list: { height: 1, flexGrow: 1, overflowY: 'auto' },
    item: { overflow: 'hidden' },
    active: {
      backgroundColor: theme.palette.action.selected,
      borderRight: `solid 4px ${theme.palette.primary.main}`,
    },
  }),
);
