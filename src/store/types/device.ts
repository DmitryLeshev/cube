export enum TypeDevice {
  'unknown' = 0,
  'station' = 1,
  'server' = 2,
  'printer' = 3,
  'router' = 4,
  'ip_telephony' = 5,
  'camera' = 6,
  'tv' = 7,
  'tv_box' = 8,
  'wifi' = 9,
  'phone' = 10,
  'security' = 11,
  'cash' = 12,
  'bluetooth' = 13,
}

export enum OnlineDevice {
  ONLINE = 1,
  OFFLINE = 0,
}

export enum DhcpStatusDevice {
  REACHABLE = 'REACHABLE',
  PERMANENT = 'PERMANENT',
  STALE = 'STALE',
  DELAY = 'DELAY',
}

export interface ItemDevice {
  id: number;
  name: string;
  ip: string;
  type: TypeDevice;
  mac: string;
  online: OnlineDevice;
  agent: false;
  os: string;
  isUserOs: false;
  dhcpStatus: DhcpStatusDevice;
  sip: number;
}

export interface DeviceState {
  list: ItemDevice[];
}

export enum DeviceActionTypes {
  ADD_LIST = '[device] add devices to the list',
  ADD_DETAILS = '[device] add device details',
}

export interface DeviceAddList {
  type: DeviceActionTypes.ADD_LIST;
  payload: ItemDevice[];
}

export interface DeviceAddDetails {
  type: DeviceActionTypes.ADD_DETAILS;
  payload: any;
}

export type DeviceAction = DeviceAddList | DeviceAddDetails;
