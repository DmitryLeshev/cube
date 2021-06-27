import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles, Typography } from '@material-ui/core';

import { HuePicker } from 'react-color';

import { useActions, useDebounce, useColorPicker, useTypedSelector } from '@/hooks';

function setThemeToLocalStorage(theme: any) {
  localStorage.setItem('theme', JSON.stringify(theme));
}

function getThemeToLocalStorage() {
  return JSON.parse(localStorage.getItem('theme') ?? '');
}

const PaletteColors = () => {
  const classes = useStyles();
  const { theme } = useTypedSelector((state) => state.app);
  const { appChangeColors } = useActions();

  const { enqueueSnackbar } = useSnackbar();

  const primary = useColorPicker(theme.colors.primary);
  const secondary = useColorPicker(theme.colors.secondary);

  const debouncedChangeColors = useDebounce({
    callback: callback,
    delay: 200,
  });

  function callback() {
    appChangeColors({ primary: primary.color, secondary: secondary.color });
    enqueueSnackbar(
      `[Основной]: ${primary.color}
       [Вторичный]: ${secondary.color}`,
      { variant: 'success' },
    );
  }

  const onChangeComplete = (color: any, value: any) => {
    const theme = getThemeToLocalStorage();
    theme.colors[value] = color.hex;
    setThemeToLocalStorage(theme);
    value === 'primary' ? primary.changeColor(color) : secondary.changeColor(color);
    debouncedChangeColors();
  };

  return (
    <div className={classes.container}>
      <Typography>Основной</Typography>
      <div className={classes.picker}>
        <HuePicker
          color={primary.color}
          onChange={(e) => onChangeComplete(e, 'primary')}
          width={'100%'}
        />
      </div>
      <Typography>Вторичный</Typography>
      <div className={classes.picker}>
        <HuePicker
          color={secondary.color}
          onChange={(e) => onChangeComplete(e, 'secondary')}
          width={'100%'}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3, 0),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  picker: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
}));

export default PaletteColors;
