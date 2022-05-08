const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretOrKey = require("../config.js").secretOrKey;
const { body, check, validationResult } = require("express-validator");

const passport = require("passport");
const mongoose = require("mongoose");
const userModel = require("../models/usersModel");
const blacklistModel = require("../models/blacklistModel");
const requireLogin = require("../middleware/requireLogin");
const {
  userValidationResult,
  userValidator,
} = require("../middleware/userValidator");
// Create new user
router.post("/signUp", userValidator, userValidationResult, (req, res) => {
  const { username, email, password, pic } = req.body;
  /*   if (!username || !email || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    } */

  userModel
    .findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new userModel({
          username,
          email,
          password: hashedpassword,
          pic,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  userModel.findOne({ email: email }, (err, user) => {
    // console.log("user", user);
    if (err) {
      res.send("Email does not exist");
    } else {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          console.log("us", user);
          if (err) {
            res.send(err);
          }
          if (result) {
            console.log("res", result);
            const options = {
              id: user._id,
            };
            const token = jwt.sign(options, secretOrKey, { expiresIn: "7h" });

            console.log("islogin", token);
            const { pic, username, email, _id } = user;
            res.json({
              loggedIn: true,
              success: true,
              token: token,
              user: { pic, username, email, _id },

            });
          } else {
            res.send("password does not match");
          }
        });
      } else {
        return res.status(422).json({ error: "please add email or password" });
      }
    }
  });
});

router.post("/logout", (req, res) => {
  const { accessToken } = req.body;
  // console.log("body0", req.body);
  // console.log("body tok", accessToken);

  const blackList = new blacklistModel({
    accessToken,
  });

  blackList
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /blacklist",
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

// Get all the post of a user
 router.get("/userProfile/:userId", (req, res) => {

  let userId = req.params.userId;

  userModel
    .find({ _id: userId })
    .populate({ path: "pets" })
    .populate({ path: "favorites" })
    .exec((err, user) => {
      if (err) {
        res.status(400).json(`Error: ${err}`);
      } else {
       
     
       res.send(user)
       // res.json(user);
        console.log("user",user);
      }
    });
}); 

//Get all the favorites of a user
router.get(
  "/userProfile/favorites/:userId",
  /*  requireLogin, */ (req, res) => {
 
    let userId = req.params.userId;
    userModel
      .find({ _id: userId })
      .populate({ path: "favorites", select: "_id" })
      .exec((err, user) => {
        if (err) {
          res.status(400).json(`Error: ${err}`);
        } else {
          res.json(user);
  
        }
      });
  }
);

module.exports = router;
