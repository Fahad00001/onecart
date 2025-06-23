import axios from "axios";
// import React from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { useContext } from "react";
import { adminDataContext } from "../context/AdminContext";

const Nav = () => {
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { getAdmin } = useContext(adminDataContext);
  const logOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(result.data);
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[100vw] h-[70px] bg-[#dcfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div
        className="w-[30%] flex items-center gap-[10px] cursor-pointer justify-start"
        onClick={() => navigate("/")}
      >
        <img
          src="https://play-lh.googleusercontent.com/UMwuTxlUJYqmVap10sp9Et2JxsPqd5V6iP9RQe-VXYO0LJkCCB89W1Tp-gVp21k1Q1k=w240-h480"
          alt=""
          className="w-[30px]"
        />
        <h1 className="text-[25px] text-black font-sans">Onecart</h1>
      </div>
      <button
        className="text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Nav;
