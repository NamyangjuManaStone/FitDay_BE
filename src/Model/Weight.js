const mongoose = require("mongoose");

const weightschema = new mongoose.Schema({
  value: Number,
});

const Weight = mongoose.model("Weight", weightschema);

module.exports = { Weight };
