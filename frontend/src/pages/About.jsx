import React from "react";
import { FaRobot } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0c2025] to-[#141414] text-white px-5 py-16 md:px-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#a5faf7] mb-4">
          About Onecart
        </h1>
        <p className="text-gray-300 text-md md:text-lg max-w-2xl mx-auto">
          Your one-stop shop for fashion, comfort, and convenience — now powered
          by AI for smarter, faster shopping.
        </p>
      </div>

      {/* Who We Are */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-20">
        <img
          src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-happy-excited-beautiful-woman-holding-colorful-shopping-bags_1258-108358.jpg"
          alt="Happy customer"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#a5faf7] mb-4">
            Who We Are
          </h2>
          <p className="text-gray-300 text-md md:text-lg leading-relaxed mb-4">
            At Onecart, we make shopping delightful — blending fashion, tech,
            and personalization. From top brands to niche finds, Onecart
            delivers variety and value to your doorstep.
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            With top-tier logistics, customer-first support, and a mission to
            bring convenience to your life, we're constantly evolving to serve
            you better.
          </p>
        </div>
      </div>

      {/* AI Integration */}
      <div className="flex flex-col md:flex-row items-center gap-10 bg-[#1e3a42] p-8 rounded-2xl shadow-md mb-20">
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#7fffd4] mb-3 flex items-center gap-3">
            <FaRobot className="text-[#a5faf7]" /> AI-Powered Shopping
          </h2>
          <p className="text-gray-300 text-md md:text-lg leading-relaxed">
            Our smart AI engine learns your preferences and recommends products
            tailored just for you. Whether it’s a new trend, restock alert, or
            personal styling suggestion — our intelligent assistant keeps you
            ahead of the curve.
          </p>
        </div>
        <img
          src="https://th.bing.com/th/id/OIP.wACUdxWxhmsWFRy_-C5qVwHaHa?r=0&w=1024&h=1024&rs=1&pid=ImgDetMain"
          alt="AI Assistant"
          className="w-[150px] md:w-[200px] rounded-xl"
        />
      </div>

      {/* Our Values */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#a5faf7] mb-4">
          Our Core Values
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-6">
          <div className="bg-[#1f2f2f] p-6 rounded-xl shadow-md w-full md:w-1/3 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-[#f5f5f5]">Trust</h3>
            <p className="text-gray-400 text-sm">
              We value your trust and promise authenticity in every product we
              offer.
            </p>
          </div>
          <div className="bg-[#1f2f2f] p-6 rounded-xl shadow-md w-full md:w-1/3 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-[#f5f5f5]">
              Innovation
            </h3>
            <p className="text-gray-400 text-sm">
              Powered by technology, we constantly innovate for your ease and
              satisfaction.
            </p>
          </div>
          <div className="bg-[#1f2f2f] p-6 rounded-xl shadow-md w-full md:w-1/3 hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-[#f5f5f5]">
              Satisfaction
            </h3>
            <p className="text-gray-400 text-sm">
              Your happiness is our mission — with quick delivery, smooth
              returns, and 24/7 support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
