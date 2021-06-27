import React, { memo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { createStyles, makeStyles } from '@material-ui/core';

import { Page, Tabs } from '@/components';
import { ScrollableContentiner } from '@/ui/components';
import { ListItem, useOpenTask } from '@/components/Task';
import { useTabs } from '@/hooks';
import { ITheme } from '@/types/theme';
import tabsConfig from '../tabs.config';

import Filter from './Filter';
import { EventsType, EventsTypes } from '../Events';
import { mock } from '../mock';

interface Props {
  route: any;
  type: EventsType;
}

export interface ITask {
  id: number;
  crt: string;
  name: string;
  createTst: number;
  type: number;
  class: number;
  responsible: IResponsible[];
  entityId: number;
  entityType: number;
  typeIco: number;
  titleVars: any;
  status: number;
}

export interface IResponsible {
  userId: number;
  login: string;
  online: boolean;
  avatar: string;
  lastname: string;
  firstname: string;
}

export default memo(function Events({ route, type }: Props) {
  const match = useRouteMatch();
  const { eventId, status } = useParams<{ eventId: string; status: string }>();
  const tabs = useTabs();
  const { open, openTask, closeTask } = useOpenTask(true);
  const isIncident = type === EventsTypes.INCIDENTS;

  async function updateItem({ id }: { id: number }) {
    console.log({ updateItem: id });
  }

  const gridName = isIncident ? 'list' : 'tabs';
  const classes = useStyles({ gridName });
  const renderTabs = !isIncident && (
    <Tabs className={classes.tabs} tabsConfig={tabsConfig} {...tabs} match={match} />
  );
  return (
    <Page title={`${type}`}>
      <div className={classes.template}>
        {renderTabs}
        <Filter className={classes.fltr} />
        <div className={classes.list}>
          <ScrollableContentiner>
            {mock.map((task: ITask) => {
              const props = { task, openTask };
              return <ListItem key={task.id} {...props} />;
            })}
          </ScrollableContentiner>
        </div>
        {renderRoutes(route.routes, { open, closeTask, updateItem })}
      </div>
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    template: ({ gridName: gn }: any) => ({
      flexGrow: 1,
      display: 'grid',
      padding: theme.spacing(1.5, 3),
      gridTemplateAreas: `
        "${gn} ${gn} ${gn} ${gn} fltr fltr"
        "list list list list fltr fltr"
      `,
      gridTemplateColumns: 'repeat(4, 1fr) min-content min-content',
      gridTemplateRows: 'max-content 1fr',
      gap: theme.spacing(3),
    }),
    tabs: { gridArea: 'tabs', margin: theme.spacing(0, 3) },
    fltr: { gridArea: 'fltr' },
    list: {
      gridArea: 'list',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    scroll: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flexGrow: 1,
    },
  }),
);
