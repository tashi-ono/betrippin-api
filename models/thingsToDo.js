const mongoose = require("../db/connection");

const thingToDoSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model("thingToDo", thingToDoSchema);
