import React, { ReactElement } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

interface Props extends ButtonProps {}

export default (props: Props): ReactElement => {
  return (
    <Button {...props} variant="outlined" size="small">
      {props.children}
    </Button>
  );
};
