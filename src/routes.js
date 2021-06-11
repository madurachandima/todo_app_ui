import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/userLogin/Login";
import Register from "./components/userRegistration/Register";
import { useAuth } from "./auth-context";
import TodoList from "./components/TodoList";

export const UnauthenticatedRoutes = () => {
  const [token, setToken] = useState("");
  const { setLoggedIn, setAuthToken } = useAuth();

  if (token) {
    setLoggedIn(true);
    setAuthToken(token);
  }

  return (
    <Switch>
      <Route exact path="/">
        <Login setToken={setToken} />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export const AuthenticatedRoutes = () => {
  const { authToken } = useAuth();
  return (
    <>
      <TodoList authToken={authToken} />
    </>
  );
};
