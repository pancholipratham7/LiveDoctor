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
  const [isDoctorCheck, setDoctorCheck] = useState(false);

  // If user is already logged in then redirecting the user to the a different page
  if (userLoggedInDetails && userLoggedInDetails.email) {
    // If the user is a doctor then redirecting him to the doctor's dashboard
    if (userLoggedInDetails.isDoctor) {
      return <Redirect to={`/doctor/${userLoggedInDetails._id}/dashboard`} />;
    }
    // If the user is not a doctor then redirecting him to the home page
    else {
      return <Redirect to="/" />;
    }
  }

  // login form submit handler
  const loginFormHandler = (e) => {
    e.preventDefault();
    // making a login request
    dispatch(
      loginUser({
        email,
        password,
        isDoctorCheck,
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
          <input
            onChange={(e) =>
              setDoctorCheck((prevDoctorCheck) => !prevDoctorCheck)
            }
            type="checkbox"
            id="doctorCheckbox"
            name="doctor"
            value="doctor"
          />
          <label htmlFor="doctorCheckbox">
            Check this box if you are a doctor
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
