const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const { body, validationResult } = require("express-validator");

const userModel = require("../models/user.model");
// api for registering user
router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 1 }),
  body("password").trim().isLength({ min: 6 }),
  body("phoneNo").trim().isNumeric().isLength({ min: 10 }),
  body("name")
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .isLength({ min: 1 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    try {
      const { name, email, password, phoneNo, latitude, longitude } = req.body;
      // missing detials check for geographic detials
      if (!latitude || !longitude) {
        return res.status(400).json({
          message: "Missing geographic details (latitude, longitude)",
        });
      }
      // existing user check
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message: "User is already registered with this email",
        });
      }
      // convert user
      const hashPassword = await bcrypt.hash(password, 10);
      // add new user to DB
      const newUser = await userModel.create({
        name,
        email,
        password: hashPassword,
        latitude,
        longitude,
        phoneNo,
      });
      // return status code
      res.status(201).json({
        message: "User registered Succesfully",
      });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
// api for login
router.post(
  "/login",
  body("password").trim().isLength({ min: 6 }),
  body("phoneNo").trim().isNumeric().isLength({ min: 10 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    try {
      const { phoneNo, password } = req.body;
        // Check if user exists
      const user = await userModel.findOne({
        phoneNo,
      });
      if (!user) {
        return res.status(400).json({
          message: "Phone no or password is incorrect",
        });
      }
      // compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Phone no or password is incorrect",
        });
      }
    // Create a token
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          name: user.name,
          phoneNo: phoneNo,
        },
        process.env.JWT_SECRET_KEY
      );

      res.status(200).json({
        token,
        message: "User logged in Successfully",
      });
    } catch (error) {
      console.error("Error during user Login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;
