const Grid = require("gridfs-stream");
const express = require("express");
const path = require("path");
var multer = require("multer");
//const passport = require("passport");
//const { jwtStrategy } = require("./passport");
require("dotenv").config();
const router = express.Router();
const mongoose = require("mongoose");
const mongoURI = require("./config").mongoURI;
const options = require("./config").secretOrKey;

const cors = require("cors");
var fs = require("fs");

//Initialise express app
const app = express();
const port = process.env.PORT || 5000;
//connect to DB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


//Pets and users routes
app.use("/pets", require("./routes/pets"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
