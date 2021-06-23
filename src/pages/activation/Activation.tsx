import React from 'react';
import { renderRoutes } from 'react-router-config';

export default ({ route }: any) => {
  return (
    <h1>
      Page Activation
      <div>{renderRoutes(route.routes)}</div>
    </h1>
  );
};
