const mongoose = require("../db/connection");

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: String },
  lng: { type: String },
  thingsToDo: [{ type: mongoose.Schema.Types.ObjectId, ref: "thingToDo" }],
});

module.exports = mongoose.model("stop", stopSchema);
