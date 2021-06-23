export interface CountState {
  count: number;
}

export enum CountActionTypes {
  INCREMENT = '[count] increment',
  DECREMENT = '[count] decrement',
  ASYNC_INCREMENT = '[count] async increment',
  ASYNC_DECREMENT = '[count] async decrement',
}

export interface CountIncrement {
  type: CountActionTypes.INCREMENT;
}

export interface CountDecrement {
  type: CountActionTypes.DECREMENT;
}

export interface CountIncrementAsync {
  type: CountActionTypes.ASYNC_INCREMENT;
}

export interface CountDecrementAsync {
  type: CountActionTypes.ASYNC_DECREMENT;
}

export type CountAction =
  | CountIncrement
  | CountDecrement
  | CountIncrementAsync
  | CountDecrementAsync;
