const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");

router.get("/", authHandler, getProducts);
router.get("/:id", authHandler, getProduct);

router.post("/", authHandler, createProduct);
router.put("/:id", authHandler, updateProduct);
router.delete("/:id", authHandler, deleteProduct);

module.exports = router;
