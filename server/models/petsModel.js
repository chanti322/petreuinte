const mongoose = require("mongoose");
const petSchema = new mongoose.Schema(
  {
    
    
    radio: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    breed: {
      type: String,
    },
    color: {
      type: String,
    },
    markers: {
      type:Array,
    },
    info: {
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
