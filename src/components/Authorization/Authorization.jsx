import React from "react";
import { NavLink } from "react-router-dom";

export const Authorization = () => {
  return (
    <>
      <NavLink activeClassName="active" className="link " to="/login">
        Login
      </NavLink>
      <NavLink activeClassName="active" className="link " to="/register">
        Register
      </NavLink>
    </>
  );
};
