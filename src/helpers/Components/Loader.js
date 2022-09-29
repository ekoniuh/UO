import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const Loader = ({ isLoading, size = "15vh", lineHeight = "calc(100vh - 80px)" }) => {
  if (!isLoading) return null;

  return (
    <Box sx={{ lineHeight: { lineHeight }, textAlign: "center", m: "auto" }}>
      <CircularProgress color="primary" size={size} disableShrink />
    </Box>
  );
};
