import React, { memo } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

interface Props {
  route: RouteConfig;
}

export default memo(function Error({ route }: Props) {
  return (
    <>
      <main>{renderRoutes(route.routes)}</main>
    </>
  );
});
