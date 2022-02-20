const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/orders", paymentController.createRazorPayOrder);
router.post("/success", paymentController.paymentSuccess);

module.exports = router;
