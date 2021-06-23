import React from "react";

import { Switch, Typography, makeStyles } from "@material-ui/core";
import { useActions, useTypedSelector } from "../../../../hooks";
import { useSnackbar } from "notistack";

const ModesThemes = (props) => {
  const classes = useStyles();
  const { theme: themeConfig } = useTypedSelector((state) => state.app);
  const { getTheme } = useActions();

  const { enqueueSnackbar } = useSnackbar();

  function onChange() {
    const theme = {
      ...themeConfig,
      type: themeConfig.mode === "dark" ? "light" : "dark",
    };
    getTheme(theme);
    enqueueSnackbar(
      JSON.parse(localStorage.getItem("theme")).type === "dark"
        ? `Ночная тема`
        : `Дневная тема`,
      {
        variant: "success",
      }
    );
  }

  return (
    <div className={classes.modesThemes}>
      <Typography className={classes.modesThemeTitle} variant="h5">
        Режим темы
      </Typography>

      <div className={classes.switch}>
        <Typography className={classes.switchItem} variant="button">
          Светлая тема
        </Typography>

        <Switch
          checked={themeConfig.type === "dark" ? true : false}
          onChange={onChange}
        />

        <Typography className={classes.switchItem} variant="button">
          Тёмная тема
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  modesThemes: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  modesThemeTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  switch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-beetwen",
  },
  switchItem: {
    textAlign: "center",
  },
}));

export default ModesThemes;
