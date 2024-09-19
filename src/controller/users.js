const User = require("../modules/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registarControllerasync = async (req, res) => {
  console.log("Register", res.status);
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json({
      message: "User registered successfully",
      body: req.body,
      status: newUser.status,
    });
    console.log("User saved:", savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: res.status, message: err });
  }
};

const loginControllerasync = async (req, res) => {
  console.log("Login", res.status);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("UserUserUserUserUserUser", user);
    if (!user) {
      return res
        .status(401)
        .json({ status: res.status, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: res.status, message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // You should store this secret in your environment variables
      { expiresIn: "1h" } // Token expires in 1 hour
    );
    res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      token: token,
    });
    console.log("User logged in:", user);
  } catch {
    res
      .status(401)
      .json({ status: res.status, message: "Invalid credentials" });
  }
};

module.exports = { registarControllerasync, loginControllerasync };
