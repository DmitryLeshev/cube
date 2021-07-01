import React, { memo } from 'react';

import {
  createStyles,
  makeStyles,
  Switch,
  Divider,
  FormControlLabel,
} from '@material-ui/core';

import { ITheme } from '@/types/theme';
import { Button, Typography, Badge } from '@/ui/components';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface Props {}

export default memo(function Network({}: Props) {
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();

  const circle = (v: number) => (
    <div className={clsx(classes.shape, classes.shapeCircle)}>
      <Typography className={classes.shapeValue}>{v}</Typography>
    </div>
  );
  return (
    <div className={classes.network}>
      <Typography className={classes.title} variant="h4">
        {t('home:network.home-network')}
      </Typography>
      <Divider />
      <div className={classes.toggles}>
        <div className={classes.toggle}>
          <FormControlLabel
            control={
              <Switch
                className={classes.switch}
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label={
              <>
                <Typography variant="h5">Keenetic-0014</Typography>
                <Typography variant="body1" color="textSecondary">
                  2,4ГГц, Канал 7
                </Typography>
              </>
            }
          />
          <Button color="primary">{t('home:network.network-information')}</Button>
        </div>
        <div className={classes.toggle}>
          <FormControlLabel
            control={
              <Switch
                className={classes.switch}
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label={
              <>
                <Typography variant="h5">Keenetic-0014</Typography>
                <Typography variant="body1" color="textSecondary">
                  2,4ГГц, Канал 7
                </Typography>
              </>
            }
          />
          <Button color="primary">{t('home:network.network-information')}</Button>
        </div>
      </div>
      <div className={classes.devices}>
        <Typography
          className={classes.devicesTitle}
          variant="body1"
          paragraph
          color="primary">
          {t('home:network.devices-in-network')}
        </Typography>

        <div className={classes.device}>
          <Badge color="secondary" overlap="circle" badgeContent="2">
            {circle(0)}
          </Badge>
          <Typography className={classes.deviceType}>
            {t('home:network.wired')}
          </Typography>
        </div>

        <div className={classes.device}>
          <Badge color="secondary" overlap="circle">
            {circle(3)}
          </Badge>
          <Typography className={classes.deviceType}>WIFI</Typography>
        </div>
      </div>
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    network: {
      flexGrow: 1,
      display: 'grid',
      gridGap: theme.spacing(3),
      gridTemplateColumns: '1fr',
      gridAutoRows: 'min-content',
      gridArea: 'net',
      // gridColumn: '2/3',
      padding: theme.spacing(3, 0),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    title: { padding: theme.spacing(0, 3), marginBottom: theme.spacing(1) },
    toggles: { padding: theme.spacing(0, 3) },
    toggle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
      '&:last-child': { marginBottom: 0 },
    },
    switch: { marginRight: theme.spacing(1) },
    devices: {
      padding: theme.spacing(0, 3),
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    devicesTitle: { width: '100%' },
    device: { display: 'flex', alignItems: 'center', marginRight: theme.spacing(5) },
    deviceType: { marginLeft: theme.spacing(1) },
    shape: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.primary.main,
      width: 56,
      height: 56,
    },
    shapeCircle: {
      borderRadius: '50%',
    },
    shapeValue: { color: theme.palette.getContrastText(theme.palette.primary.main) },
  }),
);
