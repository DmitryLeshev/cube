import React from 'react';

import { Switch, Typography, makeStyles } from '@material-ui/core';
import { useActions, useTypedSelector } from '@/hooks';

const ModesThemes = () => {
  const classes = useStyles();
  const { mode } = useTypedSelector((state) => state.app.theme);
  const { appChangeMode } = useActions();

  function onChange() {
    const newMode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('app.mode', newMode);
    appChangeMode(newMode);
  }

  return (
    <div className={classes.modesThemes}>
      <Typography className={classes.modesThemeTitle} variant="h5">
        Тема
      </Typography>

      <div className={classes.switch}>
        <Typography className={classes.switchItem} variant="button">
          Светлая
        </Typography>

        <Switch checked={mode === 'light' ? false : true} onChange={onChange} />

        <Typography className={classes.switchItem} variant="button">
          Тёмная
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  modesThemes: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  modesThemeTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchItem: {
    textAlign: 'center',
  },
}));

export default ModesThemes;
