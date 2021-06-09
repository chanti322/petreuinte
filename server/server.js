const Grid = require("gridfs-stream");
const express = require("express");
const path = require("path");
var multer = require("multer");

const router = express.Router();
const mongoose = require("mongoose");
const mongoURI = require("./config").mongoURI;

const cors = require("cors");
var fs = require("fs");

//require("dotenv").config();
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
//images

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    var extension = file.mimetype;
    extension = extension.substring(
      extension.indexOf("/") + 1,
      extension.length
    );
    var filename = file.fieldname + "-" + Date.now() + "." + extension;
    callback(null, filename);
  },
});
//upload parameters from multer
const upload = multer({
  storage: storage,
});

app.get("/uploads", (req, res) => {
  res.sendFile(__dirname + "/pets/uploads");
});
router.post("/uploads", upload.single("avatar"), (req, res) => {
  res.send("test");
  console.log(req.file);
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Pets
app.use("/pets", require("./routes/pets"));
app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
