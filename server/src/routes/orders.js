const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authHandler");
const {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/", authHandler, getOrders);
router.post("/", authHandler, createOrder);
router.get("/:id", authHandler, getOrder);
router.delete("/:id", authHandler, deleteOrder);

module.exports = router;
