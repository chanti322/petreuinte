/* var express = require("express");
var multer = require("multer");
const path = require("path");
var upload = multer({ dest: "uploads/" });
const ejs = require("ejs");

//ejs
app.set("view engine", "ejs");

//Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
//Init upload
const upload = multer({
  storage: storage,
  limits: { filesize: 1000 }, //limit of bytes
}).single("image");
// Init app
var app = express();
app.use(express.static("./public"));
app.get("././client/src/view/FormPicture", (res) => res.render("FormPicture"));

app.post("/uploads", upload.single("image"), (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render("FormPicture", {
        msg: err,
      });
    } else {
      console.log(req.file);
      res.send("test");
    }
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
 */
