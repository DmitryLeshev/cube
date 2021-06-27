import React from 'react';
import { useParams } from 'react-router';

import { Button, makeStyles, Typography } from '@material-ui/core';

import { Section, Text, Title } from '../../components';
import { useTranslationTemplates, useSnackbarTemplates } from '../../lib';

import api from '../../../api';

export default ({ data, closeTask }) => {
  const { id } = data;
  const classes = useStyles();

  const { status } = useParams();
  const inWork = status === 'in-work';
  const isCompleted = status === 'completed';

  const params = data?.body?.params ?? 'default';

  const { getText, getTitle } = useTranslationTemplates({
    number: data.type,
  });

  const { enqueueSnackbarTemplates } = useSnackbarTemplates();

  const handlerButton = async (isOff) => {
    const res = await api.task.button.setDecisionIsOff({ id, isOff });
    enqueueSnackbarTemplates(res);
    closeTask();
  };

  return (
    <>
      <Section>
        <Title>{getTitle(1)}</Title>
        <Text>{getText(1)}</Text>
      </Section>
      {isCompleted && (
        <Typography>
          Выбрано:{' '}
          {params.off ? '“Отключать пользователей”' : '“Ждать нового подключения”'}
        </Typography>
      )}
      {inWork && (
        <div className={classes.buttons}>
          <Button
            className={classes.btn}
            onClick={() => handlerButton(true)}
            variant="outlined">
            Отключать пользователей
          </Button>
          <Button
            className={classes.btn}
            onClick={() => handlerButton(false)}
            variant="outlined">
            Ждать нового подключения
          </Button>
        </div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    padding: theme.spacing(2, 0),
  },
  btn: {
    marginRight: theme.spacing(3),

    '&:last-child': {
      marginRight: 0,
    },
  },
}));
