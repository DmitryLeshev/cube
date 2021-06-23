import React, { memo } from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { Topbar, Settingbar } from '../../components';

interface Props {
  route: RouteConfig;
}

export default memo(function Activation({ route }: Props) {
  return (
    <>
      <Topbar />
      <Settingbar />
      <main>{renderRoutes(route.routes)}</main>
    </>
  );
});
