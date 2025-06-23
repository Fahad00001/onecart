import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import CartTotal from "../component/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, UpdateQauntity } =
    useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        const quantity = cartItem[itemId][size];
        if (quantity > 0) {
          tempData.push({ _id: itemId, size, quantity });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  const handleQuantityChange = (itemId, size, newQty) => {
    const parsedQty = parseInt(newQty, 10);
    if (parsedQty >= 1) {
      UpdateQauntity(itemId, size, parsedQty);
    }
  };

  const handleRemove = (itemId, size) => {
    UpdateQauntity(itemId, size, 0);
  };

  return (
    <div className="w-full overflow-hidden min-h-screen p-4 bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <div className="mt-20 text-center">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <div className="w-full text-center mt-16 text-white text-lg">
          Your cart is empty.
        </div>
      ) : (
        <div className="w-full mt-8 flex flex-col gap-6">
          {cartData.map((item, index) => {
            const product = products.find((p) => p._id === item._id);
            if (!product) return null;

            return (
              <div
                key={index}
                className="w-full flex items-center justify-between gap-6 bg-[#51808048] text-white p-4 rounded-xl border border-gray-600"
              >
                {/* Product Image */}
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-[100px] h-[100px] object-cover rounded-md border border-gray-500"
                />

                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-300">
                    Size: <span className="text-white">{item.size}</span>
                  </p>
                  <p className="text-sm text-green-400 mt-1">
                    {currency} {product.price} × {item.quantity} = {currency}{" "}
                    {product.price * item.quantity}
                  </p>
                </div>

                {/* Right Actions: Quantity & Delete */}
                <div className="flex flex-col items-center justify-center gap-3">
                  {/* Quantity Input */}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, item.size, e.target.value)
                    }
                    className="w-[60px] text-center bg-[#1f1f1f] border border-gray-600 text-white px-2 py-1 rounded"
                  />

                  {/* Delete Button */}
                  <button
                    onClick={() => handleRemove(item._id, item.size)}
                    className="text-red-500 hover:text-red-400 transition duration-200"
                    title="Remove"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className=" flex items-end justify-start my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <button
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty.");
              }
            }}
            className="text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out mt-[20px]"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
