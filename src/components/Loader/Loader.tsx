import React from 'react';

import LoaderIndicator from './LoaderIndicator';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

const Loader = ({ backdrop, white }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LoaderIndicator backdrop={backdrop} white={white} />
    </div>
  );
};

export default Loader;
