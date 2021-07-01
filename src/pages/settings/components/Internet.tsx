import React, { ChangeEvent, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles } from '@material-ui/core';

import { useModal, useSelect, useInput } from '@/hooks';
import { Card, Modal, EditList } from '@/components';
import { Typography, Input, Button, Select } from '@/ui/components';

import { ITheme } from '@/types/theme';

interface Props {}

const protocols = [
  'DHCP client',
  'DHCPv6 client',
  'Unmanaged',
  'PPPoE',
  'Static address',
];

export default memo(function Internet({}: Props) {
  const { t } = useTranslation();
  const usemodal = useModal();

  // pppoe
  const username = useInput({ initialValue: '', label: 'PAP/CHAP username' });
  const password = useInput({ initialValue: '', label: 'PAP/CHAP password' });
  const concentrator = useInput({ initialValue: '', label: 'Access Concentrator' });
  const serviceName = useInput({ initialValue: '', label: 'Service Name' });

  // staticAddress
  const [inputs, setInputs] = useState<string[]>([]);
  const gateway = useInput({ initialValue: '', label: 'IPv4 gateway' });
  const broadcast = useInput({ initialValue: '', label: 'IPv4 broadcast' });

  const protocol = useSelect({
    items: protocols.map((protocol, idx) => {
      return { label: protocol, value: idx };
    }),
    selectedValue: 0,
    label: t('settings:protocol'),
  });

  const classes = useStyles();
  const header = <Typography variant="h5">{t('settings:ppoe')}</Typography>;
  const pppoe = (
    <>
      <Input className={classes.field} {...username} />
      <Input className={classes.field} {...password} />
      <Input placeholder="auto" helper="Leave empty to autodetect" {...concentrator} />
      <Input placeholder="auto" helper="Leave empty to autodetect" {...serviceName} />
    </>
  );
  const staticAddress = (
    <>
      <EditList inputs={inputs} setInputs={setInputs} />
      <Input placeholder="192.168.1.1 (wan)" className={classes.field} {...gateway} />
      <Input placeholder="192.168.2.255" className={classes.field} {...broadcast} />
    </>
  );
  const body = (
    <>
      <Select className={classes.field} {...protocol} />
      {protocols[protocol.value] === 'PPPoE'
        ? pppoe
        : protocols[protocol.value] === 'Static address' && staticAddress}
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
