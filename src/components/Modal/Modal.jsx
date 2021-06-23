import React from "react";
import { Modal, makeStyles, Backdrop, Fade } from "@material-ui/core";
import clsx from "clsx";

const CustomModal = ({
  showModal,
  closeModal,
  children,
  className,
  styles,
}) => {
  const classes = useStyles(styles);

  return (
    <Modal
      className={classes.modal}
      open={showModal}
      onClose={closeModal}
      closeAfterTransition
      disableAutoFocus
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={showModal}>
        <div className={clsx(classes.paper, className)}>{children}</div>
      </Fade>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: (styles) => ({
    minWidth: 500,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: "none",
    ...styles,
  }),
}));

export default CustomModal;
