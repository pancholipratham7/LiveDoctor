const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

// get all doctors
exports.getAllDoctors = asyncHandler(async (req, res, next) => {
  // Get all doctors list
  const doctors = await Doctor.find({});
  res.status(200).json(doctors);
});

// getting details of  a particular doctor
exports.getDoctorDetails = asyncHandler(async (req, res, next) => {
  const doctorInfo = await Doctor.findById(req.params.id, {
    firstName: 1,
    lastName: 1,
    speciality: 1,
    rating: 1,
    fees: 1,
    image: 1,
    treatments: 1,
    education: 1,
    email: 1,
    patientsConsulted: 1,
    experience: 1,
  });

  if (!doctorInfo && !doctorInfo._id) {
    throw new Error("No doctor found with this Id");
  }

  res.status(200).json(doctorInfo);
});

// getting all requested appointments
exports.getAllAppointments = asyncHandler(async (req, res, next) => {
  // getting all the  appointments

  // Checking whether the doctor requesting for appointments is real doctor or some other doctor
  // One doctor cannot get other doctor's appointments
  // req.user._id will be of type object id so we need to convert it into string
  if (req.params.id !== req.user._id.toString()) {
    throw new Error("You can't access other doctor's appointments");
  }

  const appointments = await Appointment.find({
    doctor: req.params.id,
  }).populate("patient");

  console.log(appointments);
  res.status(200).json(appointments);
});
