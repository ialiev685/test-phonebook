import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLogged } from "redux/authorization";

export const PrivateRoute = ({ children, redirect = "/", ...routeProps }) => {
  const isLogged = useSelector(getIsLogged);

  return (
    <Route {...routeProps}>
      {isLogged ? children : <Redirect to={redirect} />}
    </Route>
  );
};
