import React from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { makeStyles, Typography } from "@material-ui/core";

import { HuePicker } from "react-color";

import { useActions, useDebounce, useColorPicker } from "../../../../hooks";

function setThemeToLocalStorage(theme) {
  localStorage.setItem("theme", JSON.stringify(theme));
}

function getThemeToLocalStorage() {
  return JSON.parse(localStorage.getItem("theme"));
}

const PaletteColors = (props) => {
  const classes = useStyles();
  const { themeConfig } = useSelector((state) => state.app);
  const { getTheme } = useActions();

  const { enqueueSnackbar } = useSnackbar();

  const primary = useColorPicker(themeConfig.colors.primary);
  const secondary = useColorPicker(themeConfig.colors.secondary);

  const debouncedChangeColors = useDebounce({
    callback: callback,
    delay: 200,
  });

  function callback() {
    getTheme();
    enqueueSnackbar(
      `[Основной]: ${primary.color}
       [Вторичный]: ${secondary.color}`,
      { variant: "success" }
    );
  }

  const onChangeComplete = (color, value) => {
    const theme = getThemeToLocalStorage();
    theme.colors[value] = color.hex;
    setThemeToLocalStorage(theme);
    value === "primary"
      ? primary.changeColor(color)
      : secondary.changeColor(color);
    debouncedChangeColors();
  };

  return (
    <div className={classes.container}>
      <Typography>Основной</Typography>
      <div className={classes.picker}>
        <HuePicker
          color={primary.color}
          onChange={(e) => onChangeComplete(e, "primary")}
          width={"100%"}
        />
      </div>
      <Typography>Вторичный</Typography>
      <div className={classes.picker}>
        <HuePicker
          color={secondary.color}
          onChange={(e) => onChangeComplete(e, "secondary")}
          width={"100%"}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3, 0),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  picker: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
}));

export default PaletteColors;
