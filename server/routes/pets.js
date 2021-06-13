const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const petModel = require("../models/petsModel");
const petDetailsModel = require("../models/petDetailsModel");

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

// only Lost Pets
router.get("/lost", (req, res) => {
  petModel.find({ radio: "lost" }, function (err, pets) {
    if (err) {
      res.send(err);
    } else {
      res.send(pets);
    }
  });
});
//only Found pets
router.get("/found", (req, res) => {
  petModel.find({ radio: "found" }, function (err, pets) {
    if (err) {
      res.send(err);
    } else {
      res.send(pets);
    }
  });
});

// More details single pet
router.get("/details/:id", (req, res) => {
  let petId = req.params.id;
  console.log(petId)
  petModel.findById(petId).exec(function (err, pet) {
    if (err) {
      console.log("err")
    } else {
      console.log("got single pet")
      res.json(pet)
    }
  });
})
// Create new Post
router.post("/uploads", (req, res) => {
  const { radio, name, type, breed, color, markers, info, img } = req.body;
  console.log(img);

  /*   if (!type || !pic) {
    return res.status(422).json({
      error: "Please write the species/type of the animal and add a picture",
    });
  } */
  const pet = new petModel({
    radio,
    name,
    type,
    breed,
    color,
    markers,
    info,
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
