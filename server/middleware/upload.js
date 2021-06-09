/* const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    var extension = path.extname(file.originalname);

    callback(null, Date.now() + extension);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.minetype == "image/png" || file.minetype == "image/jpg") {
      callback(null, true);
    } else {
      console.log("only jpg e png file supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
module.exports = upload; */
