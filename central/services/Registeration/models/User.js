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
});

const User = mongoose.model("User", userSchema);
module.exports = User;
