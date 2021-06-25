import * as AppAction from './app';
import * as CountAction from './count';
import * as TodoAction from './todo';
import * as UserAction from './user';
import * as DeviceAction from './device';

export default {
  ...DeviceAction,
  ...AppAction,
  ...UserAction,
  ...TodoAction,
  ...CountAction,
};
