const mongoose = require("mongoose");

// Doctor Schema
const doctorSchema = mongoose.Schema(
  {
    firstName: {
      type: "String",
      required: true,
    },
    image: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    isDoctor: {
      type: Boolean,
      required: true,
      default: true,
    },
    fees: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Doctor Model
const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
