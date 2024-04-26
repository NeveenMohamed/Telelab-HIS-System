const User = require("../models/User"); // Import your Mongoose User model
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Find user by userName
    const user = await User.findOne({ userName: userName });

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

    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
};
