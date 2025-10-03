import React, { useEffect, useState } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("auth-token");
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      if (data.success) setOrders(data.orders);
      else setError("Failed to load orders");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusOptions = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const token = localStorage.getItem("auth-token");
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed");
      await fetchOrders();
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (loading) return <p>Loading orders…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="orders-page">
      <h2>ALL ORDERS</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card-new">
            <div className="order-header">
              <h3>Order #{order._id.slice(-6)}</h3>
              <div className="order-meta">
                Placed: {new Date(order.placedAt).toLocaleDateString()} | Payment: {order.paymentMethod.toUpperCase()}
              </div>
            </div>

            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-item-info">
                  <img src={item.image} alt={item.name} className="order-product-img" />
                  <div className="order-details">
                    <h4 className="product-name">{item.name}</h4>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size || "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-details">
              <p>
                User: {order.user?.username || "Unknown"} ({order.user?.email || "No Email"})
              </p>
              <p>
                Status:{" "}
                <select
                  className="status-dropdown"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  disabled={updatingOrderId === order._id}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {updatingOrderId === order._id && <span className="updating-text">Updating...</span>}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
