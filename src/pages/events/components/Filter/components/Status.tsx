import React from 'react';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';

export default ({ classes, ib, it, handlerCheckbox, filter, group }: any) => (
  <FormControl component="fieldset" className={classes.filterItem}>
    <FormLabel component="legend">{filter.status}</FormLabel>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={Number(group) === 1 || Number(group) === 0}
            onChange={handlerCheckbox}
            name="ib"
          />
        }
        label={filter.groupIS}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={Number(group) === 3 || Number(group) === 0}
            onChange={handlerCheckbox}
            name="it"
          />
        }
        label={filter.groupIT}
      />
    </FormGroup>
  </FormControl>
);
