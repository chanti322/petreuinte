 const jwt = require('jsonwebtoken')
const secretOrKey = require("../config.js").secretOrKey;
const mongoose = require('mongoose')
const userModel = require("../models/usersModel");
const express = require("express");
const router = express.Router();

const blacklistModel = require("../models/blacklistModel");
//console.log("model", blacklistModel)
module.exports = (request, response, next) => {
// console.log("request", request)
// Take the token from the Authorization header
  const token = request.header('Authorization').replace('Bearer ', '');
  console.log("iltok", token)
  if (!token) {
    response.status(403).send({
      message: 'No token provided!',
    });
  }
  router.get("/blacklist", (req, res) => {
              console.log("bodyBlacklist",req.body)
    blacklistModel.find({}, function (err, accesstoken) {
  console.log("b", accessToken)
    if (err) {
      res.send(err);
    } else {
        res.send(accesstoken);
        console.log("blacklist",res)
    }
  });
 });
  module.exports = router; 
  
// Verify the token
    jwt.verify(token, secretOrKey, (error, decoded) => {
        console.log("tok", token)
       
    if (error) {
      return response.status(401).send({
        status: 'error',
        message: error.message,
      });
    }

// Append the parameters to the request object
    request.userId = decoded.id;
   // request.tokenExp = decoded.exp;
   // request.token = token;
    next();
  });
};

  
  
    
    /*const token = authorization.replace("Bearer ","")
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,secretOrKey,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
           })
 */