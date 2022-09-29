import React from "react";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import Grow from "@material-ui/core/Grow";

export function AlertStatusRequest({ children, notification }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!notification.message) return;
    enqueueSnackbar(notification.message, {
      variant: notification.variant,
      autoHideDuration: 2000,
      TransitionComponent: Grow,
    });
  }, [enqueueSnackbar, notification]);

  return <>{children}</>;
}
