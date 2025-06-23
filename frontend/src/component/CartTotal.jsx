import React, { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await getCartAmount();
      setAmount(total);
    };
    fetchTotal();
  }, [getCartAmount]);

  return (
    <div className="w-full lg:ml-[30px]">
      <div className="text-xl py-2">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="bg-[#1f1f1f] text-white p-6 rounded-xl border border-[#4d8890] space-y-4 text-[18px]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {currency} {amount}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>
            {currency} {delivery_fee}
          </span>
        </div>
        <hr className="border-gray-600" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>
            {currency} {amount + delivery_fee}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
