import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogInUser, getError } from "redux/authorization";

import { Form, Button, Alert } from "react-bootstrap";
import "./viewsStyle.scss";

const LoginView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector(getError);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email, password };
    dispatch(fetchLogInUser(user));
    setEmail("");
    setPassword("");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        return;
    }
  };

  return (
    <div className="form-user">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form-user__input">Email</Form.Label>
          <Form.Control
            autoComplete="off"
            className="form-user__field"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="form-user__input">Password</Form.Label>
          <Form.Control
            autoComplete="off"
            className="form-user__field"
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="form-user__button">
          Enter
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="form-user__error">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default LoginView;
