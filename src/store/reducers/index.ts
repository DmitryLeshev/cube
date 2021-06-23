import { combineReducers } from 'redux';

import { appReducer } from './app';
import { countReducer } from './count';
import { todosReducer } from './todo';
import { userReducer } from './user';

export const reducers = combineReducers({
  user: userReducer,
  todos: todosReducer,
  app: appReducer,
  count: countReducer,
});

export type RootState = ReturnType<typeof reducers>;
