import React from "react";
import avatar from "./avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getUserName } from "redux/authorization";
import { fetchLogOut } from "redux/authorization";
import { Button } from "react-bootstrap";
import "./UserMenu.scss";

export const UserMenu = () => {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  return (
    <div className="user-menu">
      <span className="user-menu__text">Hi, {userName}</span>
      <div className="user-menu__box">
        <img className="user-menu__avatar" src={avatar} alt="Аватарка" />
      </div>
      <Button
        variant="outline-light"
        size="sm"
        type="button"
        onClick={() => dispatch(fetchLogOut())}
      >
        exit
      </Button>
    </div>
  );
};
