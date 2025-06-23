import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0c2025] to-[#8ea9ab] text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#a5faf7]">
            Onecart
          </h1>
          <p className="text-gray-300 mt-2 text-sm">
            Bringing you quality fashion, comfort, and style. All in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold text-[#a5faf7] mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/collection" className="hover:underline text-gray-300">
                Collection
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline text-gray-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h2 className="text-xl font-semibold text-[#a5faf7] mb-4">Connect</h2>
          <p className="text-gray-300 text-sm mb-3">
            Email: support@onecart.com
          </p>
          <p className="text-gray-300 text-sm mb-4">Phone: +91 98765 43210</p>
          <div className="flex space-x-4">
            <a href="#">
              <FaFacebookF className="hover:text-[#a5faf7]" />
            </a>
            <a href="#">
              <FaInstagram className="hover:text-[#a5faf7]" />
            </a>
            <a href="#">
              <FaTwitter className="hover:text-[#a5faf7]" />
            </a>
            <a href="#">
              <FaGithub className="hover:text-[#a5faf7]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Onecart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
