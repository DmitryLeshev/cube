import React from 'react';
import { AppContext } from '@/contexts';

export const withAppContext: any = (Component: any) => (props: any) => {
  return (
    <AppContext.Consumer>
      {(contexts) => <Component {...props} {...contexts} />}
    </AppContext.Consumer>
  );
};
