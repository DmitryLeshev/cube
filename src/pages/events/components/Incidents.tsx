import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { useParams } from 'react-router-dom';

interface Props {
  route: any;
}

export default memo(function Incidents({ route }: Props) {
  const { eventId } = useParams<{ eventId: string }>();
  return (
    <div>
      <h1>Incidents</h1>
      <div>{renderRoutes(route.routes, { eventId })}</div>
    </div>
  );
});
