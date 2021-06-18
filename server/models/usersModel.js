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
    pic: {
      type: String,
      default:"https://res.cloudinary.com/cloulau/image/upload/v1624022181/avatar-1577909_640_w8bjgt.png"
 }
   
  }
  // { timestamps: true }
);
//var User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
