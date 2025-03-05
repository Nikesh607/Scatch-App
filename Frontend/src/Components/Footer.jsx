import React from 'react'

import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="container max-w-screen pl-52 px-6 flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold text-red-500">Scatch.</h2>
          <p className="mt-4 text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="p-2 rounded-full border border-gray-400 hover:bg-red-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full border border-gray-400 hover:bg-red-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full border border-gray-400 hover:bg-red-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-white">COMPANY</h3>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="hover:text-red-500">Home</a></li>
            <li><a href="#" className="hover:text-red-500">About us</a></li>
            <li><a href="#" className="hover:text-red-500">Delivery</a></li>
            <li><a href="#" className="hover:text-red-500">Privacy policy</a></li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold text-white">GET IN TOUCH</h3>
          <p className="mt-4">+1-212-456-7890</p>
          <p>contact@Scatch.com</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">
        Copyright 2024 © Scatch.com - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

