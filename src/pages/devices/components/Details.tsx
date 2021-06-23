import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';

interface Props {
  route: any;
}

export default memo(function Details({ route }: Props) {
  return (
    <div>
      <h1>Details</h1>
      <div>Tabs</div>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
});
