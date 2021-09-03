"use strict";

var mongoose = require("mongoose");

var MOSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  institution: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  paid: {
    type: Number,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  },
  tshirt: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  confirmCode: {
    type: String,
    unique: true
  }
});
var MathOlympiad = mongoose.model("MathOlympiad", MOSchema);
module.exports = MathOlympiad;
//# sourceMappingURL=MathOlympiad.model.dev.js.map
