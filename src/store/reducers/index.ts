import { combineReducers } from 'redux';

import { appReducer } from './app';
import { countReducer } from './count';
import { todosReducer } from './todo';
import { userReducer } from './user';
import { deviceReducer } from './device';
import { chatReducer } from './chat';

export const reducers = combineReducers({
  user: userReducer,
  todos: todosReducer,
  app: appReducer,
  count: countReducer,
  device: deviceReducer,
  chat: chatReducer,
});

export type RootState = ReturnType<typeof reducers>;
