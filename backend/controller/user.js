const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("./create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findone({ email });

  if (userEmail) {
    return next(new ErrorHandler("user already exists", 404));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const User = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };
  console.log(User);
});

module.exports = router;
