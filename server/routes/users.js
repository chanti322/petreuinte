const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secretOrKey = require("../config.js").secretOrKey;

const passport = require("passport");
const mongoose = require("mongoose");
const userModel = require("../models/usersModel");
const blacklistModel = require("../models/blacklistModel");
const requireLogin = require("../middleware/requireLogin")

// Create new user
router.post('/signUp',(req,res)=>{
  const {username,email,password,pic} = req.body 
  if(!username || !email || !password){
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
                username,
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
  
  const email = req.body.email;
  const password = req.body.password;
   if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
  userModel.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send("Email does not exist");
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log("us",user);
        if (err) {
          res.send(err);
        }
        if (result) {
          console.log("res",result)
          const options = {
            id: user._id,
          };
          const token = jwt.sign(options, secretOrKey, { expiresIn: "15m" });
          /* if (blacklist.indexOf(token) = -1) {
            return token
          }
          else {
            token = "";
            console.log("Invalid token")
          } */
          console.log(token);
         const { pic,username,email} = user;
          res.json({
            loggedIn:true,
            success: true,
            token: token,
          user:{pic,username,email}
          });
        } else {
          res.send("password does not match");
        }
      });
    }
  });
});

router.post("/logout", (req, res) => {
  const { accessToken} = req.body;
console.log("body0",req.body)

  /*   if (!type || !pic) {
    return res.status(422).json({
      error: "Please write the species/type of the animal and add a picture",
    });
  } */
 /*  bcrypt.hash(accessToken, 12)
    .then(hashedaccessToken => { */
    const blackList = new blacklistModel({
   accessToken
     
  });
 
  


  /*   if (req.file) {
    pet.avatar = req.file.path;
  } */
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
      // })
});

router.get(
  "/userProfile",
//requireLogin,
 passport.authenticate("jwt", { session: false }), 
  (req, res) => {
    console.log("profile",req.user);
    res.send(req.user);
  }
); 




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


