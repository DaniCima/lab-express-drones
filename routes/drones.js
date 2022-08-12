const express = require("express");
const router = express.Router();
const importedDroneSchema = require("../models/Drone.model.js");

// require the Drone model here

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  importedDroneSchema
    .find({})
    .then((droneData) => {
      res.render("drones/list", { droneData });
    })
    .catch((error) => `Error while fetching all books: ${error}`);
});

router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;
  importedDroneSchema
    .create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((error) => {
      res.redirect("/drones/create");
      console.log(`Error while fetching all drones: ${error}`);
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  importedDroneSchema.findById(id).then((droneToModify) => {
    res.render("drones/update-form", droneToModify);
  });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  importedDroneSchema
    .findByIdAndUpdate(
      id,
      {
        name,
        propellers,
        maxSpeed,
      },
      { new: true }
    )
    .then((updatedDrone) => {
      res.redirect("/drones");
    })
    .catch((error) => {
      res.redirect(`/drones/${id}/edit`);
      console.log(`Error while updating the drone: ${error}`);
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;
  importedDroneSchema
    .findByIdAndDelete(id)
    .then(() => res.redirect("/drones"))
    .catch((err) => console.log(err));
});
// router.post("/drones/:id/delete", (req, res, next) => {
//   const { id } = req.params;
//   importedDroneSchema
//     .findByIdAndDelete(id)
//     .then(() => res.redirect("/drones"))
//     .catch((error) => `Error while deleting drone: ${error}`);
// });

module.exports = router;
