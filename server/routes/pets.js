const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("../models/usersModel");
const petModel = require("../models/petsModel");
const commentModel = require("../models/commentModel");
const petDetailsModel = require("../models/petDetailsModel");
const requireLogin = require("../middleware/requireLogin");

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
router.get("/lost", requireLogin, (req, res) => {
  petModel
    .find({ radio: "lost" }, function (err, pets) {
      if (err) {
        res.send(err);
      } else {
        res.send(pets);
      }
    })
    .populate("userId");
});
//only Found pets
router.get("/found", (req, res) => {
  petModel
    .find({ radio: "found" }, function (err, pets) {
      if (err) {
        res.send(err);
      } else {
        res.send(pets);
      }
    })
    .populate("userId");
});
//only in Save pets
router.get("/inSave", (req, res) => {
  petModel
    .find({ inSave: true }, function (err, pets) {
      if (err) {
        res.send(err);
      } else {
        res.send(pets);
      }
    })
    .populate("userId");
});
// More details single pet
router.get("/details/:id", (req, res) => {
  let petId = req.params.id;
  console.log(petId);
  petModel.findById(petId).exec(function (err, pet) {
    if (err) {
      console.log("err");
    } else {
      console.log("got single pet");
      res.json(pet);
    }
  });
});
// Create new Post
router.post("/uploads", (req, res) => {
  const {
    radio,
    name,
    type,
    breed,
    color,
    markers,
    info,
    img,
    comment,
    userId,
    inSave,
    favorite,
  } = req.body;

  if (!type || !img || !radio) {
    return res.status(422).json({
      error:
        "Please write the species/type of the animal,if your lost or your found it and add a picture",
    });
  }
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
    userId,
    inSave,
    favorite,
  });

  pet
    .save()
    .then((result) => {
      let userIdReal = req.body.userId;
      console.log("res", result._id);
      userModel.findByIdAndUpdate(
        userIdReal,
        { $push: { pets: result._id } },
        { new: true },
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log(success);
          }
        }
      );

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
router.put("/comments", (req, res) => {
  const comment = {
    text: req.body.text,
    avatar: req.body.avatar,
    username: req.body.username,
    userId: req.body.userId,
  };
  console.log(req.body);
  console.log("be comment", comment);
  petModel
    .findByIdAndUpdate(
      req.body.petId,
      {
        $push: { comments: comment },
      } /* {
        new:true
    } */
    )

    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

// Assign inSave == true and radio ==" " to the post
router.put("/atHome", (req, res) => {
  const inSavePet = {
    inSave: req.body.inSavePet,
  };
  // console.log(req.body);
  //console.log("in Save", inSavePet);
  petModel.findByIdAndUpdate(
    req.body.petId,
    { $set: { inSave: req.body.inSavePet, radio: " " } },
    { upsert: true },
    function (err, result) {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    }
  );
});

router.delete("/deleteComment/:petId/:commentId", async (req, res) => {
  const { petId, commentId } = req.params;
  console.log("pet", petId);
  console.log("petcomm", commentId);

  try {
    petModel
      .updateOne(
        { _id: req.params.petId },
        { $pull: { comments: { _id: req.params.commentId } } },
        { new: true, useFindAndModify: false },
        function (err, data) {
          if (err) {
            return res.status(404).json({ message: "Error" });
          } else {
            // console.log(data);
            res.send(commentId);
          }
          /*   return res.status(200).json({
              success: true,
              message: 'success'
          }); */
        }
      )
      .exec();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Add favorite to post
router.put("/addFavorite", requireLogin, async (req, res) => {
  let favorite = req.body.favorite;
  let userIdReal = req.body.userId;
  console.log("userBE", req.body.userId);
  try {
    const addOneFav = await petModel.findByIdAndUpdate(
      req.body.petId,
      { $inc: { favorite: favorite } },
      { new: true }
      /*   function (err, result) {
        console.log("userinResult", userIdReal);
        console.log("result", result);

        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json({ message: result.favorite });
        }
      } */
    );
    const addFavInUser = await userModel.updateOne(
      { _id: userIdReal },
      { $addToSet: { favorites: req.body.petId } },
      { new: true, upsert: true }
    );
    res.status(200).json({ addFavUser: addFavInUser, addOneFav: addOneFav });
    //  res.json({ message: res.favorite });
  } catch (err) {
    console.log({ err: err });
  }
});
//Get quantity of likes
router.get("/favorite/:petId", (req, res) => {
  let petId = req.params.petId;
  console.log("pp", petId);
  petModel.find({ _id: petId }, "favorite", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//Delete Favorites
router.put("/removeFavorite", requireLogin, async (req, res) => {
  let favorite = req.body.favorite;
  let userIdReal = req.body.userId;
  // console.log("user", req.body.userId);
  try {
    const removeOneFav = await petModel.findByIdAndUpdate(
      req.body.petId,
      { $inc: { favorite: favorite } },
      { new: true }
    );
    const removeFavInUser = await userModel.updateOne(
      { _id: userIdReal },
      { $pull: { favorites: req.body.petId } },
      { new: true, upsert: true }
    );
    res
      .status(200)
      .json({ removeFavUser: removeFavInUser, removeOneFav: removeOneFav });
  } catch (err) {
    console.log(err);
  }
});
//Delete Post
router.post("/deletePost", function (req, res) {
  let postIdt = req.body.postId;
  //console.log(postIdt);
  petModel
    .findOneAndRemove({ _id: req.body.postId }, function (err, response) {
      if (err) throw err;

      userModel.updateOne(
        { pets: req.body.postId },
        { $pull: { pets: req.body.postId } },
        function (err, res) {
          if (err) {
            throw err;
          } else {
            // console.log(res);
          }
        }
      );
      userModel.updateMany(
        { favorites: req.body.postId },
        { $pull: { favorites: req.body.postId } },
        function (err, res) {
          if (err) {
            throw err;
          } else {
            // console.log(res);
          }
        }
      );
    })
    .then(function () {
      res.json({ message: "success" });
    });
  // console.log("res", res);
});

module.exports = router;
