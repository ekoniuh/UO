// eslint-disable-next-line react-hooks/exhaustive-deps

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars({ responseStatus }) {
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    // debugger;
    setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseStatus]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={responseStatus?.status} sx={{ width: "100%" }}>
        {responseStatus?.message}
      </Alert>
    </Snackbar>
  );
}
