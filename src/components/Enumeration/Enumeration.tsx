import React, { memo } from 'react';
import { List, ListItem, Typography } from '@/ui/components';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '@/types/theme';
import clsx from 'clsx';

export interface EnumerationItem {
  key: string;
  value?: string;
  keySeconday?: string;
  valueSeconday?: string;
}

interface Props {
  items: EnumerationItem[];
}

export default memo(function Enumeration({ items }: Props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {items.map((item) => {
        const { key, keySeconday, value, valueSeconday } = item;
        return (
          <ListItem key={key} className={classes.item}>
            <Typography className={classes.key} variant="body1">
              {key}
            </Typography>
            {value && (
              <Typography className={classes.value} variant="body1">
                {value}
              </Typography>
            )}
            {keySeconday && (
              <Typography
                className={clsx(classes.secodary, classes.key_secodary)}
                variant="caption">
                {keySeconday}
              </Typography>
            )}
            {valueSeconday && (
              <Typography
                className={clsx(classes.secodary, classes.value_secodary)}
                variant="caption">
                {valueSeconday}
              </Typography>
            )}
          </ListItem>
        );
      })}
    </List>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    list: {},
    item: {
      display: 'grid',
      gridTemplateColumns: 'max-content max-content',
      justifyContent: 'space-between',
      gridTemplateAreas: `
        "key value"
        "key_s value_s"
      `,
    },
    key: { gridArea: 'key' },
    value: { gridArea: 'value' },
    key_secodary: { gridArea: 'key_s' },
    value_secodary: { gridArea: 'value_s' },
    secodary: {
      color: theme.palette.text.secondary,
      transform: `translateY(-${theme.spacing(1)}px)`,
    },
  }),
);
