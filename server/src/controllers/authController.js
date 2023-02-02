const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../utils/validation_schema");
const bcrypt = require("bcrypt");

// function to login
const login = async (req, res) => {
  // get req.body and valdiate
  const { email, password } = req.body;
  try {
    const { error } = await userLoginSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // // if req.body is valid find the user with email in db
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User doesnot exists" });
    }

    // // if user exists
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {}
      );
      res.status(200).json({
        token,
        user: { name: user.name, email: user.email, id: user._id },
        message: "login successful",
      });
    } else {
      return res.status(409).json({ message: "Incorrect password" });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    // error && res.status(500).json({ message: error.message });
  }
};

// function to register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const { error } = await userRegisterSchema(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const isUser = await Users.findOne({ email: email });
    if (!isUser) {
      const hashed = await bcrypt.hash(password, saltRounds);
      const newUser = Users({
        name,
        email,
        password: hashed,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ newUser, message: "Registration Successful" });
    } else {
      return res.status(409).json({ message: "Email already exists." });
    }
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

// getting current user
const getCurrentUser = async (req, res) => {
  const user = await Users.findById(req.user.id).select("-password");
  res.json(user);
};

// updating password
const updatePassword = async (req, res) => {
  // get req.body
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === "") {
    return res.status(400).json({ message: "Old password must be provided" });
  } else if (newPassword === "" || newPassword.length < 8) {
    return res
      .status(400)
      .json({ message: "New password must be 8 char length" });
  }
  // finding current user
  try {
    const user = await Users.findById(req.user.id);
    if (user) {
      let isMatch = await bcrypt.compare(oldPassword, user.password);
      if (isMatch) {
        let newHash = await bcrypt.hash(newPassword, saltRounds);
        user.password = newHash;
        await user.save();
        res.status(200).json({ message: "Password has been updated." });
      } else {
        res.status(400).json({ message: "Password donot match" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  register,
  getCurrentUser,
  updatePassword,
};
