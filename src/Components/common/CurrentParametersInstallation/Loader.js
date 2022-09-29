import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Box sx={{ textAlign: "right", pr: "1em" }}>
      <CircularProgress color="primary" size="6vh" disableShrink  />
    </Box>
  );
};
