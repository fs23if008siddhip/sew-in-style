import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Proceed.css";
import razor_pay from "../Assets/razorpay.svg";
import { useNavigate } from "react-router-dom";

const Proceed = () => {
  const navigate = useNavigate();
  const { products, cartItems, getTotalCartAmount } = useContext(ShopContext);

  // Form states
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();


    // Validate form
    if (!fullName || !address || !city || !zipCode || !phoneNumber || !paymentMethod) {
      alert("Please fill in all fields and choose payment method");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("You must be logged in to place an order!");
      // navigate("/login");
      return;
    }

    // Prepare ordered items
    const orderedItems = [];
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const product = products.find((p) => String(p.id) === String(itemId));
        if (product) {
          orderedItems.push({
            productId: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            size: product.size || "M",
            quantity: cartItems[itemId],
          });
        }
      }
    }

    if (orderedItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Prepare order object
    const newOrder = {
      items: orderedItems,
      totalAmount: getTotalCartAmount(),
      paymentMethod,
      shippingInfo: {
        name: fullName,
        address,
        city,
        state: "Maharashtra",
        country: "India",
        pincode: zipCode,
        phone: phoneNumber,
      },
      status: "Order Placed",
      placedAt: new Date().toISOString(),
    };

    // If COD, place order directly
    if (paymentMethod === "cod") {
      try {
       

        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          body: JSON.stringify(newOrder),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to place order");
        }

        alert("Order placed successfully!");
        navigate("/orders");
      } catch (err) {
        console.error("Order error:", err.message);
        alert(`Order failed: ${err.message}`);
      }
      return;
    }

    // If Razorpay, open payment popup
    if (paymentMethod === "razorpay") {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load");
        return;
      }

      try {
        // Call backend to create Razorpay order
        const res = await fetch("http://localhost:5000/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: getTotalCartAmount() * 100 }), // amount in paise
        });

        const order = await res.json();

        // Razorpay options
        const options = {
          key: "rzp_live_RP3895kdKMM7SU", // replace with your test/live key
          amount: order.amount,
          currency: order.currency,
          name: "Sew in Style",
          description: "Purchase",
          order_id: order.id,
          handler: async function (response) {
            // Add Razorpay payment ID to order
            newOrder.paymentMethod = "razorpay";
            newOrder.razorpayPaymentId = response.razorpay_payment_id;

            // Place order in backend
            const orderRes = await fetch("http://localhost:5000/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token
              },
              body: JSON.stringify(newOrder),
            });

            const orderData = await orderRes.json();
            if (!orderRes.ok || !orderData.success) {
              throw new Error(orderData.message || "Failed to place order");
            }

            alert("Order placed successfully!");
            navigate("/orders");
          },
          prefill: {
            name: fullName,
            email: "customer@example.com", 
            contact: phoneNumber,
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error(err);
        alert("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div className="proceed-container">
      <div className="checkout-form">
        <h2>Delivery Information</h2>
        <form onSubmit={handlePlaceOrder}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Zip Code</label>
            <input
              type="text"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Payment Options */}
          <div className="payment-method">
            <label className="payment-option">
              <input
                type="radio"
                value="razorpay"
                checked={paymentMethod === "razorpay"}
                onChange={handlePaymentChange}
              />
              <img src={razor_pay} alt="Razorpay" className="razorpay-img" />
            </label>
            <label className="payment-option">
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentChange}
              />
              Cash on Delivery
            </label>
          </div>

          <div>
            <button type="submit" disabled={!paymentMethod}>
              Place Order
            </button>
          </div>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h2 className="summary-title">Order Summary</h2>
        <div className="summary-products">
          {products.map((item) => {
            if (cartItems[item.id] > 0) {
              return (
                <div key={item.id} className="summary-row">
                  <span>
                    {item.name} × {cartItems[item.id]}
                  </span>
                  <span>₹{item.price * cartItems[item.id]}</span>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="summary-divider"></div>

        <div className="summary-totals">
          <div className="summary-row">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <div className="summary-row">
            <p>Shipping</p>
            <p className="free">Free</p>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <h3>Total</h3>
            <h3>₹{getTotalCartAmount()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proceed;
