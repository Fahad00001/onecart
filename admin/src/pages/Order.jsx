import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { SiEbox } from "react-icons/si";
import { toast } from "react-hot-toast";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/order/list`, {
        withCredentials: true,
      });
      setOrders(result.data.reverse());
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("❌ Failed to fetch orders.");
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { withCredentials: true }
      );
      if (result.data) {
        toast.success("✅ Order status updated.");
        fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to update status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="flex items-start justify-center lg:justify-start">
        <Sidebar />
        <div className="lg:w-[85%] md:w-[70%] ml-[100px] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-6 overflow-x-hidden py-12">
          <div className="text-[28px] md:text-[40px] font-bold text-white mb-4">
            All Orders List
          </div>

          {/* {orders.map((order, index) => (
            <div
              key={index}
              className="w-[90%] bg-slate-600 rounded-xl flex flex-col lg:flex-row p-4 gap-4"
            >
              <SiEbox className="w-12 h-12 text-black p-2 rounded-lg bg-white" />
              <div>
                <div className="text-[#56dbfc] text-sm font-semibold space-y-1">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name.toUpperCase()} × {item.quantity}{" "}
                      <span>{item.size}</span>
                    </p>
                  ))}
                </div>
                <div className="text-green-100 text-sm mt-2">
                  <p>
                    {order.address.firstname + ", " + order.address.lastname}
                  </p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city + ", " + order.address.state}</p>
                  <p>{order.address.pincode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              <div className="text-green-100 text-sm space-y-1">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-xl text-white font-bold">₹ {order.amount}</p>
              </div>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="px-4 py-2 bg-slate-500 rounded-lg border border-[#96eef3] text-white"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
       
       ))} */}

          {orders.map((order, index) => (
            <div
              key={index}
              className="w-[90%] bg-slate-700 border border-slate-600 rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {/* Icon and Product Details */}
              <div className="flex items-start gap-3">
                <SiEbox className="w-10 h-10 text-black p-2 rounded-md bg-white" />
                <div className="text-[#56dbfc] text-sm font-medium">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name.toUpperCase()} × {item.quantity}{" "}
                      <span className="text-xs">({item.size})</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Address Details */}
              <div className="text-green-100 text-sm leading-5">
                <p>
                  {order.address.firstname} {order.address.lastname}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}
                </p>
                <p>{order.address.pincode}</p>
                <p>{order.address.phone}</p>
              </div>

              {/* Order Summary */}
              <div className="text-white text-sm flex flex-col gap-1">
                <p className="text-green-300">Items: {order.items.length}</p>
                <p className="text-blue-300">Method: {order.paymentMethod}</p>
                <p className="text-yellow-300">
                  Payment:{" "}
                  <span
                    className={
                      order.payment ? "text-green-400" : "text-red-400"
                    }
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p className="text-gray-300">
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold mt-1">₹ {order.amount}</p>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-white text-sm mb-1">
                  Update Status:
                </label>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="bg-[#3bcee8]/20 text-[white] rounded-md px-3 py-2 border border-[#3bcee8] focus:outline-none"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
