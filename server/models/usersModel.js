const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
          type: String,
       
    },
   email: {
      type: String,
        },
 password: {
    type: String,
        },
 
   
  }
  // { timestamps: true }
);
//var User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
