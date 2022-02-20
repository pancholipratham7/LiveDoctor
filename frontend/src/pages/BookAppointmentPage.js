import React, { useState } from "react";
import classes from "./BookAppointmentPage.module.css";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import axios from "axios";
import CheckCircle from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

const BookAppointmentPage = () => {
  // Hooks
  const params = useParams();

  // Modal State
  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalContent, setModalContent] = useState("");
  const [ModalStatus, setModalStatus] = useState("Error");

  //Form states
  const [bookingDate, setBookingDate] = useState("");
  const [bookingSlot, setBookingSlot] = useState("2:00-2:30");

  //doctorDetailsInfo
  const { doctorInfo } = useSelector((state) => state.doctorDetails);

  //userLoginInfo
  const { userLoggedInDetails } = useSelector((state) => state.user);

  //   Book appointment handler
  const bookAppointmentHandler = async (e) => {
    try {
      e.preventDefault();

      // setting up headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userLoggedInDetails.token}`,
          doctor: "no",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/book-an-appointment",
        {
          appointmentDate: bookingDate,
          slot: bookingSlot,
          userId: userLoggedInDetails._id,
          doctorId: params.id,
          fees: doctorInfo.fees,
        },
        config
      );
      setModalOpen(true);
      setModalContent(data.message);
      setModalStatus(data.status);
    } catch (err) {
      setModalOpen(true);
      setModalStatus("Error");
      setModalContent(err.response.data.message);
    }
  };

  //If user has not logged in then redirecting the user to the login page
  if (!userLoggedInDetails) {
    return <Redirect to="/login" />;
  }

  //If the current user is a doctor then redirect him to the doctor's dashboard
  if (userLoggedInDetails && userLoggedInDetails.isDoctor) {
    return <Redirect to={`/doctor/${userLoggedInDetails._id}/dashboard`} />;
  }

  return (
    <div className={classes["book-appointment-page"]}>
      {ModalOpen && (
        <div className={classes["modal-container"]}>
          {ModalContent && ModalStatus === "Success" && (
            <CheckCircle
              style={{ fontSize: "4rem" }}
              className={classes.checkCircle}
            />
          )}
          {ModalContent && ModalStatus === "Error" && (
            <ErrorIcon
              style={{ fontSize: "4rem" }}
              className={classes.errorIcon}
            />
          )}
          <span className={classes["modal-body"]}>{ModalContent}</span>
        </div>
      )}
      {!ModalOpen && doctorInfo && doctorInfo._id === params.id && (
        <div className={classes["top-container"]}>
          <div className={classes["doctor-info-container"]}>
            <div className={classes["doctor-img-container"]}>
              <img src={doctorInfo.image} alt="" />
            </div>
            <div className={classes["doctor-info"]}>
              <span
                className={classes["doctor-name"]}
              >{`${doctorInfo.firstName} ${doctorInfo.lastName}`}</span>
              <span className={classes["doctor-speciality"]}>
                {doctorInfo.speciality}
              </span>
            </div>
          </div>
          <div className={classes["book-app-container"]}>
            <div className={classes.cont}>
              <span>Book Appointment</span>
            </div>
            <form
              onSubmit={bookAppointmentHandler}
              className={classes["book-app-form"]}
            >
              <label className={classes["book-app-form-label"]} htmlFor="date">
                Select Date:
              </label>
              <input
                className={classes["date-input"]}
                id="date"
                onChange={(e) => setBookingDate(e.target.value)}
                placeholder="Select Date"
                type="date"
                name="date"
                value={bookingDate}
                required
              />
              <label className={classes["book-app-form-label"]} htmlFor="slots">
                Select a slot:
              </label>
              <select
                onChange={(e) => setBookingSlot(e.target.value)}
                className={classes["slot-input"]}
                name="slots"
                id="slots"
              >
                <option value="2:00-2:30">2:00 - 2:30</option>
                <option value="2:45-3:15">2:45 - 3:15</option>
                <option value="3:30-4:00">3:30 - 4:00</option>
                <option value="4:15-4:45">4:15 - 4:45</option>
                <option value="5:00-5:30">5:00 - 5:30</option>
                <option value="5:45-6:15">5:45 - 6:15</option>
                <option value="6:30-7:00">6:30 - 7:00</option>
                <option value="7:15-7:45">7:15 - 7:45</option>
              </select>
              <button className={classes["book-app-btn"]}>
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentPage;
