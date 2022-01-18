import React, { useState } from "react";
import classes from "./SignUpPage.module.css";
import { Link, Redirect } from "react-router-dom";
import Loader from "./../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/userSlice";

const SignUpPage = () => {
  // Hooks
  const dispatch = useDispatch();

  const { userLoggedInDetails, loading, error } = useSelector(
    (state) => state.user
  );

  // different states related to forms
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // If user is already loggedIn then redirecting to the home pagr
  if (userLoggedInDetails && userLoggedInDetails.email) {
    return <Redirect to="/" />;
  }

  // signUp form handler
  const signUpFormHandler = (e) => {
    e.preventDefault();

    //dispatching an action to signUp user and update the redux state
    dispatch(
      signUp({
        email,
        password,
        firstName,
        lastName,
        confirmPassword,
      })
    );
  };

  return (
    <div className={classes.signUpPageContainer}>
      <div className={classes.imageSection}>
        <img src="./loginIllus.png" alt="" />
        <span>Welcome to +LiveDoctor</span>
      </div>
      <div className={classes.signUpDetailsSection}>
        <span className={classes["form-title"]}>Create a new Account</span>
        {error && <span className={classes.error}>{error}</span>}
        <form onSubmit={signUpFormHandler}>
          <label>
            First Name:
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className={classes.inputs}
              type="text"
              placeholder="Enter your firstname"
              name="firstName"
              value={firstName}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              onChange={(e) => setLastName(e.target.value)}
              className={classes.inputs}
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={lastName}
              required
            />
          </label>
          <label>
            Email Address:
            <input
              onChange={(e) => setEmail(e.target.value)}
              className={classes.inputs}
              type="email"
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
          <label>
            Confirm Password:
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={classes.inputs}
              placeholder="Enter your password again"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              required
            />
          </label>
          <button className={classes.signUpBtn}>
            {loading && <Loader />}
            {!loading && "Create a new account"}
          </button>
          <span className={classes["login-link"]}>
            Already have an account?&nbsp;
            <Link className={classes.links} to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
