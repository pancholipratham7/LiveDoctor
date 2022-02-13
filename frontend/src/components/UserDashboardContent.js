import React from "react";
import { Fragment } from "react";
import classes from "./UserDashboardContent.module.css";
import UserAppointmentTable from "./UserAppointmentTable";

const UserDashboardContent = (props) => {
  return (
    <Fragment>
      <span className={classes["main-container-title"]}>{props.title}</span>
      <UserAppointmentTable category={props.title} />
    </Fragment>
  );
};

export default UserDashboardContent;
