import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogInUser, getError } from "redux/authorization";

import { Form, Button, Alert } from "react-bootstrap";
import "./viewsStyle.scss";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).required("Required"),
});

const LoginView = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector(getError);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const user = { email, password };
  //   dispatch(fetchLogInUser(user));
  //   setEmail("");
  //   setPassword("");
  // };

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   switch (name) {
  //     case "email":
  //       setEmail(value);
  //       break;
  //     case "password":
  //       setPassword(value);
  //       break;

  //     default:
  //       return;
  //   }
  // };

  return (
    <div className="form-user">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          dispatch(fetchLogInUser(values));
          actions.resetForm();
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="form-user__input">Email</Form.Label>
              <Form.Control
                autoComplete="off"
                className="form-user__field"
                type="email"
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                onChange={props.handleChange}
              />
              {props.errors.email && (
                <div id="feedback">{props.errors.email}</div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="form-user__input">Password</Form.Label>
              <Form.Control
                autoComplete="off"
                className="form-user__field"
                type="password"
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                onChange={props.handleChange}
              />
              {props.errors.password && (
                <div id="feedback">{props.errors.password}</div>
              )}
            </Form.Group>

            <Button type="submit" className="form-user__button">
              Enter
            </Button>
          </Form>
        )}
      </Formik>

      {/* <Form onSubmit={handleSubmit}>
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
      </Form> */}
      {error && (
        <Alert variant="danger" className="form-user__error">
          {error}
        </Alert>
      )}
    </div>
  );
};

export default LoginView;
