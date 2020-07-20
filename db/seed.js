const mongoose = require("./connection");
const Trip = require("../models/trip");
// const Stop = require("../models/stop");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  //   await Stop.deleteMany({});
  await Trip.deleteMany({});

  //   const stops1 = await new Stop([
  //     {
  //       name: "Lake Tahoe",
  //       lat: "not sure",
  //       lng: "not sure",
  //       thingsToDo: ["take pics", "buy food", "book hotel"],
  //     },
  //     {
  //       name: "Vagas",
  //       lat: "not sure",
  //       lng: "not sure",
  //       thingsToDo: ["gamble", "watch shows", "book restaurant"],
  //     },
  //     {
  //       name: "Great Cayon",
  //       lat: "not sure",
  //       lng: "not sure",
  //       thingsToDo: ["hiking", "camping"],
  //     },
  //   ]);
  //   await stops1.save();
  //   console.log("Created stops1!");

  //   const stops2 = await new Stop([
  //     {
  //       name: "North Pole",
  //       lat: "not sure",
  //       lng: "not sure",
  //       thingsToDo: ["visit santa claus", "see a Husky"],
  //     },
  //     {
  //       name: "Alaska",
  //       lat: "not sure",
  //       lng: "not sure",
  //       thingsToDo: ["swim in cold water", "riding a sled", "go fishing"],
  //     },
  //   ]);
  //   await stops2.save();
  //   console.log("Created stops2!");

  const trips = [
    {
      name: "Christmas trip",
      //   stops: stops1._id,
      //   packingList: ["food", "drinks", "pillows", "phones", "clothes"],
      departureDate: "2018-12-19",
    },
    {
      name: "summer trip",
      //   stops: stops2._id,
      //   packingList: ["coat", "gloves", "beanies", "heater"],
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
