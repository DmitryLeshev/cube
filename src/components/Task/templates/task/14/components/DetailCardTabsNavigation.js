import React, { useState } from 'react';

import { Tabs, Tab, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tabs: {
    position: 'relative',
    display: 'flex',
    margin: '0',
    background: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const DetailCardTabsNavigation = ({ setTabId, tabId, tabsConfig }) => {
  const classes = useStyles();

  const [id, setId] = useState(0);

  const handleChange = (event, newId) => {
    setId(newId);
    setTabId(newId);
  };

  return (
    <Tabs
      className={classes.tabs}
      value={id}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="auto">
      {tabsConfig.map((tabDetails) => {
        return <Tab key={tabDetails.value} label={tabDetails.label} />;
      })}
    </Tabs>
  );
};

export default DetailCardTabsNavigation;
