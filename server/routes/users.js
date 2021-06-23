const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secretOrKey = require("../config.js").secretOrKey;

const passport = require("passport");
const mongoose = require("mongoose");
const userModel = require("../models/usersModel");

// Create new user
router.post('/signUp',(req,res)=>{
  const {name,email,password,pic} = req.body 
  if(!name || !email || !password){
     return res.status(422).json({error:"please add all the fields"})
  }
 userModel.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new userModel({
                name,
              email,
                password:hashedpassword,
                pic
            })
    
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
})




//Login
router.post("/login", (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  userModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send("Email does not exist");
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log(result);
        if (err) {
          res.send(err);
        }
        if (result) {
          const options = {
            id: user._id,
          };
          const token = jwt.sign(options, secretOrKey, { expiresIn: "30d" });
          console.log(token);
       
          res.json({
            success: true,
            token: token,
          });
        } else {
          res.send("password does not match");
        }
      });
    }
  });
});

router.get(
  "/userProfile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send(req.user);
  }
); 
module.exports = router;

