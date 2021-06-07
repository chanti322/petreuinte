const mongoose = require("mongoose");
const petSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
  },
  image: {
    type: String,
  },
});
module.exports = mongoose.model("Pet", petSchema);
