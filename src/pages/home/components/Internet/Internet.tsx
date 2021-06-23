import React, { memo } from 'react';

import { createStyles, makeStyles, Divider, useTheme } from '@material-ui/core';
import { ITheme } from '../../../../types/theme/theme';

import { Typography } from '../../../../ui/components';
import { useTranslation } from 'react-i18next';

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface Props {}

export default memo(function Internet({}: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const newData = [
    { date: 1, value: 1 },
    { date: 2, value: 5 },
    { date: 3, value: 3 },
  ];
  return (
    <div className={classes.internet}>
      <div className={classes.tt}>
        <Typography className={classes.title} variant="h4" paragraph>
          {t('home:internet.title')}
        </Typography>
        <Divider />
      </div>
      <div className={classes.sb}>
        <div>
          <Typography className={classes.connection} variant="h5">
            {t('home:internet.connection')}
          </Typography>
          <Typography
            className={classes.net}
            variant="body1"
            paragraph
            color="textSecondary"
            component="span">
            {t('home:internet.net')}
          </Typography>
        </div>

        <Typography className={classes.connected} variant="body1" paragraph>
          {t('home:internet.connected')}
        </Typography>
      </div>
      <div className={classes.gr}>
        <div className={classes.graph}>
          <Typography variant="body1" paragraph>
            {t('home:internet.reception')} 40,0 {t('home:internet.kbps')}
          </Typography>
          <Typography variant="body2" paragraph color="textSecondary">
            500{t('home:internet.kbps')}
          </Typography>
          <div className={classes.container}>
            <ResponsiveContainer minWidth="100%" minHeight="200px" height={'100%'}>
              <AreaChart
                data={newData}
                margin={{ top: 5, right: 0, left: -30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="value" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.primary.main}
                  fill={theme.palette.primary.light}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={classes.graph}>
          <Typography variant="body1" paragraph>
            {t('home:internet.broadcast')} 31,,4{t('home:internet.kbps')}
          </Typography>
          <Typography variant="body2" paragraph color="textSecondary">
            500{t('home:internet.kbps')}
          </Typography>
          <div className={classes.container}>
            <ResponsiveContainer minWidth="100%" minHeight="200px" height={'100%'}>
              <AreaChart
                data={newData}
                margin={{ top: 5, right: 0, left: -30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="value" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.secondary.main}
                  fill={theme.palette.secondary.light}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className={classes.mr}>
        <Typography variant="body1" paragraph color="primary">
          {t('home:internet.about')}
        </Typography>
      </div>
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    internet: {
      flexGrow: 1,
      display: 'grid',
      gridGap: theme.spacing(3),
      gridTemplateAreas: `
        "tt tt tt tt"
        "sb sb sb sb"
        "gr gr gr gr"
        "mr mr mr mr"
      `,
      gridAutoRows: 'min-content',
      gridColumn: '1/3',
      padding: theme.spacing(3, 0, 0),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    tt: { gridColumn: '1/5' },
    title: { padding: theme.spacing(0, 3) },
    sb: {
      gridColumn: '1/5',
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(3),
    },
    connection: {},
    connected: { color: theme.palette.success.main },
    net: {},
    container: {},
    gr: {
      gridColumn: '1/5',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: theme.spacing(0, 3),
    },
    graph: { minWidth: '100%' },
    mr: { padding: theme.spacing(0, 3) },
  }),
);
