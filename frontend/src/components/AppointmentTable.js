import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./AppointmentTable.module.css";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { fetchDoctorsBookedAppointments } from "./../store/doctorAppointmentsSlice";
import { fetchDoctorsRequestedAppointments } from "./../store/doctorAppointmentsSlice";

const AppointmentTable = (props) => {
  // hooks
  const dispatch = useDispatch();

  const category =
    props.category === "Appointment Requests"
      ? "requested"
      : props.category === "Booked Appointments"
      ? "booked"
      : "";

  //redux login state
  const { userLoggedInDetails } = useSelector((state) => state.user);

  //Redux booked appointments state
  const {
    appointments: bookedAppointments,
    loading: bookedLoading,
    error: bookedError,
  } = useSelector((state) => state.doctorAppointments.bookedAppointments);

  // redux requested appointments state
  const {
    appointments: requestedAppointments,
    loading: requestedLoading,
    error: requestedError,
  } = useSelector((state) => state.doctorAppointments.requestedAppointments);

  useEffect(() => {
    if (category === "requested") {
      dispatch(fetchDoctorsRequestedAppointments(userLoggedInDetails._id));
    } else if (category === "booked") {
      dispatch(fetchDoctorsBookedAppointments(userLoggedInDetails._id));
    }
  }, [category, dispatch, userLoggedInDetails._id]);

  console.log("DOCTOR BOOKED APPOINTMENTS", bookedAppointments);
  console.log("DOCTOR REQUESTED APPOINTMENTS", requestedAppointments);

  return (
    <div className={classes.appointmentContainer}>
      <div className={classes["table-container"]}>
        <Table style={{ marginBottom: "0" }} responsive bordered hover>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Slot</th>
              <th className={classes["btn-col"]}>Appointment Requests</th>
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
  );
};

export default AppointmentTable;
