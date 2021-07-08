import React from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const LoginComponent = ({ authenticateUser, authenticated }) => {
  return (
    <div>
      <h2>Please login</h2>
      <form onSubmit={authenticateUser}>
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev"
        ></input>
        <input
          type="password"
          placeholder="password"
          name="password"
          defaultValue=""
        ></input>
        {authenticated === actions.NOT_AUTHENTICATED ? (
          <p>login incorrect</p>
        ) : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target["username"].value;
    let password = e.target["password"].value;
    dispatch(actions.requestAuthenticateUser(username, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
