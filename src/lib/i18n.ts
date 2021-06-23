declare var process: {
  env: {
    NODE_ENV: string;
  };
};

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { languages, Languages } from '../types/lang/languages';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const ext = 'json';
const basePath = 'locales';
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
];

// i18n.setDefaultNamespace('translation');

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: Languages.RU,
    fallbackLng: Languages.RU, // Если не находит язык, то выбирает этот
    saveMissing: true,
    debug: false,
    whitelist: languages,
    ns: fileNames,
    react: {
      useSuspense: true,
    },
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
  });

const request = async ({
  fileName,
  language,
}: {
  fileName: string;
  language: string;
}) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const methodName = fileName?.[0].toUpperCase() + fileName.slice(1);
      // тут должен будет быть fetch
      // return await query(`getJson${methodName}`, { lang: language });
    } else {
      const res = await fetch(`/${basePath}/${language}/${fileName}.${ext}`);
      return await res.json();
    }
  } catch (error) {
    console.log('[utils/i18n] -> request: block catch', error);
  }
};

// for (const fileName of fileNames) {
//   languages.forEach(async (language) => {
//     const data = await request({ fileName, language });
//     i18n.addResourceBundle(language, fileName, data);
//   });
// }

export default i18n;
