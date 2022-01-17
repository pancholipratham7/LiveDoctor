import React from "react";
import classes from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={classes.loginPageContainer}>
      <div className={classes.imageSection}>
        <img src="./loginIllus.png" alt="" />
        <span>Welcome to +LiveDoctor</span>
      </div>
      <div className={classes.loginDetailsSection}>
        <span className={classes["form-title"]}>Login</span>
        <form>
          <label>
            Email Adress:
            <input
              className={classes.inputs}
              type="text"
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
          <button className={classes.loginBtn}>Login</button>
          <span className={classes["signIn"]}>
            Don't have an account?&nbsp;
            <Link className={classes.links} to="/signin">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
