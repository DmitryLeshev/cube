import React, { memo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { useTranslation } from 'react-i18next';

import {
  createStyles,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';

import { DeviceIcon, Page } from '@/components';
import { Input, Typography } from '@/ui/components';
import { ITheme } from '@/types/theme';
import { useTypedSelector } from '@/hooks';
import { ItemDevice } from '@/store/types/device';

interface Props {
  route: any;
}

export default memo(function Home({ route }: Props) {
  const { list } = useTypedSelector((state) => state.device);
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<{ search: string }>({ search: '' });

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.currentTarget;
    setState((prev) => {
      return { ...prev, [name]: value };
    });
  }

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
          <List className={clsx(classes.list)}>
            {list.map((device: ItemDevice) => {
              const isActive: boolean = Number(id) === device.id;
              return (
                <ListItem
                  className={clsx(classes.item, { [classes.active]: isActive })}
                  button
                  component={Link}
                  to={`/devices/local/${device.id}/info`}>
                  <ListItemIcon>
                    <DeviceIcon type={device.type} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography noWrap>{device.name}</Typography>}
                    secondary={device.mac}
                  />
                </ListItem>
              );
            })}
          </List>
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
    content: { display: 'flex', flexDirection: 'column', flexGrow: 1 },
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
