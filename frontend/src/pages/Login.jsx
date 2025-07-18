import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("✅ Logged in successfully!");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("❌ Invalid email or password.");
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        `${serverUrl}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );
      toast.success("✅ Google login successful!");
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("❌ Google login failed.");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      {/* Header */}
      <div
        className="w-full h-20 flex items-center gap-3 px-6 md:px-10 cursor-pointer hover:opacity-90 transition"
        onClick={() => navigate("/")}
      >
        <img
          className="w-10 h-10 rounded-full shadow-md"
          src="https://play-lh.googleusercontent.com/UMwuTxlUJYqmVap10sp9Et2JxsPqd5V6iP9RQe-VXYO0LJkCCB89W1Tp-gVp21k1Q1k=w240-h480"
          alt="Onecart Logo"
        />
        <h1 className="text-2xl font-bold tracking-wide">Onecart</h1>
      </div>

      {/* Title */}
      <div className="mt-4 text-center space-y-2">
        <h2 className="text-3xl font-semibold">Registration Page</h2>
        <p className="text-sm text-gray-300">
          Welcome to <span className="font-semibold text-white">Onecart</span>,
          place your order
        </p>
      </div>

      {/* Form Section */}
      <div className="mt-8 max-w-[600px] w-[90%] h-[500px] bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center h-full space-y-6"
        >
          {/* Google Registration */}
          <div
            onClick={googleLogin}
            className="w-full max-w-[400px] bg-[#42656cae] hover:bg-[#3a5865] transition rounded-lg py-3 px-6 flex items-center justify-center gap-3 cursor-pointer"
          >
            <img
              src="https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg"
              className="w-5 h-5 rounded-full"
              alt="Google logo"
            />
            <span className="text-sm font-medium">Register with Google</span>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center gap-2 text-gray-400 text-xs">
            <div className="w-1/3 h-[1px] bg-gray-600/40" />
            OR
            <div className="w-1/3 h-[1px] bg-gray-600/40" />
          </div>

          {/* Input Fields */}
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full h-[50px] border-[2px] border-gray-500 rounded-[10px] backdrop:blur-sm shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
            />
            {/* Password Field with Eye */}
            <div className="relative w-full">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className="w-full h-[50px] border-[2px] border-gray-500 rounded-[10px] backdrop:blur-sm shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[50px]"
                placeholder="Password"
                required
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg text-gray-300 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>

            {/* Login Button */}
            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Login
            </button>

            <p className="flex gap-[10px]">
              You haven't an account?
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
