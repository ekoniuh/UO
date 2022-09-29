import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { userSelector } from 'reducers/selectors';

import { ROUTES } from 'constants/routes';
import { CIP_TOKEN_KEY } from 'constants/token';

import { RestrictedPage } from 'components/pages/RestrictedPage';

const PrivateRoute = ({ children, roles, ...restProps }) => {
  const user = useSelector(userSelector);

  const isAuthenticated = localStorage.getItem(CIP_TOKEN_KEY);
  const accessForbidden = roles && !roles.some((role) => user.currentUser.role === role);

  return isAuthenticated ? (
    <>{accessForbidden ? <RestrictedPage /> : children}</>
  ) : (
    <Navigate to={{ pathname: ROUTES.LOGIN_PAGE }} />
  );
};

export default React.memo(PrivateRoute);
