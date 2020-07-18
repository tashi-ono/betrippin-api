const mongoose = require("../db/connection");

const packingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("packingItem", packingItemSchema);
