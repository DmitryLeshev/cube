const defaultState = {
  'setting.theme': {
    mode: 'light',
    colors: {
      primary: '#2196f3',
      secondary: '#f50057',
    },
  },
  i18nextLng: 'ru',
  'application.status': 'auth',
  'application.settingbar': false,
  'application.navbar': true,
};

class LocalStorageService {
  ls = window.localStorage;
  state: any = {};
  constructor() {
    this.init();
  }

  setItem(key: string, value: any) {
    value = JSON.stringify(value);
    return this.ls.setItem(key, value);
  }

  getItem(key: string) {
    const value: any = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  init() {
    const items = { ...this.ls };
    Object.entries(defaultState).forEach(([defaultKey, defaultValue]) => {
      const value = items[defaultKey];
      if (!value) this.setItem(defaultKey, defaultValue);
    });
  }

  clear() {
    this.ls.clear();
  }
}

export default LocalStorageService;
