const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const petModel = require("../models/petsModel");

//const upload = require("../middleware/upload");
router.get("/all", (req, res) => {
  petModel.find({}, function (err, pets) {
    if (err) {
      res.send(err);
    } else {
      res.send(pets);
    }
  });
});
module.exports = router;
// Create new Post
router.post("/uploads", (req, res) => {
  const { name, type, breed, img } = req.body;
  console.log(img);

  /*   if (!type || !pic) {
    return res.status(422).json({
      error: "Please write the species/type of the animal and add a picture",
    });
  } */
  const pet = new petModel({
    name,
    type,
    breed,
    img: img,
  });
  /*   if (req.file) {
    pet.avatar = req.file.path;
  } */
  pet
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /pet",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = router;
