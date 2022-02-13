import React from "react";
import classes from "./UserDashboardPage.module.css";
import DashBoardIcon from "@material-ui/icons/Dashboard";
import RequestIcon from "@material-ui/icons/AssignmentLate";
import BookedIcon from "@material-ui/icons/AssignmentTurnedIn";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import UserDashboardContent from "../components/UserDashboardContent.js";
import { logoutUser } from "../store/userSlice";

const UserDashboardPage = () => {
  // Hooks
  const dispatch = useDispatch();

  // Doctor login state
  const { userLoggedInDetails } = useSelector((state) => state.user);

  // logout button handler
  const logoutHandler = (e) => {
    // logging user out
    dispatch(logoutUser());
  };

  // If user is not logged then redirecting him to the home page
  if (!userLoggedInDetails) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes["user-dashboard-container"]}>
      <div className={classes["sidebar"]}>
        <div className={classes["user-details-container"]}>
          <div className={classes["user-image-container"]}>
            <img
              className={classes["user-image"]}
              src={userLoggedInDetails.image}
              alt=""
            />
          </div>
          <span
            className={classes["user-name"]}
          >{`${userLoggedInDetails.firstName} ${userLoggedInDetails.lastName}`}</span>
          <span className={classes["user-email"]}>
            {`${userLoggedInDetails.email}`}
          </span>
        </div>
        <ul className={classes["sidebar-options"]}>
          <li className={classes["sidebar-option"]}>
            <NavLink
              exact
              className={classes["sidebar-option-link"]}
              activeClassName={classes["sidebar-option-link-selected"]}
              to={`/user/${userLoggedInDetails._id}/dashboard`}
            >
              <DashBoardIcon className={classes["sidebar-option-icon"]} />
              <span className={classes["sidebar-option-name"]}>Dashboard</span>
            </NavLink>
          </li>
          <li className={classes["sidebar-option"]}>
            <NavLink
              exact
              className={classes["sidebar-option-link"]}
              activeClassName={classes["sidebar-option-link-selected"]}
              to={`/user/${userLoggedInDetails._id}/dashboard/appointment-requests`}
            >
              <RequestIcon className={classes["sidebar-option-icon"]} />
              <span className={classes["sidebar-option-name"]}>
                Appointment Requests
              </span>
            </NavLink>
          </li>
          <li className={classes["sidebar-option"]}>
            <NavLink
              exact
              className={classes["sidebar-option-link"]}
              activeClassName={classes["sidebar-option-link-selected"]}
              to={`/user/${userLoggedInDetails._id}/dashboard/booked-appointments`}
            >
              <BookedIcon className={classes["sidebar-option-icon"]} />
              <span className={classes["sidebar-option-name"]}>
                Booked Appointments
              </span>
            </NavLink>
          </li>
          <li className={classes["sidebar-option"]}>
            <NavLink
              onClick={logoutHandler}
              exact
              className={classes["sidebar-option-link"]}
              activeClassName={classes["sidebar-option-link-selected"]}
              to={`/user/${userLoggedInDetails._id}/dashboard/logout`}
            >
              <LogoutIcon className={classes["sidebar-option-icon"]} />
              <span className={classes["sidebar-option-name"]}>Log out</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes["main-container"]}>
        <Switch>
          <Route path="/user/:id/dashboard/appointment-requests">
            <UserDashboardContent title="Appointment Requests" />
          </Route>
          <Route path="/user/:id/dashboard/booked-appointments">
            <UserDashboardContent title="Booked Appointments" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default UserDashboardPage;
