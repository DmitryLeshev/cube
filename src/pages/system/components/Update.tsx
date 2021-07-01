import React, { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  createStyles,
  List,
  ListItem,
  makeStyles,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';

import { Card } from '@/components';
import { _trDate, sleep } from '@/utils';
import { Typography, Button } from '@/ui/components';
import { ITheme } from '@/types/theme';

interface Props {}

const UPDATE = {
  'update-avaible': 'доступно обновление',
  'update-notneed': 'самая новая версия',
  'update-license-error': 'истекла лицензия',
};

const Body = ({
  downloading,
  updating,
  downloaded,
  updatecheck,
  version,
  updateInfoAsync,
}: any) => {
  const [updateState, setUpdateState] = useState({
    downloading: 'auto',
    updating: 'any',
    downloaded: false,
    version: '0.1.0',
  });

  const [date, setDate] = useState({ start: '6:00', end: '10:00' });
  const [loading, setLoading] = useState(false);
  const api: any = {};

  const handleChange = async (event: any) => {
    if (!event) return;
    const { name, value } = event.target;
    setUpdateState((prev) => {
      return { ...prev, [name]: value };
    });
    if (name === 'updating' && value === 'date') {
      await api.updateSet({ key: name, value: date });
    } else {
      await api.updateSet({ key: name, value });
    }
    updateInfoAsync();
  };

  useEffect(() => {
    if (typeof updating === 'object') {
      setDate(updating || { start: '6:00', end: '10:00' });
    }
    setUpdateState({
      downloading: downloading || 'auto',
      updating: typeof updating === 'object' ? 'date' : updating || 'auto',
      downloaded: downloaded || false,
      version: version || '0.1.0',
    });
  }, [downloading, updating, downloaded, version]);

  const classes = useStyles();
  return (
    <List disablePadding>
      <ListItem className={classes.item} disableGutters>
        <Typography variant="h5">Загрузка обновления:</Typography>
        <FormControl className={classes.formControl}>
          <Select
            value={updateState.downloading}
            onChange={handleChange}
            name="downloading">
            <MenuItem value={'auto'}>автоматическое</MenuItem>
            <MenuItem value={'manual'}>ручное</MenuItem>
          </Select>
        </FormControl>
        {!updateState.downloaded &&
          updateState.downloading === 'manual' &&
          updatecheck === 'update-avaible' &&
          (loading ? (
            <CircularProgress className={classes.btn} size="small" />
          ) : (
            <Button
              className={classes.btn}
              size="small"
              onClick={async () => {
                setLoading(true);
                await api.updateManualUpdate();
                await sleep(15000);
                setLoading(false);
              }}>
              Загрузить
            </Button>
          ))}
      </ListItem>
      <ListItem className={classes.item} disableGutters>
        <Typography variant="h5">Обновление (с перезагрузкой устройства) </Typography>
        <FormControl className={classes.formControl}>
          <Select value={updateState.updating} onChange={handleChange} name="updating">
            <MenuItem value={'any'}>автоматическое</MenuItem>
            <MenuItem value={'manual'}>ручное</MenuItem>
            <MenuItem value={'date'}>
              c {date.start} по {date.end}
            </MenuItem>
          </Select>
        </FormControl>
        {updateState.downloaded &&
          updateState.updating === 'manual' &&
          updatecheck === 'update-avaible' && (
            <div className={classes.btn}>
              <Button
                className={classes.mr_r2}
                size="small"
                onClick={async () => await api.removeUpdate()}>
                Удалить
              </Button>

              <Button size="small" onClick={async () => await api.updateManualUpdate()}>
                Установть
              </Button>
            </div>
          )}
      </ListItem>
      <ListItem className={classes.item} disableGutters>
        <Typography variant="h5">Состояние: </Typography>
        {/* <Typography variant="h5">Состояние: {UPDATE[updatecheck]}</Typography> */}
        <Button className={classes.btn}>Проверить обновление</Button>
      </ListItem>
    </List>
  );
};

export default memo(function Update({}: Props) {
  const { t } = useTranslation();
  const [update] = useState<string>(`20.01.2021`);
  const [version] = useState<string>(`0.1.0`);

  const header = (
    <Typography variant="h5">
      {t('system:version-system')}: {version}
    </Typography>
  );
  const footer = (
    <Typography variant="body1" color="textSecondary">
      {t('system:renewal')} {update}
    </Typography>
  );

  const classes = useStyles();
  return (
    <Card className={classes.card} header={header} body={<Body />} footer={footer} />
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    card: { gridArea: 'update' },
    btn: { marginLeft: 'auto' },
    formControl: {},
    mr_r2: {},
    item: {},
  }),
);
