import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { history } from "../store/history";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetails } from "./TaskDetails";
import { ConnectedLogin } from "./Login";

const RouteGuard =
  (Component) =>
  ({ match }) => {
    console.info("route Guard", match);
    if (!store.getState().session.authenticated) {
      return <Redirect to="/" />;
    }
    return <Component match={match} />;
  };

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedLogin} />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetails)}
        />
      </div>
    </Provider>
  </Router>
);
