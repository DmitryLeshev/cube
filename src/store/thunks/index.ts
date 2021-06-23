import * as AppAction from './app';
import * as CountAction from './count';
import * as TodoAction from './todo';
import * as UserAction from './user';

export default {
  ...AppAction,
  ...UserAction,
  ...TodoAction,
  ...CountAction,
};
