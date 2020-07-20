const mongoose = require("../db/connection");

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // stops: [{ type: mongoose.Schema.Types.ObjectId, ref: "stop" }],
  // packingList: [{ type: String }],
  departureDate: { type: String },
});

const Trip = mongoose.model("trip", tripSchema);
module.exports = Trip;
