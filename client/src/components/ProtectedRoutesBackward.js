import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedBackwardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Boolean(window.localStorage.getItem("isAuth"))) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
