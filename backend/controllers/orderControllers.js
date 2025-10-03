const Order = require('../models/order');

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create order", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
};

module.exports = { createOrder, getAllOrders };
