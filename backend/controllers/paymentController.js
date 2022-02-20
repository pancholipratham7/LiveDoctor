const asyncHandler = require("express-async-handler");
const Razorpay = require("razorpay");

// creating order at razorpay
exports.createRazorPayOrder = asyncHandler(async (req, res, next) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount, // amount in smallest currency unit
    currency: "INR",
    receipt: "receipt_order_74394",
  };

  const order = await instance.orders.create(options);

  if (!order) throw new Error("Some error occured.Try again..!");

  res.status(200).json(order);
});

// payment success
exports.paymentSuccess = asyncHandler(async (req, res, next) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body;

  const shasum = crypto.createHmac("sha256", "<YOUR RAZORPAY SECRET>");
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpaySignature)
    return res.status(400).json({ msg: "Transaction not legit!" });

  const newPayment = PaymentDetails({
    razorpayDetails: {
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    },
    success: true,
  });

  await newPayment.save();

  res.json({
    msg: "success",
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
  });
});
