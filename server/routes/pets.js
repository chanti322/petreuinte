const express = require("express");
const router = express.Router();
const petModel = require("../models/petsModel");
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
