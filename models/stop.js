const mongoose = require("../db/connection");

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: String },
  lng: { type: String },
  thingsToDo: [{ type: String }],
});

module.exports = mongoose.model("stop", stopSchema);
