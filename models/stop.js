const mongoose = require("../db/connection");

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true},
  lng: { type: Number, required: true},
  thingsToDo: [{ type: String }],
});

const Stop = mongoose.model("stop", stopSchema);
module.exports = Stop;
