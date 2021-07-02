import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useInput, useModal, useSelect } from '@/hooks';
import { Card, Modal } from '@/components';
import { Typography, Button, Input, Select } from '@/ui/components';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '@/types/theme';

interface Props {}

export default memo(function Wifi24({}: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const essid = useInput({ initialValue: '', name: 'essid' });
  const password = useInput({ initialValue: '', name: 'passwd' });

  const width = useSelect({
    items: [
      { value: 20, label: '20 Mhz' },
      { value: 40, label: '40 Mhz' },
    ],
    selectedValue: 20,
    label: t('settings:width'),
  });

  const canal24 = useSelect({
    items: [...Array(13).keys()].map((canal) => {
      canal = ++canal;
      return { label: String(canal), value: canal };
    }),
    selectedValue: 1,
    label: t('settings:canal'),
  });

  const classes = useStyles();
  const header = <Typography variant="h5">{t('settings:wifi-2.4')}</Typography>;
  const body = (
    <>
      <Input className={classes.field} {...essid} label={t('settings:essid')} />
      <Input className={classes.field} {...password} label={t('settings:password')} />
      <Select className={classes.field} {...canal24} />
      <Select className={classes.field} {...width} />
    </>
  );
  const footer = (
    <Button className={classes.btn} onClick={usemodal.openModal}>
      {t('settings:save')}
    </Button>
  );
  const modal = (
    <>
      <Typography variant="h4">{t('settings:are-you-sure')}</Typography>
      <div className={classes.actions}>
        <Button
          color="primary"
          onClick={() => {
            console.log('reboot');
            usemodal.closeModal();
          }}
          fullWidth>
          {t('settings:yes')}
        </Button>
        <Button color="primary" onClick={usemodal.closeModal} fullWidth>
          {t('settings:no')}
        </Button>
      </div>
    </>
  );
  return (
    <>
      <Card header={header} body={body} footer={footer} />
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
    field: { marginBottom: theme.spacing(2) },
  }),
);
