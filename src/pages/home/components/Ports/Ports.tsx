import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles, Divider } from '@material-ui/core';
import clsx from 'clsx';

import { ITheme } from '@/types/theme';
import { Typography } from '@/ui/components';
import { LanguageIcon } from '@/assets/icons';

interface Props {}

export default memo(function Ports({}: Props) {
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <div className={classes.ports}>
      <Typography className={classes.title} variant="h4">
        {t('home:ports.network-ports')}
      </Typography>
      <Divider />
      <div className={classes.portsList}>
        <div className={clsx(classes.port)}>
          <div className={classes.cabelWrapper}>
            <div className={classes.cabel}>2</div>
          </div>
          <div className={classes.info}>
            <Typography align="center">-</Typography>
          </div>
        </div>
        <div className={clsx(classes.port)}>
          <div className={classes.cabelWrapper}>
            <div className={classes.cabel}>1</div>
          </div>
          <div className={classes.info}>
            <Typography align="center">-</Typography>
          </div>
        </div>
        <div className={clsx(classes.port, classes.port_dashed)}>
          <div className={classes.cabelWrapper}>
            <div className={clsx(classes.cabel, classes.cabel_dedicated)}>0</div>
            <div className={classes.iconWrapper}>
              <LanguageIcon className={classes.icon} />
            </div>
            <div className={classes.square}>SFP</div>
          </div>
          <div className={classes.info}>
            <Typography align="center">FDX</Typography>
            <Typography align="center">1.0 G</Typography>
          </div>
        </div>
      </div>
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    ports: {
      flexGrow: 1,
      display: 'grid',
      gridGap: theme.spacing(3),
      gridTemplateColumns: '1fr',
      gridAutoRows: 'min-content',
      gridColumn: '2/3',
      padding: theme.spacing(3, 0),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    title: { padding: theme.spacing(0, 3), marginBottom: theme.spacing(1) },
    portsList: { display: 'flex', alignItems: 'baseline' },
    port: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
    },
    port_dashed: { border: `dashed 2px ${theme.palette.grey[300]}`, borderRadius: 8 },
    cabelWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 40,
      border: `solid 1px ${theme.palette.divider}`,
    },
    cabel_dedicated: {
      border: `solid 1px ${theme.palette.primary.main}`,
      backgroundColor: `rgba(77, 171, 245, 0.4)`,
    },
    iconWrapper: {
      position: 'absolute',
      left: '50%',
      bottom: 0,
      transform: 'translateX(-50%)',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      width: 20,
      height: 20,
      color: theme.palette.grey[300],
      backgroundColor: theme.palette.background.paper,
    },
    icon: { width: 16, height: 16 },
    square: {
      marginLeft: theme.spacing(1),
      width: 80,
      height: 40,
      border: `solid 1px ${theme.palette.divider}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    info: { marginTop: theme.spacing(1) },
  }),
);
