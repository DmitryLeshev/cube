import React from 'react';

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Tooltip, DeviceIcon } from '@/components';

export default ({ classes, device, devices, filter }: any) => (
  <FormControl variant="outlined" size="small" className={classes.filterItem}>
    <InputLabel>{filter.devices}</InputLabel>
    <Select
      value={device.value}
      onChange={device.onChange}
      label="По устройствам"
      SelectDisplayProps={{ style: { display: 'flex', alignItems: 'center' } }}>
      <MenuItem value={0}>
        <DeviceIcon className={classes.icon} type={1} />
        {filter.all}
      </MenuItem>
      {devices?.value?.map((d: any) => (
        <MenuItem
          key={`${d.entityId}+${d.entityType}`}
          value={JSON.stringify({
            entityId: d.entityId,
            entityType: d.entityType,
          })}>
          <DeviceIcon className={classes.icon} type={d.typeId} />
          <Tooltip word={d.name} maxLength={16} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
