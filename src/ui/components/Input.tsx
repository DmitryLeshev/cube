import React, { ReactElement } from 'react';
import { TextField, BaseTextFieldProps } from '@material-ui/core';

interface Props extends BaseTextFieldProps {
  onChange: any;
  value: string;
  name: string;
}

export default function Input(props: Props): ReactElement {
  return <TextField {...props} variant="outlined" size="small" />;
}
