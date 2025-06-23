import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./pages/Login";
import { useContext } from "react";
import { adminDataContext } from "./context/AdminContext";
// import { ToastContainer } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  let { adminData } = useContext(adminDataContext);
  return (
    <>
      {/* <ToastContainer /> */}
      <ToastContainer position="top-right" autoClose={3000} />

      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
