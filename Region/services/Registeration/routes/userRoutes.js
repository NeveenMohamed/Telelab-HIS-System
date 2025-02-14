const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/", UserController.loginUser);

router.post("/user", UserController.addUser);

module.exports = router;
