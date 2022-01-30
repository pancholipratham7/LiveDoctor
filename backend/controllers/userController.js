const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const generateToken = require("./../utils/generateToken").generateToken;
const Appointment = require("./../models/appointmentModel");

// Signing Up users
exports.signUp = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  // checking whether password anc confirm password are matching or not
  if (confirmPassword !== password) {
    throw new Error("Password do not match...!");
  }

  // Checking if the user with that email already exists or not
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    throw new Error("User already registered with this email");
  }

  // If user doesn't exist then storing the user in the datbase
  const user = await User.create({
    firstName,
    email,
    lastName,
    password,
  });

  if (user) {
    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isDoctor: user.isDoctor,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json("Invalid Credentials");
  }
});

// Logging up users
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // finding the user first with the email
  const user = await User.findOne({ email: email });

  // If user found
  if (!user) {
    res.status(404);
    throw new Error("Email is Invalid....!");
  }

  if (user && (await user.comparePassword(password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isDoctor: user.isDoctor,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Entered Password is wrong....!");
  }
});

// book an appointment
exports.bookAnAppointment = asyncHandler(async (req, res, next) => {
  const { appointmentDate, slot, doctorId } = req.body;
  const startTime = slot.split("-")[0];
  const endTime = slot.split("-")[1];

  // checking if the appointment with the same date and slot is present or not
  const appointment = await Appointment.find({
    doctor: doctorId,
    appointmentDate: new Date(appointmentDate),
    startTime,
    endTime,
  });

  // If the appointment already exists then we need to throw a message
  if (appointment && appointment.length !== 0) {
    return res.status(200).json({
      status: "Error",
      message:
        "Oops your appointment was not booked because the doctor is not available at alloted date and slot.Please select some other slot or date.",
    });
  }

  // Creating an appointment
  const newAppointment = await Appointment.create({
    startTime,
    endTime,
    appointmentDate,
    doctor: doctorId,
    patient: req.user._id,
  });

  res.status(200).json({
    status: "Success",
    message:
      "Wait for some time for the confirmation of your appointment.You will be recieving a mail on your gmail regarding the status of your appointment.",
  });
});
