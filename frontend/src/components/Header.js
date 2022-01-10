import React from "react";
import classes from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={classes["nav-container"]}>
      <Link className={classes.heading} to="/">
        +LiveDoctor
      </Link>
      <div className={classes["nav-items"]}>
        <NavLink
          to="/login"
          className={classes["nav-link"]}
          activeClassName={classes["selected-link"]}
        >
          Login
        </NavLink>
        <span>About</span>
        <span>Terms</span>
      </div>
    </div>
  );
};

export default Header;
