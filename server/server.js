const express = require("express");
const mongoose = require("mongoose");
const mongoURI = require("./config").mongoURI;
const cors = require("cors");
//Initialise express app
const app = express();
const port = process.env.PORT || 5000;
//connect to DB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/pets", require("./routes/pets"));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
