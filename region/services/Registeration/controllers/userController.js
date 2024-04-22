const User = require("../models/User"); // Import your Mongoose User model
const bcrypt = require("bcryptjs");

const roles = {
  0: "Doctor",
  1: "Receptionist",
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Compare password
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password == user.password;

    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    res.status(201).json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
};
