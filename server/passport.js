/* const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const secretOrKey = require("./config.js").secretOrKey;
const userModel = require("./models/usersModel");
let jwt = require('jsonwebtoken')
const blacklistModel = require("./models/blacklistModel");
const express = require("express");
const router = express.Router(); */
//console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
/* let getTok = (request, response, next) => {
console.log("request", request)
// Take the token from the Authorization header
  const token = request.header('Authorization').replace('Bearer ', '');
  console.log("iltok", token)
  if (!token) {
    response.status(403).send({
      message: 'No token provided!',
    });
  }

  
// Verify the token
    jwt.verify(token, secretOrKey, (error, decoded) => {
        console.log("tok", token)
       
/*     if (error) {
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
}; */

/* const jwtOptions = {
  secretOrKey: secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, next) => { */
 // console.log("payload", payload);
 // console.log("next",next)

/*   try {
    const user = await userModel.findById(payload.id);
    console.log("user :> ", user);
   // console.log("next", next)
    const blacklist = await blacklistModel.find({}) */
    //const gett = await getTok()
   // console.log("blpass", blacklist)
/*    const ver = jwt.verify(token, secretOrKey, function(err, decoded) {
 if(err){
     console.log(err)
 }else{
     console.log(decoded)
 }
    })
    console.log("ver",ver) */
 //const tok = await getTok()
 /*   if (!user) {
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
  
}; */

 /*  module.exports = (request, response, next) => {
  console.log("requestheader",request)
    const token = request.header('Authorization').replace('Bearer ', '');
  console.log("iltokinpass", token)
  jwt.verify(token, secretOrKey, (error, decoded) => {
    console.log("tok", decoded)
  })
} */

/* function getTok(req, res) {
  // console.log("r",req)
  //const token = req.body.token;
  console.log("tp", token)
  if (!token) {
    return res.status(403).send({
      message: "Token ungültig, bitte melde dich ab und wieder an."
    });
  }
  jwt.verify(req.body.token, "key", function (err) {
    if (err) {
      res.status(403).send(false);
      return null;
    }
  });
} */
/* module.exports = (request, response, next) => {
  console.log("requestheader",request)
    const token = request.header('Authorization').replace('Bearer ', '');
  console.log("iltokinpass", token)
  jwt.verify(token, secretOrKey, (error, decoded) => {
    console.log("tok", decoded)
  })

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
}; */