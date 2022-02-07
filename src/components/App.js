import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "./Container";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { Switch } from "react-router-dom";
import { Navigation } from "./Navigation";
import { fetchCurrentUser, getIsFetchingCurrent } from "redux/authorization";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Spinner } from "./Spinner";

const HomeView = lazy(() => import("../views/HomeView"));
const RigisterView = lazy(() => import("../views/RigisterView"));
const LoginView = lazy(() => import("../views/LoginView"));
const ContactsView = lazy(() => import("../views/ContactsView"));

const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const murkup = (
    <>
      <Navigation />
      <Container>
        <Switch>
          <Suspense fallback={<p>loading...</p>}>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute path="/register" restricted>
              <RigisterView />
            </PublicRoute>

            <PublicRoute path="/login" redirect="/contacts" restricted>
              <LoginView />
            </PublicRoute>

            <PrivateRoute path="/contacts" redirect="/login">
              <ContactsView />
            </PrivateRoute>
          </Suspense>
        </Switch>
      </Container>
    </>
  );

  return isFetchingCurrentUser ? <Spinner /> : murkup;
};

export default App;
