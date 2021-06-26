const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const blacklistSchema = new mongoose.Schema(
  {
    
    
    accessToken: {
      type: String,
    },
   
  } 
  // { timestamps: true }
);

module.exports = mongoose.model("Blacklist", blacklistSchema);
