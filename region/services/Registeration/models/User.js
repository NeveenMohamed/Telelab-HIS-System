const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter the username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
  },
  role: {
    type: Boolean,
    required: [true, "Please enter the role of user"],
  },
  labId: {
    type: Number,
    required: [true, "Please enter the lab ID"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
