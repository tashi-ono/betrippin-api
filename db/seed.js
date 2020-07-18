const mongoose = require("./connection");
const Trip = require("../models/trip");
const Stop = require("../models/stop");
const PackingItem = require("../models/packingItem");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  await Stop.deleteMany({});
  await PackingItem.deleteMany({});
  await Trip.deleteMany({});
};
