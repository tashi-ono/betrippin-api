const express = require("express");
const router = express.Router();

const Trip = require("../models/trip");
const Stop = require("../models/stop");

router.get("/", async (req, res) => {
  await res.send("This is the root!");
});

// read all the trips
router.get("/trips", async (req, res) => {
  try {
    const trips = await Trip.find({}).populate("stops");
    return res.json({ trips });
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
});

// read a trip by its id
router.get("/trips/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate("stops");
    return res.json({ trip });
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
});

// create a trip
router.post("/trip", async (req, res) => {
  try {
    const trip = await new Trip(req.body);
    await trip.save();
    return res.status(201).json({ trip });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// update a trip by its id
router.put("/trips/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Trip.findByIdAndUpdate(id, req.body, { new: true }, (err, trip) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!trip) {
        res.status(500).send("Trip not found!");
      }
      return res.status(200).json(trip);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// update stops to trip
router.put("/:tripId/addStops/:stopId", (req, res) => {
  Stop.findById(req.params.stopId, (err, stop) => {
    if (err) console.log(err);
    else {
      Trip.findByIdAndUpdate(
        req.params.tripId,
        {
          $push: {
            stops: stop._id,
          },
        },
        (err, trip) => {
          if (err) console.log(err);
          else res.send(trip);
        }
      );
    }
  });
});

// delete a trip by id
router.delete("/trips/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrip = await Trip.findByIdAndDelete(id);
    if (deletedTrip) {
      return res.status(200).send("Trip deleted");
    }
    throw new Error("Trip not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
