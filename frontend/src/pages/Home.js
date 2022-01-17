import React from "react";
import classes from "./Home.module.css";
import SchoolIcon from "@material-ui/icons/School";
import Profession from "@material-ui/icons/LocalHospital";
import Fees from "@material-ui/icons/AttachMoney";
import Star from "@material-ui/icons/Star";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDoctorsList } from "../store/doctorsListSlice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Home = () => {
  // Hooks

  const dispatch = useDispatch();

  // doctors list state
  const { doctors, loading, error } = useSelector((state) => state.doctorsList);

  useEffect(() => {
    // Only request for the doctors list if doctors are not present
    if (doctors.length === 0) {
      dispatch(getDoctorsList());
    }
  }, [dispatch, doctors]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.topContainer}>
        <div className={classes["top-cont-txt"]}>
          <span>Live Video consultation with best doctors of India....! </span>
          <span>
            Book an appointment and consult with the doctor from the comfort of
            your home with live video call.
          </span>
        </div>
        <div className={classes["top-cont-img"]}>
          <img src="./doctor-home-top-img.png" alt="" />
        </div>
      </div>
      <div className={classes["middle-container"]}>
        <span className={classes["team-name"]}>LiveDoctor Team</span>
        {loading && <Loader />}
        {error && <Error variant="danger" errorMsg={error} />}
        {doctors && (
          <div className={classes["doctors-container"]}>
            {doctors.map((doctor) => (
              <div key={doctor._id} className={classes["doctor-card"]}>
                <div className={classes["doctor-card-img"]}>
                  <img src={doctor.image} alt="" />
                </div>
                <span
                  className={classes["doctor-name"]}
                >{`${doctor.firstName} ${doctor.lastName}`}</span>
                <div className={classes["card-details"]}>
                  <div className={classes.one}>
                    <div>
                      <SchoolIcon />
                      <span>{doctor.education}</span>
                    </div>
                    <div>
                      <Profession />
                      <span>{doctor.speciality}</span>
                    </div>
                  </div>
                  <div className={classes.two}>
                    <div>
                      <Fees />
                      <span>Rs {doctor.fees}</span>
                    </div>
                    <div>
                      <Star />
                      <span>{doctor.rating}</span>
                    </div>
                  </div>
                </div>
                <Link
                  className={classes["details-btn-link"]}
                  to={`/doctor/${doctor._id}`}
                >
                  <button className={classes["details-btn"]}>Details</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
