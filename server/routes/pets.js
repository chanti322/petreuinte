const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const petModel = require("../models/petsModel");
console.log(petModel);
router.get("/all", (req, res) => {
  petModel.find({ type: "dog" }, function (err, pets) {
    if (err) {
      res.send(err);
    } else {
      res.send(pets);
    }
  });
});
/* //Schema
const Pet = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
  },
  img: {
    type: String,
    required: true,
  },
});
var Pet = mongoose.model("Pet", petSchema); */
// Create new Post
router.post("/createpost", (req, res) => {
  const { name, type, breed, pic } = req.body;

  /*   if (!type || !pic) {
    return res.status(422).json({
      error: "Please write the species/type of the animal and add a picture",
    });
  } */
  const pet = new petModel({
    name,
    type,
    breed,
    img: pic,
  });
  pet
    .save()
    .then((result) => {
      res.json({ pet: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});

module.exports = router;
