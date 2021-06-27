import React from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const TYPES_VALUE = {
  0: 'Заголовок HTTP Strict Transport Security (HSTS) не реализован',
  1: 'Заголовок Referrer-Policy не реализован',
  2: 'Заголовок X-Content-Type-Options не реализован',
  3: 'Заголовок X-Frame-Options не реализован',
  4: 'Заголовок X-XSS-Protection не реализован',
  5: 'Заголовок X-XSS-Protection установлен на 0',
  6: 'Cкрипты загружаются через HTTP',
  7: 'Стили загружаются через HTTP',
  8: 'Целостность подресурсов (SRI) не реализованa',
  9: "Ссылки по умолчанию не запрещены: default-src 'none'",
  10: "Нет защиты от кликджекинга: frame-ancestors 'self|none'",
  11: 'Не указаны источники script-src, указание в default-src является неправильным',
  12: 'Источники скриптов не указаны',
  13: 'Cкрипты загружаются из разных источников',
  14: "'unsafe-inline' внутри script-src",
  15: "'unsafe-eval' внутри script-src",
  16: "'unsafe-inline' внутри style-src",
  17: "'unsafe-inline' внутри style-src / default-src",
  18: 'Не указаны ограничения object-src',
  19: 'Не устанвлен base-uri',
  20: "base-uri должен иметь значения: 'none', 'self' или конкрентые происхождения",
  21: 'Не устанвлен form-action',
  22: "form-action должен иметь значения: 'none', 'self' или конкрентые происхождения",
  23: 'Не реализованно',
  24: 'Не запрещено использовать http (Отсутвует атрибут `Secure`)',
  25: 'Нет защищиты от атак CSRF(Не установлен атрибут SameSite=Lax или Strict)',
  26: 'Установите атрибут `HttpOnly` для защиты кук от кражи',
};

const TYPES_KEYS = {
  contentSecurityPolicy: 'Content Security Policy (CSP)',
  dnsRebindingPossible: 'DNS rebinding',
  subresourceIntegrity: 'Subresource Integrity',
  strictTransportSecurity: 'Strict-Transport-Security',
  referrerPolicy: 'Referrer-Policy',
  xContentTypeOptions: 'X-Content-Type-Options',
  xXssProtection: 'X-XSS-Protection',
};

export default ({ data, closeTask, children }) => {
  const classes = useStyles();
  return (
    <>
      <ul className={classes.list}>
        <li className={classes.item}>
          <p className={clsx(classes.text, classes.key)}>Название</p>
          <p className={clsx(classes.text, classes.value)}>Значение</p>
        </li>
        {Object.keys(data?.body?.data).map((key, idx) => {
          const value = data?.body?.data[key];
          if (key === 'setCookie' || key === 'xFrameOptions') return null;

          return (
            <li key={idx} className={clsx(classes.item)}>
              <p className={clsx(classes.text, classes.key)}>{TYPES_KEYS[key]}</p>
              <p className={clsx(classes.text, classes.value)}>
                {typeof value === 'object'
                  ? value.map((v) => TYPES_VALUE[v]).join(', ')
                  : TYPES_VALUE[value]}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  code: {
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
  dots: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  list: {
    marginBottom: theme.spacing(3),
    listStyle: 'none',
    border: `1px solid ${theme.palette.divider}`,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  text: {
    width: '50%',
    padding: theme.spacing(2),
  },
  value: { borderLeft: `1px solid ${theme.palette.divider}` },
  fixed: {
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: '98%',
      transform: 'translateX(1%)',
      borderBottom: `1px solid black`,
    },
  },
}));
