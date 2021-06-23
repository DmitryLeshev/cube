import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { makeStyles } from "@material-ui/core";

import { CardHeader, CardBody, CardFooter } from "./components";

import dependencies from "./dependencies";
import props from "./props";
import { Tooltip } from "..";
import { useTranslation } from "react-i18next";

const { DeviceIcon } = dependencies.icon;

const CardList = ({ task, openTask }) => {
  const { t } = useTranslation();
  const tBase = `task:item`;

  const taskСriticality = t(`${tBase}.taskСriticality`);
  const device = t(`${tBase}.device`);
  const wifi = t(`${tBase}.wifi`);
  const priority = t(`${tBase}.priority`);
  const tall = t(`${tBase}.tall`);
  const normal = t(`${tBase}.normal`);

  const color = task.crt <= 3 ? "success" : task.crt <= 6 ? "warning" : "error";
  const classes = useStyles({ color });

  const { url } = useRouteMatch();

  const handlerClick = (e) => {
    if (e.target.nodeName === "A") return;
    openTask(task.id);
  };

  const isIncident = !!url.split("/").find((path) => path === "incident");
  const isSetting = task?.class === 3;

  const headerProps = props.header({ data: task });
  const footerProps = props.footer({ data: task });

  const INFO = {
    1: {
      label: device,
      url: "local",
    },
    2: {
      label: wifi,
      url: "wifi",
    },
  };

  return (
    <div className={classes.root} onClick={handlerClick}>
      <CardHeader {...headerProps} />
      <CardBody>
        <ul className={classes.list}>
          <li className={classes.item}>
            {isSetting ? (
              <p className={classes.itemKey}>
                Требуется указать параметры сканирования
              </p>
            ) : (
              <>
                <p className={classes.itemKey}>
                  {isIncident ? priority : taskСriticality}
                </p>
                {isIncident ? (
                  <span className={classes.priority}>
                    {task.priority ? tall : normal}
                  </span>
                ) : (
                  <>
                    <span className={classes.itemValue}>{task.crt}</span>&nbsp;/
                    10
                  </>
                )}
              </>
            )}
          </li>
          <li className={classes.item}>
            <p className={classes.itemKey}>{INFO[task.entityType]?.label}</p>
            <span className={classes.itemValue}></span>
            <DeviceIcon type={task.typeIco} className={classes.icon} />
            <Link
              className={classes.link}
              to={`/devices/${INFO[task.entityType]?.url}/${
                task.entityId
              }/information`}
            >
              <Tooltip word={task.name || "Скрытая сеть"} maxLength={25} />
            </Link>
          </li>
        </ul>
      </CardBody>
      <CardFooter {...footerProps} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 3, 2),
    minHeight: "100px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    cursor: "pointer",
    transition: "all 0.3s ease-out",
    "&:hover": {
      boxShadow: theme.shadows[5],
    },
    "&:last-child": {
      marginBootm: theme.spacing(0),
    },
    "&:first-child": {
      marginTop: theme.spacing(1.5),
    },
  },
  list: {
    listStyle: "none",
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.3, 0),
  },
  itemKey: {
    ...theme.typography.h6,
    display: "block",
    minWidth: 150,
  },
  itemValue: ({ color }) => ({
    ...theme.typography.body1,
    marginLeft: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette[color].light,
  }),
  icon: {
    width: 15,
    marginRight: theme.spacing(1),
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    transition: "all 0.3s",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  priority: { marginLeft: theme.spacing(2) },
}));

export default CardList;
