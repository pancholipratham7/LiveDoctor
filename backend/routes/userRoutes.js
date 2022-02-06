const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const isAuthenticated = require("../middlewares/authMiddleware").protect;
const isPatient = require("../middlewares/authMiddleware").isPatient;

// all user related routes

router.route("/signUp").post(userController.signUp);
router.route("/login").post(userController.loginUser);

// booking appointment route
router
  .route("/book-an-appointment")
  .post(isAuthenticated, userController.bookAnAppointment);

//get all patients booked appointments
router
  .route("/:id/booked-appointments")
  .get(isAuthenticated, isPatient, userController.getAllBookedAppointments);

//get all patients booked appointments
router
  .route("/:id/requested-appointments")
  .get(isAuthenticated, isPatient, userController.getAllRequestedAppointments);

module.exports = router;
