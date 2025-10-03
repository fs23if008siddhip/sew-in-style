const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      size: String,
      price: { type: Number, required: true },
       image: { type: String,required: true }, 
    },
  ],
  shippingInfo: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: String,
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentMethod: { type: String, default: "COD" },
  paymentStatus: { type: String, default: "Pending" },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Order Placed" },
  placedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Order", orderSchema);
