const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');


// @route   POST /api/orders
// @desc    Create a new order
// @access  Private (User)
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingInfo, totalAmount, paymentMethod, placedAt, status } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order" });
    }

    if (!shippingInfo || !shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.pincode || !shippingInfo.phone) {
      return res.status(400).json({ success: false, message: "Incomplete shipping info" });
    }

    if (!totalAmount || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing total amount or payment method" });
    }

    const order = await Order.create({
      user: req.user.id,
      shippingInfo,
      items,
      totalAmount,
      paymentMethod,
      status: status || "Order Placed",
      placedAt: placedAt || new Date().toISOString(),
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

// @route   GET /api/orders/my
// @desc    Get current user's orders
// @access  Private (User)
// In routes/order.js for getting current user's orders:
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('user', 'username email');
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error in GET /my:", err);
    res.status(500).json({ success: false, message: "Server error while fetching orders" });
  }
});

// @route   GET /api/orders
// @desc    Admin: Get all orders
// @access  Private (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username email');
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch all orders" });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    console.log(`PATCH /api/orders/${orderId} called!`);  // Bruno style
    console.log("Received status update to:", status);

    if (!status) {
      console.log("❌ No status provided!");
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      console.log("❌ Order not found with id:", orderId);
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    console.log(`✅ Order ${orderId} status updated to: ${order.status}`);

    res.json({ success: true, order });
  } catch (err) {
    console.error("🔥 Error updating order:", err);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
});


module.exports = router;
