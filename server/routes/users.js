const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose");
const userModel = require("../models/usersModel");

// Create new user
/* 
    const register = (req, res, next) => {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                })
            }
            let newUser = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPass
            })
            newUser.save()
                .then((result) => {
                    res.status(201).json({
                        message: "Handling POST requests to /user",
                        createdUser: result,
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(400).json({
                        error: err,
           
                    })
                })
        })
   
    }

module.exports = { register }
router.post("/signUp", register) */
module.exports=router


/* router.post('/signUp',(req,res)=>{
  const {name,email,password} = req.body 
   if(!email || !password || !name){
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
                email,
                password:hashedpassword,
                name,
               
            })
    
            user.save()
            .then(user=>{
                // transporter.sendMail({
                //     to:user.email,
                //     from:"no-reply@insta.com",
                //     subject:"signup success",
                //     html:"<h1>welcome to instagram</h1>"
                // })
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
}) */



router.post("/signUp", (req, res) => {
  const {  name, email, password } = req.body;
  /*  bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new userModel({
                email,
                password:hashedpassword,
                name,
               
            }) */
const user = new userModel({
      name,
      email,
    password,
      
  }); 
 
  user.save()
    .then((result) => {
      res.status(201).json({
        message: "Handling POST requests to /user",
        createdUser: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    });
}); 
  
//Login
/* const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    userModel.findOne({ $or: [{ email: username }] })
    .then(user => {
        if (user) {
            bcrypt.compare(password.user.password, function (err, result) {
                if (err) {
                    res.json({
                        error:err
                    })
                }
                if (result) {
                    let token= jwt.sign({name:user.name}, 'verySecretValue',{expiresIn:"1h"})
                    res.json({
                   message:"Login successfull!",
                   token
               })
                }
                else {
                    res.json({
                        message: "Password does not matched!"
                    })
                }
            })
        } else {
            res.json({
                
                message:"No user found!"
            })
        }
    })
} */
module.exports = router;

