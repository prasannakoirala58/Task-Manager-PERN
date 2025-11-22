const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const prisma = require("../prisma");
const { validateEmail } = require("../utils/validation");

// Register / SignUp
const signup = async (req, res) => {
  try {
    // express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ status: false, msg: "Invalid Email" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res
        .status(400)
        .json({ status: false, msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    return res.status(200).json({
      status: true,
      msg: "Account created successfully!",
      token,
      user: userData,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

// login
const login = async (req, res) => {
  try {
    // express-validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({
        status: false,
        msg: "This email is not registered",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, msg: "Password incorrect" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return res.status(200).json({
      status: true,
      msg: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
};
