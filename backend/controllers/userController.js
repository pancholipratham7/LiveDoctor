const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");

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
    });
  } else {
    res.status(404).json("Invalid Credentials");
  }
});
