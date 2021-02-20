const mongoose = require("mongoose");

// Schema
let fileSchema = mongoose.Schema({
  originalFileName: { type: String },
  serverFileName: { type: String },
  size: { type: Number },
  // uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "diarys" },
  isDeleted: { type: Boolean, default: false },
});

let File = mongoose.model("files", fileSchema);

// 파일 인스턴스 생성
File.createNewInstance = async function (file) {
  return await File.create({
    originalFileName: file.originalname,
    serverFileName: file.filename,
    size: file.size,
  });
};

module.exports = File;
