import React, { memo } from 'react';

import { createStyles, makeStyles } from '@material-ui/core';

import { ITheme } from '@/types/theme';
import { Divider } from '@/ui/components';
import clsx from 'clsx';

interface Props {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  className?: any;
}

export default memo(function Card({ header, body, footer, className }: Props) {
  const classes = useStyles();

  const renderHeader = header && (
    <>
      <div className={classes.header}>{header}</div>
      <Divider />
    </>
  );

  const renderBody = body && (
    <>
      <div className={classes.body}>{body}</div>
      {footer && <Divider />}
    </>
  );

  return (
    <div className={clsx(classes.card, className)}>
      {renderHeader}
      {renderBody}
      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: () => ({
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      borderRadius: theme.spacing(0.5),
    }),
    header: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    footer: {
      display: 'flex',
      padding: theme.spacing(1, 2),
      background: theme.palette.background.paper,
      borderRadius: theme.spacing(0.5),
    },
  }),
);
