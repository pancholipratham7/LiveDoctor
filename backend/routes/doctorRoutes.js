const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Public
// Route for getting all doctors
router.route("/").get(doctorController.getAllDoctors);

//route for getting doctor details
router.route("/:id/details").get(doctorController.getDoctorDetails);

module.exports = router;
