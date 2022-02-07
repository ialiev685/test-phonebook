import React from "react";
import "./viewsStyle.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUser, getError } from "redux/authorization";
import { Form, Button, Alert } from "react-bootstrap";

const RigisterView = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const error = useSelector(getError);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "name":
        setName(value);
        break;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password };

    dispatch(fetchRegisterUser(user));
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form-user">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label className="form-user__input">Name</Form.Label>
          <Form.Control
            autoComplete="off"
            className="form-user__field"
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

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

        <Button type="submit" className="form-user__button">
          Register
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
export default RigisterView;
