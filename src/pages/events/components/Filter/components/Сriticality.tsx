import React from 'react';
import { Slider, Typography } from '@material-ui/core';

const marks = Array.from(Array(11).keys()).map((el) => {
  return {
    value: el * 10,
    label: `${el}`,
    color: el < 3 ? 'success' : el < 7 ? 'warning' : 'error',
  };
});

function valuetext(value: any) {
  return `${value}°C`;
}

function valueLabelFormat(value: any) {
  return marks.findIndex((mark) => mark.value === value);
}

export default ({ criticality, handleСriticality, filter }: any) => (
  <>
    <Typography gutterBottom>{filter.criticality}</Typography>
    <Slider
      value={criticality}
      getAriaValueText={valuetext}
      onChange={handleСriticality}
      valueLabelFormat={valueLabelFormat}
      valueLabelDisplay="auto"
      step={null}
      marks={marks}
    />
  </>
);
