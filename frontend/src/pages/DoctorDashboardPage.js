import React from "react";
import classes from "./DoctorDashboardPage.module.css";
import DashBoardIcon from "@material-ui/icons/Dashboard";
import RequestIcon from "@material-ui/icons/AssignmentLate";
import BookedIcon from "@material-ui/icons/AssignmentTurnedIn";
import ScheduleIcon from "@material-ui/icons/WatchLater";
import Table from "react-bootstrap/Table";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useSelector } from "react-redux";
import Dashboard from "@material-ui/icons/Dashboard";
import { NavLink } from "react-router-dom";

const DoctorDashboardPage = () => {
  // Doctor login state
  const { userLoggedInDetails } = useSelector((state) => state.user);

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
        <span className={classes["main-container-title"]}>
          Appointment Requests
        </span>
        <div className={classes.appointmentContainer}>
          <div className={classes["table-container"]}>
            <Table style={{ marginBottom: "0" }} responsive bordered hover>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th className={classes["btn-col"]}>Pending Appointments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Shruti Saxena</td>
                  <td>20-11-2001</td>
                  <td>5:30-6:30</td>
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                </tr>
                <tr>
                  <td>Shruti Saxena</td>
                  <td>20-11-2001</td>
                  <td>5:30-6:30</td>
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                </tr>
                <tr>
                  <td>Shruti Saxena</td>
                  <td>20-11-2001</td>
                  <td>5:30-6:30</td>
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                </tr>
                <tr>
                  <td>Shruti Saxena</td>
                  <td>20-11-2001</td>
                  <td>5:30-6:30</td>
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                </tr>
                <tr>
                  <td>Shruti Saxena</td>
                  <td>20-11-2001</td>
                  <td>5:30-6:30</td>
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                </tr>
                <tr>
                  <td>Raj Thakur</td>
                  <td>05-10-2020</td>
                  <td>2:00-3:00</td>
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                </tr>
                <tr>
                  <td>Shivam Singh</td>
                  <td>13-08-2021</td>
                  <td>4:00-5:00</td>
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
