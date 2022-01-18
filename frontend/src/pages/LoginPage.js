import React from "react";
import classes from "./LoginPage.module.css";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import Loader from "../components/Loader";

const LoginPage = () => {
  // hooks
  const dispatch = useDispatch();

  // redux  state
  const { loading, error, userLoggedInDetails } = useSelector(
    (state) => state.user
  );

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If user is already logged in then redirecting the user to the homepage
  if (userLoggedInDetails && userLoggedInDetails.email) {
    return <Redirect to="/" />;
  }

  // login form submit handler
  const loginFormHandler = (e) => {
    e.preventDefault();

    // making a login request
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <div className={classes.loginPageContainer}>
      <div className={classes.imageSection}>
        <img src="./loginIllus.png" alt="" />
        <span>Welcome to +LiveDoctor</span>
      </div>
      <div className={classes.loginDetailsSection}>
        <span className={classes["form-title"]}>Login</span>
        {error && <span className={classes.error}>{error}</span>}
        <form onSubmit={loginFormHandler}>
          <label>
            Email Adress:
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={classes.inputs}
              type="text"
              placeholder="Enter your email"
              name="email"
              value={email}
              required
            />
          </label>
          <label>
            Password:
            <input
              onChange={(e) => setPassword(e.target.value)}
              className={classes.inputs}
              placeholder="Enter your password"
              type="password"
              name="password"
              value={password}
              required
            />
          </label>
          <button className={classes.loginBtn}>
            {loading ? <Loader /> : "Login"}
          </button>
          <span className={classes["signIn"]}>
            Don't have an account?&nbsp;
            <Link className={classes.links} to="/signUp">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
