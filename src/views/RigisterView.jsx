import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./viewsStyle.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisterUser, getError, getUserName } from "redux/authorization";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6).required("Required"),
});

const RigisterView = () => {
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector(getError);
  const userName = useSelector(getUserName);

  const isRedirect = redirect && userName;

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   switch (name) {
  //     case "name":
  //       setName(value);
  //       break;
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const user = { name, email, password };

  //   dispatch(fetchRegisterUser(user));
  //   setName("");
  //   setEmail("");
  //   setPassword("");
  //   setRedirect(true);
  // };

  return (
    <div className="form-user">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          dispatch(fetchRegisterUser(values));
          setRedirect(true);
          actions.resetForm();
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label className="form-user__input">Name</Form.Label>
              <Form.Control
                autoComplete="off"
                className="form-user__field"
                onBlur={props.handleBlur}
                type="text"
                value={props.values.name}
                name="name"
                onChange={props.handleChange}
              />
              {props.errors.name && (
                <div id="feedback">{props.errors.name}</div>
              )}
            </Form.Group>

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
              Register
            </Button>
          </Form>
        )}
      </Formik>

      {error && (
        <Alert variant="danger" className="form-user__error">
          {error}
        </Alert>
      )}
      {isRedirect && <Redirect to="/login" />}
    </div>
  );
};
export default RigisterView;
