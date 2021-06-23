import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { Link, useParams } from 'react-router-dom';

interface Props {
  route: any;
}

export default memo(function Incidents({ route }: Props) {
  const { eventId, status } = useParams<{ eventId: string; status: string }>();
  return (
    <div>
      <h1>Tasks, status: {status}</h1>
      <div>
        Tabs
        <Link to={`/events/tasks/in-work`}>in-work</Link>
        <Link to={`/events/tasks/deferred`}>deferred</Link>
        <Link to={`/events/tasks/canceled`}>canceled</Link>
        <Link to={`/events/tasks/completed`}>completed</Link>
      </div>
      <div>{renderRoutes(route.routes, { eventId })}</div>
    </div>
  );
});
