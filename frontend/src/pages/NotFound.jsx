import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col items-center justify-center text-white px-4">
      <FaExclamationTriangle className="text-[#3bcee8] text-[80px] mb-4" />
      <h1 className="text-4xl md:text-6xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300 text-center max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 cursor-pointer bg-[#3bcee8] hover:bg-[#32b6d1] text-black font-semibold px-6 py-3 rounded-lg transition duration-200"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
