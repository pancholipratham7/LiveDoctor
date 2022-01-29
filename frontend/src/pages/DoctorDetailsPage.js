import React, { useEffect } from "react";
import classes from "./DoctorDetailsPage.module.css";
import Tick from "@material-ui/icons/DoneAll";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Education from "@material-ui/icons/School";
import Speciality from "@material-ui/icons/LocalHospital";
import AccessTime from "@material-ui/icons/AccessTime";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/icons/Grade";
import Loader from "./../components/Loader";
import Error from "./../components/Error";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  doctorDetailsActions,
  fetchDoctorDetails,
} from "../store/doctorDetailsSlice";

const DoctorDetailsPage = () => {
  // Hooks
  const dispatch = useDispatch();
  const params = useParams();

  //doctorDetailsInfo
  const { doctorInfo, loading, error } = useSelector(
    (state) => state.doctorDetails
  );

  useEffect(() => {
    dispatch(fetchDoctorDetails(params.id));
    return () => {
      // On unmounting we will call this to reset the redux state doctorInfo
      dispatch(doctorDetailsActions.doctorDetailsReset());
    };
  }, [dispatch, params]);

  console.log(doctorInfo);

  return (
    <div className={classes.doctorDetailsPageContainer}>
      {loading && <Loader />}
      {error && <Error variant="danger" errorMsg={error} />}
      {!error && !loading && (
        <div className={classes["top-container"]}>
          <div className={classes["profile-card"]}>
            <div className={classes["profile-div"]}></div>
            <div className={classes["doctor-img-container"]}>
              <img src={doctorInfo.image} alt="why" />
            </div>
            <span
              className={classes["doctor-name"]}
            >{`${doctorInfo.firstName} ${doctorInfo.lastName}`}</span>
            <span>{doctorInfo.speciality}</span>
            <div className={classes["profile-card-stats"]}>
              <div className={classes["patients-consulted-container"]}>
                <div>
                  <span>+{doctorInfo.patientsConsulted}</span>
                  <Tick className={classes["people-icon"]} />
                </div>
                <span className={classes.text}>Patients consulted</span>
              </div>
              <div className={classes["experience-container"]}>
                <div>
                  <span>+{doctorInfo.experience}</span>
                  <Tick className={classes["people-icon"]} />
                </div>
                <span className={classes.text}>Experience (years)</span>
              </div>
            </div>
            <div className={classes["book-app-container"]}>
              <span className={classes["fees-text"]}>
                Fees : Rs {doctorInfo.fees}
              </span>
              <button className={classes["book-app-btn"]}>
                Book Appointment
              </button>
            </div>
          </div>
          <div className={classes["details-section"]}>
            {doctorInfo && doctorInfo.treatments && (
              <div className={classes["treatments-container"]}>
                <span className={classes.title}>TREATMENTS</span>
                <div className={classes.treatments}>
                  {doctorInfo.treatments &&
                    doctorInfo.treatments.map((treatment, i) => (
                      <div key={i} className={classes.treatment}>
                        <CheckCircle className={classes["tick"]} />
                        <span>{treatment}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {doctorInfo && doctorInfo.treatments && (
              <div className={classes["details-container"]}>
                <span className={classes.title}>DETAILS</span>
                <div className={classes["doctor-details-container"]}>
                  <div className={classes["education-container"]}>
                    <Education className={classes.icons} /> :{" "}
                    <span className={classes["icon-details"]}>
                      {doctorInfo.education}
                    </span>
                  </div>
                  <div className={classes["speciality-container"]}>
                    <Speciality className={classes.icons} /> :{" "}
                    <span className={classes["icon-details"]}>
                      {doctorInfo.speciality}
                    </span>
                  </div>
                  <div className={classes["experience-box"]}>
                    <VerifiedUser className={classes.icons} /> :{" "}
                    <span className={classes["icon-details"]}>
                      Experience of more than {doctorInfo.experience}yrs
                    </span>
                  </div>
                  <div className={classes["timing-container"]}>
                    <AccessTime className={classes.icons} /> :{" "}
                    <span className={classes["icon-details"]}>
                      Mon-Sat (2:00 P.M - 6:00 P.M)
                    </span>
                  </div>
                  <div className={classes["rating-container"]}>
                    <Rating className={classes.icons} /> :{" "}
                    <span className={classes["icon-details"]}>
                      {doctorInfo.rating} / 5
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetailsPage;
