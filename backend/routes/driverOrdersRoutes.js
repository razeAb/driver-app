const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// Get available orders
router.get("/available", protect, async (req, res) => {
  const orders = await Order.find({ status: "pending", driver: null }).populate("user");
  res.json({ orders });
});

// Assign order to driver
router.post("/:id/assign", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.driver) return res.status(400).json({ message: "Order not available" });

  order.driver = req.user._id;
  order.status = "picked_up";
  await order.save();

  res.json({ message: "Order assigned" });
});

// Mark order as delivered
router.post("/:id/deliver", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.driver.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  order.status = "delivered";
  const earning = order.totalPrice * 0.03;
  order.deliveryEarning = earning;
  await order.save();

  await User.findByIdAndUpdate(req.user._id, { $inc: { earnings: earning } });

  res.json({ message: "Order marked as delivered" });
});

// Get driver earnings
router.get("/earnings", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const orders = await Order.find({ driver: req.user._id, status: "delivered" });
  res.json({ earnings: user.earnings, orders });
});

module.exports = router;
