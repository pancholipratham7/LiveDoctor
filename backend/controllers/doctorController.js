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
exports.getAllRequestedAppointments = asyncHandler(async (req, res, next) => {
  // getting all the request appointments

  // Checking whether the doctor requesting for appointments is real doctor or some other doctor
  // One doctor cannot get other doctor's appointments
  // req.user._id will be of type object id so we need to convert it into string
  if (req.params.id !== req.user._id.toString()) {
    throw new Error("You can't access other doctor's appointments");
  }

  // finding all the "PENDING" appointments of the doctor through doctorId
  const appointments = await Appointment.find({
    doctor: req.params.id,
    status: "Pending",
  });
  res.status(200).json(appointments);
});

// getting all booked appointments
exports.getAllBookedAppointments = asyncHandler(async (req, res, next) => {
  // getting all the Booked appointments

  // Checking whether the doctor requesting for appointments is real doctor or some other doctor
  // One doctor cannot get other doctor's appointments
  // req.user._id will be of type object id so we need to convert it into string
  if (req.params.id !== req.user._id.toString()) {
    throw new Error("You can't access other doctor's appointments");
  }

  // finding all the "BOOKED" appointments of the doctor through doctorId
  const appointments = await Appointment.find({
    doctor: req.params.id,
    status: "Booked",
  });
  res.status(200).json(appointments);
});
