const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello from the server");
});

// setting up the server
app.listen(3000, () => {
  console.log("Server Started");
});
