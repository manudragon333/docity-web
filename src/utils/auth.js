import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  custComponent,
  baseUrl,
  userAuthenticated,
  ...other
}) => (
  <Route
    {...other}
    render={(props) => {
      return userAuthenticated ? (
        custComponent ? (
          custComponent
        ) : (
          <Component {...props} />
        )
      ) : (
        <Redirect
          to={{
            pathname: baseUrl ? baseUrl : "/",
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);
