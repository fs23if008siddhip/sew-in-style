import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("auth-token"); 
  fetch("http://localhost:5000/api/orders/my", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token, // ✅ Match your backend middleware
    },
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    })
    .then(data => {
      if (data.success) setOrders(data.orders);
      else setError("Failed to load orders");
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);


  if (loading) return <p>Loading orders…</p>;
  if (error) return <p>{error}</p>;

  return (
    
    <div className="orders-page">
      <h2>MY ORDERS</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) =>
          order.items.map((item, index) => (
          
            <div key={`${order._id}-${index}`} className="order-card-new">
              <div className="order-item-info">
        <img src={item.image} alt={item.name} className="order-product-img" />


                <div className="order-details">
                  
                  <h3 className="product-name">{item.name}</h3>
                  <p>₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size || "N/A"}</p>
                  <p>Date: {new Date(order.placedAt).toDateString()}</p>
                  <p>
                    Payment:{" "}
                    {order.paymentMethod.toLowerCase() === "cod" ? "COD" : "Razorpay"}
                  </p>
                  <p>Status: {order.status}</p>
                </div>
              </div>
              <div className="order-status-actions">
                <button
                  className="track-btn"
                onClick={() => alert(`Current status for Order #${order._id}:\n${order.status}`)}
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default Orders;

