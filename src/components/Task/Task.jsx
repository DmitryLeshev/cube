import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router";

import { Dialog, Divider, makeStyles } from "@material-ui/core";

import {
  CardActions,
  CardHeader,
  CardBody,
  CardSidebar,
  CardFooter,
  TemplateInfo,
  DefaultDescription,
} from "./components";

import { TasksStatus } from "./config/task";
import { downloadTemplate } from "./lib";
import props from "./props";
import api from "./api";
import { LoaderIndicator } from "..";

const Task = ({ open = true, closeTask, updateItem }) => {
  const classes = useStyles();

  const { url } = useRouteMatch();

  const controller = !!url.split("/").find((el) => el === "incident")
    ? "incident"
    : "task";

  const [state, setState] = useState(null);
  const { taskId: id, status } = useParams();

  async function fetchTask() {
    const res = await api[controller].get({ id });
    setState(res);
  }

  useEffect(() => {
    fetchTask();
  }, []);

  if (!state)
    return (
      <Dialog
        open={open}
        onClose={closeTask}
        PaperProps={{ className: classes.root }}
      >
        <LoaderIndicator />
      </Dialog>
    );

  const headerProps = props.header({
    data: state,
    windowCard: true,
    closeTask,
  });
  const actionProps = props.action({ data: state, closeTask, updateItem });
  const templateProps = props.template({
    data: state,
    closeTask,
    api,
    fetchTask,
  });
  const footerProps = props.footer({ data: state, windowCard: true });
  const chatProps = props.chat({ data: state });
  const infoProps = props.info({ data: state });
  const defaultDescriptionProps = props.defaultDescription({
    data: state,
    controller,
  });

  const file = downloadTemplate({ number: state.type, controller });
  const Template = file.Template;
  const TemplateActions = file.Actions;

  return (
    <Dialog
      open={open}
      onClose={closeTask}
      PaperProps={{ className: classes.root }}
    >
      <div className={classes.container}>
        <CardHeader {...headerProps} />
        <CardBody windowCard={true}>
          <TemplateInfo {...infoProps} />
          <Template {...templateProps}>
            <DefaultDescription {...defaultDescriptionProps} />
          </Template>
        </CardBody>
        {status !== TasksStatus.COMPLETED && <Divider />}
        <CardActions {...actionProps}>
          <TemplateActions {...templateProps} />
        </CardActions>
        <CardFooter {...footerProps} />
      </div>
      <CardSidebar {...chatProps} />
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    height: "95%",
    maxWidth: 1420,
    maxHeight: "95%", //mb v px cdelat'
    margin: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: 4,
    overflow: "hidden",
    color: "#000",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "calc(100% - 370px)",
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default Task;
