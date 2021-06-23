import React from 'react';
import { renderRoutes } from 'react-router-config';

export default ({ route }: any) => {
  return (
    <div>
      <h1>Page database</h1>
      <div>Search</div>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
};
