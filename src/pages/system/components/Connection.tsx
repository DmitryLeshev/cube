import React, { memo } from 'react';

import { useModal, useInput } from '@/hooks';
import { Card, Modal } from '@/components';
import { Typography, Button, Input } from '@/ui/components';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '@/types/theme';
import { useTranslation } from 'react-i18next';

interface Props {}

export default memo(function Connection({}: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();

  const classes = useStyles();
  const header = <Typography variant="h5">{t('system:connection')}</Typography>;

  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t('system:connect')}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t('system:are-you-sure')}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={() => {
            console.log('reboot');
            usemodal.closeModal();
          }}
          fullWidth>
          {t('system:yes')}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t('system:no')}
        </Button>
      </div>
    </>
  );
  return (
    <>
      <Card header={header} footer={footer} />
      <Modal {...usemodal} children={modal} />
    </>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: 'reboot' },
    btn: { marginLeft: 'auto' },
    actions: {
      display: 'flex',
      marginTop: theme.spacing(2),
      '& > button:last-child': { marginLeft: theme.spacing(2) },
    },
  }),
);
