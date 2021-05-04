const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/:id", getOrder);
router.delete("/:id", deleteOrder);

module.exports = router;
