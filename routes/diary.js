const express = require("express");
const router = express.Router();
const multer = require("multer"); // 1
const upload = multer({ dest: "uploadedFiles/" });
let Diary = require("../models/Diary");
let File = require("../models/File");

router.get("/write", (req, res) => {
  res.render("write");
});

router.post("/save", upload.array("attachment"), async function (req, res) {
  // let attachment = req.files; //? await File.createNewInstance(req.files) : undefined;
  let attachment = new Array();
  for (i = 0; i < req.files.length; i++) {
    let file = await File.createNewInstance(req.files[i]);
    attachment.push(file);
  }
  // console.log(attachment.length);
  req.body.attachment = attachment;
  // console.log(req.body.attachment);
  // console.log(req.files.length);
  Diary.create(req.body, (err, result) => {
    // if (attachment) {
    if (attachment) {
      for (i = 0; i < attachment.length; i++) {
        attachment[i].postId = result._id;
        attachment[i].save();
      }
    }
    console.log("successful save");
    console.log(result);
  });

  res.render("upload", { files: req.files });
});

// router.get("/sort/");

router.post("/delete", (req, res) => {
  Diary.deleteOne({ id: req.body.id }, () => {
    console.log("successful delete");
  });
});

module.exports = router;
