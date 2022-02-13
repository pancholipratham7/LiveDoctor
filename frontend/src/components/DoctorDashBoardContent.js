import React from "react";
import { Fragment } from "react";
import classes from "./DoctorDashBoardContent.module.css";
import DoctorAppointmentTable from "./DoctorAppointmentTable";

const DoctorDashBoardContent = (props) => {
  return (
    <Fragment>
      <span className={classes["main-container-title"]}>{props.title}</span>
      <DoctorAppointmentTable category={props.title} />
    </Fragment>
  );
};

export default DoctorDashBoardContent;
