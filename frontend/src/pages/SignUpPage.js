import React from "react";
import classes from "./SignUpPage.module.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className={classes.signUpPageContainer}>
      <div className={classes.imageSection}>
        <img src="./loginIllus.png" alt="" />
        <span>Welcome to +LiveDoctor</span>
      </div>
      <div className={classes.signUpDetailsSection}>
        <span className={classes["form-title"]}>Create a new Account</span>
        <form>
          <label>
            First Name:
            <input
              className={classes.inputs}
              type="text"
              placeholder="Enter your firstname"
              name="firstName"
            />
          </label>
          <label>
            Last Name:
            <input
              className={classes.inputs}
              type="text"
              placeholder="Enter your last name"
              name="lastName"
            />
          </label>
          <label>
            Email Address:
            <input
              className={classes.inputs}
              type="email"
              placeholder="Enter your email"
              name="email"
            />
          </label>
          <label>
            Password:
            <input
              className={classes.inputs}
              placeholder="Enter your password"
              type="password"
              name="password"
            />
          </label>
          <label>
            Confirm Password:
            <input
              className={classes.inputs}
              placeholder="Enter your password again"
              type="password"
              name="confirmPassword"
            />
          </label>
          <button className={classes.signUpBtn}>Login</button>
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
