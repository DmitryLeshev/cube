import React from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles, IconButton, Typography, Avatar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { TasksTypeImg, TasksType } from '../config/task';

import dependencies from '../dependencies';
import { useRouteMatch } from 'react-router';

const { iconColor } = dependencies.icon;

const HeaderCard = ({
  id,
  dashboard,
  windowCard,
  closeTask,
  taskNumber,
  taskType,
  titleVars,
  crt,
  incident,
  priority,
}: any) => {
  const { t } = useTranslation();
  const {
    url,
    params: { taskId },
  }: any = useRouteMatch();

  const isIncident = incident
    ? incident
    : !!url.split('/').find((path: any) => path === 'incident');

  let variables: any = {};
  titleVars &&
    Object.keys(titleVars).forEach((key) => {
      variables[key] = titleVars[key];
    });
  const taskName: any = t(
    `${isIncident ? 'incident' : 'task'}:list.${taskNumber}.title`,
    variables,
  );

  const TaskIcon: any = taskType ? TasksTypeImg[TasksType[taskType]] : null;

  const classes = useStyles({ taskType, windowCard, crt, dashboard, priority });
  return (
    <div className={classes.header}>
      {windowCard && (
        <IconButton className={classes.buttonBack} aria-label="back" onClick={closeTask}>
          <ArrowBackIcon className={classes.buttonBackIcon} fontSize="large" />
        </IconButton>
      )}
      <Avatar className={classes.icon} aria-label="back">
        {TaskIcon && <TaskIcon className={classes.iconSvg} />}
      </Avatar>
      <Typography className={classes.detailsTitle} variant={dashboard ? 'body1' : 'h4'}>
        {taskName ? taskName : 'Нет имени'}
      </Typography>

      <Typography className={classes.hash} variant="h6">
        #{taskId ? taskId : id || '007'}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: ({ windowCard }: any) => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: 50,
    width: '100%',
    padding: theme.spacing(2, 3),
    borderBottom: windowCard ? `1px solid ${theme.palette.divider}` : '',
  }),
  icon: (props: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(3),
    padding: theme.spacing(1),
    backgroundColor: iconColor(
      theme,
      TasksType[props.taskType],
      props.crt,
      props.priority,
    ),
  }),
  iconSvg: {
    flexGrow: 1,
  },
  buttonBack: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(3),
  },
  buttonBackIcon: {},
  detailsTitle: () => ({
    ...theme.typography.h5,
    display: 'flex',
    marginRight: theme.spacing(3),
  }),
  detailsTitleIcon: {
    marginRight: theme.spacing(2),
  },
  hash: {
    ...theme.typography.h6,
    marginLeft: 'auto',
  },
}));

export default HeaderCard;
