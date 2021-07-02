import React, { ReactElement } from 'react';
import {
  BaseTextFieldProps,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import clsx from 'clsx';

interface Props extends BaseTextFieldProps {
  onChange?: any;
  value?: string;
  name?: string;
  type?: string;
  label?: string;
  helper?: string;
  icon?: React.ReactElement;
  placeholder?: string;
  disabled?: boolean;
}

export default function Input(props: Props): ReactElement {
  const { onChange, value, icon, type, label, helper, className, placeholder } = props;
  return (
    <FormControl className={clsx(className)} variant="outlined" size="small">
      {label && <InputLabel>{label}</InputLabel>}
      <OutlinedInput
        type={type ?? 'text'}
        value={value}
        onChange={onChange}
        endAdornment={icon}
        label={label}
        placeholder={placeholder}
        disabled={props.disabled}
        name={props.name}
      />
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );

  // return <TextField {...props} variant="outlined" size="small" />;
}
