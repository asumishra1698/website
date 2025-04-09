import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile sidebar menu
  const [isServicesOpen, setIsServicesOpen] = useState(false); // State for Services dropdown in sidebar

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleServicesMenu = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#005677] text-white py-2">
        <div className="w-full flex justify-between items-center px-6 lg:px-16">
          <p className="text-sm">Call us: +1 234 567 890</p>
          <div className="flex gap-4">
            <a href="/" className="text-sm hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="/" className="text-sm hover:text-blue-400 transition">
              <FaTwitter />
            </a>
            <a href="/" className="text-sm hover:text-blue-400 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Navbar */}
      <nav className="navbar bg-white shadow-md sticky top-0 z-50">
        <div className="w-full flex justify-between items-center px-6 lg:px-16 py-3">
          {/* Logo */}
          <div className="logo text-2xl font-bold text-gray-800">
            <Link to="/">Website</Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center justify-center flex-grow">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition duration-300"
              >
                About
              </Link>
            </li>
            <li className="relative group">
              <Link
                to="/services"
                className="hover:text-blue-600 transition duration-300 flex items-center gap-2"
              >
                Services
              </Link>
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg w-[1100px] p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible invisible transition-all duration-300 z-50">
                <div className="grid grid-cols-4 gap-6">
                  {/* Column 1 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Web Services
                    </h3>
                    <ul>
                      <li>
                        <Link
                          to="/services/the-art-of-fashion-design-blending-creativity-with-innovation"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Web Design
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Web Development
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          SEO Services
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Marketing
                    </h3>
                    <ul>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Digital Marketing
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Social Media Marketing
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Email Marketing
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      E-Commerce
                    </h3>
                    <ul>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Shopify Development
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          WooCommerce Development
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Magento Development
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4 */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Support
                    </h3>
                    <ul>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Website Maintenance
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          IT Consulting
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/"
                          className="block px-2 py-1 hover:bg-blue-100 hover:text-blue-600 rounded"
                        >
                          Training & Workshops
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/all-products"
                className="hover:text-blue-600 transition duration-300"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className="hover:text-blue-600 transition duration-300"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Login Button */}
          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaUser />
            Login
          </Link>

          {/* Mobile Menu Button */}
          <div className="hamburger md:hidden" onClick={toggleMenu}>
            <span
              className={`bar block w-6 h-0.5 bg-black mb-1 transition-transform ${
                isOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></span>
            <span
              className={`bar block w-6 h-0.5 bg-black mb-1 transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`bar block w-6 h-0.5 bg-black transition-transform ${
                isOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            ></span>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            &times;
          </button>
        </div>
        <ul className="flex flex-col gap-4 px-4 py-6">
          <li>
            <Link to="/" className="hover:text-blue-400" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-blue-400"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <button
              onClick={toggleServicesMenu}
              className="flex justify-between items-center w-full text-left hover:text-blue-400"
            >
              Services
              <span>{isServicesOpen ? "-" : "+"}</span>
            </button>
            {isServicesOpen && (
              <ul className="pl-4 mt-2">
                <li>
                  <Link
                    to="/services/web-design"
                    className="block hover:text-blue-400"
                    onClick={toggleMenu}
                  >
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/web-development"
                    className="block hover:text-blue-400"
                    onClick={toggleMenu}
                  >
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/seo"
                    className="block hover:text-blue-400"
                    onClick={toggleMenu}
                  >
                    SEO Services
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/all-products"
              className="hover:text-blue-400"
              onClick={toggleMenu}
            >
              All Products
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="hover:text-blue-400"
              onClick={toggleMenu}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-400"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={toggleMenu}
            >
              <FaUser />
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
