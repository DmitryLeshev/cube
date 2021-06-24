import { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { useParams } from 'react-router-dom';

interface Props {
  route: any;
}

export type EventsType = 'incidents' | 'tasks';
export enum EventsTypes {
  INCIDENTS = 'incidents',
  TASKS = 'tasks',
}
export default memo(function Events({ route }: Props) {
  const { type } = useParams<{ type: EventsType }>();
  return renderRoutes(route.routes, { type });
});
