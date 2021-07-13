const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const petSchema = new mongoose.Schema(
  {
    radio: {
      type: String,
    },
    /*  userId: {
      type:String,
    }, */
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
      type: Array,
    },
    info: {
      type: String,
    },
    img: {
      type: String,
    },
    inSave: {
      type: Boolean,
    },
    favorite: {
      type: Array,
    },
    comments: [
      {
        text: {
          type: String,
        },
        avatar: {
          type: String,
        },
        username: {
          type: String,
        },
        userId: {
          type: String,
        },
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
//let Pet = mongoose.model("Pet", petSchema);
module.exports = mongoose.model("Pet", petSchema);
//module.exports ={Pet}
