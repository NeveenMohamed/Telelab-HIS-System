const mongoose = require("mongoose");

const labTestSchema = mongoose.Schema({
  WBC: {
    type: Number,
    default: NaN,
  },
  RBC: {
    type: Number,
    default: NaN,
  },
  HGB: {
    type: Number,
    default: NaN,
  },
  HCT: {
    type: Number,
    default: NaN,
  },
  MCV: {
    type: Number,
    default: NaN,
  },
  MCH: {
    type: Number,
    default: NaN,
  },
  MCHC: {
    type: Number,
    default: NaN,
  },
  PLT: {
    type: Number,
    default: NaN,
  },
});

module.exports = labTestSchema;
