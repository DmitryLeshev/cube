import React from 'react';

import clsx from 'clsx';
import useStyles from './styles';

import { Typography } from '@material-ui/core';

const Label = (props: any) => {
  const {
    variant = 'contained',
    color = null,
    shape = 'square',
    children,
    style = {},
    className,
  } = props;

  const classes = useStyles();

  const rootClassName = clsx({
    [classes.root]: true,
    [classes.rounded]: shape === 'rounded',
  });

  const finalStyle = { ...style };

  if (variant === 'contained') {
    finalStyle.backgroundColor = color;
    finalStyle.color = '#FFF';
  } else {
    finalStyle.border = `1px solid ${color}`;
    finalStyle.color = color;
  }

  return (
    <Typography
      className={clsx(rootClassName, className)}
      style={finalStyle}
      variant="overline">
      {children}
    </Typography>
  );
};

export default Label;
