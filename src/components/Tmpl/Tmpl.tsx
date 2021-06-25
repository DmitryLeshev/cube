import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles } from '@material-ui/core';

import { Page } from '@/components';
import { ITheme } from '@/types/theme';

interface Props {
  title?: string;
  leftbar?: any;
  topbar?: any;
  rightbar?: any;
  bottombar?: any;
  content?: any;
}

export default memo(function Home(props: Props) {
  const { leftbar, topbar, rightbar, bottombar, content, title } = props;
  const { t } = useTranslation();

  // `
  // "topbar topbar topbar"
  // "leftbar content content"
  // "bottombar bottombar bottombar"
  // `;

  const classes = useStyles();
  return (
    <Page title={title}>
      <div className={classes.template}>
        {topbar && <div className={classes.topbar}>{topbar}</div>}
        {leftbar && <div className={classes.leftbar}>{leftbar}</div>}
        {rightbar && <div className={classes.rightbar}>{rightbar}</div>}
        {bottombar && <div className={classes.bottombar}>{bottombar}</div>}
        {content && <div className={classes.content}>{content}</div>}
      </div>
    </Page>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    template: {
      flexGrow: 1,
      display: 'grid',
      gridTemplateAreas: `
        "leftbar content"
      `,
      gridTemplateColumns: 'min-content 1fr',
    },
    leftbar: {
      gridArea: 'leftbar',
      width: theme.drawer.openWidth,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    topbar: { gridArea: 'topbar' },
    rightbar: { gridArea: 'rightbar' },
    bottombar: { gridArea: 'bottombar' },
    content: { gridArea: 'content' },
  }),
);
