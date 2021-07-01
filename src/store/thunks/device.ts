import { Dispatch } from 'react';

import actions from '../actions';
import { RootState } from '../reducers';
import { DeviceAction, ItemDevice } from '../types/device';

import { isEquals } from '@/utils';
import api from '@/api';

const { deviceAddDetails, deviceAddList } = actions.device;

declare global {
  interface Window {
    api: any;
  }
}

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
  const res: Response<ItemDevice[]> = await api.device.list();
  const { data, msg, status } = res;
  if (list === data) return;
  if (isEquals(list, data)) return;
  dispatch(deviceAddList(data ?? []));
};

export const deviceAddDetailsAsync = () => async (
  dispatch: Dispatch<DeviceAction>,
  getState: () => RootState,
) => {
  console.log('deviceAddDetailsAsync');
  // dispatch(deviceAddDetails());
};
