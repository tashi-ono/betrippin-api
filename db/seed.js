const mongoose = require("./connection");
const Trip = require("../models/trip");
const Stop = require("../models/stop");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  await Stop.deleteMany({});
  await Trip.deleteMany({});

  const stops1 = new Stop([
    {
      name: "Lake Tahoe",
      lat: 39,
      lng: 40,
      thingsToDo: ["take pics", "buy food", "book hotel"],
    },
    {
      name: "Vagas",
      lat: 50,
      lng: -19,
      thingsToDo: ["gamble", "watch shows", "book restaurant"],
    },
    {
      name: "Great Cayon",
      lat: 23,
      lng: 90,
      thingsToDo: ["hiking", "camping"],
    },
  ]);
  await stops1.save();
  //   console.log("Created stops1!");

  const stops2 = new Stop([
    {
      name: "North Pole",
      lat: 200,
      lng: 19,
      thingsToDo: ["visit santa claus", "see a Husky"],
    },
    {
      name: "Alaska",
      lat: 45,
      lng: 29,
      thingsToDo: ["swim in cold water", "riding a sled", "go fishing"],
    },
  ]);
  await stops2.save();
  //   console.log("Created stops2!");

  const trips = [
    {
      name: "Christmas trip",
      stops: stops1._id,
      packingList: ["food", "drinks", "pillows", "phones", "clothes"],
      departureDate: "2018-12-19",
    },
    {
      name: "summer trip",
      stops: stops2._id,
      packingList: ["coat", "gloves", "beanies", "heater"],
      departureDate: "2019-8-19",
    },
  ];
  await Trip.insertMany(trips);
  console.log("Created two trips");
};

const run = async () => {
  await main();
  db.close();
};

run();
