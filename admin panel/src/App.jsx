import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import Login from './Components/login/login'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        {/* other routes */}
      </Routes>
    </>
  );
};

export default App;
