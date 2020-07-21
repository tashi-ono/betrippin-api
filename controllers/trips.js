const express = require("express");
const router = express.Router();

const Trip = require("../models/trip");
const Stop = require("../models/stop");

router.get("/", async (req, res) => {
  await res.send("This is the root!");
});

router.get("/trips", async (req, res) => {
  try {
    const trips = await Trip.find();
    return res.json({ trips });
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
});

router.get("/stops", async (req, res) => {
  try {
    const stops = await Stop.find();
    return res.json({ stops });
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
});

module.exports = router;
