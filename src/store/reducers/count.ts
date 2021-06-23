import { CountAction, CountActionTypes, CountState } from '../types/count';

const initialState: CountState = {
  count: 0,
};

export const countReducer = (state = initialState, action: CountAction): CountState => {
  switch (action.type) {
    case CountActionTypes.INCREMENT:
      return { ...state, count: state.count + 1 };

    case CountActionTypes.DECREMENT:
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
};
