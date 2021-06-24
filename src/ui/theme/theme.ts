import React from 'react';

import { createMuiTheme } from '@material-ui/core';

import { IColors } from '../../types/color';
import { Mode } from '../../types/theme/mode';

interface Props {
  type: Mode;
  colors: IColors;
}

export const useCustomTheme = (props: Props) => {
  const { type, colors } = props;
  const theme = React.useMemo(
    () =>
      createMuiTheme(
        {
          palette: {
            type,
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary,
            },
          },
        },
        {
          drawer: {
            closeWidth: 0,
            openWidth: 220,
            transition: '0.3s ease-out',
          },
          header: {
            height: 72,
          },
          main: {},
        },
      ),
    [props],
  );

  return theme;
};

export default useCustomTheme;
