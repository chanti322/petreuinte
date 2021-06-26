const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const secretOrKey = require("./config.js").secretOrKey;
const userModel = require("./models/usersModel");

const jwtOptions = {
  secretOrKey: secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};


const jwtVerify = async (payload, next) => {
  console.log("payload", payload);
  console.log("next",next)
  try {
    const user = await userModel.findById(payload.id);
    console.log("user :> ", user);
    console.log("next",next)
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