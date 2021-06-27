import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Section, Text, Title } from '../../components';

export default ({ data, closeTask, children }) => {
  const classes = useStyles();
  const isBasePage = data?.body?.type === 'BasePage';
  const basePageText = `При запросе страницы «${data?.body?.url}» был обнаружен вывод серверных ошибок. Вывод ошибок необходимо убрать во избежание использования их злоумышленником для раскрытия паролей, серверных путей файловой системы и т.д.`;
  return (
    <>
      {
        <Section>
          <Title>Уязвимости</Title>
        </Section>
      }
      {isBasePage && (
        <Section>
          <Text>{basePageText}</Text>
        </Section>
      )}
      {data?.body?.data?.info?.error?.map((err, idx) => (
        <Section key={idx + err}>
          <p className={classes.code}>
            <code>{err}</code>
          </p>
        </Section>
      ))}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  code: {
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
}));
