import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';

export default ({
  classes,
  vulnerability,
  settings,
  handlerCheckbox,
  filter,
  classesId,
}: any) => (
  <FormControl component="fieldset" className={classes.filterItem}>
    <FormLabel component="legend">{filter.taskType}</FormLabel>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={classesId.includes(4)}
            onChange={handlerCheckbox}
            name="vulnerability"
          />
        }
        label={filter.vulnerabilities}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={classesId.includes(3)}
            onChange={handlerCheckbox}
            name="settings"
          />
        }
        label={filter.settings}
      />
    </FormGroup>
  </FormControl>
);
