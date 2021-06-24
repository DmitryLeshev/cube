import React from 'react';
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Tooltip } from '../../../../../components';

export default ({ classes, user, responsibles, filter }: any) => (
  <FormControl variant="outlined" size="small" className={classes.filterItem}>
    <InputLabel>{filter.users}</InputLabel>
    <Select
      value={user.value}
      onChange={user.onChange}
      label="По пользователям"
      SelectDisplayProps={{ style: { display: 'flex', alignItems: 'center' } }}>
      <MenuItem value={0}>
        <Avatar className={classes.icon}></Avatar>
        {filter.all}
      </MenuItem>
      {responsibles?.value?.map((responsible: any) => (
        <MenuItem key={responsible.id} value={responsible.id}>
          <Avatar className={classes.icon}>
            <img
              src={`data:image/jpeg;base64, ${responsible.avatar}`}
              alt={responsible.login}
            />
          </Avatar>
          <Tooltip word={responsible.login} maxLength={16} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
