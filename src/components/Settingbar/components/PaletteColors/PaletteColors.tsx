import React from 'react';
import { useSnackbar } from 'notistack';

import { makeStyles, Typography } from '@material-ui/core';

import { HuePicker, GithubPicker } from 'react-color';

import { useActions, useDebounce, useColorPicker, useTypedSelector } from '@/hooks';

function setThemeToLocalStorage(theme: any) {
  localStorage.setItem('setting.theme', JSON.stringify(theme));
}

function getThemeToLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem('setting.theme') ?? '');
  } catch (error) {
    return { colors: { primary: null, secondary: null } };
  }
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
    appChangeColors({ primary: theme.colors.primary, secondary: theme.colors.secondary });
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" paragraph>
        Цвет
      </Typography>
      <GithubPicker
        className={classes.picker}
        onChangeComplete={(color) => onChangeComplete(color, 'primary')}
      />
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
  picker: { minWidth: 212 },
}));

export default PaletteColors;
