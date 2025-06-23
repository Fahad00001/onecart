import { useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);
  const { getAdmin } = useContext(adminDataContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const adminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      );

      if (result?.data) {
        toast.success("Admin login successful!");
        getAdmin(); // set context
        navigate("/");
      } else {
        toast.error("❌ Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(`❌ ${error.response.data.message}`);
      } else {
        toast.error("❌ Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#141414] to-[#0c2025] text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full h-20 flex items-center gap-3 px-6 md:px-10">
        <img
          className="w-10 h-10 rounded-full shadow-md"
          src="https://play-lh.googleusercontent.com/UMwuTxlUJYqmVap10sp9Et2JxsPqd5V6iP9RQe-VXYO0LJkCCB89W1Tp-gVp21k1Q1k=w240-h480"
          alt="Onecart Logo"
        />
        <h1 className="text-2xl font-bold tracking-wide">Onecart</h1>
      </div>

      {/* Title */}
      <div className="mt-4 text-center space-y-2">
        <h2 className="text-3xl font-semibold">Admin Login</h2>
        <p className="text-sm text-gray-300">
          Welcome to <span className="font-semibold text-white">Onecart</span>,
          apply to admin login
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 max-w-[600px] w-[90%] h-[500px] bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6">
        <form
          onSubmit={adminLogin}
          className="flex flex-col items-center justify-center h-full space-y-6"
        >
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px]">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full h-[50px] border-[2px] border-gray-500 rounded-[10px] backdrop:blur-sm shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
              disabled={loading}
            />
            <div className="relative w-full">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"}
                className="w-full h-[50px] border-[2px] border-gray-500 rounded-[10px] backdrop:blur-sm shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold pr-[50px]"
                placeholder="Password"
                required
                disabled={loading}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg text-gray-300 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer w-full h-[50px] ${
                loading ? "bg-[#4040a0] cursor-not-allowed" : "bg-[#6060f5]"
              } rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
