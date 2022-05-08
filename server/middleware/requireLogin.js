const jwt = require("jsonwebtoken");
const secretOrKey = require("../config.js").secretOrKey;
const mongoose = require("mongoose");
const userModel = require("../models/usersModel");
const express = require("express");
const router = express.Router();

const blacklistModel = require("../models/blacklistModel");

module.exports = async (request, response, next) => {
  // Take the token from the Authorization header

  let token = request.header("Authorization").replace("Bearer ", "");

  //Checking if token exists
  let errorChecker = false;
  if (token == null) {
    console.log("no token");
    response.status(403).send({
      message: "No token provided!",
    });
  } else if (token) {
    //Check if the blacklist contains the token
    const black = await blacklistModel.findOne(
      { accessToken: token },
      function (err, accesstoken) {
       
        if (accesstoken !== null) {
          errorChecker = true;
          response.status(401).send({
            status: "error",
            message: "not allowed",
          });

         
        } else if (token != null && accesstoken == null) {
          console.log("token is not in the blacklists");
        }
        if (err) {
          console.log("err", err);
        }
      }
    );
  }

  // Verify the token
  jwt.verify(token, secretOrKey, (error, decoded) => {
    if (error) {
      return response.status(401).send({
        status: "error",
        message: error.message + " You have to log in",
      });
    }

    // Append the parameters to the request object
    request.userId = decoded.id;
   
    if (!errorChecker) {
      next();
    }
  });
};


