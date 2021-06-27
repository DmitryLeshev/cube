import React from 'react';

export default ({ data, closeTask, children }) => {
  const { type } = data?.body;
  const isCookie = type === 'Cookie';
  return <>{isCookie ? children : '—'}</>;
};
