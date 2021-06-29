 const jwt = require('jsonwebtoken')
const secretOrKey = require("../config.js").secretOrKey;
const mongoose = require('mongoose')
const userModel = require("../models/usersModel");
const express = require("express");
const router = express.Router();

const blacklistModel = require("../models/blacklistModel");

module.exports = async (request, response, next) => {

// Take the token from the Authorization header

  let token = request.header('Authorization').replace('Bearer ', '');
  
  //Checking if token exists
  
    if (!token) {
    response.status(403).send({
      message: 'No token provided!',
    });
  }

    //blacklist
    const black = await blacklistModel.findOne({ accessToken: token }, function (err, accesstoken) {
    console.log("b", accesstoken)
      if (accesstoken !== null) {
        console.log("tokinblacklist", accesstoken.accessToken)
        response.status(401).send({

        status: 'error',
        message: "not allowed",
      });
         
     //  response.write("<p>Hello World</p>");
 // response.end();
     
        
      } else {
        console.log("no logout")
      } 
      /* accesstoken.forEach(tok => {
        //console.log(tok.accessToken)
        if (tok.accessToken === token) {
         // token2 = token + "cc";
         // console.log("cc", token2)
          token = request.header('Authorization').replace('Bearer ', 'c');
          console.log("+c",token)
        //  token2=token
 
        } else {
         // token2 =token
         // console.log("valid")
        }
      }) */

    });
  



 
  
// Verify the token
    jwt.verify(token, secretOrKey, (error, decoded) => {
     
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
   //   next();
     
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
/*   router.get("/blacklist", (req, res) => {
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
  module.exports = router;  */
 // console.log("list", blacklist)
 /*  const blacklist = 
    blacklistModel.find({}, function (err, accesstoken) {
      //  console.log("b", accesstoken[0])
      accesstoken.forEach(tok => {
        console.log(tok.accessToken)
        if (tok.accessToken === token) {
          token = token + "cc";
          console.log("cc", token)
  
 
        } else { console.log("valid") }
      })

    }); */
    //console.log(blacklist)