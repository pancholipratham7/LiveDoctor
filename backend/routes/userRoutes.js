const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");

// all user related routes

router.route("/signUp").post(userController.signUp);

module.exports = router;
