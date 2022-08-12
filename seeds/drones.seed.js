// Iteration #1
const dataBaseExport = require("../db");
const mongoose = require("mongoose");
const importedDroneSchema = require("../models/Drone.model.js");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

importedDroneSchema
  .create(drones)
  .then((insertedDroneData) => {
    console.log(
      "It worked, here is how many drones you have:",
      insertedDroneData.length
    );
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log(`Mongo connection disconnected`);
      process.exit(0);
    });
  })
  .catch((err) => console.log(err));
