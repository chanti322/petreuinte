const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const petModel = require("../models/petsModel");
const commentModel = require("../models/commentModel");
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
  petModel.findById(petId).populate("comments").exec(function (err, pet) {
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
        createdPet: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});
// Create a comment
router.post("/comments", (req, res) => {
  const { petId, text} = req.body;


  /*   if (!type || !pic) {
    return res.status(422).json({
      error: "Please write the species/type of the animal and add a picture",
    });
  } */
  const comment = new commentModel({
    petId,
    text, 
  });
  /*   if (req.file) {
    pet.avatar = req.file.path;
  } */
  comment
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /comment",
        createdComment: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
});
// comments
/* router.put('/comment',(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    petModel.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
}) */
module.exports = router;
