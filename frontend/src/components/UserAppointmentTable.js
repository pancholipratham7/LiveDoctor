import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./UserAppointmentTable.module.css";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { fetchUsersAppointments } from "../store/userAppointmentSlice";
import Loader from "./../components/Loader";
import Error from "./../components/Error";
import { useParams } from "react-router-dom";
import Tick from "@material-ui/icons/CheckCircle";
import Cross from "@material-ui/icons/Cancel";

const UserAppointmentTable = (props) => {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();

  const category =
    props.category === "Appointment Requests"
      ? "Pending"
      : props.category === "Booked Appointments"
      ? "Booked"
      : "";

  // get all appointments of the user
  useEffect(() => {
    dispatch(fetchUsersAppointments(params.id));
  }, [dispatch, params.id]);

  const { myAppointments, loading, error } = useSelector(
    (state) => state.userAppointments
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
      {error === "" && !loading && filteredAppointments.length === 0 && (
        <span>No Appointments to show....!</span>
      )}
      {!loading && error === "" && filteredAppointments.length !== 0 && (
        <div className={classes["table-container"]}>
          <Table style={{ marginBottom: "0" }} responsive bordered hover>
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Slot</th>
                {category === "Booked" && <th>Status</th>}
                {category === "Pending" && <th>Status</th>}
                {category === "Pending" && <th></th>}
                {category === "Booked" && <th>Fees Paid</th>}
                {category === "Booked" && <th>Pay Fees</th>}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>
                    {new Date(appointment.appointmentDate).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </td>
                  <td>{`${appointment.startTime}PM - ${appointment.endTime}PM`}</td>
                  {category === "Booked" && (
                    <td>
                      <button className={classes["status-booked-tag"]} disabled>
                        Booked
                      </button>
                    </td>
                  )}
                  {category === "Pending" && (
                    <td>
                      <button
                        className={classes["status-pending-tag"]}
                        disabled
                      >
                        Pending
                      </button>
                    </td>
                  )}
                  {category === "Pending" && (
                    <td>Wait for some time. An email will be sent to you...</td>
                  )}
                  {category === "Booked" && (
                    <td>
                      {appointment.isPaid === true ? (
                        <Tick className={classes["tick-symbol"]} />
                      ) : (
                        <Cross className={classes["cross-symbol"]} />
                      )}
                    </td>
                  )}
                  {category === "Booked" && (
                    <td>
                      <button className={classes["pay-fees-btn"]}>
                        Pay Fees
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

export default UserAppointmentTable;
