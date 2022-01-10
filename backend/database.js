const mongoose = require("mongoose");
const dotenv = require("dotenv");

//adding the env variables to process.env
dotenv.config({ path: "./config.env" });

//Function for  connecting our app to hosted mongodb datbase
const connectDb = async () => {
  try {
    const DB = process.env.DATABASE_URL;
    //Connecting our express application to hosted mongodb database through mongoose
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDb connected");
  } catch (err) {
    console.log(`Error 💥 : ${err.message}`);
  }
};

module.exports = connectDb;
