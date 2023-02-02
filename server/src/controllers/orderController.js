const Order = require("../models/order");
const Products = require("../models/product");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);
    if (!order) res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  const { orderItems, discount, totalProducts, totalPrice, orderDate } =
    req.body;

  try {
    const newOrder = new Order({
      orderItems,
      discount,
      totalProducts,
      totalPrice,
      orderDate,
    });
    await newOrder.save();
    return res.status(201).json({ newOrder, message: "Order Confirmed" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    !order &&
      res.status(404).json({
        message: "Order not found",
      });
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getOrders, createOrder, deleteOrder, getOrder };
