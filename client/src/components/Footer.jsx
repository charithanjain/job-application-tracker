import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Developer Info */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">Charitha N Jain</h2>
          <p className="text-sm">Software Engineer</p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/charithanjain/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/charitha_n_jain/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-4 border-t border-gray-700 pt-2 text-center text-xs text-gray-500">
        © 2026 Charitha N Jain. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
