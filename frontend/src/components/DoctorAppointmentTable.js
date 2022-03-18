import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./DoctorAppointmentTable.module.css";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import {
  fetchDoctorsAppointments,
  updateAppointmentStatus,
} from "../store/doctorAppointmentsSlice";
import Loader from "./Loader";
import Error from "./Error";
import { useParams } from "react-router-dom";
import Tick from "@material-ui/icons/CheckCircle";
import Cross from "@material-ui/icons/Cancel";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AppointmentTable = (props) => {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();

  // modal state
  const [showModal, setShowModal] = useState(false);

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
    (state) => state.doctorAppointments
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

  // accept appointment handler
  const acceptAppointmentHandler = (e) => {
    dispatch(
      updateAppointmentStatus(e.target.getAttribute("data-id"), "Booked")
    );
  };

  // reject appointment handler
  const rejectAppointmentHandler = (e) => {
    dispatch(
      updateAppointmentStatus(e.target.getAttribute("data-id"), "Rejected")
    );
  };

  // consult btn handler
  const consultBtnHandler = () => {
    setShowModal(true);
  };

  // close modal
  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.appointmentContainer}>
      {loading && <Loader />}
      {error && <Error errorMsg={error} />}
      {error === "" && !loading && filteredAppointments.length === 0 && (
        <span>No Appointments to show....!</span>
      )}
      <Modal show={showModal} onHide={hideModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to consult the patient ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModalHandler}>
            No
          </Button>
          <Button variant="primary" onClick={hideModalHandler}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
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
                <tr key={appointment._id}>
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
                      <button
                        data-id={appointment._id}
                        onClick={rejectAppointmentHandler}
                        className={classes["reject-btn"]}
                      >
                        Reject
                      </button>
                      <button
                        data-id={appointment._id}
                        onClick={acceptAppointmentHandler}
                        className={classes["accept-btn"]}
                      >
                        Accept
                      </button>
                    </td>
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
                  {category === "Booked" && appointment.isPaid && (
                    <td>
                      <button
                        onClick={consultBtnHandler}
                        data-id={appointment._id}
                        className={classes["consult-btn"]}
                      >
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
