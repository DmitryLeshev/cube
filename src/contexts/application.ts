import Application from '@/lib/application';
import React from 'react';

export interface IAppContext {
  application?: Application;
}

const AppContext = React.createContext<IAppContext>({});

export default AppContext;
