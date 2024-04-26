const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
  labId: {
    type: Number,
    required: [true, "Please enter lab's id"],
  },
  time: {
    type: String,
    required: [true, "Please enter the slot's time"],
  },
  weekDay: {
    type: String,
    required: [true, "Please enter the slot's week day"],
  },
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
