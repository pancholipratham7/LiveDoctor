const express = require("express");
const app = express();
const connectDb = require("./database");
const middlewares = require("./middlewares/errorMiddlewares");
const cors = require("cors");

// All routers
const doctorsRouter = require("./routes/doctorRoutes");
const usersRouter = require("./routes/userRoutes");
const paymentRouter = require("./routes/paymentRoutes");

// setting up connection to the database
connectDb();

// parsing the incoming data in req.body
app.use(express.json());

// Using cors to anable cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//  api routes for doctors
app.use("/api/doctors", doctorsRouter);
app.use("/api/users", usersRouter);
app.use("/api/payment", paymentRouter);

// If a page is not found
app.use(middlewares.notFound);

// global error handler middleware
app.use(middlewares.errorHandler);

// setting up the server
app.listen(5000, () => {
  console.log("Server Started");
});
