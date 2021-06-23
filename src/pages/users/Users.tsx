import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';

interface Props {
  route: any;
}

export default memo(function Users({ route }: Props) {
  return (
    <div>
      <h1>Users</h1>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
});
