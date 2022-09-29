import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import React from "react";

export const CountMessage = ({ unreadMessagesCount }) => {
  return (
    <Badge badgeContent={unreadMessagesCount} color="success">
      <MailIcon color="info" />
    </Badge>
  );
};