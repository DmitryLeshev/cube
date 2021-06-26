import React, { ReactElement } from 'react';

import { ListItem, ListItemProps } from '@material-ui/core';

interface Props extends ListItemProps {}

export default function UIListItem(props: Props): ReactElement {
  return <ListItem {...props} />;
}
