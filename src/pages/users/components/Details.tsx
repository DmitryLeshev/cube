import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { Link, useParams } from 'react-router-dom';

interface Props {
  route: any;
}

export default memo(function Details({ route }: Props) {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Details</h1>
      <div>
        Tabs
        <Link to={`/users/${id}/info`}>system</Link>
        <Link to={`/users/${id}/protected-devices`}>protected-devices</Link>
      </div>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
});
