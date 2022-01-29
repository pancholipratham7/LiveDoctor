const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");

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
