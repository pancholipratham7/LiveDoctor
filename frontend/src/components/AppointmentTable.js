import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./AppointmentTable.module.css";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { fetchDoctorsAppointments } from "../store/doctorAppointmentsSlice";
import Loader from "./../components/Loader";
import Error from "./../components/Error";
import { useParams } from "react-router-dom";
import Tick from "@material-ui/icons/CheckCircle";
import Cross from "@material-ui/icons/Cancel";
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

  let filteredAppointments;
  if (category === "Pending") {
    filteredAppointments = myAppointments.filter(
      (appointment) => appointment.status === "Pending"
    );
  } else if (category === "Booked") {
    filteredAppointments = myAppointments.filter(
      (appointment) => appointment.status === "Booked"
    );
  }

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  return (
    <div className={classes.appointmentContainer}>
      {loading && <Loader />}
      {error && <Error errorMsg={error} />}
      {filteredAppointments.length === 0 && (
        <span>No Appointments to show....!</span>
      )}
      {!loading && error === "" && filteredAppointments.length !== 0 && (
        <div className={classes["table-container"]}>
          <Table style={{ marginBottom: "0" }} responsive bordered hover>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Slot</th>
                {category === "Booked" && <th>Status</th>}
                {category === "Pending" && <th>Status</th>}
                {category === "Pending" && (
                  <th className={classes["btn-col"]}></th>
                )}
                {category === "Booked" && <th>Fees Paid</th>}
                {category === "Booked" && <th></th>}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr>
                  <td>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                  <td>
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </td>
                  <td>{`${appointment.startTime}PM - ${appointment.endTime}PM`}</td>
                  {category === "Booked" && (
                    <td>
                      <button className={classes["status-booked-btn"]} disabled>
                        Booked
                      </button>
                    </td>
                  )}
                  {category === "Pending" && (
                    <td>
                      <button
                        className={classes["pending-booked-btn"]}
                        disabled
                      >
                        Pending
                      </button>
                    </td>
                  )}
                  {category === "Pending" && (
                    <td className={classes["accept-reject-btn-container"]}>
                      <button className={classes["reject-btn"]}>Cancel</button>
                      <button className={classes["accept-btn"]}>Accept</button>
                    </td>
                  )}
                  {category === "Booked" && (
                    <td>
                      {appointment.isPaid === false ? (
                        <Tick className={classes["tick-symbol"]} />
                      ) : (
                        <Cross className={classes["cross-symbol"]} />
                      )}
                    </td>
                  )}
                  {category === "Booked" && (
                    <td>
                      <button className={classes["consult-btn"]}>
                        Consult
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
