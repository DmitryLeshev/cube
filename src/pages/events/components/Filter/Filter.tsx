import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createStyles, makeStyles, TextField } from '@material-ui/core';
import clsx from 'clsx';

import { ITheme } from '@/types/theme';
import { useInput } from '@/hooks';

import { Devices, Сriticality, Date } from './components';

interface Props {
  className: any;
}

const Filter = ({ className }: Props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const tBase = `common:filter`;
  const filter = {
    users: t(`${tBase}.users`),
    devices: t(`${tBase}.devices`),
    taskType: t(`${tBase}.taskType`),
    status: t(`${tBase}.status`),
    date: t(`${tBase}.date`),
    criticality: t(`${tBase}.criticality`),
    all: t(`${tBase}.all`),
    vulnerabilities: t(`${tBase}.vulnerabilities`),
    settings: t(`${tBase}.settings`),
    groupIS: t(`${tBase}.groupIS`),
    groupIT: t(`${tBase}.groupIT`),
    dateStart: t(`${tBase}.dateStart`),
    dateEnd: t(`${tBase}.dateEnd`),
  };

  const device = useInput({ initialValue: 0 });

  const [criticality, setСriticality] = useState([0, 100]);
  const [date, setDate] = useState([0, 0]);

  function handleСriticality(_event: any, value: any) {
    setСriticality(value);
  }

  const criticalityProps = { criticality, filter, handleСriticality };
  const deviceProps = { classes, device, filter, devices: [] };
  const dateProps = { classes, date, filter, setDate };
  return (
    <div className={clsx(classes.filter, className)}>
      <div className={classes.scroll}>
        <Devices {...deviceProps} />
        <Сriticality {...criticalityProps} />
        <Date {...dateProps} />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    filter: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: theme.drawer.openWidth + 100,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      overflowY: 'auto',
      flexGrow: 1,
    },
    scroll: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(3),
      width: '100%',
      flexGrow: 1,
    },
    filterItem: {
      marginBottom: theme.spacing(3),
      width: '100%',
    },
    dateWrapper: {
      display: 'flex',
      marginTop: theme.spacing(3),

      '& > div': {
        '&:first-child': {
          marginRight: theme.spacing(1),
        },

        '&:last-child': {
          marginLeft: theme.spacing(1),
        },
      },
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 20,
      height: 20,
      marginRight: theme.spacing(2),
    },
    back: {
      display: 'none',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        // display: "flex",
      },
    },
  }),
);

export default Filter;
