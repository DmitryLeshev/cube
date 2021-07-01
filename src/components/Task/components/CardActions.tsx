import React, { useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Button, makeStyles, Backdrop, TextField, Typography } from '@material-ui/core';
// import { DateTimePicker } from '@material-ui/pickers';
import { useSnackbar } from 'notistack';

import api from '../api';

import dependencies from '../dependencies';
import { TasksStatus } from '../config/task';
import { useInput, useModal } from '@/hooks';
import { Modal } from '@/components';
import clsx from 'clsx';

const { transformDate, hh_mm_DD_MM_YYYY } = dependencies.date;

const IT_BUTTONS = [34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 50];

const ActionCard = ({ closeTask, children, id, date, data, updateItem }: any) => {
  const classes = useStyles();
  const { status } = useParams<{ status: string }>();
  const { url } = useRouteMatch();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const comment = useInput({ initialValue: '' });
  // const { enqueueSnackbar } = useCustomSnackbar();

  const modal = useModal();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>();

  const isIncident = !!url.split('/').find((el) => el === 'incident');

  const handlerDatePicker = (event: any) => {
    setSelectedDate(event);
  };

  const handlerBackdrop = (event: any) => {
    if (event.target.classList && event.target.classList[1] === classes.backdrop) {
      setShowDatePicker(false);
    }
  };

  if (status === TasksStatus.COMPLETED) {
    return null;
  }

  function snackMessage(res: any) {
    enqueueSnackbar(t(`snackbar.tasks.${res.msg}`), {
      variant: res.status ? 'success' : 'error',
    });
    closeTask();
  }

  const remindTask = async (time: any) => {
    const res = await api.task.button.remindTask({ id, time });
    snackMessage(res);
  };

  const cancelTask = async () => {
    const res = await api.task.button.cancelTask({
      id,
      comment: comment.value,
    });
    snackMessage(res);
  };

  const toWorkTask = async () => {
    const res = await api.task.button.toWorkTask({ id });
    snackMessage(res);
  };

  const closeIncident = async () => {
    const res = await api.task.button.closeIncident({
      id,
      comment: comment.value,
    });
    updateItem({ id });
    snackMessage(res);
    closeTask();
  };

  const changePriority = async () => {
    const res = await api.incident.buttons.changePriority({ id });
    updateItem({ id });
    snackMessage(res);
  };

  const goToIT = async () => {
    const res = await api.task.button.setDecision({ id, action: 'goToIT' });
    updateItem({ id });
    snackMessage(res);
    // closeTask();
  };

  const tasksBtns = (
    <>
      {status !== TasksStatus.IN_WORK && (
        <Button className={classes.action} variant="outlined" onClick={toWorkTask}>
          {t(`tasks_task-actions.return-task`)}
        </Button>
      )}
      <Button
        className={classes.action}
        variant="outlined"
        onClick={() => setShowDatePicker(true)}>
        {status !== TasksStatus.DEFERRED
          ? t(`tasks_task-actions.remind-task`)
          : t(`tasks_task-actions.remind-task_on`)}
      </Button>
      {status !== TasksStatus.CANCELED && (
        <Button className={classes.action} variant="outlined" onClick={modal.openModal}>
          {t(`tasks_task-actions.ignore-task`)}
        </Button>
      )}
      {IT_BUTTONS.find((ib) => ib === data.type) && data.status < 3 && (
        <Button className={classes.action} variant="outlined" onClick={goToIT}>
          Передать в работу группы ИТ
        </Button>
      )}
    </>
  );

  const incidentBtns = (
    <>
      {data.status !== 6 ? (
        <>
          <Button className={classes.action} variant="outlined" onClick={modal.openModal}>
            {t(`tasks_task-actions.close-incident`)}
          </Button>
          <Button
            className={classes.action}
            variant="outlined"
            onClick={changePriority}>{`Выставить ${
            data.priority ? 'обычный' : 'высокий'
          } приоритет`}</Button>
        </>
      ) : (
        <Typography className={classes.action} variant="h3">
          Инцидент закрыт
        </Typography>
      )}
    </>
  );

  return (
    <div className={classes.actionCard}>
      {status === TasksStatus.DEFERRED && (
        <span className={classes.date}>
          Отложено до {transformDate(date, hh_mm_DD_MM_YYYY)}
        </span>
      )}
      <div className={classes.btnsWrapper}>
        {status === TasksStatus.IN_WORK && children}
        {isIncident ? incidentBtns : tasksBtns}
      </div>
      <Backdrop
        className={classes.backdrop}
        open={showDatePicker}
        onClick={handlerBackdrop}>
        <div className={classes.backdropContainer}>
          {/* <DateTimePicker
            className={classes.marginBottom}
            openTo="month"
            views={['month', 'date', 'hours', 'minutes']}
            inputVariant="outlined"
            variant="inline"
            format="HH.mm dd.MM.yyyy"
            autoOk={true}
            minDate={new Date()}
            value={selectedDate}
            onChange={handlerDatePicker}
            ampm={false}
          /> */}
          <Button
            className={classes.mb2}
            variant="outlined"
            onClick={() => {
              const dateJs = Date.parse(selectedDate);
              const timestamp = dateJs / 1000;
              remindTask(timestamp);
              setShowDatePicker(false);
            }}>
            Подтвердить
          </Button>
          <Button variant="outlined" onClick={() => setShowDatePicker(false)}>
            Отменить
          </Button>
        </div>
      </Backdrop>
      <Modal {...modal}>
        <Typography paragraph variant="h3">
          Комментарий
        </Typography>
        <TextField
          className={clsx(classes.mb2)}
          variant="outlined"
          fullWidth
          autoFocus
          multiline
          rows={4}
          // {...comment}
        />
        <Button
          className={clsx(classes.mlAuto)}
          variant="outlined"
          onClick={isIncident ? closeIncident : cancelTask}>
          {isIncident
            ? t(`tasks_task-actions.close-incident`)
            : t(`tasks_task-actions.ignore-task`)}
        </Button>
      </Modal>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  actionCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2, 3, 0),
  },
  action: { margin: theme.spacing(0, 2, 2, 0) },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
  backdropContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    borderRadius: 3,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[3],
  },
  date: {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2),
    color: theme.palette.secondary.light,
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  btnsWrapper: {},
}));

export default ActionCard;
