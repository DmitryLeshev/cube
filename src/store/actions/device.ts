import {
  DeviceAddList,
  DeviceAddDetails,
  DeviceActionTypes,
  ItemDevice,
} from '../types/device';

const deviceAddList = (list: ItemDevice[]): DeviceAddList => ({
  type: DeviceActionTypes.ADD_LIST,
  payload: list,
});
const deviceAddDetails = (details: any): DeviceAddDetails => ({
  type: DeviceActionTypes.ADD_DETAILS,
  payload: details,
});

export default {
  deviceAddList,
  deviceAddDetails,
};
