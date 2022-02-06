import React from "react";
import classes from "./DoctorDashboardPage.module.css";
import DashBoardIcon from "@material-ui/icons/Dashboard";
import RequestIcon from "@material-ui/icons/AssignmentLate";
import BookedIcon from "@material-ui/icons/AssignmentTurnedIn";
import ScheduleIcon from "@material-ui/icons/WatchLater";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import DashboardContent from "./../components/DashBoardContent";
import { logoutUser } from "../store/userSlice";

const DoctorDashboardPage = () => {
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
    <div className={classes["doctor-dashboard-container"]}>
      <div className={classes["sidebar"]}>
        <div className={classes["doctor-details-container"]}>
          <div className={classes["doctor-image-container"]}>
            <img
              className={classes["doctor-image"]}
              src="/doctor1.jfif"
              alt=""
            />
          </div>
          <span className={classes["doctor-name"]}>Rajesh Shukla</span>
          <span className={classes["doctor-speciality"]}>
            MBBS,MD - Dermatologist
          </span>
        </div>
        <ul className={classes["sidebar-options"]}>
          <li className={classes["sidebar-option"]}>
            <NavLink
              exact
              className={classes["sidebar-option-link"]}
              activeClassName={classes["sidebar-option-link-selected"]}
              to={`/doctor/${userLoggedInDetails._id}/dashboard`}
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
              to={`/doctor/${userLoggedInDetails._id}/dashboard/appointment-requests`}
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
              to={`/doctor/${userLoggedInDetails._id}/dashboard/booked-appointments`}
            >
              <BookedIcon className={classes["sidebar-option-icon"]} />
              <span className={classes["sidebar-option-name"]}>
                Booked Appointments
              </span>
            </NavLink>
          </li>
          <li className={classes["sidebar-option"]}>
            <NavLink
              exact
              className={classes["sidebar-option-link"]}
              activeClassName={classes["sidebar-option-link-selected"]}
              to={`/doctor/${userLoggedInDetails._id}/dashboard/schedule-slots`}
            >
              <ScheduleIcon className={classes["sidebar-option-icon"]} />
              <span className={classes["sidebar-option-name"]}>
                Schedule Slots
              </span>
            </NavLink>
          </li>
          <li className={classes["sidebar-option"]}>
            <NavLink
              onClick={logoutHandler}
              exact
              className={classes["sidebar-option-link"]}
              activeClassName={classes["sidebar-option-link-selected"]}
              to={`/doctor/${userLoggedInDetails._id}/dashboard/logout`}
            >
              <LogoutIcon className={classes["sidebar-option-icon"]} />
              <span className={classes["sidebar-option-name"]}>Log out</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes["main-container"]}>
        <Switch>
          <Route path="/doctor/:id/dashboard/appointment-requests">
            <DashboardContent title="Appointment Requests" />
          </Route>
          <Route path="/doctor/:id/dashboard/booked-appointments">
            <DashboardContent title="Booked Appointments" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
