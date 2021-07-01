import React, { memo, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { SnackbarProvider } from 'notistack';

import { useActions, useTypedSelector } from './hooks';

import useCustomTheme from './ui/theme';

// Временное решение
enum AppStatus {
  LOCAL_PATH = 'application.status',
  AUTH = 'auth',
  LOGGED = 'logged',
  ACTIVATION = 'activation',
}
// Временное решение
enum CubicStatus {
  AUTHORIZED = 'cubic-auth',
  NOT_AUTHORIZED = 'cubic-is-not-auth',
}
// Временное решение
interface InitAppSubscriptionsDTO {
  long: any[];
  normal: any[];
  short: any[];
}
// Временное решение
export type Status = 'auth' | 'logged' | 'activation' | string | null;

interface Props extends IAppContext {
  routes: any[];
}

import { withAppContext } from '@/hocs';
import { IAppContext } from '@/contexts/application';
import { TypesLocalStorage } from './types';

export default withAppContext(
  memo(function Application({ routes, application }: Props) {
    const app = useTypedSelector((state) => state.app);
    const {
      deviceAddListAsync,
      appChangeColors,
      appChangeMode,
      appChangeNavbar,
      appChangeSettingbar,
    } = useActions();

    const location = useLocation();
    const history = useHistory();

    const theme = useCustomTheme({
      type: app.theme.mode,
      colors: app.theme.colors,
    });

    function changeNavbar(navbar: boolean) {
      appChangeNavbar();
      application?.ls.setItem(TypesLocalStorage.LocalStorageKeys.NAVBAR, !navbar);
    }

    function changeSettingsbar(settingbar: boolean) {
      appChangeSettingbar();
      application?.ls.setItem(TypesLocalStorage.LocalStorageKeys.SETTINGS, !settingbar);
    }

    // Временное решение
    async function checkAuth() {
      const { msg } = await application?.api.auth.status();
      if (msg === CubicStatus.AUTHORIZED) {
        localStorage.setItem(AppStatus.LOCAL_PATH, AppStatus.LOGGED);
      } else if (msg === CubicStatus.NOT_AUTHORIZED) {
        localStorage.setItem(AppStatus.LOCAL_PATH, AppStatus.AUTH);
      }
      const status: Status = localStorage.getItem(AppStatus.LOCAL_PATH);
      if (!status || status === AppStatus.AUTH) {
        history.push('/auth');
      } else if (status === AppStatus.LOGGED) {
        if (location.pathname === '/' || location.pathname === '/auth') {
          console.log('home');
          history.push('/home');
        }
      }
    }

    async function initTheme() {
      let theme = JSON.parse(localStorage.getItem('setting.theme') ?? '');
      if (!theme) theme = app.theme;
      appChangeColors(theme.colors);
      appChangeMode(theme.mode);
    }

    useEffect(() => {
      Object.assign(application?.bars, { changeNavbar, changeSettingsbar });
      Object.assign(application?.auth, { checkAuth });
      checkAuth();
      deviceAddListAsync();
      initTheme();

      const defaultSubs: InitAppSubscriptionsDTO = {
        long: [checkAuth, deviceAddListAsync],
        normal: [],
        short: [],
      };

      Object.entries(defaultSubs).forEach(([type, subs]) => {
        subs.forEach((sub: any) => application?.subs.subscribe(type, sub));
      });
      const intervals = application?.subs.initSubscriptions();
      return () => {
        intervals?.map((interval: any) => clearInterval(interval));
      };
    }, []);

    useEffect(() => {}, []);

    return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          {renderRoutes(routes)}
        </SnackbarProvider>
      </ThemeProvider>
    );
  }),
);
