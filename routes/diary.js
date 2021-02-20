const express = require("express");
const router = express.Router();
const multer = require("multer"); // 1
const upload = multer({ dest: "uploadedFiles/" });
let Diary = require("../models/Diary");
let File = require("../models/File");

// 글 작성
router.get("/write", (req, res) => {
  res.render("write");
});

// 글 저장
router.post("/save", upload.array("attachment"), async function (req, res) {
  // 파일 인스턴스 생성
  let attachment = new Array();
  if (req.files) {
    for (i = 0; i < req.files.length; i++) {
      let file = await File.createNewInstance(req.files[i]);
      attachment.push(file);
    }
    req.body.attachment = attachment;
  }

  // 년, 월, 일 분류
  req.body.start_year = req.body.start_date.slice(0, 4);
  req.body.start_month = req.body.start_date.slice(5, 7);
  req.body.start_day = req.body.start_date.slice(8, 10);

  Diary.create(req.body, (err, result) => {
    if (attachment.length) {
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

// 글 삭제
router.post("/delete", (req, res) => {
  Diary.deleteOne({ id: req.body.id }, () => {
    console.log("successful delete");
  });
});

// 글 필터 (이모지 + 최신순)
router.get("/filter/:emotion", (req, res) => {
  Diary.find({ emotion: req.params.emotion })
    .populate("attachment")
    .sort({ start_year: -1, start_date: -1, steart_day: -1 })
    .exec((err, results) => {
      if (err) res.send(err);
      res.render("list", { results: results });
    });
});

module.exports = router;
