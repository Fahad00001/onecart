import React, { useContext, useState } from "react";
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContactPhone } from "react-icons/md";
import axios from "axios";
import { shopDataContext } from "../context/ShopContext";
const Nav = () => {
  let { getcurrentUser, userData, setUserData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  const { showSearch, setShowSearch, search, setSearch, getCartCount } =
    useContext(shopDataContext);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();
  console.log("userData in Nav:", userData);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      setUserData(null); // 🧹 Clear user data
      navigate("/signup"); // 🚀 Navigate to signup
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div className="w-[20%] lg:w-[45%] flex items-center justify-start gap-[10px] ">
        <img
          src="https://play-lh.googleusercontent.com/UMwuTxlUJYqmVap10sp9Et2JxsPqd5V6iP9RQe-VXYO0LJkCCB89W1Tp-gVp21k1Q1k=w240-h480"
          alt=""
          className="w-[30px] rounded-full"
        />
        <h1 className="text-[25px]  text-black font-sans">Onecart</h1>
      </div>
      <div className="w-[50%] hidden md:flex ">
        <ul className="flex items-center justify-center gap-[19px] text-[white]">
          <li
            onClick={() => navigate("/")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/collection")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          >
            Collection
          </li>
          <li
            onClick={() => navigate("/about")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          >
            About
          </li>
          <li
            onClick={() => navigate("/contact")}
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          >
            Contact
          </li>
        </ul>
      </div>
      <div className="w-[30%] lg:w-[40%] flex items-center justify-end gap-[20px] ">
        {!showSearch && (
          <IoSearchCircleOutline
            onClick={() => {
              setShowSearch((prev) => !prev);
              navigate("/collection");
            }}
            className="w-[30px] h-[38px] text-[#000000] cursor-pointer"
          />
        )}
        {showSearch && (
          <IoSearchCircle
            onClick={() => setShowSearch((prev) => !prev)}
            className="w-[30px] h-[38px] text-[#000000] cursor-pointer"
          />
        )}

        {!userData && (
          <FaUserCircle
            className="w-[28px] h-[38px] text-[#a01616] cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          />
        )}
        {userData && (
          <div
            className="w-[30px] h-[30px] bg-[#080808] text-white  rounded-full  flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
          >
            {userData?.name.slice(0, 1)}
          </div>
        )}

        <FaShoppingCart
          onClick={() => navigate("/cart")}
          className=" hidden md:block w-[28px] h-[38px] text-[#000000] cursor-pointer"
        />

        <p className=" hidden md:block absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px]  py-[5px] rounded-full text-[9px] top-[10px] right-[23px] text-white">
          {getCartCount()}
        </p>
      </div>
      {showSearch && (
        <div className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center">
          <input
            type="text"
            className="lg-w-[50%] w-[60%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px]"
            placeholder="Search for products..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {showProfile && (
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%]  border-[1px] border-[#aaa9a9] rounded-[10px] ">
          <ul className="w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-white">
            {!userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f]  px-[15px] py-[10px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>
            )}
            {userData && (
              <li
                className="w-[100%] hover:bg-[#2f2f2f]  px-[15px] py-[10px] cursor-pointer"
                onClick={() => {
                  handleLogout();

                  setShowProfile(false);
                }}
              >
                Logout
              </li>
            )}
            <li
              className="w-[100%] hover:bg-[#2f2f2f]  px-[15px] py-[10px] cursor-pointer"
              onClick={() => {
                navigate("/order");

                setShowProfile(false);
              }}
            >
              {" "}
              Orders
            </li>
            <li
              onClick={() => navigate("/about")}
              className="w-[100%] hover:bg-[#2f2f2f]  px-[15px] py-[10px] cursor-pointer"
            >
              About
            </li>
          </ul>
        </div>
      )}
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[20px] fixed bottom-0 left-0 bg-[#191818] md:hidden text-[12px] ">
        <button
          onClick={() => navigate("/")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          {" "}
          <IoMdHome className="w-[25px] h-[25px] text-white md:hidden" /> Home
        </button>
        <button
          onClick={() => navigate("/collection")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          {" "}
          <HiOutlineCollection className="w-[25px] h-[25px] text-white md:hidden" />{" "}
          Collection
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          {" "}
          <MdContactPhone className="w-[25px] h-[25px] text-white md:hidden" />{" "}
          Contact
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="text-white flex items-center justify-center flex-col gap-[2px]"
        >
          {" "}
          <FaShoppingCart className="w-[25px] h-[25px] text-white md:hidden" />
          Cart
        </button>
        <p className="absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px]  py-[5px] rounded-full text-[10px] top-[10px] right-[23px] text-white">
          {getCartCount()}
        </p>
      </div>
    </div>
  );
};

export default Nav;
