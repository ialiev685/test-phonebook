import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLogged } from "redux/authorization";

export const PublicRoute = ({
  children,
  redirect = "/",
  restricted = false,
  ...routeProps
}) => {
  const isLogged = useSelector(getIsLogged);
  const shouldRedirect = isLogged && restricted;

  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirect} /> : children}
    </Route>
  );
};
