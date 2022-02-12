import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./AppointmentTable.module.css";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { fetchDoctorsAppointments } from "../store/doctorAppointmentsSlice";
import Loader from "./../components/Loader";
import Error from "./../components/Error";
import { useParams } from "react-router-dom";
const AppointmentTable = (props) => {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();

  const category =
    props.category === "Appointment Requests"
      ? "Pending"
      : props.category === "Booked Appointments"
      ? "Booked"
      : "";

  // get all appointments of the doctor
  useEffect(() => {
    dispatch(fetchDoctorsAppointments(params.id));
  }, [dispatch, params.id]);

  const { myAppointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  console.log(myAppointments);

  return (
    <div className={classes.appointmentContainer}>
      {loading && <Loader />}
      {error && <Error errorMsg={error} />}
      {!loading && error === "" && (
        <div className={classes["table-container"]}>
          <Table style={{ marginBottom: "0" }} responsive bordered hover>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Slot</th>
                {category === "Pending" && (
                  <th className={classes["btn-col"]}></th>
                )}
                {category === "Booked" && <th>Fees Paid</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Shruti Saxena</td>
                <td>20-11-2001</td>
                <td>5:30-6:30</td>
                {category === "Pending" && (
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                )}
                {category === "Booked" && <td>Yes</td>}
              </tr>
              <tr>
                <td>Shruti Saxena</td>
                <td>20-11-2001</td>
                <td>5:30-6:30</td>
                {category === "Pending" && (
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                )}
                {category === "Booked" && <td>Yes</td>}
              </tr>
              <tr>
                <td>Shruti Saxena</td>
                <td>20-11-2001</td>
                <td>5:30-6:30</td>
                {category === "Pending" && (
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                )}
                {category === "Booked" && <td>Yes</td>}
              </tr>
              <tr>
                <td>Shruti Saxena</td>
                <td>20-11-2001</td>
                <td>5:30-6:30</td>
                {category === "Pending" && (
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                )}
                {category === "Booked" && <td>Yes</td>}
              </tr>
              <tr>
                <td>Shruti Saxena</td>
                <td>20-11-2001</td>
                <td>5:30-6:30</td>
                {category === "Pending" && (
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                )}
                {category === "Booked" && <td>Yes</td>}
              </tr>
              <tr>
                <td>Raj Thakur</td>
                <td>05-10-2020</td>
                <td>2:00-3:00</td>
                {category === "Pending" && (
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                )}
                {category === "Booked" && <td>Yes</td>}
              </tr>
              <tr>
                <td>Shivam Singh</td>
                <td>13-08-2021</td>
                <td>4:00-5:00</td>
                {category === "Pending" && (
                  <td className={classes["accept-reject-btn-container"]}>
                    <button className={classes["reject-btn"]}>Cancel</button>
                    <button className={classes["accept-btn"]}>Accept</button>
                  </td>
                )}
                {category === "Booked" && <td>Yes</td>}
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
