import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';

interface Props {
  route: any;
}

export default memo(function Settings({ route }: Props) {
  return (
    <div>
      <h1>Settings</h1>
      <div>
        Tabs
        <Link to={`/settings/system`}>system</Link>
        <Link to={`/settings/devices`}>devices</Link>
        <Link to={`/settings/white-list`}>white-list</Link>
      </div>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
});
