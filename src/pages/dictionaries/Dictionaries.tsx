import React from 'react';
import { renderRoutes } from 'react-router-config';

export default ({ route }: any) => {
  return (
    <div>
      <h1>Page Dictionaries</h1>
      <div>Tabs</div>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
};
