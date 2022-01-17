const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");

exports.getAllDoctors = asyncHandler(async (req, res, next) => {
  // Get all doctors list
  const doctors = await Doctor.find({});
  res.status(200).json(doctors);
});
