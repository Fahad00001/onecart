import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";
import { toast } from "react-toastify";
// import { get } from "mongoose";

// Create the context
export const shopDataContext = createContext();

const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const [cartItem, setCartItem] = useState({});
  const currency = " ₹ ";
  const delivery_fee = 40;

  //   const [cartItem, setCartItem] = useState(() => {
  //     const savedCart = localStorage.getItem("cartItem");
  //     return savedCart ? JSON.parse(savedCart) : {};
  //   });
  //   useEffect(() => {
  //     localStorage.setItem("cartItem", JSON.stringify(cartItem));
  //   }, [cartItem]);

  // Fetch product list
  const getProduct = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list"); // ✅ Should be GET not POST
      console.log("Fetched products:", result.data);
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product size");
      return;
    }
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      if (cartData[itemId].size === size) {
        cartData[itemId].quantity += 1;
      } else {
        // cartData[itemId] = { size, quantity: 1 };
        cartData[itemId][size] = 1;
      }
    } else {
      //   cartData[itemId] = { size, quantity: 1 };
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
    if (userData) {
      try {
        let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    // console.log(cartData);
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(
        serverUrl + "/api/cart/get",
        {},
        { withCredentials: true }
      );
      setCartItem(result.data);
    } catch (error) {}
  };

  const UpdateQauntity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);
    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItem) {
      const sizes = cartItem[itemId];
      for (const size in sizes) {
        try {
          if (sizes[size] > 0) {
            totalCount += sizes[size];
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = async () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getUserCart();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    getProduct,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    UpdateQauntity,
    getCartAmount,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
};

export default ShopContext;
