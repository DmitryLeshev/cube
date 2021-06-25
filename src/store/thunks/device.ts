import { Dispatch } from 'react';

import actions from '../actions';
import { RootState } from '../reducers';
import { DeviceAction, ItemDevice } from '../types/device';

const { deviceAddDetails, deviceAddList } = actions.device;

declare global {
  interface Window {
    api: any;
  }
}

// enum Status {
//   status
// }

interface Response<T> {
  status: boolean;
  data: T;
  msg: string;
  error: string;
}

export const deviceAddListAsync = () => async (
  dispatch: Dispatch<DeviceAction>,
  getState: () => RootState,
) => {
  const { list } = getState().device;
  const res: Response<ItemDevice[]> = await window.api.device.list();
  const { data, msg, status } = res;
  // if (list === data) return;
  dispatch(deviceAddList(data));
};

export const deviceAddDetailsAsync = () => async (
  dispatch: Dispatch<DeviceAction>,
  getState: () => RootState,
) => {
  console.log('deviceAddDetailsAsync');
  // dispatch(deviceAddDetails());
};
