import React from "react";
import classes from "./Home.module.css";
import SchoolIcon from "@material-ui/icons/School";
import Profession from "@material-ui/icons/LocalHospital";
import Fees from "@material-ui/icons/AttachMoney";
import Star from "@material-ui/icons/Star";

const Home = () => {
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
        <div className={classes["doctors-container"]}>
          <div className={classes["doctor-card"]}>
            <div className={classes["doctor-card-img"]}>
              <img src="./doctor1.png" alt="" />
            </div>
            <div className={classes["card-details"]}>
              <div className={classes.one}>
                <div>
                  <SchoolIcon />
                  <span>MBBS,MD</span>
                </div>
                <div>
                  <Profession />
                  <span>Dermatologist</span>
                </div>
              </div>
              <div className={classes.two}>
                <div>
                  <Fees />
                  <span>Rs 500</span>
                </div>
                <div>
                  <Star />
                  <span>3.5</span>
                </div>
              </div>
            </div>
            <button className={classes["details-btn"]}>Details</button>
          </div>
          <div className={classes["doctor-card"]}>
            <div className={classes["doctor-card-img"]}>
              <img src="./doctor2.png" alt="" />
            </div>
            <div className={classes["card-details"]}>
              <div className={classes.one}>
                <div>
                  <SchoolIcon />
                  <span>MBBS,MD</span>
                </div>
                <div>
                  <Profession />
                  <span>Dermatologist</span>
                </div>
              </div>
              <div className={classes.two}>
                <div>
                  <Fees />
                  <span>Rs 500</span>
                </div>
                <div>
                  <Star />
                  <span>3.5</span>
                </div>
              </div>
            </div>
            <button className={classes["details-btn"]}>Details</button>
          </div>
          <div className={classes["doctor-card"]}>
            <div className={classes["doctor-card-img"]}>
              <img src="./doctor3.png" alt="" />
            </div>
            <div className={classes["card-details"]}>
              <div className={classes.one}>
                <div>
                  <SchoolIcon />
                  <span>MBBS,MD</span>
                </div>
                <div>
                  <Profession />
                  <span>Dermatologist</span>
                </div>
              </div>
              <div className={classes.two}>
                <div>
                  <Fees />
                  <span>Rs 500</span>
                </div>
                <div>
                  <Star />
                  <span>3.5</span>
                </div>
              </div>
            </div>
            <button className={classes["details-btn"]}>Details</button>
          </div>
          <div className={classes["doctor-card"]}>
            <div className={classes["doctor-card-img"]}>
              <img src="./doctor4.png" alt="" />
            </div>
            <div className={classes["card-details"]}>
              <div className={classes.one}>
                <div>
                  <SchoolIcon />
                  <span>MBBS,MD</span>
                </div>
                <div>
                  <Profession />
                  <span>Dermatologist</span>
                </div>
              </div>
              <div className={classes.two}>
                <div>
                  <Fees />
                  <span>Rs 500</span>
                </div>
                <div>
                  <Star />
                  <span>3.5</span>
                </div>
              </div>
            </div>
            <button className={classes["details-btn"]}>Details</button>
          </div>
          <div className={classes["doctor-card"]}>
            <div className={classes["doctor-card-img"]}>
              <img src="./doctor5.png" alt="" />
            </div>
            <div className={classes["card-details"]}>
              <div className={classes.one}>
                <div>
                  <SchoolIcon />
                  <span>MBBS,MD</span>
                </div>
                <div>
                  <Profession />
                  <span>Dermatologist</span>
                </div>
              </div>
              <div className={classes.two}>
                <div>
                  <Fees />
                  <span>Rs 500</span>
                </div>
                <div>
                  <Star />
                  <span>3.5</span>
                </div>
              </div>
            </div>
            <button className={classes["details-btn"]}>Details</button>
          </div>
          <div className={classes["doctor-card"]}>
            <div className={classes["doctor-card-img"]}>
              <img src="./doctor6.png" alt="" />
            </div>
            <div className={classes["card-details"]}>
              <div className={classes.one}>
                <div>
                  <SchoolIcon />
                  <span>MBBS,MD</span>
                </div>
                <div>
                  <Profession />
                  <span>Dermatologist</span>
                </div>
              </div>
              <div className={classes.two}>
                <div>
                  <Fees />
                  <span>Rs 500</span>
                </div>
                <div>
                  <Star />
                  <span>3.5</span>
                </div>
              </div>
            </div>
            <button className={classes["details-btn"]}>Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
