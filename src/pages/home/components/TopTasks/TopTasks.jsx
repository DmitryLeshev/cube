import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Divider, makeStyles, Typography } from '@material-ui/core';

import { Placeholder } from '../../../../components';
import { CardHeader } from '../../../../components/Task/components';

const TopTasks = ({ tasks, isIncident }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const tBase = `home:top.${isIncident ? 'incidents' : 'tasks'}`;
  const title = t(`${tBase}.title`);
  const placeholder = t(`${tBase}.placeholder`);

  if (!tasks.length) {
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="h4">
          {title}
        </Typography>
        <Divider />
        <Placeholder placeholder={placeholder} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {title}
      </Typography>
      <Divider />
      <ul className={classes.list}>
        {tasks.map((el, index) => {
          const taskCardHeaderProps = {
            taskNumber: el.type,
            id: el.id,
            taskType: el.class,
            titleVars: el.titleVars,
            crt: el.crt,
            dashboard: true,
            incident: isIncident,
            priority: el.priority,
          };
          return (
            <li key={index} className={classes.item}>
              <RouterLink
                className={classes.link}
                to={el.class !== 1 ? `/tasks/in-work/${el.id}` : `/incident/${el.id}`}>
                <CardHeader {...taskCardHeaderProps} />
              </RouterLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // margin: theme.spacing(3, 3, 0, 0),
    flexGrow: 2,
    padding: theme.spacing(3, 0, 0),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    // minWidth: 300,
    // maxWidth: 400,
  },
  link: {
    ...theme.typography.body1,
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    color: theme.palette.text.primary,
  },
  title: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(0, 3),
  },
  list: {
    listStyle: 'none',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    transition: '0.3s',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.action.focus,
    },
  },
  icon: {
    marginRight: theme.spacing(2.5),
    padding: theme.spacing(1),
    width: 40,
    height: 40,
    backgroundColor: theme.palette.error.light,
  },
  error: {
    backgroundColor: theme.palette.error.light,
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
  },
  grey: {
    backgroundColor: theme.palette.grey[500],
  },
  warning: {
    backgroundColor: theme.palette.warning.light,
  },
}));

export default TopTasks;
