import React from 'react';
import { renderRoutes } from 'react-router-config';

export default ({ route }: any) => {
  return (
    <div>
      <h1>Page Devices</h1>
      <div>Left bar</div>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
};
