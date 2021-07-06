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
router.post(
  "/signUp",
  [
    check("username")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 15 })
      .withMessage("Name must have between 3 and 15 characters"),
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please provide a valid Email"),
    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userValidationResult,
  (req, res) => {
    const { username, email, password, pic } = req.body;
    if (!username || !email || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    }

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
  }
);

//Login
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  userModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send("Email does not exist");
    } else {
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
    }
  });
});

router.post("/logout", (req, res) => {
  const { accessToken } = req.body;
  console.log("body0", req.body);
  console.log("body tok", accessToken);

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
  console.log(req.params.userId);
  let userId = req.params.userId;
  userModel
    .find({ _id: userId })
    .populate({ path: "pets" })
    .populate({ path: "favorites" })
    .exec((err, user) => {
      if (err) {
        res.status(400).json(`Error: ${err}`);
      } else {
        res.json(user);
        console.log(user);
      }
    });
});

//Get all the favorites of a user
router.get("/userProfile/favorites/:userId", (req, res) => {
  console.log(req.params.userId);
  let userId = req.params.userId;
  userModel
    .find({ _id: userId })
    .populate({ path: "favorites", select: "_id" })
    .exec((err, user) => {
      if (err) {
        res.status(400).json(`Error: ${err}`);
      } else {
        res.json(user);
        console.log(user);
      }
    });
});
/* router.get(
  "/userProfile",
requireLogin,
 
  (req, res) => {
  //  console.log("profile",req.user);
    res.send(req.user);
  }
);  */

module.exports = router;

/* router.post('/logout', passport.authenticate("jwt", { session: false }), async(req, res) => {
    try{
        let randomNumberToAppend = toString(Math.floor((Math.random() * 1000) + 1));
        let randomIndex = Math.floor((Math.random() * 10) + 1);
        let hashedRandomNumberToAppend = await bcrypt.hash(randomNumberToAppend, 10);
    
        // now just concat the hashed random number to the end of the token
       req.token = req.token + hashedRandomNumberToAppend;
       console.log("newTok",req.token)
        return res.status(200).json('logout');
    }catch(err){
        return res.status(500).json(err.message);
    }
});  */
//Log out

/* router.post('/logout', passport.authenticate("jwt", { session: false }), async (req, res) => {
  
  try {
 
    //  const auth =req.headers.authorization
    console.log("body", req.body)
    //console.log("res", res)
   // console.log("new", newA)
   // console.log("req", req.headers)
    /*  const blackList = new blacklistModel({
      blacklistArray: req.body.accessToken
   
  });
 
  blackList
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /black",
        createdComment: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });  
  
        return res.status(200).json('logout');
    }catch(err){
        return res.status(500).json(err.message);
    }
});   */
