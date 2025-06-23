import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  let navigate = useNavigate();
  const [method, setMethod] = useState("cod");
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } =
    useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const initPay = (order) => {

  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: "Order Payment",
  //     description: "Order Payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response) => {
  //       console.log(response);
  //       const rzp = new window.Razorpay(options);
  //       rzp.open();
  //     },
  //   };
  // };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "OneCart Razorpay Checkout",
      order_id: order.id,
      receipt: order.receipt,
      handler: async function (response) {
        // Optional: send response to your backend for verification
        console.log("Payment Success:", response);
        const { data } = await axios.post(
          `${serverUrl}/api/order/verifyrazorpay`,
          response,
          { withCredentials: true }
        );
        if (data) {
          console.log(data);
          navigate("/order");
          setCartItem({});
        }
        // Clear cart and redirect
        setCartItem({});
        navigate("/order");
      },
      prefill: {
        name: formData.firstname + " " + formData.lastname,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: formData.street + ", " + formData.city,
      },
      theme: {
        color: "#3bcee8",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const amount = await getCartAmount();
      const orderData = {
        address: formData,
        items: orderItems,
        amount: amount + delivery_fee,
      };

      // if (method === "cod") {
      //   const result = await axios.post(
      //     `${serverUrl}/api/order/placeorder`,
      //     orderData,
      //     { withCredentials: true }
      //   );
      //   console.log(result.data);
      //   if (result.data) {
      //     setCartItem({});
      //     navigate("/order");
      //   } else {
      //     console.log(result.data.message);
      //   }
      // }

      switch (method) {
        case "cod":
          const result = await axios.post(
            `${serverUrl}/api/order/placeorder`,
            orderData,
            { withCredentials: true }
          );
          console.log(result.data);
          if (result.data) {
            setCartItem({});
            navigate("/order");
          } else {
            console.log(result.data.message);
          }
          break;

        case "razorpay":
          const resultrazorpay = await axios.post(
            serverUrl + "/api/order/razorpay",
            orderData,
            { withCredentials: true }
          );
          if (resultrazorpay.data) {
            initPay(resultrazorpay.data);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputClass = `
    w-full h-[50px] rounded-md bg-slate-700 text-white
    px-4 text-[16px] placeholder-white border border-slate-500
    focus:outline-none focus:ring-2 focus:ring-[#3bcee8] transition
  `;

  return (
    <div className="min-h-screen w-full bg-gradient-to-l from-[#141414] to-[#0c2025] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12">
        {/* Left: Delivery Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full lg:w-1/2 bg-[#1e1e1e] p-6 rounded-xl shadow-lg"
        >
          <div className="pb-4">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              onChange={onChangeHandler}
              value={formData.firstname}
              name="firstname"
              type="text"
              placeholder="First name"
              className={inputClass}
              required
            />
            <input
              onChange={onChangeHandler}
              name="lastname"
              value={formData.lastname}
              type="text"
              placeholder="Last name"
              className={inputClass}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              onChange={onChangeHandler}
              value={formData.email}
              name="email"
              type="email"
              placeholder="Email Address"
              className={inputClass}
              required
            />
          </div>

          {/* Street */}
          <div className="mb-4">
            <input
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
              type="text"
              placeholder="Street"
              className={inputClass}
              required
            />
          </div>

          {/* City & State */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              type="text"
              placeholder="City"
              className={inputClass}
              required
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              type="text"
              placeholder="State"
              className={inputClass}
              required
            />
          </div>

          {/* Pincode & Country */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              onChange={onChangeHandler}
              name="pincode"
              value={formData.pincode}
              type="text"
              placeholder="Pincode"
              className={inputClass}
              required
            />
            <input
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              type="text"
              placeholder="Country"
              className={inputClass}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <input
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
              type="text"
              placeholder="Phone Number"
              className={inputClass}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center sm:justify-end">
            <button
              type="submit"
              className="cursor-pointer bg-[#3bcee848] text-white px-8 py-2 rounded-full text-[16px] border border-[#80808049] hover:bg-[#3bcee866] transition-all duration-200"
            >
              Place Order
            </button>
          </div>
        </form>

        {/* Right: CartTotal and Payment */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md flex flex-col gap-6">
            <CartTotal />

            <div className="pt-2">
              <Title text1="PAYMENT" text2="METHOD" />
            </div>

            <div className="w-full flex flex-col gap-4 pb-12">
              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`w-full h-[50px] rounded-md border px-4 text-white text-left transition-all duration-200 ${
                  method === "cod"
                    ? "bg-[#3bcee8] border-[#3bcee8]"
                    : "bg-slate-700 border-[#343434]"
                }`}
              >
                Cash on Delivery
              </button>

              <buttonVITE_
                type="button"
                onClick={() => setMethod("razorpay")}
                className={`w-full h-[50px] rounded-md border px-4 text-white text-left transition-all duration-200 ${
                  method === "razorpay"
                    ? "bg-[#3bcee8] border-[#3bcee8]"
                    : "bg-slate-700 border-[#343434]"
                }`}
              >
                Pay with Razorpay
              </buttonVITE_>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
