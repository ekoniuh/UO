import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import React from "react";

export const CountMessage = ({ unreadMessagesCount }) => {
  return (
    <Badge badgeContent={unreadMessagesCount} color="secondary">
      <MailIcon color="action" />
    </Badge>
  );
};
