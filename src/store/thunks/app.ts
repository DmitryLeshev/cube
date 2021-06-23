import { Dispatch } from 'react';

import actions from '../actions';
import { RootState } from '../reducers';
import { Colors, Lang, Mode } from '../types/app';
import { AppAction } from '../types/app';

const {
  changeColor,
  changeLang,
  changeMode,
  ready,
  changeChat,
  changeNavbar,
  changeSettingbar,
} = actions.app;

export const appReady = (boolean: boolean) => async (
  dispatch: Dispatch<AppAction>,
  getState: () => RootState,
) => {
  dispatch(ready(boolean));
};

export const appChangeColors = (colors: Colors) => async (
  dispatch: Dispatch<AppAction>,
) => {
  dispatch(changeColor(colors));
};

export const appChangeLang = (lang: Lang) => async (dispatch: Dispatch<AppAction>) => {
  dispatch(changeLang(lang));
};

export const appChangeMode = (mode: Mode) => async (dispatch: Dispatch<AppAction>) => {
  dispatch(changeMode(mode));
};

export const appChangeChat = () => async (dispatch: Dispatch<AppAction>) => {
  dispatch(changeChat());
};

export const appChangeSettingbar = () => async (dispatch: Dispatch<AppAction>) => {
  dispatch(changeSettingbar());
};

export const appChangeNavbar = () => async (dispatch: Dispatch<AppAction>) => {
  dispatch(changeNavbar());
};
