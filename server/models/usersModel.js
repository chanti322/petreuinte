const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://res.cloudinary.com/cloulau/image/upload/v1624022181/avatar-1577909_640_w8bjgt.png",
    },
    pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  },
  { timestamps: true }
);
//let User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
//module.exports ={User}
