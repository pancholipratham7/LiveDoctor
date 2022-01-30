import React from "react";
import classes from "./BookAppointmentPage.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BookAppointmentPage = () => {
  // Hooks
  const params = useParams();

  //doctorDetailsInfo
  const { doctorInfo } = useSelector((state) => state.doctorDetails);

  return (
    <div className={classes["book-appointment-page"]}>
      {doctorInfo && doctorInfo._id === params.id && (
        <div className={classes["top-container"]}>
          <div className={classes["doctor-info-container"]}>
            <div className={classes["doctor-img-container"]}>
              <img src={doctorInfo.image} alt="" />
            </div>
            <div className={classes["doctor-info"]}>
              <spanm
                className={classes["doctor-name"]}
              >{`${doctorInfo.firstName} ${doctorInfo.lastName}`}</spanm>
              <span className={classes["doctor-speciality"]}>
                {doctorInfo.speciality}
              </span>
            </div>
          </div>
          <div className={classes["book-app-container"]}>
            <div className={classes.cont}>
              <span>Book Appointment</span>
            </div>
            <form className={classes["book-app-form"]}>
              <label className={classes["book-app-form-label"]} for="date">
                Select Date:
              </label>
              <input
                className={classes["date-input"]}
                id="date"
                placeholder="Select Date"
                type="date"
                name="date"
                required
              />
              <label className={classes["book-app-form-label"]} for="slots">
                Select a slot:
              </label>
              <select className={classes["slot-input"]} name="slots" id="slots">
                <option value="volvo">2:00 - 2:30</option>
                <option value="saab">2:45 - 3:15</option>
                <option value="mercedes">3:30 - 4:00</option>
                <option value="audi">4:15 - 4:45</option>
                <option value="audi">5:00 - 5:30</option>
                <option value="audi">5:45 - 6:15</option>
                <option value="audi">6:30 - 7:00</option>
                <option value="audi">7:15 - 7:45</option>
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
