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
          name: "North Pole",
          lat: 30,
          lng: 40,
          thingsToDo: ["ride a sled", "touch a Husky", "swim in ice sea"],
        }).then((createdStop) => {
          //   createdStop.save();
          trip.stops.push(createdStop);
        }),
        Stop.create({
          name: "Alaska",
          lat: 40,
          lng: -190,
          thingsToDo: ["live in ice house", "catch a fish"],
        }).then((createdStop) => {
          //   createdStop.save();
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
          name: "Australia",
          lat: 30,
          lng: 40,
          thingsToDo: ["see kangaroos", "lie on the grass"],
        }).then((createdStop) => {
          //   createdStop.save();
          trip.stops.push(createdStop);
        }),
        Stop.create({
          name: "Island",
          lat: 40,
          lng: -190,
          thingsToDo: ["sunbathe", "swimming", "coconut"],
        }).then((createdStop) => {
          //   createdStop.save();
          trip.stops.push(createdStop);
        }),
      ]).then(() => {
        trip.save();
      });
    });
  });
});

// };

// const run = async () => {
//   await main();
//   db.close();
// };

// run();

// main();
