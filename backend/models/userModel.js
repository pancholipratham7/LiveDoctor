const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Doctor Schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: "String",
      required: true,
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

    isDoctor: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

//pre hook for encrypting password while saving and updating
userSchema.pre("save", async function (next) {
  // we want to encrypt password only when we we update password or create a new user
  // when we are updating other fields we don't want to encyrpt password

  if (!this.isModified("password")) {
    return next();
  }

  // encrypting password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Doctor Model
const User = mongoose.model("User", userSchema);
module.exports = User;
