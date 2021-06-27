import React from 'react';
import { useParams } from 'react-router';
import { Button, makeStyles } from '@material-ui/core';
import { useCustomSnackbar } from '../../../../../assets/hooks';

export default ({ api, closeTask, fetchTask, children, data }) => {
  const { taskId: id } = useParams();
  const classes = useStyles();
  const { enqueueSnackbar } = useCustomSnackbar();

  const vBtns = { variant: 'outlined', className: classes.btn };
  const { setDecision, closeIncident } = api.task.button;

  async function close() {
    const res = await closeIncident({
      id: Number(id),
      comment: 'test',
    });
    enqueueSnackbar(res, 'tasks');
    fetchTask();
    closeTask();
  }

  console.log({ data });

  async function allow() {
    const res = await setDecision({
      id: Number(id),
      action: 'setTaskToBot',
      params: { incedId: Number(id) },
    });
    enqueueSnackbar(res, 'tasks');
    fetchTask();
  }

  return (
    <>
      {children}
      <div className={classes.actions}>
        <Button onClick={allow} {...vBtns}>
          Разрешить
        </Button>
        <Button onClick={close} {...vBtns}>
          Закрыть
        </Button>
      </div>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(3),
    listStyle: 'none',
    border: `1px solid ${theme.palette.divider}`,
  },
  btn: { marginRight: theme.spacing(2) },
}));
