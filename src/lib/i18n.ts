import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languages } from '../types/languages';

import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fileNames = [
  'translation',
  'incident',
  'task',
  'home',
  'common',
  'reports',
  'devices',
  'dictionaries',
  'database',
  'users',
  'auth',
  'settings',
];

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    saveMissing: true,
    debug: false,
    whitelist: languages,
    ns: fileNames,
    react: {
      useSuspense: true,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
