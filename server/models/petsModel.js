const mongoose = require("mongoose");
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    breed: {
      type: String,
    },
    img: {
      type: String,
    },
  }
  // { timestamps: true }
);
var Pet = mongoose.model("Pet", petSchema);
module.exports = mongoose.model("Pet", petSchema);
