import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSnackbarTemplates } from '../../lib';

import api from '../../../api';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

const tMainValue = 'tasks_task-type.9.task_details';

export default ({ data, closeTask }) => {
  const { buttons, id } = data;
  const { enqueueSnackbarTemplates } = useSnackbarTemplates();
  const { t } = useTranslation();
  const classes = useStyles();

  const handlerButton = async (name, params = []) => {
    const res = await api.task.button.setDecision({
      id,
      name,
      params,
      action: 'setTaskToBot',
    });
    enqueueSnackbarTemplates(res);
    closeTask();
  };

  const configTime = [10, 15, 20, 25, 30, 35, 40];
  const configHackrf = ['Отключение клиентов от точки доступа', 'Глушение точки доступа'];
  const [params, setParams] = useState({
    date_fishing: null,
    time_fishing: null,
    hackrf: null,
  });
  const [selectedDateStart, handleDateChangeStart] = useState();
  const [time, setTime] = useState('');
  const [hackrf, setHackrf] = useState('');

  const dateChange = (event) => {
    handleDateChangeStart(event);
    const dateJs = Date.parse(event);
    const timestamp = dateJs / 1000;
    setParams({ ...params, date_fishing: timestamp });
  };

  const timeChange = (event) => {
    const value = event.target.value;
    setTime(value);
    setParams({ ...params, time_fishing: value });
  };

  const hackrfChange = (event) => {
    const value = event.target.value;
    setHackrf(value);
    let hackrf;
    if (value === 'Глушение точки доступа') {
      hackrf = true;
    } else if (value === 'Отключение клиентов от точки доступа') {
      hackrf = false;
    } else hackrf = null;
    setParams({ ...params, hackrf });
  };

  const handlerClickBtn = (name) => {
    handlerButton(name, { ...params });
  };

  return (
    <>
      <p>{t(`${tMainValue}.description`)}</p>
      <p className={classes.red}>{t(`${tMainValue}.warning`)}</p>
      <br></br>
      <Grid container>
        <Grid className={classes.colLeft} item xs={6}>
          <DateTimePicker
            className={classes.formControl}
            label="Время проведения"
            format="dd/MM/yyyy"
            autoOk
            fullWidth
            inputVariant="outlined"
            value={selectedDateStart}
            onChange={dateChange}
          />

          <FormControl variant="outlined" fullWidth className={classes.formControl}>
            <InputLabel>Метод отключения пользователей от сети</InputLabel>
            <Select
              value={hackrf}
              onChange={hackrfChange}
              label="Метод отключения пользователей от сети">
              {configHackrf.map((el) => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>

            {hackrf && hackrf === 'Глушение точки доступа' && (
              <FormHelperText>Может повлиять на другие точки доступа</FormHelperText>
            )}
          </FormControl>
          {buttons.map((el) => (
            <Button
              key={el.name}
              onClick={() => handlerClickBtn(el.name)}
              variant="outlined">
              {t(`task_actions.${el.name}`)}
            </Button>
          ))}
        </Grid>
        <Grid className={classes.colRight} item xs={6}>
          <FormControl className={classes.formControl} variant="outlined" fullWidth>
            <InputLabel>Длительность</InputLabel>
            <Select value={time} onChange={timeChange} label="Длительность">
              {configTime.map((el) => (
                <MenuItem key={el} value={el}>
                  {el} минут
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  colLeft: {
    paddingRight: theme.spacing(1.5),
  },
  colRight: {
    paddingLeft: theme.spacing(1.5),
  },
  formControl: {
    marginBottom: theme.spacing(3),
  },
  red: {
    color: 'red',
  },
}));
