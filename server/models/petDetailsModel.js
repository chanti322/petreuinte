const mongoose = require("mongoose");
const petDetailsSchema = new mongoose.Schema({
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
    petDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"pets",
    },
})
module.exports = mongoose.model("Petdetail", petDetailsSchema)