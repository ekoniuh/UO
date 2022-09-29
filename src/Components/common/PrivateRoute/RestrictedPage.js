import React, { useContext } from "react";
// import { Context } from "../../../index";
// import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import "./RestrictedPage.css";
import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
import { Context } from "../../..";

export const RestrictedPage = ({ children, role, ...props }) => {
  // const navigate = useNavigate();

  const { store } = useContext(Context);
  // store.user?.role.toLowerCase()
  const pathname = `/${store.user?.role.toLowerCase()}/installation/1`;
  return (
    <div className="container-restricted-page">
      <h1>
        4
        <div className="lock">
          <div className="top"></div>
          <div className="bottom"></div>
        </div>
        3
      </h1>
      <p>Access denied</p>
      <Button
        onClick={() => <Navigate to={{ pathname }} />}
        variant="outlined"
        size="medium"
        sx={{ mt: 3 }}
      >
        Back to page
      </Button>
    </div>
  );
};
