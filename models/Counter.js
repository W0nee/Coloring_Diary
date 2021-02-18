const mongoose = require("mongoose");

// Schema
let counterSchema = mongoose.Schema({
  name: { type: String },
  count: { type: Number, default: 0 },
});

let Counter = mongoose.model("counters", counterSchema);

module.exports = Counter;
