import React from 'react';
import { Redirect } from 'react-router-dom';

import { Error401, Error404, Error500 } from '../pages/errors';

const redirect404 = {
  component: () => <Redirect to="/errors/error-404" />,
};

const error401 = {
  path: '/errors/error-401',
  exact: true,
  component: Error401,
};

const error404 = {
  path: '/errors/error-404',
  exact: true,
  component: Error404,
};

const error500 = {
  path: '/errors/error-500',
  exact: true,
  component: Error500,
};

export { error401, error404, error500, redirect404 };
