import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaAddressBook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-fuchsia-700">OESYC</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-left">
          <h2 className="text-lg font-semibold mb-2">Navigation</h2>
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-400 transition-colors">Home</a>
            <a href="#" className="hover:text-gray-400 transition-colors">About</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Services</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col items-left">
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <div className="flex items-left mb-1">
            <FaEnvelope className="mr-2" /> 
            <p className="text-sm">info@yourbrand.com</p>
          </div>
          <div className="flex items-left">
            <FaPhone className="mr-2" />
            <p className="text-sm">(123) 456-7890</p>
          </div>
          <div className="flex items-left">
          <FaAddressBook className="mr-2" />
          <p className="text-sm text-left">1234 Street Name, City, State, 12345</p>
          </div>
        </div>


        {/* Social Media Icons */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-8">
        <p className="text-sm">&copy; {new Date().getFullYear()} Oesyc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
