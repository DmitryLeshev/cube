import { Dispatch } from 'react';

import actions from '../actions';
import { RootState } from '../reducers';
import { CountAction } from '../types/count';

const { decrementCreator, incrementCreator } = actions.count;

export const incrementCountAsync = ({ ms }: { ms: number }) => async (
  dispatch: Dispatch<CountAction>,
  getState: () => RootState,
) => {
  setTimeout(() => {
    dispatch(incrementCreator());
  }, ms);
};

export const decrementCountAsync = ({ ms }: { ms: number }) => async (
  dispatch: Dispatch<CountAction>,
  getState: () => RootState,
) => {
  setTimeout(() => {
    dispatch(decrementCreator());
  }, ms);
};

export const incrementCount = incrementCreator;

export const decrementCount = decrementCreator;
