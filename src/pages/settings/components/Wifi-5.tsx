import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useInput, useModal, useSelect } from '@/hooks';
import { Card, Modal } from '@/components';
import { Typography, Button, Input, Select } from '@/ui/components';
import { createStyles, makeStyles } from '@material-ui/core';
import { ITheme } from '@/types/theme';

const canals = [
  34,
  36,
  38,
  40,
  42,
  44,
  46,
  48,
  50,
  52,
  54,
  56,
  58,
  60,
  62,
  64,
  100,
  104,
  108,
  112,
  116,
  120,
  124,
  128,
  132,
  136,
  140,
  147,
  149,
  150,
  152,
  153,
  155,
  157,
  159,
  160,
  161,
  163,
  165,
  167,
  171,
  173,
  177,
  180,
];

interface Props {}

export default memo(function Wifi5({}: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();
  const essid = useInput({ initialValue: '', name: 'essid', label: t('settings:essid') });
  const password = useInput({
    initialValue: '',
    name: 'passwd',
    label: t('settings:password'),
  });
  const width = useSelect({
    items: [
      { value: 20, label: '20 Mhz' },
      { value: 40, label: '40 Mhz' },
      { value: 80, label: '80 Mhz' },
    ],
    selectedValue: 20,
    label: t('settings:width'),
  });

  const canal5 = useSelect({
    items: canals.map((canal) => {
      return { label: String(canal), value: canal };
    }),
    selectedValue: 34,
    label: t('settings:canal'),
  });

  const classes = useStyles();
  const header = <Typography variant="h5">{t('settings:wifi-5')}</Typography>;
  const body = (
    <>
      <Input className={classes.field} {...essid} />
      <Input className={classes.field} {...password} />
      <Select className={classes.field} {...canal5} />
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
