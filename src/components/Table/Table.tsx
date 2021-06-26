import React, { memo } from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '@/types/theme';

interface TableColumn {
  field: string;
  headerName: string;
  width?: string | number;
}

interface Props {
  columns: TableColumn[];
  rows: any[];
}

export default memo(function Table({ columns, rows }: Props) {
  const classes = useStyles();
  console.log({ rows, columns });
  return (
    <div className={classes.table}>
      <div className={classes.row}>
        {columns.map((col) => (
          <div
            className={classes.col}
            style={{ width: col.width ?? 'auto' }}
            key={col.field}>
            {col.headerName}
          </div>
        ))}
      </div>
      {rows &&
        rows.map((row) => (
          <div className={classes.row} key={row.id}>
            {columns.map((col) => (
              <div
                className={classes.col}
                style={{ width: col.width ?? 'auto' }}
                key={col.field}>
                {row[col.field] ?? 'Упс'}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    table: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      border: `solid 1px ${theme.palette.grey[300]}`,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    row: {
      display: 'flex',
      borderBottom: `solid 1px ${theme.palette.grey[300]}`,
    },
    col: {
      padding: theme.spacing(2),
      borderRight: `solid 1px ${theme.palette.grey[300]}`,
    },
    '&:last-child': {
      borderRight: `none`,
    },
  }),
);
