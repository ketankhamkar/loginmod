const express = require("express");
const router = express.Router();
const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const {
  registarControllerasync,
  loginControllerasync,
} = require("../controller/users");

router.get("/", (req, res) => {
  res.send("Welcome");
});

router.post("/register", registarControllerasync);

router.post("/login", loginControllerasync);

module.exports = router;
