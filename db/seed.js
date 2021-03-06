const mongoose = require("./connection");
const Trip = require("../models/trip");
const Stop = require("../models/stop");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


Trip.find({}).deleteMany(() => {
  Stop.find({}).deleteMany(() => {
    Trip.create({
      name: "Summer Trip",
      packingList: ["coat", "gloves", "heater"],
      departureDate: "2019-8-13",
    }).then((trip) => {
      Promise.all([
        Stop.create({
          name: "Alberta Canada",
          lat: 53.9332706,
          lng: -116.5765035,
          thingsToDo: ["ride a sled", "touch a Husky", "swim in ice sea"],
        }).then((createdStop) => {
          createdStop.save();
          trip.stops.push(createdStop);
        }),
        Stop.create({
          name: "Ketchikan, Alaska",
          lat: 55.34222219999999,
          lng: -131.6461112,
          thingsToDo: ["live in ice house", "catch a fish"],
        }).then((createdStop) => {
          createdStop.save();
          trip.stops.push(createdStop);
        }),
      ]).then(() => {
        trip.save();
      });
    });

    Trip.create({
      name: "Winter Trip",
      packingList: ["water", "sunscreen", "blanket"],
      departureDate: "2019-12-13",
    }).then((trip) => {
      Promise.all([
        Stop.create({
          name: "Key West",
          lat: 24.5550593,
          lng: -81.7799871,
          thingsToDo: ["see dolphins", "lie on the grass"],
        }).then((createdStop) => {
          createdStop.save();
          trip.stops.push(createdStop);
        }),
        Stop.create({
          name: "Miami",
          lat: 25.7616798,
          lng: -80.1917902,
          thingsToDo: ["sunbathe", "swimming", "coconut"],
        }).then((createdStop) => {
          createdStop.save();
          trip.stops.push(createdStop);
        }),
        Stop.create({
          name: "Sarasota",
          lat: 27.3364347,
          lng: -82.53065269999999,
          thingsToDo: ["eat icecream", "visit uncle"],
        }).then((createdStop) => {
          createdStop.save();
          trip.stops.push(createdStop);
        }),
      ]).then(() => {
        trip.save();
      });
    });
  });
});
