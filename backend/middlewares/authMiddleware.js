const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("./../models/userModel");

//this middleware will be used for protected routes
//it will check whether the user is authenticated or not
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log("Hello guys");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
