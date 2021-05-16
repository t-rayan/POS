const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");
const {
  login,
  register,
  getCurrentUser,
  updatePassword,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.get("/user", authHandler, getCurrentUser);
router.put("/update", authHandler, updatePassword);

module.exports = router;
