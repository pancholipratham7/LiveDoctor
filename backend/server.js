const express = require("express");
const app = express();
const connectDb = require("./database");

// setting up connection to the database
connectDb();

app.get("/", (req, res, next) => {
  res.send("Hello from the server");
});

// setting up the server
app.listen(5000, () => {
  console.log("Server Started");
});
