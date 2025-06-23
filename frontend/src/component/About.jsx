import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0c2025] to-[#141414] text-white px-5 py-16 md:px-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#a5faf7] mb-4">
          About Onecart
        </h1>
        <p className="text-gray-300 text-md md:text-lg max-w-2xl mx-auto">
          Your one-stop shop for fashion, comfort, and convenience — experience
          a smarter way to shop.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Image */}
        <img
          src="https://img.freepik.com/free-photo/shopping-concept-close-up-portrait-happy-excited-beautiful-woman-holding-colorful-shopping-bags_1258-108358.jpg"
          alt="About"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#a5faf7] mb-4">
            Who We Are
          </h2>
          <p className="text-gray-300 text-md md:text-lg leading-relaxed mb-4">
            At Onecart, we believe shopping should be joyful, effortless, and
            personal. We bring the best products from across the globe to your
            screen — clothing, accessories, lifestyle goods, and more.
          </p>
          <p className="text-gray-400 text-sm md:text-base">
            With a focus on quality, affordability, and fast delivery, our
            platform is designed to make your experience smooth and stress-free.
            We’re committed to customer satisfaction and support every step of
            the way.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#a5faf7] mb-4">
          Our Values
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-6">
          <div className="bg-[#1f2f2f] p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Trust</h3>
            <p className="text-gray-400 text-sm">
              We value your trust and promise authenticity in every product we
              offer.
            </p>
          </div>
          <div className="bg-[#1f2f2f] p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-400 text-sm">
              We constantly evolve to bring you smarter features and seamless
              shopping.
            </p>
          </div>
          <div className="bg-[#1f2f2f] p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Satisfaction</h3>
            <p className="text-gray-400 text-sm">
              Your happiness is our mission — hassle-free returns and easy
              support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
