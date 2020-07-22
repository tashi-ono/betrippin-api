const express = require("express");
const router = express.Router();

const Trip = require("../models/trip");
const Stop = require("../models/stop");

// root
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

// update a whole trip by its id
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

// update packing list to a trip
router.put("/trips/:id/updatePackingList", async (req, res) => {
  try {
    await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: { packingList: JSON.parse(req.body.packingList) } },
      { new: true },
      (err, trip) => {
        if (err) {
          res.status(500).send("The error is: ", err);
        }
        if (!trip) {
          res.status(500).send("Trip not found!");
        }
        return res.status(200).json(trip);
      }
    ).populate("stops");
  } catch (error) {
    return res.status(500).send("The error message is: ", error.message);
  }
});

// update departure date by the trip id
router.put("/trips/:id/updateDepartureDate", async (req, res) => {
  try {
    await Trip.findByIdAndUpdate(
      req.params.id,
      { $set: { departureDate: req.body.departureDate } },
      { new: true },
      (err, trip) => {
        if (err) {
          res.status(500).send("The error is: ", err);
        }
        if (!trip) {
          res.status(500).send("Trip not found!");
        }
        return res.status(200).json(trip);
      }
    ).populate("stops");
  } catch (error) {
    return res.status(500).send("The error message is: ", error.message);
  }
});

// add a stop to trip at a specific index
// if index is -1 it will add it to the end of the list
router.put("/trips/:tripId/addStop/:index", async (req, res) => {
  try {
    let stop = await Stop.create(req.body)
    await stop.save();
    let trip = await Trip.findById(req.params.tripId).populate("stops");
    if (!trip) {
      res.status(500).send("Trip not found!");
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
    console.log(trip)
    return res.status(200).json({ trip })
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// delete a stop from a trip
router.delete("/trips/:tripId/removeStop/:stopId", async (req, res) => {
  try {
    const stop = await Stop.findByIdAndDelete(req.params.stopId);
    if(!stop) {
      res.status(500).send("Stop not found!");
    }
    const trip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      { $pull: {stops: req.params.stopId} },
      {new: true}
    ).populate("stops");
    res.status(200).send({trip})
  } catch (error) {
    res.status(500).send(error.message)
  }
})

// delete a whole trip by id
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
