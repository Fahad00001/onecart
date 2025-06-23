import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCount = async () => {
    try {
      const productsRes = await axios.get(`${serverUrl}/api/product/list`, {
        withCredentials: true,
      });
      setTotalProducts(productsRes.data.length);

      const ordersRes = await axios.get(`${serverUrl}/api/order/list`, {
        withCredentials: true,
      });
      setTotalOrders(ordersRes.data.length);
    } catch (error) {
      console.log("Failed to fetch counts:", error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative overflow-x-hidden">
      <Nav />
      <Sidebar />

      <div className="w-full lg:w-[70vw] h-full absolute lg:left-[25%] left-0 flex items-start justify-start flex-col gap-10 px-6 py-24">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#afe2f2]">
          OneCart Admin Panel
        </h1>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Total Products */}
          <div className="text-[#dcfafd] w-full max-w-[400px] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-4 rounded-lg shadow-md shadow-black backdrop:blur-lg text-xl md:text-2xl border border-[#969595]">
            Total No. of Products
            <span className="px-6 py-2 bg-[#030e11] rounded-lg border border-[#969595] text-2xl">
              {totalProducts}
            </span>
          </div>

          {/* Total Orders */}
          <div className="text-[#dcfafd] w-full max-w-[400px] h-[200px] bg-[#0000002e] flex items-center justify-center flex-col gap-4 rounded-lg shadow-md shadow-black backdrop:blur-lg text-xl md:text-2xl border border-[#969595]">
            Total No. of Orders
            <span className="px-6 py-2 bg-[#030e11] rounded-lg border border-[#969595] text-2xl">
              {totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
