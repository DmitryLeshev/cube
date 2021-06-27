import React from 'react';

import { Button, makeStyles } from '@material-ui/core';

// import api from "../../../api";

export default ({ data, closeTask }) => {
  const classes = useStyles();
  const isWindows = data?.body?.protocol === 'WINDOWS';

  async function handleBtn() {
    closeTask();
  }

  return !isWindows ? (
    <Button
      className={classes.btn}
      variant="outlined"
      color="primary"
      onClick={handleBtn}>
      Перепроверить
    </Button>
  ) : null;
};

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(0, 2, 2, 0),
  },
}));
