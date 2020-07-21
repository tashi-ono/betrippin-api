const express = require("express");
const router = express.Router();

const Stop = require("../models/stop");

// read all the stops
router.get("/stops", async (req, res) => {
  try {
    const stops = await Stop.find();
    return res.json({ stops });
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
});

// read a stop by its id
router.get("/stops/:id", async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.id);
    return res.json({ stop });
  } catch (error) {
    console.log("error");
    return res.status(500).send(error.message);
  }
});

// create a stop
router.post("/stop", async (req, res) => {
  try {
    const stop = await new Stop(req.body);
    await stop.save();
    return res.status(201).json({ stop });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// update a stop by its id
router.put("/stops/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Stop.findByIdAndUpdate(id, req.body, { new: true }, (err, stop) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!stop) {
        res.status(500).send("Stop not found!");
      }
      return res.status(200).json(stop);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// delete a stop by id
router.delete("/stops/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStop = await Stop.findByIdAndDelete(id);
    if (deletedStop) {
      return res.status(200).send("Stop deleted");
    }
    throw new Error("Stop not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
