import React, { memo, useEffect, Suspense, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import {
  CssBaseline,
  ThemeProvider,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

import { SnackbarProvider } from 'notistack';

import { useTypedSelector } from './hooks';

import { IContext } from './types/context/context';

import useCustomTheme from './ui/theme';
import { useTranslation } from 'react-i18next';
import { Languages } from './types/lang/languages';

export const { Consumer, Provider } = React.createContext<IContext>({
  api: {},
});

export const withContext: any = (Component: any) => (props: any) => {
  return <Consumer>{(contexts) => <Component {...props} {...contexts} />}</Consumer>;
};

interface Props {
  routes: any[];
}

export default memo(function Application({ routes }: Props) {
  const { colors, mode } = useTypedSelector((state) => state.app.theme);
  const { i18n } = useTranslation();

  const location = useLocation();
  const history = useHistory();

  const theme = useCustomTheme({
    type: mode,
    colors,
  });

  const classes = useStyles();

  useEffect(() => {
    // Проверка в локал сторажде на тему, язык, авторизацию, и статус приложения
    const lang = localStorage.getItem('i18nextLng');
    const status = localStorage.getItem('app.status');

    if (!lang) {
      localStorage.setItem('i18nextLng', Languages.RU);
      i18n.changeLanguage(Languages.RU);
    } else i18n.changeLanguage(lang);

    if (!status) {
      localStorage.setItem('app.status', 'auth');
      history.push('/auth');
    }

    if (status === 'auth') history.push('/auth');

    if (status === 'logged') {
      if (location.pathname === '/') history.push('/home');
    }
  }, []);

  // if (!i18nReady) {
  //   return (
  //     <div className={classes.root}>
  //       <LinearProgress />
  //       <LinearProgress color="secondary" />
  //     </div>
  //   );
  // }

  return (
    <Provider
      value={{
        api: {},
      }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          {renderRoutes(routes)}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);
