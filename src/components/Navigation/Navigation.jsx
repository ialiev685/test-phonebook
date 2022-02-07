import React from "react";
import { NavLink } from "react-router-dom";
import { Authorization } from "components/Authorization";
import { useSelector } from "react-redux";
import { getIsLogged } from "redux/authorization";
import { UserMenu } from "components/UserMenu";
import Container from "components/Container";
import "./Navigation.scss";

export const Navigation = () => {
  const isLogged = useSelector(getIsLogged);

  return (
    <header className="header">
      <Container>
        <nav className="navigation">
          <NavLink className="link" activeClassName="active" exact to="/">
            Home
          </NavLink>
          {isLogged && (
            <NavLink className="link" activeClassName="active" to="/contacts">
              Contacts
            </NavLink>
          )}

          <div className="navigation__authorization">
            {isLogged ? <UserMenu /> : <Authorization />}
          </div>
        </nav>
      </Container>
    </header>
  );
};
