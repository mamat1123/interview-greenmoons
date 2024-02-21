import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import Nav from "../layouts/Nav";

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { isSessionExpired, token, tokenList } from "../store/modules/auth";

const ProtectedRoutes = () => {
  const isSessionExpiredData = useAppSelector(isSessionExpired);
  const tokenData = useAppSelector(token);
  const tokenListData = useAppSelector(tokenList);
  // TODO: Use authentication token

  return isSessionExpiredData ? <Navigate to="/login" replace /> : <Nav /> 
};

export default ProtectedRoutes;
