import { applyMiddleware, compose, createStore } from 'redux';
// import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { reducers } from './reducers';

const composeEnhancers =
  ((window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
