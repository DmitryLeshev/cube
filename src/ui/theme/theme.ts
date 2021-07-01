import React, { useEffect } from 'react';

import { createMuiTheme } from '@material-ui/core';

import { IColors } from '@/types/color';
import { Mode } from '@/types/mode';

interface Props {
  type: Mode;
  colors: IColors;
}

export const useCustomTheme = (props: Props) => {
  console.log('useCustomTheme', props);
  const { type, colors } = props;
  useEffect(() => {}, [props]);
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
    [type, colors],
  );

  return theme;
};

export default useCustomTheme;
