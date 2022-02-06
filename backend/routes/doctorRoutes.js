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

// route used by doctor to get his all requested appointments
router
  .route("/:id/requested-appointments")
  .get(isAuthenticated, isDoctor, doctorController.getAllRequestedAppointments);

// route used by doctor to get all his booked appointments
router
  .route("/:id/booked-appointments")
  .get(isAuthenticated, isDoctor, doctorController.getAllBookedAppointments);

module.exports = router;
