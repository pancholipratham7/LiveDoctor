const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const isAuthenticated = require("../middlewares/authMiddleware").protect;
const isDoctor = require("../middlewares/authMiddleware").isDoctor;

// Public
// Route for getting all doctors
router.route("/").get(doctorController.getAllDoctors);

//route for getting doctor details
router.route("/:id/details").get(doctorController.getDoctorDetails);

// route used by doctor to get his all  appointments
router
  .route("/:id/appointments")
  .get(isAuthenticated, isDoctor, doctorController.getAllAppointments);

// update appointment status
router
  .route("/:id/appointment")
  .patch(isAuthenticated, isDoctor, doctorController.updateAppointmentStatus);

//mark appoitnment as consulted
// router
//   .route("/:id/markAsConsulted")
//   .patch(isAuthenticated, isDoctor, doctorController.markPatientAsConsulted);

// meeting started mail to patient
router.route("/send-callId").post(doctorController.sendCallIdToUser);

module.exports = router;
