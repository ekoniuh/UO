import React from "react";

export const CountMessage = ({ unreadMessagesCount }) => {
  return <span style={{ color: "red", fontWeight: 600 }}>{unreadMessagesCount || "0"}</span>;
};
