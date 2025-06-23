import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] text-white flex flex-col items-center px-5 py-16 md:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#a5faf7] mb-3">
          Contact Us
        </h1>
        <p className="text-gray-300 text-md md:text-lg max-w-xl mx-auto">
          We'd love to hear from you! Whether it's a question, feedback, or just
          a hello.
        </p>
      </div>

      {/* Contact Form */}
      <form
        action="https://formspree.io/f/mdkzlpze" // ⬅️ replace with your Formspree form ID
        method="POST"
        className="w-full max-w-2xl bg-[#1f2f2f] p-8 rounded-xl shadow-xl"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-md bg-[#0e1c1f] text-white focus:outline-none focus:ring-2 focus:ring-[#a5faf7]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-md bg-[#0e1c1f] text-white focus:outline-none focus:ring-2 focus:ring-[#a5faf7]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Your Message
          </label>
          <textarea
            name="message"
            rows="5"
            required
            className="w-full px-4 py-3 rounded-md bg-[#0e1c1f] text-white focus:outline-none focus:ring-2 focus:ring-[#a5faf7]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-[#a5faf7] text-black font-semibold hover:bg-[#8df3f0] transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
4;
