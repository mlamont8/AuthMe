const mongoose = require("mongoose");

const db = mongoose.connection;

const dbase =
  "mongodb+srv://authUser:welcome123@cluster0-9nved.mongodb.net/test?retryWrites=true&w=majority";

exports.configureDB = () => {
  mongoose.connect(dbase, { useNewUrlParser: true });

  //check to see if connected to database
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", () => console.log("connected to the database successfully"));
};
