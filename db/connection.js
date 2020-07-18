const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost" + "betrippin_db";

mongoose
  .connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

module.exports = mongoose;
