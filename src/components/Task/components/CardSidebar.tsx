import React from 'react';
import { makeStyles } from '@material-ui/core';

import dependencies from '../dependencies';

const { Chat } = dependencies.components;

const CardSidebar = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <Chat {...props} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: 370,
    background: theme.palette.background.paper,
  },
}));

export default CardSidebar;
