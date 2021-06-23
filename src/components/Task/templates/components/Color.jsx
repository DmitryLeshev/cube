import React from "react";

import { makeStyles } from "@material-ui/core";

const Color = (props) => {
  const classes = useStyles(props);
  return <span className={classes.color}>{props.children}</span>;
};

const useStyles = makeStyles((theme) => ({
  color: ({ styles, color }) => ({
    color: color || theme.palette.error.light,
    ...styles,
  }),
}));

export default Color;
