import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black w-full py-6 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Social media icons */}
        <div className="flex space-x-6 mb-4">
          <a href="https://github.com/varunraj923" className="text-white hover:text-gray-300 transition-colors">
            <FaGithub className="h-5 w-5" />
          </a>
          <a href="https://x.com/varunraj923?t=dE1Oy-tNVndQMnTZwvyYUw&s=09har" className="text-white hover:text-gray-300 transition-colors">
            <FaTwitter className="h-5 w-5" />
          </a>
          <a href="https://x.com/varunraj923?t=dE1Oy-tNVndQMnTZwvyYUw&s=09ha" className="text-white hover:text-gray-300 transition-colors">
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a href="https://www.instagram.com/varunn2193?igsh=MWtnaHZkdjF3ZnBiOQ==" className="text-white hover:text-gray-300 transition-colors">
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright and signature */}
        <div className="flex flex-col items-center">
          <p className="text-white text-sm mb-1">
            © {new Date().getFullYear()} TechMate. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs flex items-center">
            Made by Varun with <FaHeart className="text-red-500 mx-1" /> 
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
