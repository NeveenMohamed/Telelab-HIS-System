const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the patient's name"],
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  age: {
    type: Number,
    required: [true, "Please enter the patient's age"],
  },
  address: {
    type: String,
    required: [true, "Please enter the patient's address"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter the patient's phone"],
  },
});

module.exports = patientSchema;
