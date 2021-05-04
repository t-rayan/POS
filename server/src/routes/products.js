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
router.get("/:id", getProduct);

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
