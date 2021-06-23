import React from 'react';

export type Code = 401 | 404 | 500;

export enum Codes {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

import { Error401, Error404, Error500 } from '.';

interface Props {
  code: Code;
}

export default (props: Props) => {
  const { code } = props;
  if (code === Codes.UNAUTHORIZED) return <Error401 />;
  if (code === Codes.NOT_FOUND) return <Error404 />;
  if (code === Codes.SERVER_ERROR) return <Error500 />;
  return <div>Error</div>;
};
