import * as count from './count';

export interface Action {
  type: string;
  payload?: any;
}

export default { count };
