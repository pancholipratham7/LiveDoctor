const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Appointment = require("./../models/appointmentModel");

// creating order at razorpay servers
exports.createRazorPayOrder = asyncHandler(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100, // amount in smallest currency unit
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  const order = await instance.orders.create(options);

  if (!order) throw new Error("Some error occured.Try again..!");

  res.status(200).json(order);
});

// payment success
// verifying payment
exports.paymentSuccess = asyncHandler(async (req, res, next) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    appointmentId,
  } = req.body;

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpaySignature)
    return res.status(400).json({ msg: "Transaction not legit!" });

  // if the payment is verfied then we need to update the appointment to isPaid=true
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { $set: { isPaid: true } },
    { new: true }
  );

  res.json({
    msg: "success",
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    updatedAppointment,
  });
});
