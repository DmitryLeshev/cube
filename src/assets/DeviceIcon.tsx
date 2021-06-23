import React from 'react';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ComputerIcon from '@material-ui/icons/Computer';
import RouterIcon from '@material-ui/icons/Router';
import PrintIcon from '@material-ui/icons/Print';
import StorageIcon from '@material-ui/icons/Storage';
import WifiIcon from '@material-ui/icons/Wifi';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TvIcon from '@material-ui/icons/Tv';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { WifiLock } from './icons';

interface Props {
  type: number | 'wifi-lock';
  className?: any;
}

const DeviceIcon = ({ type, className }: Props) => {
  if (type === 0) return <HelpOutlineIcon className={className} />;
  if (type === 1) return <ComputerIcon className={className} />;
  if (type === 2) return <StorageIcon className={className} />;
  if (type === 3) return <PrintIcon className={className} />;
  if (type === 4) return <RouterIcon className={className} />;
  if (type === 5) return <PhoneIcon className={className} />;
  if (type === 6) return <CameraAltIcon className={className} />;
  if (type === 7) return <TvIcon className={className} />;
  if (type === 8) return <TvIcon className={className} />;
  if (type === 9) return <WifiIcon className={className} />;
  if (type === 'wifi-lock') return <WifiLock className={className} />;
  if (type === 10) return <PhoneIphoneIcon className={className} />;
  return `${type}`;
};

export default DeviceIcon;
