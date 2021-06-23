import {
  CountActionTypes,
  CountDecrement,
  CountDecrementAsync,
  CountIncrement,
  CountIncrementAsync,
} from '../types/count';

const incrementCreator = (): CountIncrement => ({
  type: CountActionTypes.INCREMENT,
});
const decrementCreator = (): CountDecrement => ({
  type: CountActionTypes.DECREMENT,
});
const incrementCreatorAsync = (): CountIncrementAsync => ({
  type: CountActionTypes.ASYNC_INCREMENT,
});
const decrementCreatorAsync = (): CountDecrementAsync => ({
  type: CountActionTypes.ASYNC_DECREMENT,
});

export default {
  incrementCreator,
  decrementCreator,
  incrementCreatorAsync,
  decrementCreatorAsync,
};
