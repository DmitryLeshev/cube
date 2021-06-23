import React, { ReactElement } from 'react';

import { Typography, TypographyProps } from '@material-ui/core';

interface Props extends TypographyProps {}

export default function T(props: any): ReactElement {
  return <Typography {...props}>{props.children}</Typography>;
}
