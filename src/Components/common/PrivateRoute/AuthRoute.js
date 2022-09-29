import React, { useContext } from "react";
import { Context } from "../../../index";
// import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children, ...props }) => {
  const { store } = useContext(Context);
  return store.isAuth ? children : <Navigate to="/login" />;
};
