const mongoose = require("mongoose");
let Counter = require("./Counter");

// Schema
let diarySchema = mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  start_date: { type: String },
  finish_date: { type: String },
  location: { type: String },
  emotion: { type: String },
  content: { type: String },
  attachment: [{ type: mongoose.Schema.Types.ObjectId, ref: "files" }],
  start_year: { type: Number },
  start_month: { type: Number },
  start_day: { type: Number },
});

diarySchema.pre("save", async function (next) {
  let diary = this;
  if (diary.isNew) {
    counter = await Counter.findOne({ name: "diary" }).exec();
    if (!counter) counter = await Counter.create({ name: "diary" });
    counter.count++;
    counter.save();
    diary.id = counter.count;
  }
  return next();
});

let Diary = mongoose.model("diarys", diarySchema);

module.exports = Diary;
