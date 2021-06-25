import React from 'react';
import { Consumer } from '../App';

export const withContext: any = (Component: any) => (props: any) => {
  return <Consumer>{(contexts) => <Component {...props} {...contexts} />}</Consumer>;
};
