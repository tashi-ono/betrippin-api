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

// add a stop to trip at a specific index
// if index is -1 it will add it to the end of the list
router.put("/trips/:tripId/addStop/:index", async (req, res) => {
  try {
    console.log(req.body)
    let stop = await Stop.create(req.body)
    await stop.save();
    let trip = await Trip.findById(req.params.tripId).populate("stops");
    if (!trip) {
      console.log("Trip not Found")
      return res.status(500).send("Trip not found!");
    }
    if(req.params.index == -1) {
      await trip.stops.push(stop);
    } else {
      await trip.stops.push(
        {
          $each: [stop],
          $position: parseInt(req.params.index)
        }
      );
    }
    trip.save()
    return res.status(200).json({ trip })
  } catch (error) {
    return res.status(500).send(error.message);
  }
})


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
