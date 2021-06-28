const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const secretOrKey = require("./config.js").secretOrKey;
const userModel = require("./models/usersModel");
const jwt = require('jsonwebtoken')
const blacklistModel = require("./models/blacklistModel");
const express = require("express");
const router = express.Router();

const jwtOptions = {
  secretOrKey: secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
 /*  jwt.verify(token, secretOrKey, (error, decoded) => {
        console.log("tok", token)
       
   /* if (error) {
      return response.status(401).send({
        status: 'error',
        message: error.message,
      });
    }

// Append the parameters to the request object
   // request.userId = decoded.id;
   // request.tokenExp = decoded.exp;
   // request.token = token;
  //  next();
  }); */



const jwtVerify = async (payload, next) => {
 // console.log("payload", payload);
 // console.log("next",next)
  try {
    const user = await userModel.findById(payload.id);
    console.log("user :> ", user);
    console.log("next", next)
    const blacklist = await blacklistModel.find({})
   // console.log("blpass", blacklist)
    jwt.verify(token, secretOrKey, (error, decoded) => {
      console.log("tok", token)
    })

    if (!user) {
      return next(null, false);
    }
    next(null, user);
  } catch (error) {
    next(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};