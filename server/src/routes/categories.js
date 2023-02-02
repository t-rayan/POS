const express = require("express");
const router = express.Router();
const { authHandler } = require("../middlewares/authHandler");

const {
  getCategories,
  getCategory,
  createCategory,
  delCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.get("/", getCategories);
router.get("/:id", getCategory);

router.post("/", createCategory);
router.put("/:id", updateCategory);

router.delete("/:id", delCategory);

module.exports = router;
