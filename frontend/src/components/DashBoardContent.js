import React from "react";
import { Fragment } from "react";
import classes from "./DashBoardContent.module.css";
import AppointmentTable from "./AppointmentTable";

const DashBoardContent = (props) => {
  return (
    <Fragment>
      <span className={classes["main-container-title"]}>{props.title}</span>
      <AppointmentTable category={props.title} />
    </Fragment>
  );
};

export default DashBoardContent;
