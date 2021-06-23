import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';

interface Props {
  route: any;
}

export default memo(function Reports({ route }: Props) {
  return (
    <div>
      <h1>Reports</h1>
      <h3>Формирование</h3>
      <h3>Готовые</h3>
      <h3>Автовыпуск отчетов</h3>
      <div>{renderRoutes(route.routes)}</div>
    </div>
  );
});
