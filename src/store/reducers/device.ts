import { DeviceState, DeviceAction, DeviceActionTypes } from '../types/device';

const initialState: DeviceState = {
  list: [],
};

export const deviceReducer = (
  state = initialState,
  action: DeviceAction,
): DeviceState => {
  switch (action.type) {
    case DeviceActionTypes.ADD_LIST:
      return { ...state, list: action.payload };

    case DeviceActionTypes.ADD_DETAILS:
      return { ...state };

    default:
      return state;
  }
};
