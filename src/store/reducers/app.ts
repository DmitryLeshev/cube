import { AppAction, AppActionTypes, AppState, Languages, Modes } from '../types/app';

const initialState: AppState = {
  name: 'GrifBox',
  ready: false,
  isLogged: true,
  isOpenChat: false,
  lang: Languages.EN,
  navbar: true,
  settingbar: false,
  theme: {
    mode: Modes.LIGHT,
    colors: {
      primary: '#2196f3',
      secondary: '#f50057',
    },
  },
};

export const appReducer = (state = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.READY:
      return { ...state, ready: action.payload };

    case AppActionTypes.CHANGE_LANGUAGE:
      return { ...state, lang: action.payload };

    case AppActionTypes.CHANGE_MODE_THEME:
      return { ...state, theme: { ...state.theme, mode: action.payload } };

    case AppActionTypes.CHANGE_COLORS:
      return { ...state, theme: { ...state.theme, colors: action.payload } };

    case AppActionTypes.CHANGE_CHAT:
      return { ...state, isOpenChat: !state.isOpenChat };

    case AppActionTypes.CHANGE_NAV:
      return { ...state, navbar: !state.navbar };

    case AppActionTypes.CHANGE_SETTING:
      return { ...state, settingbar: !state.settingbar };

    default:
      return state;
  }
};
