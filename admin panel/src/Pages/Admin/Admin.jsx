// Admin.js
import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import Orders from "../../Components/Orders/Orders";
import Login from "../../Components/login/login";
import ProtectedRoute from "../../Components/ProtectedRoute/Protectedroute";

const Admin = () => {
  const token = localStorage.getItem("adminToken");

  return (
    <div className="Admin" style={{ display: "flex" }}>
      {/* Show sidebar only if logged in */}
      {token && <Sidebar />}

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          {/* Default route: redirect based on token */}
          <Route
            path=""
            element={
              token ? <Navigate to="addproduct" replace /> : <Navigate to="admin-login" replace />
            }
          />

          {/* Admin login page */}
          <Route path="admin-login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="addproduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="listproduct"
            element={
              <ProtectedRoute>
                <ListProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to default */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
