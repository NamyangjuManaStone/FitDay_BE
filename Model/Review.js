const mongoose = require("mongoose");

const reviewschema = new mongoose.Schema({
  value: String,
});

const Review = mongoose.model("Review", reviewschema);

module.exports = { Review };
