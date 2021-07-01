const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const petModel = require("../models/petsModel");
const commentModel = require("../models/commentModel");
const petDetailsModel = require("../models/petDetailsModel");
const requireLogin = require("../middleware/requireLogin")

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
router.get("/lost", requireLogin,   (req, res) => {
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
  const { radio, name, type, breed, color, markers, info, img, comment } = req.body;


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
    comment,
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
router.put('/comments', (req, res) => {

    const comment = {
      text: req.body.text,
      avatar: req.body.avatar,
      username: req.body.username,
      userId: req.body.userId
      
  }
    console.log(req.body)
  console.log("be comment",comment)
    petModel.findByIdAndUpdate(req.body.petId,{
        $push:{comments:comment}
    },/* {
        new:true
    } */)
    /* .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")*/
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    }) 
})
//Delete Comment
router.delete('/deleteComment/:commentId', (req, res) => {
  console.log("reqRem", req.params.commentId)
 // console.log("req", req)
/*   petModel.findOneAndDelete({ _id: req.params.commentId }, function (err) {
     if(err) console.log("err",err);
        console.log("This object will get deleted ");*/


 
  petModel.findOne({ _id: req.params.commentId })
  
    .exec((err,comment)=>{
        if(err || !comment){
            return res.status(422).json({error:err})
        }
     // if(post.postedBy._id.toString() === req.user._id.toString()){
              comment.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
       // } 
    })    }); 


module.exports = router;
/* router.post("/comments", (req, res) => {
  const { petId, userId, comment } = req.body;
  console.log("comment", comment)
  

 // petModel.findOneAndUpdate({ petId: petId }, function (req, res) {
  


    const commentPet = new commentModel({
      userId,
      comment,
    });
  
    commentPet
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
 // });
 

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