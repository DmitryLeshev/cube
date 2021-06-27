import React from 'react';
import { Section, Text } from '../../components';

export default ({ data, closeTask, children }) => {
  const { type, cookie_name, code } = data?.body;
  const isCookie = type === 'Cookie';
  const baseCookieText = `При запросе с выставленным параметром Cookie «${cookie_name}» со значением «${code}» была обнаружена возможность удаленного исполнения кода ОС.`;
  return (
    <>
      {isCookie && (
        <Section>
          <Text>{baseCookieText}</Text>
        </Section>
      )}
    </>
  );
};
