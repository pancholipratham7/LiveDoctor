import React from "react";
import classes from "./Header.module.css";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { logoutUser } from "../store/userSlice";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  // hooks
  const dispatch = useDispatch();

  // redux login state
  const { userLoggedInDetails: user } = useSelector((state) => state.user);

  // function for logging out user
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={classes["nav-container"]}>
      <Link className={classes.heading} to="/">
        +LiveDoctor
      </Link>
      <div className={classes["nav-items"]}>
        <span>About</span>
        <span>Terms</span>
        {user && user.email && (
          <div className={classes["account-profile"]}>
            <AccountCircle />
            <DropdownButton id="dropdown-basic-button" title={user.firstName}>
              <LinkContainer to={`/user/${user._id}/dashboard`}>
                <Dropdown.Item href="#">My Dashboard</Dropdown.Item>
              </LinkContainer>
              <Dropdown.Item onClick={() => logoutHandler()} href="#">
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </div>
        )}
        {!user && (
          <NavLink
            to="/login"
            className={classes["nav-link"]}
            activeClassName={classes["selected-link"]}
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
