import React, { useContext } from "react";
import { Context } from "../../../index";
// import { observer } from "mobx-react-lite";
// import { toJS } from "mobx";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { RestrictedPage } from "../PrivateRoute/RestrictedPage";

export const ProtectedRoute = ({ children, roles, ...props }) => {
  
  const { store } = useContext(Context);
  const isAuthenticated = store.isAuth;
  const accessForbidden = roles && store.user?.role && !roles.some((role) => store.user?.role === role);

  return isAuthenticated ? (
    <>{accessForbidden ? <RestrictedPage /> : children}</>
  ) : (
    <Navigate to={{ pathname: ROUTES.LOGIN_PAGE }} />
  );
};
