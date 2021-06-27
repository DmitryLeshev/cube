import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  createStyles,
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import clsx from 'clsx';

import { DeviceIcon } from '@/components';
import { ScrollableContentiner, Typography } from '@/ui/components';
import { ITheme } from '@/types/theme';
import { ItemDevice } from '@/store/types/device';

interface Props {
  list: ItemDevice[];
}

export default memo(function DeviceList({ list }: Props) {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  console.log('[render] DeviceList');
  return (
    <List className={clsx(classes.list)}>
      <ScrollableContentiner>
        {list.map((device: ItemDevice) => {
          const isActive: boolean = Number(id) === device.id;
          return (
            <ListItem
              className={clsx(classes.item, { [classes.active]: isActive })}
              button
              component={Link}
              to={`/devices/local/${device.id}/info`}
              key={device.id}>
              <ListItemIcon>
                <DeviceIcon className={classes.icon} type={device.type} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography noWrap>{device.name}</Typography>}
                secondary={device.ip}
              />
            </ListItem>
          );
        })}
      </ScrollableContentiner>
    </List>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    list: { height: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' },
    item: { overflow: 'hidden' },
    active: {
      backgroundColor: theme.palette.action.selected,
      borderRight: `solid 4px ${theme.palette.primary.main}`,
      '$active &icon': { background: '#000' },
    },
    icon: {
      width: 40,
      height: 40,
      fill: theme.palette.primary.light,
    },
  }),
);
