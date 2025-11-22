const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { signup, login } = require("../controllers/authControllers");

// POST /api/register
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters"),
  ],
  signup
);

// POST /api/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

module.exports = router;
