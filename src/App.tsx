import React, { memo, useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { SnackbarProvider } from 'notistack';

import { useActions, useTypedSelector } from './hooks';

import { IContext } from './types/context';

import useCustomTheme from './ui/theme';
import { useTranslation } from 'react-i18next';

import build from './api';
import { auth } from './api/auth';

export const { Consumer, Provider } = React.createContext<IContext>({
  api: {},
  auth: {},
});

interface Props {
  routes: any[];
}

const appHandlers = new Map();
Object.assign(window, { appHandlers, auth });

enum AppStatus {
  LOCAL_PATH = 'app.status',
  AUTH = 'auth',
  LOGGED = 'logged',
  ACTIVATION = 'activation',
}

enum CubicStatus {
  AUTHORIZED = 'cubic-auth',
  NOT_AUTHORIZED = 'cubic-is-not-auth',
}

export type Status = 'auth' | 'logged' | 'activation' | string | null;

export default memo(function Application({ routes }: Props) {
  const { colors, mode } = useTypedSelector((state) => state.app.theme);
  const { deviceAddListAsync } = useActions();
  const { i18n } = useTranslation();
  const [api, setApi] = useState<any>();

  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const theme = useCustomTheme({
    type: mode,
    colors,
  });

  const subscrebeToInterface = (iface: any, cb: any) => {
    const subscribers = appHandlers.get(iface) || [];
    appHandlers.set(iface, [...subscribers, cb]);
    return (cb: any) => {
      const subscribers: any[] = appHandlers.get(iface);
      appHandlers.set(
        iface,
        subscribers.filter((fn) => fn !== cb),
      );
    };
  };

  async function checkAuth() {
    const { msg } = await auth.status();
    if (msg === CubicStatus.AUTHORIZED) {
      localStorage.setItem(AppStatus.LOCAL_PATH, AppStatus.LOGGED);
    } else if (msg === CubicStatus.NOT_AUTHORIZED) {
      localStorage.setItem(AppStatus.LOCAL_PATH, AppStatus.AUTH);
    }
    const status: Status = localStorage.getItem(AppStatus.LOCAL_PATH);
    if (!status || status === AppStatus.AUTH) {
      history.push('/auth');
    } else if (status === AppStatus.LOGGED) {
      if (location.pathname === '/' || location.pathname === '/auth')
        history.push('/home');
    }
  }

  useEffect(() => {
    checkAuth();
    subscrebeToInterface('auth', checkAuth);
    subscrebeToInterface('device', deviceAddListAsync);
    const interval = setInterval(() => {
      if (appHandlers.size === 0) return;
      const authHandlers = appHandlers.get('auth') ?? [];
      const deviceHandlers = appHandlers.get('device') ?? [];
      authHandlers.forEach((cb: any) => cb());
      deviceHandlers.forEach((cb: any) => cb());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    build().then(({ api, apiParams }: any) => {
      Object.assign(window, { api, apiParams });
      setApi(api);
      deviceAddListAsync();
    });
  }, []);

  console.log('[render] App');

  return (
    <Provider value={{ api, auth: { ...auth, checkAuth } }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          {renderRoutes(routes)}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
});
